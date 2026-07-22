# Glossary

The terms the kit defines, at the length a tooltip allows. Each has a longer
entry on the help page, reached through `components/help-links.ts`.

Read `patterns/04-inline-glossary.md` for when to use these. This file is what
to say.

## How to use an entry

The **title** is what the tooltip heads with. Give the local word and the English
one together where they differ, since people search for the word they saw.

The **definition** is one or two sentences. Not the whole truth: the truth that
helps at that moment, with the rest a tap away.

Adapt the wording to the product's voice. Do not adapt the meaning.

## Terms

**Recovery phrase** (`recoveryPhrase`)
A list of ordinary words, generated once, that rebuilds your wallet on any
device. It is the wallet, which is why it is written on paper and never typed
into anything you did not open yourself.

**Self-custody** (`selfCustody`)
Holding your own funds instead of a company holding them for you. Nobody can
freeze them, and nobody can recover them for you either.

**Connecting a wallet** (`connectingAWallet`)
Letting an app see your address and ask you to approve transactions. It cannot
move anything on its own, and it never sees your recovery phrase.

**Token approval** (`tokenApproval`)
Permission for a contract to move a token on your behalf. It stays active until
revoked, including for apps you stopped using.

**Revoking access** (`revokingAccess`)
Cancelling a permission you granted earlier. It is a transaction of its own, so
it costs a fee and cannot be undone.

**Irreversible transactions** (`irreversible`)
Once confirmed, nothing undoes it. No chargeback, no reversal, no support queue.
The check before you confirm is the only check there is.

**Network fee, also called gas** (`networkFee`)
A small amount paid to the computers that process your transaction. On Solana it
is usually a fraction of a cent, and it is always paid in SOL even when you are
sending something else.

**Validators** (`validators`)
The computers that check transactions and agree on the order they happened in,
run by thousands of independent operators. The network fee is what pays them.

**SOL and USDC** (`solAndUsdc`)
SOL is the network's own token, needed for fees whatever else you hold. USDC is
a stablecoin, designed to stay worth about one US dollar.

**Destination address** (`destinationAddress`)
The string identifying where funds go. A mistyped address is usually still a
valid address belonging to someone else, so the transaction succeeds and the
money is gone.

**Swap** (`swap`)
Exchanging one token for another directly, with no account and no counterparty
waiting to accept.

**Slippage** (`slippage`)
The largest difference you accept between the price shown and the price you get.
Prices move while a transaction is processed, and this is the most you are
willing to lose to that movement.

**Price impact** (`priceImpact`)
How much your own trade moves the price of what you are trading. Caused by you,
unlike slippage, which is caused by everyone else.

**Staking** (`staking`)
Locking SOL to help secure the network in exchange for a reward. The tokens stay
yours and stop being immediately spendable.

**Liquidity** (`liquidity`)
Tokens deposited into a pool so others can trade against them. You earn a share
of the fees, and what you withdraw later can be a different mix than you put in.

**Bridging** (`bridging`)
Moving value from one blockchain to another. The tokens do not travel: they are
locked on one side and issued on the other.

**DeFi** (`defi`)
Financial services run by published code rather than by a company. Nobody
approves you, and nobody reverses your mistakes.

**KYC** (`kyc`)
Confirming who you are with an identity document, usually required by law before
withdrawals. Normally handled by a specialist provider rather than the product
itself.

## Adding a term

Three tests before writing one.

**Does it appear in this product?** Take terms from its screens, not from a list
of crypto words. A glossary of things the user will never see is noise.

**Would a first-time user know it?** If the team has to think about it, they
would not.

**Does the definition contain another term they would not know?** That is the
failure this kit made once, defining a network fee in terms of validators. Check
every definition against itself.

A new term also needs an entry on the help page and a topic in `help-links.ts`,
or its "learn more" link goes nowhere. Topics are named constants, so a missing
one breaks the build rather than shipping a dead link.
