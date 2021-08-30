#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{Uint128, Coin};
use cosmwasm_std::{Deps, DepsMut, Env, Addr, MessageInfo};
use cosmwasm_std::{Response, StdResult, StdError};
use cosmwasm_std::{to_binary, Binary, Order};
use crate::error::ContractError;
use crate::msg::{InstantiateMsg, ExecuteMsg, QueryMsg};
use crate::msg::{AdminResponse, BetsResponse};
use crate::state::{STATE, BETS, ADMIN, State, Data};

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(mut deps: DepsMut, _env: Env, info: MessageInfo, msg: InstantiateMsg,)
-> Result<Response, ContractError> {
    // Instantiate a contract for a single matchup
    // Contract admin is the sender of this transaction
    // Oracle must be declared at instantiation
    // Anyone may propose bets after intantiation
    let checked = deps.api.addr_validate(&msg.oracle)?;

    let state = State {
        team1: msg.team1,
        team2: msg.team2,
        oracle: checked,
    };
    STATE.save(deps.storage, &state)?;
    ADMIN.set(deps.branch(), Some(info.sender.clone()))?;

    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("owner", info.sender))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(deps: DepsMut, _env: Env, info: MessageInfo, msg: ExecuteMsg)
-> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::ProposeBet { team, odds }
            => propose_bet(deps, info, team, odds),
        ExecuteMsg::TakeBet { host }
            => take_bet(deps, info, host),
        ExecuteMsg::SettleUp {}
            => settle_up(deps, info),
    }
}

pub fn propose_bet(deps: DepsMut, info: MessageInfo, team: String, odds: i16)
-> Result<Response, ContractError> {
    // Once a matchup contract is instantiated...
    // Anyone my propose a bet on a team,
    // For a wager amount,
    // At self-selected odds.
    // Only one proposal may exist per address

    // check that proposal does not exist
    let empty = BETS.load(deps.storage, info.sender.clone());
    match empty {
        Ok(_d) => return Err(ContractError::Unauthorized {}),
        Err(_e) => ()
    }

    // get funds attached to MSG
    let coins = info.funds.clone();
    match coins.clone().len() {
        0 => Err(ContractError::Nofunds {}),
        1 => Ok(coins.clone()),
        _ => Err(ContractError::Multiplefunds {}),
    };

    let data = Data {
        host: info.sender.clone(),
        team: team,
        odds: odds,
        amount: coins[0].clone(),
        match_amount: Coin {
            amount: get_match_amount(coins[0].clone().amount, &odds),
            denom: coins[0].clone().denom
        },
        matched_bet: None
    };
    BETS.save(deps.storage, data.host.clone(), &data)?;
    Ok(Response::new().add_attribute("method", "propose_bet"))
}

pub fn get_match_amount(wager: Uint128, &odds: &i16) -> Uint128 {
    let factor = {
        if odds < 0 { 100f64/odds.abs() as f64
        } else { (100-odds) as f64 /100f64
        }};
    Uint128::new((factor as f64 * wager.u128() as f64) as u128)
}

pub fn take_bet(deps: DepsMut, info: MessageInfo, host: String )
-> Result<Response, ContractError> {
    let checked = deps.api.addr_validate(&host)?;

    // fetch bet from host
    let data = BETS.load(deps.storage, checked.clone())?;

    // get funds attached to MSG
    let coins = info.funds.clone();
    match coins.clone().len() {
        0 => Err(ContractError::Nofunds {}),
        1 => Ok(coins.clone()),
        _ => Err(ContractError::Multiplefunds {}),
    };

    // reject if funds do not match wager
    if data.match_amount != coins[0] {
        return Err(ContractError::Unmatchedfunds {})
    }

    // prepare data struct
    let data = Data {
        host: checked.clone(),
        team: data.team,
        odds: data.odds,
        amount: data.amount.clone(),
        match_amount: Coin {
            amount: get_match_amount(data.amount.clone().amount, &data.odds),
            denom: data.amount.clone().denom
        },
        matched_bet: Some(info.sender.clone()),
    };
    // update BETS with matched_bet
    BETS.save(deps.storage, checked, &data)?;
    Ok(Response::new().add_attribute("method", "take_bet"))
    }

pub fn settle_up(deps: DepsMut, info: MessageInfo)
-> Result<Response, ContractError> {
    // placeholder function to settup up bets after matched_bet up is finalized
    // must be sent by oracle
    drop(deps);
    drop(info);
    Ok(Response::new().add_attribute("method", "settle_up"))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg ) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetBets {} => to_binary(&query_bets(deps)?),
        QueryMsg::GetAdmin {} => to_binary(&query_admin(deps)?),
    }
}

