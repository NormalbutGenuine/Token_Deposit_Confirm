var solana_web3 = require("@solana/web3.js");
const db = require("./database");
let connection = new solana_web3.Connection(solana_web3.clusterApiUrl("mainnet-beta"));
const SOL_coin_id = 1;
const SOL = 1;

const token_add = "5MbsYZtv2xCzkBLxqNkGoQ4nABgzwVvnsWy6DBiirTq5";// 코인을 받을 토큰 주소

let id_array = [];
let return_id = [];
let id_box = [0];

// 데이터 id를 두 번 확인한 경우 더 이상 확인하지 않고 다음 데이터로 넘어가기 위해 중복된 id를 sql문에 대입해 조회 대상에서 제외하기 위한 함수 
function check_count(id){
	let return_sentence = 0;
	id_array.push(id);
	let return_box = [];
	if (id_array.includes(id)){
		return_id.push(id);
		let return_id2 = return_id.filter((item, pos) => return_id.indexOf(item) === pos); // 중복제거
		return_sentence = String(return_id2[0]);
		return_box.push(return_id2[0]);
		// console.log("line 23");
		// console.log(return_id2);
		for (var i=1; i < return_id2.length; i++){
			if(typeof(return_id2[i]) === "string"){
				console.log("string");
			}else{
				return_sentence = return_sentence +','+ String(return_id2[i]);
				return_box.push(return_id2[i]);
			}
		}
		// console.log("line 33");
		// console.log(return_box);
		let filter_arr = [];
		return_box.forEach(element => {
			filter_arr.push(Math.abs(element));
		});
		// console.log("line 39");
		// console.log(filter_arr);
		let uniq_array = [];
		
		// id 값이 중복된다는 것은 final_check함수에서 id가 넘어왔다는 의미이기 때문에 처리가 끝났으므로 제거해야 한다. 그 기능을 하는 부분이다.
		// 배열에서 값이 1개만 있는 element만 추출해서 uniq_array에 저장
		filter_arr.map(obj => {
			if (filter_arr.filter(x => x === obj).length == 1)
			uniq_array.push(obj);
		});
		
		// console.log("line 50");
		// console.log(uniq_array);
		return_sentence = String(uniq_array[0]);
		for(var j = 1; j < uniq_array.length; j++){
			if(typeof(uniq_array[j]) === "string"){
				console.log("string");
			}else if(typeof(uniq_array[j]) === "number"){
				return_sentence = return_sentence +','+ String(uniq_array[j]);
			}
		}
		id_array = [];
		id_box.push(return_sentence);
	}
	console.log("return sentence is: "+return_sentence);
	return return_sentence;
}

async function check_sig(){
	db.get_sell_list(SOL_coin_id, SOL).then((result) => {
		console.log(result[0]);
		if (result[0] != undefined){
			try{
			const pubkey = new solana_web3.PublicKey(result[0].wallet_address); // 코인을 보낸 계정의 주소
			console.log(pubkey);
			connection.getConfirmedSignaturesForAddress2(pubkey, {limit: 20}, "confirmed").then((tx_history) => {
				if(result[0] == null){
					console.log('Not matched row!');
				} else {
					db.get_sig_list(SOL_coin_id, SOL, result[0].wallet_address).then((sig_list) => {
						let sig_box = [];
						let db_sig_filter = sig_list;
						tx_history.forEach(element => {
							sig_box.push(element.signature);
						});
						// console.log(db_sig_filter);
						// sig_box에서 db에 존재하는 signature(tx_id) 제거하는 로직
						for (var q = 0; q < db_sig_filter.length; q++){
							if(sig_box.includes(db_sig_filter[q].tx_id)){
								sig_box.splice(sig_box.indexOf(db_sig_filter[q].tx_id),1);
							}
						}
						let add_box = {};
						// db.get_sell_list(SOL_Upay, SOL).then(sell_list)
						// console.log("===========================================================================================================================================");
						for (var i=0; i < sig_box.length; i++){
							connection.getTransaction(sig_box[i], {commitment: "confirmed"}).then(async (tx) =>{
								if(tx.meta.preTokenBalances[0] === undefined){
									// console.log('is not user to user transfer');
									await db.update_Table(result[0].id, null, "Checking.", 2);
								} else {
									let accounts = tx.transaction.message.accountKeys.toString();
									accounts = accounts.split(',');
									add_box.Rec_add = accounts[2]; // 토큰을 받은 계정의 주소 JSON 객체에 삽입
									add_box.send_amount = (tx.meta.preTokenBalances[0].uiTokenAmount.uiAmount*(solana_web3.LAMPORTS_PER_SOL) - tx.meta.postTokenBalances[0].uiTokenAmount.uiAmount*(solana_web3.LAMPORTS_PER_SOL)); // 전송수량 계산해서 json객체에 추가
									add_box.send_add = accounts[0];
									if ((token_add === add_box.Rec_add) && (result[0].coin_amount*solana_web3.LAMPORTS_PER_SOL === add_box.send_amount) && (Object.keys(tx.meta.status)[0] === 'Ok')){
										// console.log(token_add === add_box.Rec_add && result[0].coin_amount*solana_web3.LAMPORTS_PER_SOL === add_box.send_amount && Object.keys(tx.meta.status)[0] === 'Ok');
										await db.update_Table(result[0].id, tx.transaction.signatures[0], null, 3);
										console.log("success");
									}else{
										if ((Object.keys(tx.meta.status)[0] != 'Ok') && (result[0].wallet_address === add_box.send_add) && (token_add === add_box.Rec_add)){
											console.log(tx.meta.status);
											console.log("failed transaction");
											db.update_Table(result[0].id, tx.transaction.signatures[0], Object.keys(tx.meta.err)[0], 7);
										}else{
											// console.log("can't find transaction");
											await db.update_Table(result[0].id, null, "Checking.", 2);
											// console.log(tx.meta.status);
										}
									}
								}
							}); // getTransaction end
						}
					}); // db.get_sig_list end
				}
			}); // getConfirmedSignaturesForAddress2 end
		}catch(e){
			console.log("Invalid address");
			db.update_Table(result[0].id, null, e, 4);
		}
		}else{
			console.log("There is no more data to validate.");
		}
	
	}); // db.get_sell_list end
}

