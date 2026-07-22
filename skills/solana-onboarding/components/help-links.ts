/**
 * Where the kit's "learn more" links point.
 *
 * Every explanation the components offer lives on one page, so a user who taps
 * through from a swap screen and a user who taps through from a KYC screen land
 * in the same vocabulary rather than two half-written help centres.
 *
 * Change HELP_BASE_URL to your own documentation if you have it. Keeping the
 * kit's page is fine too, and better than linking nowhere, which is what the
 * research found almost everywhere: help that exists, in another tab, on another
 * site, never at the moment the question appears.
 *
 * Topics are named rather than passed as strings so a renamed heading breaks the
 * build instead of shipping a link that quietly lands on the top of the page.
 */

export const HELP_BASE_URL =
  "https://matheus-draau.gitbook.io/solana-onboarding-kit/help";

export const helpTopics = {
  recoveryPhrase: "recovery-phrase",
  selfCustody: "self-custody",
  connectingAWallet: "connecting-a-wallet",
  tokenApproval: "token-approval",
  revokingAccess: "revoking-access",
  irreversible: "transactions-are-irreversible",
  networkFee: "network-fee-also-called-gas",
  validators: "validators",
  solAndUsdc: "sol-and-usdc",
  destinationAddress: "the-destination-address",
  swap: "swap",
  slippage: "slippage",
  priceImpact: "price-impact",
  staking: "staking",
  liquidity: "liquidity",
  bridging: "bridging",
  defi: "defi",
  kyc: "kyc",
  howToGetSol: "how-do-i-get-sol",
  howToCopyAnAddress: "how-do-i-copy-an-address-correctly",
  whyHighSlippageWarning: "why-does-the-app-warn-me-about-high-slippage",
} as const;

export type HelpTopic = keyof typeof helpTopics;

export function helpUrl(topic: HelpTopic): string {
  return `${HELP_BASE_URL}#${helpTopics[topic]}`;
}