fn query_bets(deps: Deps) -> Result<BetsResponse, StdError> {
    let all: StdResult<Vec<_>> = BETS
        .range(deps.storage, None, None, Order::Ascending)
        .collect();
    let mut results: Vec<Data> = Vec::new();
    for (_key, data) in all? {
        results.push(data)
    };
    /*
    let res = match all {
        Ok(bets) => {
            let mut results: Vec<Data> = Vec::new();
            for (_key, data) in bets {
                results.push(data)
            };
            Some(results)
        },
        Err(e) => None
    };
    */
    return Ok(BetsResponse{ bets: results})


}
fn query_admin(deps: Deps ) -> Result<AdminResponse, StdError> {
    let administrator = ADMIN.get(deps)?;
    let admin = match administrator {
        Some(a) => a,
        None => return Ok(AdminResponse{admin: Addr::unchecked("")}),
    };
    Ok(AdminResponse{ admin: admin })
}

#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use cosmwasm_std::{coins, Coin, Addr};
    use cosmwasm_std::Uint128;
    use cosmwasm_std::from_binary;

    #[test]
    fn test_initialize() {
        let mut deps = mock_dependencies(&[]);
        let info = mock_info("creator", &coins(1000, "earth"));
        let msg = InstantiateMsg {
            team1: "Saints".to_string(),
            team2: "Falcons".to_string(),
            oracle: "Oracle Addr".to_string(),
        };
        let res = instantiate(deps.as_mut(), mock_env(), info, msg).unwrap();
        assert_eq!(0, res.messages.len());

        // query administrator
        let msg = QueryMsg::GetAdmin {};
        let res = query(deps.as_ref(), mock_env(), msg).unwrap();
        let value: AdminResponse = from_binary(&res).unwrap();
        assert_eq!(Addr::unchecked("creator"),value.admin);

        // query BETS
        let msg = QueryMsg::GetBets {};
        let res = query(deps.as_ref(), mock_env(), msg).unwrap();
        let value: BetsResponse = from_binary(&res).unwrap();
        let empty: Vec<Data> = Vec::new();
        assert_eq!(empty,value.bets);
    }

    #[test]
    fn test_propose() {
        let mut deps = mock_dependencies(&[]);
        test_initialize();

        // Propose a bet
        let info = mock_info("bob", &coins(300, "token".to_string()));
        let msg = ExecuteMsg::ProposeBet {
            team: "Saints".to_string(),
            odds: -150,
        };
        let _res = execute(deps.as_mut(), mock_env(), info, msg).unwrap();

        // Query BETS
        let msg = QueryMsg::GetBets {};
        let res = query(deps.as_ref(), mock_env(), msg).unwrap();
        let value: BetsResponse = from_binary(&res).unwrap();
        let test_data = Data {
            host: Addr::unchecked("bob"),
            team: "Saints".to_string(),
            odds: -150,
            amount: Coin{ amount: Uint128::new(300), denom: "token".to_string()},
            match_amount: Coin {
                amount: Uint128::new(200), // should be 150
                denom: "token".to_string()
            },
            matched_bet: None,
        };
        let mut test_vec: Vec<Data> = Vec::new();
        test_vec.push(test_data);
        assert_eq!(test_vec,value.bets);

    }

    #[test]
    fn take_bet() {
        let mut deps = mock_dependencies(&[]);
        test_initialize();

        // Propose a bet
        let info = mock_info("bob", &coins(300, "token".to_string()));
        let msg = ExecuteMsg::ProposeBet {
            team: "Saints".to_string(),
            odds: -150,
        };
        let _res = execute(deps.as_mut(), mock_env(), info, msg).unwrap();

        // Match bet
        let info = mock_info("alice", &coins(200, "token".to_string()));
        let msg = ExecuteMsg::TakeBet {
            host: "bob".to_string()
        };
        let _res = execute(deps.as_mut(), mock_env(), info, msg).unwrap();

        // Query BETS
        let msg = QueryMsg::GetBets {};
        let res = query(deps.as_ref(), mock_env(), msg).unwrap();
        let value: BetsResponse = from_binary(&res).unwrap();
        let test_data = Data {
            host: Addr::unchecked("bob"),
            team: "Saints".to_string(),
            odds: -150,
            amount: Coin{ amount: Uint128::new(300), denom: "token".to_string()},
            match_amount: Coin {
                amount: Uint128::new(200), // should be 150
                denom: "token".to_string()
            },
            matched_bet: Some(Addr::unchecked("alice")),
        };
        let mut test_vec: Vec<Data> = Vec::new();
        test_vec.push(test_data);
        assert_eq!(test_vec,value.bets);

    }

}
