const mysql = require("mysql2/promise");

const pool = require("./lib/pool");

// mainnet_id 지정
const SOL = 1;
const HECO = 2;
const ETH = 3;

// 각 코인 id번호 지정
const OC_Heco = 3;
const HTC_Heco = 4;
const ETHC_Heco = 5;
const HC_Heco = 6;

const OC_ETH = 7;
const HTC_ETH = 8;
const ETHC_ETH = 9;

const SOL_NIA = 2;
const SOL_Upay = 1;

// 스태시 테스트

// 각 status
const checking = 2;
const deposit_confirm = 3;  
const verify_fail = 4;
const SENDING_ERROR = 7;

async function select_sell_list(connect, coin_id, chain_id){
    let sql = '';
    if (chain_id === SOL){
        switch (coin_id){
            case SOL_NIA:
                sql = `SELECT * FROM user_coin_sell_list where status=1 AND mainnet_id=${chain_id} AND coin_id=${SOL_NIA} ORDER BY created_at ASC LIMIT 1 ;`;
                break;
            
            case SOL_Upay:
                sql = `SELECT * FROM user_coin_sell_list where status=1 AND mainnet_id=${chain_id} AND coin_id= ${SOL_Upay} ORDER BY created_at ASC LIMIT 1 ;`;
                break;
            
        }
    }
    else if(chain_id === HECO){
        switch(coin_id){
            case OC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status = 1 AND mainnet_id = ${chain_id} AND coin_id = ${OC_Heco} ORDER BY created_at ASC LIMIT 1 ;`;
                break;
            case HTC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status=1 AND mainnet_id=${chain_id} AND coin_id=${HTC_Heco} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
            
            case ETHC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status=1 AND mainnet_id=${chain_id} AND coin_id=${ETHC_Heco} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
            
            case HC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status=1 AND mainnet_id=${chain_id} AND coin_id=${HC_Heco} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
        }
    }
    else if(chain_id === ETH){
        switch (coin_id){
            case OC_ETH:
                sql = `SELECT * FROM user_coin_sell_list where status=1 AND mainnet_id=${chain_id} AND coin_id=${OC_ETH} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
            
            case HTC_ETH:
                sql = `SELECT * FROM user_coin_sell_list where status=1 AND mainnet_id=${chain_id} AND coin_id=${HTC_ETH} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
            
            case ETHC_ETH:
                sql = `SELECT * FROM user_coin_sell_list where status=1 AND mainnet_id=${chain_id} AND coin_id=${ETHC_ETH} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
        }
    }
    else{
        console.log("unsupported chain");
    }
    let resp = await connect.query(sql);
    console.log(sql);
    return resp[0];   
}

