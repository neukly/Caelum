# Importing

In [Publishing](./Publishing.md), we discussed how you can publish your contract to the world.
This looks at the flip-side, how can you use someone else's contract (which is the same
question as how they will use your contract). Let's go through the various stages.

## Verifying Artifacts

Deployed byte code can be verified using a shell script from [`cosmwasm-verify`](https://github.com/CosmWasm/cosmwasm-verify/blob/master/README.md)

## Reviewing

Once you have done the quick programatic checks, it is good to give at least a quick
look through the code. A glance at `examples/schema.rs` to make sure it is outputing
all relevant structs from `contract.rs`, and also ensure `src/lib.rs` is just the
default wrapper (nothing funny going on there). After this point, we can dive into
the contract code itself. Check the flows for the execute methods, any invariants and
permission checks that should be there, and a reasonable data storage format.

## Decentralized Verification

It is impractical to self-verify all aspects and dependencies of a project. [Crev](https://github.com/crev-dev/cargo-crev/blob/master/cargo-crev/README.md)
provides `A cryptographically verifiable code review system for the cargo (Rust) package manager`.

Follow their [getting started guide](https://github.com/crev-dev/cargo-crev/blob/master/cargo-crev/src/doc/getting_started.md)

Once you have made your own *proof repository* with at least one *trust proof*,
please make a PR to the [`cawesome-wasm`]() repo with a link to your repo and
some public name or pseudonym that people know you by. This allows people who trust you
to also reuse your proofs.

There is a [standard list of proof repos](https://github.com/crev-dev/cargo-crev/wiki/List-of-Proof-Repositories)
with some strong rust developers in there. This may cover dependencies like `serde` and `snafu`
but will not hit any CosmWasm-related modules, so we look to bootstrap a very focused
review community.
