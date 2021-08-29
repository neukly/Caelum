# Developing

If you have recently created a contract with this template, you probably could use some
help on how to build and test the contract, as well as prepare it for production. This
file attempts to provide a brief overview, assuming you have installed a recent
version of Rust already (eg. 1.51.0+).

## Commands Quick reference

```sh
# compile contract and run unit tests
cargo test

# intialize localterra (separate shell)
cd localterra && sudo docker-compose up

# setup test account
sudo terrad keys add test1 --recover

# Use this mnemonic:
# satisfy adjust timber high purchase tuition stool faith fine install that you unaware feed domain license impose boss human eager hat rent enjoy dawn

# set PASSWORD "terra"
# note ADDRESS1
# terra1dcegyrekltswvyy0xy69ydgxn9x8x32zdtapd8

# setup oracle
sudo terrad keys add oracle

#note ORACLE_ADDRESS: terra1fd0kaldhtlxpq624znwzqst98247q7wxuw6h29

# run rust-optimized cosmwasm compiler
sudo docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.11.4

# upload to localterra (from repo)
sudo terrad tx wasm store ./artifacts/sc101.wasm --from test1 --chain-id=localterra --gas=auto --fees=100000uluna --broadcast-mode=block

# Note CODE_ID (3)

# verify upload
terrad query wasm code CODE_ID

# instantiate contract
sudo terrad tx wasm instantiate CODE_ID '{"team1":"Saints","team2":"Falcons","oracle":"ORACLE_ADDR"}' --from test1 --chain-id=localterra --fees=10000uluna --gas=auto --broadcast-mode=block

# Note CONTRACT_ADDRESS
# terra1wgh6adn8geywx0v78zs9azrqtqdegufuegnwep

# verify instantiation
terrad query wasm contract CONTRACT_ADDRESS

# propose bet
sudo terrad tx wasm execute CONTRACTADDRESS '{"propose_bet":{"team":"Saints","amount":1000,"odds",-150}}' --from test1 --chain-id=localterra --fees=100000uluna --gas=auto --broadcast-mode=block

# query bets
terrad query wasm contract-store CONTRACTADDRESS '{"get_bets":{}}'
```

## Prerequisites

Install and check versions of rustup, rustc, cargo, and wasm32-unknown-unknown:

```sh
rustc --version
cargo --version
rustup target list --installed
# if wasm32 is not listed above, run this
rustup target add wasm32-unknown-unknown
```

## Compiling and running tests

Compile and run contract unit tests:
```sh
# this will produce a wasm build in ./target/wasm32-unknown-unknown/release/YOUR_NAME_HERE.wasm
cargo wasm

# this runs unit tests with helpful backtraces
RUST_BACKTRACE=1 cargo unit-test

# auto-generate json schema
cargo schema
```

### Understanding the tests

The main code is in `src/contract.rs` and the unit tests there run in pure rust,
which makes them very quick to execute and give nice output on failures, especially
if you do `RUST_BACKTRACE=1 cargo unit-test`.

## Generating JSON Schema

While the Wasm calls (`instantiate`, `execute`, `query`) accept JSON, this is not enough
information to use it. We need to expose the schema for the expected messages to the
clients. You can generate this schema by calling `cargo schema`, which will output
4 files in `./schema`, corresponding to the 3 message types the contract accepts,
as well as the internal `State`.

These files are in standard json-schema format, which should be usable by various
client side tools, either to auto-generate codecs, or just to validate incoming
json wrt. the defined schema.

## Preparing the Wasm bytecode for production

Use the cosmwasm optimized compiler to prepare contract for deployment:
```sh
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.11.4
```

This produces an `artifacts` directory with a `PROJECT_NAME.wasm`, as well as
`checksums.txt`, containing the Sha256 hash of the wasm file.
The wasm file is compiled deterministically (anyone else running the same
docker on the same git commit should get the identical file with the same Sha256 hash).
It is also stripped and minimized for upload to a blockchain (we will also
gzip it in the uploading process to make it even smaller).