async function select_finding_list(connect, coin_id, chain_id){
    let sql = '';
    if (chain_id === SOL){
        switch (coin_id){
            case SOL_NIA:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${SOL_NIA}  ORDER BY created_at ASC LIMIT 1 ;`;
                break;
            
            case SOL_Upay:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id= ${SOL_Upay} ORDER BY created_at ASC LIMIT 1 ;`;
                break;
            
        }
    }
    else if(chain_id === HECO){
        switch(coin_id){
            case OC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status = 2 AND mainnet_id = ${chain_id} AND coin_id = ${OC_Heco} ORDER BY created_at ASC LIMIT 1 ;`;
                break;
            case HTC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${HTC_Heco} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
            
            case ETHC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${ETHC_Heco} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
            
            case HC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${HC_Heco} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
        }
    }
    else if(chain_id === ETH){
        switch (coin_id){
            case OC_ETH:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${OC_ETH} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
            
            case HTC_ETH:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${HTC_ETH} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
            
            case ETHC_ETH:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${ETHC_ETH} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
        }
    }
    else{
        console.log("unsupported chain");
    }
    let resp = await connect.query(sql);
    console.log(sql);
    return resp[0];   
}

async function all_sig_list(connect, coin_id, chain_id, wallet_add){
    let sql = '';
    if (chain_id === SOL){
        switch (coin_id){
            case SOL_NIA:
                sql = `SELECT tx_id FROM user_coin_sell_list where mainnet_id=${chain_id} AND coin_id=${SOL_NIA} AND wallet_address="${wallet_add}" ;`;
                break;
            
            case SOL_Upay:
                sql = `SELECT tx_id FROM user_coin_sell_list where mainnet_id=${chain_id} AND coin_id= ${SOL_Upay} AND wallet_address="${wallet_add}" ;`;
                break;
            
        }
    }
    else if(chain_id === HECO){
        switch(coin_id){
            case OC_Heco:
                sql = `SELECT tx_id FROM user_coin_sell_list where mainnet_id = ${chain_id} AND coin_id = ${OC_Heco} AND wallet_address="${wallet_add}" ;`;
                break;
            case HTC_Heco:
                sql = `SELECT tx_id FROM user_coin_sell_list where mainnet_id=${chain_id} AND coin_id=${HTC_Heco} AND wallet_address="${wallet_add}" ; `; 
                break;
            
            case ETHC_Heco:
                sql = `SELECT tx_id FROM user_coin_sell_list where mainnet_id=${chain_id} AND coin_id=${ETHC_Heco} AND wallet_address="${wallet_add}" ; `; 
                break;
            
            case HC_Heco:
                sql = `SELECT tx_id FROM user_coin_sell_list where mainnet_id="${chain_id}" AND coin_id="${HC_Heco}" AND wallet_address="${wallet_add}" ; `; 
                break;
        }
    }
    else if(chain_id === ETH){
        switch (coin_id){
            case OC_ETH:
                sql = `SELECT tx_id FROM user_coin_sell_list where mainnet_id=${chain_id} AND coin_id=${OC_ETH} AND wallet_address="${wallet_add}" ; `; 
                break;
            
            case HTC_ETH:
                sql = `SELECT tx_id FROM user_coin_sell_list where mainnet_id=${chain_id} AND coin_id=${HTC_ETH} AND wallet_address="${wallet_add}" ; `; 
                break;
            
            case ETHC_ETH:
                sql = `SELECT tx_id FROM user_coin_sell_list where mainnet_id=${chain_id} AND coin_id=${ETHC_ETH} AND wallet_address="${wallet_add}" ; `; 
                break;
        }
    }
    else{
        console.log("unsupported chain");
    }
    let resp = await connect.query(sql);
    return resp[0]; 
}
// 판매신청 후 입금을 했는지 다시 한 번 확인하는 쿼리문
async function select_finding_list(connect, coin_id, chain_id, except_id){
    let sql = '';
    if (chain_id === SOL){
        switch (coin_id){
            case SOL_NIA:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${SOL_NIA} AND id NOT IN (${except_id}) ORDER BY created_at ASC LIMIT 1 ;`; 
                break;
            
            case SOL_Upay:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id= ${SOL_Upay} AND id NOT IN (${except_id}) ORDER BY created_at ASC LIMIT 1 ;`;
                break;
            
        }
    }
    else if(chain_id === HECO){
        switch(coin_id){
            case OC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status = 2 AND mainnet_id = ${chain_id} AND coin_id = ${OC_Heco} AND id NOT IN (${except_id}) ORDER BY created_at ASC LIMIT 1 ;`;
                break;
            case HTC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${HTC_Heco} AND id NOT IN (${except_id}) ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
            
            case ETHC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${ETHC_Heco} AND id NOT IN (${except_id}) ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
            
            case HC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id="${chain_id}" AND coin_id=${HC_Heco} AND id NOT IN (${except_id}) ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
        }
    }
    else if(chain_id === ETH){
        switch (coin_id){
            case OC_ETH:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${OC_ETH} AND id NOT IN (${except_id}) ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
            
            case HTC_ETH:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${HTC_ETH} AND id NOT IN (${except_id}) ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
            
            case ETHC_ETH:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${ETHC_ETH} AND id NOT IN (${except_id}) ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
        }
    }
    else{
        console.log("unsupported chain");
    }
    let resp = await connect.query(sql);
    console.log(sql);
    return resp[0];   
}

