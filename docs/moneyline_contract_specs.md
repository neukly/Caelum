# Moneyline Contract Specs

A "moneyline" wager is one of the simplest bets one can make on a sports event. A moneyline bet is 
determined solely by the win or loss outcome of a game. 

Here, we describe a p2p betting protocol with no bookie fees ("juice"), decentralized oddsmaking, 
and execution based on an oracle data feed. 

## Oddsmaking

The preceived advantage of the favorite team over the underdog is reflected in the `odds` of a bet. 
A wager on the favorite team with odds of -150 will pay out $100, with $150 at risk. If the underdog
odds are +150, a bet on the underdog would pay out $150, with $100 at risk.

Centralized bookies employ oddsmakers to set these odds, with the goal of attracting equal money to 
both sides of the wager. This minimizes risk and maximizes bookie profits, regardless of the outcome 
of the game. Bookie fees ("juice") are built into unbalanced odds (i.e. -150 to +130). 

Our decentralized solution allows anyone to be their own bookie and set their own odds. If the 
proposed odds are fair, then another party can take the other side of the bet. To discourage 
spamming the protocol with proposed wagers with unfair odds, a small fee may be included to propose 
a wager. Likewise, this would encourage parties to match proposed wagers with no fees, before 
proposing one themselves.

## Matching Requirements

We intend for each bet to be solely peer-to-peer, meaning no fees are built into the odds and no 
losses for the bookie can be tolerated. Odds on a wager must be equal and opposite (i.e. -150 to 
+150) and matching capital must be supplied by a second party before a wager will be executed.

Consider a matchup between the Saints and Falcons with general odds of -150 to +150 in the Saints 
favor. Bob wishes to wager $300. If no proposed bets with these odds exist, he will post one to the 
protocol. Bob must escrow the $300 in the contract while the bet is pending. Bob's payout will be $200, so that capital needs to be matched by the other side of the bet. Alice wishes to take the other 
side of the bet, and supplies $200 on the Falcons. Her payout will be $300 from the favorite pool. 

Bet matching will be conducted manually from the UI frontend. Users should be able to see all 
proposed bets on a matchup, and match the bets with the most favorable odds for their team. If no
proposed bets with reasonable odds exist, they should consider posting one.

### Payout Amounts

For a proposed bet of a given amount on the favorite team `fav_wager`, the payout needed to be 
matched is:
```
fav_payout = ( 100 / | fav_odds | ) * fav_wager
```

Likewise for the underdog:
```
und_payout = ( ( 100 - und_odds ) / 100 ) * und_wager
```

Note that the protocol is designed such that:
```
fav_payout == und_wager and und_payout == fav_wager
```

### Cancelling Proposed Bets

A proposed bet, without matching capital, can be cancelled prior to the start of a game. At the start of the game, any proposed bets will be cancelled automatically. 

A bet is considered finalized once matching capital is supplied. At that point, the bet cannot be withdrawn and payouts will be executed at the end of the event, following confirmation by an oracle data feed. 

A bet can be partially matched, in which the matched balance is finalized, cannot be withdrawn, and a wager will execute on that amount, but the unmatched balance can be cancelled.

## Oracle Requirements

We will need to design an oracle to query one or more sports data feeds and write the results to the blockchain.

We will need to restrict betting to only allow events with a reliable and vetted data feed.
