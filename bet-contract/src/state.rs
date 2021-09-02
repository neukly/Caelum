use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{Addr,Coin};
use cw_storage_plus::{Item, Map};
use cw_controllers::Admin;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub enum Team {
    home,
    away,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub gamekey: u32,
    pub datetime: String,
    pub hometeam: String,
    pub awayteam: String,
    pub oracle: Addr,
}

#[derive(Serialize, Deserialize, PartialEq, Debug, Clone, JsonSchema)]
pub struct Data {
    pub host: Addr,
    pub team: Team,
    pub odds: i16,
    pub amount: Coin,
    pub match_amount: Coin,
    pub matcher: Option<Addr>,
}

pub const ADMIN: Admin = Admin::new("admin");
pub const STATE: Item<State> = Item::new("state");
pub const BETS: Map<Addr, Data> = Map::new("bets");