async function select_checking_list(connect, coin_id, chain_id){
    let sql = '';
    if (chain_id === SOL){
        switch (coin_id){
            case SOL_NIA:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${SOL_NIA} ORDER BY created_at ASC LIMIT 1 ;`; 
                break;
            
            case SOL_Upay:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id= ${SOL_Upay} ORDER BY created_at ASC LIMIT 1 ;`;
                break;
            
        }
    }
    else if(chain_id === HECO){
        switch(coin_id){
            case OC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status = 2 AND mainnet_id = ${chain_id} AND coin_id = ${OC_Heco} ORDER BY created_at ASC LIMIT 1 ;`;
                break;
            case HTC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${HTC_Heco} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
            
            case ETHC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${ETHC_Heco} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
            
            case HC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id="${chain_id}" AND coin_id=${HC_Heco} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
        }
    }
    else if(chain_id === ETH){
        switch (coin_id){
            case OC_ETH:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${OC_ETH} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
            
            case HTC_ETH:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${HTC_ETH} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
            
            case ETHC_ETH:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${ETHC_ETH} ORDER BY created_at ASC LIMIT 1 ; `; 
                break;
        }
    }
    else{
        console.log("unsupported chain");
    }
    let resp = await connect.query(sql);
    console.log(sql);
    return resp[0];   
}

// 최초 판매신청 확인 후 30분이 지난 데이터를 조회하는 쿼리문.
async function select_final_list(connect, coin_id, chain_id){
    let sql = '';
    if (chain_id === SOL){
        switch (coin_id){
            case SOL_NIA:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${SOL_NIA} AND updated_at < DATE_SUB(DATE_ADD(now(), INTERVAL 9 HOUR), INTERVAL 30 MINUTE) ORDER BY created_at ASC LIMIT 1  ;`; 
                break;
            
            case SOL_Upay:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id= ${SOL_Upay} AND updated_at < DATE_SUB(DATE_ADD(now(), INTERVAL 9 HOUR), INTERVAL 30 MINUTE) ORDER BY created_at ASC LIMIT 1 ;`;
                break;
            
        }
    }
    else if(chain_id === HECO){
        switch(coin_id){
            case OC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status = 2 AND mainnet_id = ${chain_id} AND coin_id = ${OC_Heco} AND updated_at < DATE_SUB(DATE_ADD(now(), INTERVAL 9 HOUR), INTERVAL 30 MINUTE) ORDER BY created_at ASC LIMIT 1 ;`;
                break;
            case HTC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${HTC_Heco} AND updated_at < DATE_SUB(DATE_ADD(now(), INTERVAL 9 HOUR), INTERVAL 30 MINUTE) ORDER BY created_at ASC LIMIT 1 ;`;
            
            case ETHC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${ETHC_Heco} AND updated_at < DATE_SUB(DATE_ADD(now(), INTERVAL 9 HOUR), INTERVAL 30 MINUTE) ORDER BY created_at ASC LIMIT 1 ;`;
                break;
            
            case HC_Heco:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id="${chain_id}" AND coin_id=${HC_Heco} AND updated_at < DATE_SUB(DATE_ADD(now(), INTERVAL 9 HOUR), INTERVAL 30 MINUTE) ORDER BY created_at ASC LIMIT 1 ;`; 
                break;
        }
    }
    else if(chain_id === ETH){
        switch (coin_id){
            case OC_ETH:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${OC_ETH} AND updated_at < DATE_SUB(DATE_ADD(now(), INTERVAL 9 HOUR), INTERVAL 30 MINUTE) ORDER BY created_at ASC LIMIT 1 ;`; 
                break;
            
            case HTC_ETH:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${HTC_ETH} AND updated_at < DATE_SUB(DATE_ADD(now(), INTERVAL 9 HOUR), INTERVAL 30 MINUTE) ORDER BY created_at ASC LIMIT 1 ;`; 
                break;
            
            case ETHC_ETH:
                sql = `SELECT * FROM user_coin_sell_list where status=2 AND mainnet_id=${chain_id} AND coin_id=${ETHC_ETH} AND updated_at < DATE_SUB(DATE_ADD(now(), INTERVAL 9 HOUR), INTERVAL 30 MINUTE) ORDER BY created_at ASC LIMIT 1 ;`; 
                break;
        }
    }
    else{
        console.log("unsupported chain");
    }
    let resp = await connect.query(sql);
    console.log(sql);
    return resp[0];   
}