async function process_check(){
	db.get_finding_list(SOL_coin_id, SOL, check_count(0)).then((result) => {
		// console.log(result);
		if (result[0] != undefined){
			try{
			const pubkey = new solana_web3.PublicKey(result[0].wallet_address); // 코인을 보낸 계정의 주소
			console.log(pubkey);
			connection.getConfirmedSignaturesForAddress2(pubkey, {limit: 20}, "confirmed").then((tx_history) => {
				if(result[0] == null){
					console.log('Not matched row!');
				} else {
					db.get_sig_list(SOL_coin_id, SOL, result[0].wallet_address).then((sig_list) => {
						let sig_box = [];
						let db_sig_filter = sig_list;
						tx_history.forEach(element => {
							sig_box.push(element.signature);
						});
						// console.log(db_sig_filter);
						// sig_box에서 db에 존재하는 signature(tx_id) 제거하는 로직
						for (var q = 0; q < db_sig_filter.length; q++){
							if(sig_box.includes(db_sig_filter[q].tx_id)){
								sig_box.splice(sig_box.indexOf(db_sig_filter[q].tx_id),1);
							}
						}
						let add_box = {};
						// db.get_sell_list(SOL_Upay, SOL).then(sell_list)
						// console.log("===========================================================================================================================================");
						for (var i=0; i < sig_box.length; i++){
							connection.getTransaction(sig_box[i], {commitment: "confirmed"}).then(async (tx) =>{
								
								if(tx.meta.preTokenBalances[0] === undefined){
									// console.log('is not user to user transfer');
								} else {
									let accounts = tx.transaction.message.accountKeys.toString();
									accounts = accounts.split(',');
									add_box.Rec_add = accounts[2]; // 토큰을 받은 계정의 주소 JSON 객체에 삽입
									add_box.send_amount = (tx.meta.preTokenBalances[0].uiTokenAmount.uiAmount*(solana_web3.LAMPORTS_PER_SOL) - tx.meta.postTokenBalances[0].uiTokenAmount.uiAmount*(solana_web3.LAMPORTS_PER_SOL)); // 전송수량 계산해서 json객체에 추가
									add_box.send_add = accounts[0];
									if ((token_add === add_box.Rec_add) && (result[0].coin_amount*solana_web3.LAMPORTS_PER_SOL === add_box.send_amount) && (Object.keys(tx.meta.status)[0] === 'Ok')){
										// console.log(token_add === add_box.Rec_add && result[0].coin_amount*solana_web3.LAMPORTS_PER_SOL === add_box.send_amount && Object.keys(tx.meta.status)[0] === 'Ok');
										await db.update_Table(result[0].id, tx.transaction.signatures[0], null, 3);
										check_count(-result[0].id);
										console.log("success");
									}else{
										if ((Object.keys(tx.meta.status)[0] != 'Ok') && (result[0].wallet_address === add_box.send_add) && (token_add === add_box.Rec_add)){
											// console.log(tx.meta.status);
											console.log("failed transaction");
											await db.update_Table(result[0].id, tx.transaction.signatures[0], Object.keys(tx.meta.err)[0], 7);
										}else{
											// console.log("can't find transaction");
											// console.log(tx.meta.status);
											continue;
										}
									}
								}
							}); // getTransaction end
						}
						check_count(result[0].id);
					}); // db.get_sig_list end
				}
			}); // getConfirmedSignaturesForAddress2 end
		}catch(e){
			console.log("Invalid address");
			db.update_Table(result[0].id, null, e, 4);
		}
		}else{
			console.log("There is no more data to validate.");
			// console.log("There is no checking data. ");
			// console.log(id_box);
			id_box.shift();
			id_box = [];
		}
	});
}

