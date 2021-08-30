# P2P Sports Betting

This contract is developed in Rust to run on Terra's blockchain and facilitate
peer to peer betting on sporting events.

## Contract Overview

The contract allows peers to trustlessly bet on the outcome of sporting event,
without the need (or cost) of a broker.

### InstantiateMsg()

Matchups must be added by the contract administrator, because a reliable `oracle`
must be designated to publish the outcomes. Adding a matchup creates a new
instance of the contract, and all bets are tracked in the contract data.

### ExecuteMsg()

Anyone can propose a wager at self-set odds for one of the teams in the matchup.
Wagered funds are deposited to the contract escrow. A proposed bet can be
cancelled, until another party has matched the other side of the bet.

For an MVP, we only implement complete matching on moneyline wagers. Meaning one
party must supply all of the capital needed to meet the payout requirements of
the proposed wager. A moneyline wager is the simplest for of a sports bet, only
considering the final outcome of the game.

In future development, we can implement partial matching, with multiple parties
matching a proposed wager. This will be advantageous for large wager amounts to
match with smaller amounts.

When the oracle publishes final results, the contract will settle up and payout
the winning parties.

### QueryMsg()

Several functions are implemented to query the contract state. No queries alter
contract data.

## Setup

After generating, you have a initialized local git repo, but no commits, and no remote.
Go to a server (eg. github) and create a new upstream repo (called `YOUR-GIT-URL` below).
Then run the following:

```sh
# this is needed to create a valid Cargo.lock file (see below)
cargo check
git branch -M main
git add .
git commit -m 'Initial Commit'
git remote add origin YOUR-GIT-URL
git push -u origin master
```

## Using your project

Once you have your custom repo, you should check out [Developing](./Developing.md) to explain
more on how to run tests and develop code. Or go through the
[online tutorial](https://docs.cosmwasm.com/) to get a better feel
of how to develop.

[Publishing](./Publishing.md) contains useful information on how to publish your contract
to the world, once you are ready to deploy it on a running blockchain. And
[Importing](./Importing.md) contains information about pulling in other contracts or crates
that have been published.

Please replace this README file with information about your specific project. You can keep
the `Developing.md` and `Publishing.md` files as useful referenced, but please set some
proper description in the README.

## Gitpod integration

[Gitpod](https://www.gitpod.io/) container-based development platform will be enabled on your project by default.
Follow [Gitpod Getting Started](https://www.gitpod.io/docs/getting-started) launch your workspace.