// async function select_err_list(connect, coin_id, chain_id){

// }

// async function select_fee_table(coin_id, chain_id, connect){
//     let sql = '';
//     if (chain_id === SOL){
//         switch (coin_id){
//             case SOL_sol:
//                 sql = `SELECT * FROM manage_company_coin_fees where mainnet_id="${chain_id}" AND coin_id="${SOL_sol}" AND wallet_address="${wallet_add}" ;`;
//                 break;
            
//             case SOL_Upay:
//                 sql = `SELECT * FROM manage_company_coin_fees where mainnet_id="${chain_id}" AND coin_id= "${SOL_Upay}" AND wallet_address="${wallet_add}" ;`;
//                 break;
            
//         }
//     }
//     else if(chain_id === HECO){
//         switch(coin_id){
//             case OC_Heco:
//                 sql = `SELECT * FROM manage_company_coin_fees where mainnet_id = "${chain_id}" AND coin_id = "${OC_Heco}" AND wallet_address="${wallet_add}" ;`;
//                 break;
//             case HTC_Heco:
//                 sql = `SELECT * FROM manage_company_coin_fees where mainnet_id="${chain_id}" AND coin_id="${HTC_Heco}" AND wallet_address="${wallet_add}" ; `; 
//                 break;
            
//             case ETHC_Heco:
//                 sql = `SELECT * FROM manage_company_coin_fees where mainnet_id="${chain_id}" AND coin_id="${ETHC_Heco}" AND wallet_address="${wallet_add}" ; `; 
//                 break;
            
//             case HC_Heco:
//                 sql = `SELECT * FROM manage_company_coin_fees where mainnet_id="${chain_id}" AND coin_id="${HC_Heco}" AND wallet_address="${wallet_add}" ; `; 
//                 break;
//         }
//     }
//     else if(chain_id === ETH){
//         switch (coin_id){
//             case OC_ETH:
//                 sql = `SELECT * FROM manage_company_coin_fees where mainnet_id="${chain_id}" AND coin_id="${OC_ETH}" AND wallet_address="${wallet_add}" ; `; 
//                 break;
            
//             case HTC_ETH:
//                 sql = `SELECT * FROM manage_company_coin_fees where mainnet_id="${chain_id}" AND coin_id="${HTC_ETH}" AND wallet_address="${wallet_add}" ; `; 
//                 break;
                
//             case ETHC_ETH:
//                 sql = `SELECT * FROM manage_company_coin_fees where mainnet_id="${chain_id}" AND coin_id="${ETHC_ETH}" AND wallet_address="${wallet_add}" ; `; 
//                 break;
//         }
//     }
//     else{
//         console.log("unsupported chain");
//     }
//     let resp = await connect.query(sql);
//     return resp[0]; 
// }

// async function get_fee_table(chain_id, coin_id){
//     let connect = null;
//     let info = null;
//     try{
//         connect = await pool.getConnection(async conn => conn);
//         connect.beginTransaction();
//         info = await select_fee_table(coin_id, chain_id, connect);
//         await connect.commit();
//     }catch(e){
//         console.log(e);
//         await connect.rollback();
//     }finally{
//         if(connect){
//             connect.release();
//         }
//     }
//     return info;
// }

async function get_sig_list(coin_id, chain_id, wallet_add){
    let connect = null;
    let info = null;
    connect = await pool.getConnection(async conn => conn);
    try{
        await connect.beginTransaction();
        info = await all_sig_list(connect, coin_id, chain_id, wallet_add);
        await connect.commit();
    }catch(e){
        console.log(e);
        if (connect){
            await connect.rollback();
            console.log("Rollback");
        }
    }finally{
        if(connect){
            await connect.release();
        }
    }
    return info;
}

async function get_sell_list(coin_id, chain_id){
    let connect = null;
    let info = null;
    connect = await pool.getConnection(async conn => conn);
    try{
        await connect.beginTransaction();
        info = await select_sell_list(connect, coin_id, chain_id);
        await connect.commit();
    }catch(e){
        console.log(e);
        if (connect){
            await connect.rollback();
            console.log("Rollback");
        }
    }finally{
        if(connect){
            await connect.release();
        }
    }
    return info;
}

