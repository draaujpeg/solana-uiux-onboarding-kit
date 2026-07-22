# Help and glossary

Every word on this page turned up in a real product, unexplained, in front of
someone who had just arrived. That is the whole reason the page exists.

Nothing here assumes you know anything about crypto. Read the entry you came for
and leave; you are not expected to read the page.

The components in this kit link into these entries, so a definition is always one
tap from the screen that used the word.

## Your wallet

### Recovery phrase

A list of ordinary words, given to you once, that can rebuild your wallet on any
device.

It is not a password, and this is the part that surprises people: a password
protects an account that exists somewhere, and can be reset by whoever runs that
somewhere. A recovery phrase has no somewhere. Whoever has the words has the
wallet, and nobody can issue you new ones.

So: write them on paper, in order, and keep the paper. Do not photograph them, do
not put them in notes or a chat, and never type them into a page you did not open
yourself. No support agent, from any company, will ever ask you for them. Anyone
who does is stealing.

Some wallets call it a seed phrase or a secret phrase. Same thing. Twelve words
is common, twenty four is normal too.

### Self-custody

Holding your own funds, rather than a company holding them for you.

An exchange account is custody by somebody else: they hold the coins, you hold a
login, and they can freeze, block or return access. A self-custody wallet is the
opposite. Nobody can freeze it, nobody can take it, and nobody can recover it for
you.

Both are legitimate. They are different trades, and the entire point is knowing
which one you are making.

### Connecting a wallet

Letting an app see your wallet address and ask you to approve transactions.

Connecting does not give the app your funds and does not give it your recovery
phrase. It cannot move anything by itself: every action still comes back to you
as a request you approve or reject.

Disconnecting is usually simple, but check whether reconnecting will need your
recovery phrase. When it does, treat disconnecting as a serious action.

### Token approval

Permission you give a contract to move a specific token on your behalf.

Some apps ask for approval of an unlimited amount, which is convenient and means
the permission has no ceiling and no end date. A limited approval, for roughly
what you are about to trade, does the same job with a smaller blast radius.

Approvals stay active until revoked, including approvals you granted to an app
you stopped using years ago.

### Revoking access

Cancelling a permission you granted earlier.

Worth doing periodically, and worth doing immediately if an app you approved turns
out to be malicious. Revoking is itself a transaction, so it costs a network fee
and cannot be undone: granting the permission again means approving again.

## Moving money

### Transactions are irreversible

Once a transaction is confirmed on Solana, nothing undoes it. There is no
chargeback, no support queue, no reversal.

This is not a limitation someone forgot to fix. It is how the network reaches
agreement without anyone in charge. It does mean the check before you press
confirm is the only check there is.

### Network fee, also called gas

A small amount paid to the computers that process your transaction.

On Solana it is usually a fraction of a cent, which is why it rarely comes up in
conversation and often surprises people at the worst moment: the fee is always
paid in SOL, even when you are sending something else. A wallet holding only
USDC cannot send that USDC.

### Validators

The computers that check transactions and agree on the order they happened in.

They are run by thousands of independent operators, not by one company, and the
network fee is what pays them. You never interact with a validator directly.

### SOL and USDC

SOL is the network's own token. You need a little of it for fees, whatever else
you hold.

USDC is a stablecoin, designed to stay worth about one US dollar. People use it
to hold value without riding the price swings of other tokens.

### The destination address

The long string of letters and numbers identifying where funds go.

Every character matters, and a mistyped address is usually still a valid address,
belonging to nobody or to a stranger. The transaction will succeed, and the money
will be gone.

Always copy and paste. Then check the first and last few characters against the
source, because malware that swaps the clipboard contents for an attacker's
address is a common and effective attack.

## Trading

### Swap

Exchanging one token for another, directly, without an account or an order book.

You pick what to give and what to get, approve the transaction in your wallet,
and both sides settle at once. There is no counterparty waiting to accept.

### Slippage

The difference between the price you were shown and the price you actually get.

Prices move while your transaction is being processed. Your slippage tolerance is
the most you are willing to lose to that movement. Set it to 1% and a swap that
would land more than 1% worse is cancelled instead.

The price can move either way. If it moves in your favour you simply get more, so
the tolerance is a floor, not a range. Between 0.1% and 1% suits most swaps. Much
higher and you are agreeing to accept a considerably worse deal without being
asked again.

### Price impact

How much your own trade moves the price of the thing you are trading.

Small trades barely register. A large trade in a small pool has to keep buying at
steadily worse prices to fill, and the impact is that difference. It is caused by
you, unlike slippage, which is caused by everyone else.

## Earning

### Staking

Locking SOL to help secure the network, in exchange for a reward.

Your tokens remain yours. They stop being immediately spendable, and getting them
back can take a few days depending on how you staked, which matters more than the
reward rate if you might need them.

### Liquidity

Tokens deposited into a pool so that other people can trade against them.

You earn a share of the trading fees. In exchange your deposit is exposed to how
the two tokens move against each other, and withdrawing it later can return a
different mix than you put in, worth more or less. Providing liquidity is an
investment decision, not a savings account.

### Bridging

Moving value from one blockchain to another.

The tokens do not literally travel. They are locked on one side and issued on the
other, which is why bridges have been a frequent target for attacks. Prefer
well-established ones, and treat a bridge transaction as irreversible like any
other.

### DeFi

Financial services run by published code rather than by a company: trading,
lending, earning.

Nobody approves you and nobody can freeze you, which is the appeal. Nobody
reverses your mistakes either, which is the cost.

## Identity checks

### KYC

Know Your Customer: confirming who you are with an identity document, usually a
legal requirement before a product lets you withdraw or transfer.

Expect a photo ID and a selfie. Verification is normally handled by a specialist
provider, not by the product itself, which is why rejections often arrive without
much detail: the product may not have been told which check failed.

If yours is rejected, the usual causes are a blurry or cropped photo, glare, an
expired document, or a selfie where your face is partly hidden. Retake the photo
flat, in good light, with nothing covering your face.

## Common questions

### How do I get SOL?

Three routes, roughly in order of how common they are.

Buy it on an exchange and withdraw it to your wallet address. Buy it inside a
wallet that offers card purchases, which is faster and usually costs more. Or
receive it from someone who already has some.

Whichever you pick, you only need a small amount for fees. Availability, limits
and payment methods vary by country, so check what your exchange supports before
committing to a route.

### How do I copy an address correctly?

Use the copy button wherever one exists, rather than selecting the text by hand.

Then, before confirming, compare the first four and last four characters against
where you copied them from. That takes two seconds and catches both a truncated
paste and clipboard-swapping malware.

Never retype an address from a photograph or a screenshot.

### Why does the app warn me about high slippage?

Because a high tolerance is a promise you make in advance.

At 5%, you have agreed to accept up to 5% less than the amount on screen, without
being asked again. On a large swap that is real money, and on a thinly traded
token it is an opening for someone to take the difference deliberately.

Raise the tolerance when a swap keeps failing and you understand what you are
accepting. Lower it back afterwards.