async function final_check(){
	db.get_final_list(SOL_coin_id, SOL).then((result) => {
		console.log(result[0]);
		if (result[0] != undefined){
			try{
			const pubkey = new solana_web3.PublicKey(result[0].wallet_address); // 코인을 보낸 계정의 주소
			console.log(pubkey);
			connection.getConfirmedSignaturesForAddress2(pubkey, {limit: 20}).then((tx_history) => {
				if(result[0] == null){
					console.log('Not matched row!');
				} else {
					db.get_sig_list(SOL_coin_id, SOL, result[0].wallet_address).then((sig_list) => {
						let sig_box = [];
						let db_sig_filter = sig_list;
						tx_history.forEach(element => {
							sig_box.push(element.signature);
						});
						// console.log(db_sig_filter);
						// sig_box에서 db에 존재하는 signature(tx_id) 제거하는 로직
						for (var q = 0; q < db_sig_filter.length; q++){
							if(sig_box.includes(db_sig_filter[q].tx_id)){
								sig_box.splice(sig_box.indexOf(db_sig_filter[q].tx_id),1);
							}
						}
						let add_box = {};
						// db.get_sell_list(SOL_Upay, SOL).then(sell_list)
						// console.log("===========================================================================================================================================");
						for (var i=0; i < sig_box.length; i++){
							connection.getTransaction(sig_box[i]).then(async (tx) =>{
								
								if(tx.meta.preTokenBalances[0] === undefined){
									console.log('is not user to user transfer');
								} else {
									let accounts = tx.transaction.message.accountKeys.toString();
									accounts = accounts.split(',');
									add_box.Rec_add = accounts[2]; // 토큰을 받은 계정의 주소 JSON 객체에 삽입
									add_box.send_amount = (tx.meta.preTokenBalances[0].uiTokenAmount.uiAmount*(solana_web3.LAMPORTS_PER_SOL) - tx.meta.postTokenBalances[0].uiTokenAmount.uiAmount*(solana_web3.LAMPORTS_PER_SOL)); // 전송수량 계산해서 json객체에 추가
									add_box.send_add = accounts[0];
									if ((token_add === add_box.Rec_add) && (result[0].coin_amount*solana_web3.LAMPORTS_PER_SOL === add_box.send_amount) && (Object.keys(tx.meta.status)[0] === 'Ok')){
										// console.log(token_add === add_box.Rec_add && result[0].coin_amount*solana_web3.LAMPORTS_PER_SOL === add_box.send_amount && Object.keys(tx.meta.status)[0] === 'Ok');
										await db.update_Table(result[0].id, tx.transaction.signatures[0], null, 3);
										console.log("success");
									}else{
										if ((Object.keys(tx.meta.status)[0] != 'Ok') && (result[0].wallet_address === add_box.send_add) && (token_add === add_box.Rec_add)){
											// console.log(tx.meta.status);
											console.log("failed transaction");
											db.update_Table(result[0].id, tx.transaction.signatures[0], Object.keys(tx.meta.err)[0], 7);
										}else{
											console.log("can't find transaction");
											await db.update_Table(result[0].id, null, "No transaction records found", 4);
											// console.log(tx.meta.status);
										}
									}
								}
							}); // getTransaction end
						}
						check_count(-(result[0].id));
					}); // db.get_sig_list end
				}
			}); // getConfirmedSignaturesForAddress2 end
		}catch(e){
			console.log("Invalid address");
			db.update_Table(result[0].id, null, e, 4);
		}
		}else{
			// console.log("final check");
			console.log("There is no more data to validate.");
		}
	});
}

async function run_check_sig(){
	console.log("run");
	setInterval(check_sig, 10000);
}

async function run_process_check(){
	console.log("run process check");
	setInterval(process_check, 32000);
} 

async function run_final_check(){
	console.log("final check");
	setInterval(final_check, 61000);
}

run_check_sig();
run_process_check();
run_final_check();