async function get_finding_list(coin_id, chain_id, except_id){
    let connect = null;
    let info = null;
    connect = await pool.getConnection(async conn => conn);
    try{
        connect.beginTransaction();
        info = await select_finding_list(connect, coin_id, chain_id, except_id);
        await connect.commit();
    }catch(e){
        console.log(e);
        if (connect){
            await connect.rollback();
            console.log("Rollback");
        }
    }finally{
        if(connect){
            await connect.release();
        }
    }
    return info;
}

async function get_final_list(coin_id, chain_id){
    let connect = null;
    let info = null;
    connect = await pool.getConnection(async conn => conn);
    try{
        await connect.beginTransaction();
        info = await select_final_list(connect, coin_id, chain_id);
        await connect.commit();
    }catch(e){
        console.log(e);
        if (connect){
            await connect.rollback();
            console.log("Rollback");
        }
    }finally{
        if(connect){
            await connect.release();
        }
    }
    return info;
}

async function get_checking_list(coin_id, chain_id){
    let connect = await pool.getConnection(async conn => conn);
    let info = "result";
    try{
        connect.beginTransaction();
        info = await select_checking_list(connect, coin_id, chain_id);
        await connect.commit();
    }catch(e){
        console.log(e);
        if (connect){
            await connect.rollback();
            console.log("Rollback");
        }
    }finally{
        if(connect){
            await connect.release();
        }
    }
    return info;
}

async function update_Table(id, tx_id, fail_reason, status){ // 3 = 입금 확인, 4 = 확인 실패
    let connect = null;
    let sql = '';
    switch (status) {
        case checking:
            sql = `UPDATE user_coin_sell_list SET status = 2, tx_id = "${tx_id}", fail_reason = "${fail_reason}", updated_at = DATE_ADD(NOW(), INTERVAL 9 HOUR) WHERE id = "${id}" AND status <> 3 AND status <> 7 ;`;
            break;

        case deposit_confirm:
            sql = `UPDATE user_coin_sell_list SET status = 3, tx_id = "${tx_id}", fail_reason = "${fail_reason}", updated_at = DATE_ADD(NOW(), INTERVAL 9 HOUR) WHERE id = "${id}" ;`;
            break;

        case verify_fail:
            sql = `UPDATE user_coin_sell_list SET status = 4, tx_id = " ", fail_reason = "${fail_reason}", updated_at = DATE_ADD(NOW(), INTERVAL 9 HOUR) WHERE id = "${id}" AND status <> 3 AND status <> 7 ;`;
            break;

        case SENDING_ERROR:
            sql = `UPDATE user_coin_sell_list SET status = 7, tx_id = "${tx_id}", fail_reason = "${fail_reason}", updated_at = DATE_ADD(NOW(), INTERVAL 9 HOUR) WHERE id = "${id}" ;`;
            break;
    }
    connect = await pool.getConnection(async conn => conn);
    try{
        await connect.beginTransaction();
        await connect.query(sql);
        await connect.commit();
    }catch(e){
        console.log(e);
        await connect.rollback();
    }
    finally{
        if(connect){
            await connect.release();
        }
    }
}

// async function update_fee_table(fee_balance, id){
//     let connect = null;
//     let sql = `update manage_company_coin_fees SET fees="${fee_balance}", updated_at = now() where id="${id}" ; `; // 수수료를 차감한 잔액으로 업데이트 해주는 sql문
//     try{
//         connect = await pool.getConnection(async conn => conn);
//         await connect.beginTransaction() // 트랜잭션 적용 시작
//         console.log("connect");
//         let response = await connect.query(sql);
        
//         await connect.commit();
//         console.log(response);
//     }catch(e){
//         console.log(e);
//         await connect.rollback();
//     }finally{
//         if(connect){
//             connect.release(); // connect 회수
//         }
//     }
// }

module.exports = {
    get_sell_list, update_Table, get_sig_list, get_finding_list, get_final_list, get_checking_list
}