# Custody paths

Three ways a user ends up with a wallet. Read this before proposing anything in
the entry flow, because two of the three leave the kit part way through and
proposing a screen for a stretch somebody else owns wastes the user's time.

| Path | Who owns the steps | What the kit covers |
|---|---|---|
| Create with a recovery phrase | The product | All of it |
| Create with a social login | A third party provider | The fork, then nothing until the wallet exists |
| Import an existing phrase | The product | All of it |

## Create with a recovery phrase

The kit's `SeedPhraseFlow`: the custody fork, the stakes, the phrase behind a
deliberate press, and the confirmation that it was written down. Nothing here
depends on an outside service, so the whole path is ours to design.

## Create with a social login

"Continue with Google", and the same for Apple, email or a passkey. This is not a
hypothetical convenience, it is a product category: embedded wallet providers
hold or split the key material so the user never sees a phrase. Privy, Web3Auth,
Dynamic, Turnkey and Magic are examples; each product picks its own, and the list
here is illustrative rather than a recommendation.

**Where the kit stops.** The moment the user picks this option, the provider's
SDK owns the sequence: the OAuth window, the account creation, whatever recovery
factors the provider sets up. Those screens are not ours, they are not
customisable in the ways ours are, and the kit must not draw them.

Two consequences the skill has to hold on to:

1. **Do not propose seed phrase education on this path.** There is no phrase to
   write down. Suggesting one means the product either shows a screen about
   nothing or, worse, invents a phrase to satisfy the pattern.
2. **The kit picks up again once the wallet exists.** The post-onboarding welcome
   applies exactly as it does to the other paths, and it matters more here: this
   user has been through the least explanation, so they arrive with the least
   idea of what they now have.

There is also a question worth raising with the developer rather than answering
for them: if the provider offers an export-the-phrase escape hatch later, that
export is a critical action and needs the confirmation for one, since from that
moment the user is responsible for a phrase nobody warned them about.

## Import an existing phrase

The kit's `SeedPhraseImportFlow`. A large share of arrivals already have a
wallet, and a product that only offers "create" tells them they are in the wrong
place.

This is the screen an attacker most wants to imitate, because a page that looks
like it is the entire attack. So it states that the phrase never leaves the
device and that no support agent will ever ask for it. That sentence is worth
more than it looks: a user who reads it here has a chance of noticing its absence
on the fake version.

Length is checked, spelling is not. Only the wallet can say whether a phrase is
valid, and a component that guesses will reject correct phrases in wordlists it
does not know about.

## What to ask before proposing anything here

- Does the product create wallets, import them, or both? Offering only one is a
  decision, and often an accidental one.
- If it offers a social login, which provider? That determines where the kit's
  screens stop.
- Can a social user later export a phrase? If so, that export needs a critical
  confirmation.
