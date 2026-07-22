/**
 * The wording shown whenever identity verification fails, in every place it can
 * fail. Both the block alert and the rejection screen read from here, so the two
 * cannot drift into telling the user different things.
 *
 * It says "may be", not "was", and that is the whole design.
 *
 * Verification is not run by the product. It is run by a provider, which decides
 * automatically, escalates the doubtful cases to its own reviewers, and returns
 * a verdict over a webhook. What comes back varies enormously: some providers
 * send structured reason codes, some send one word, some send nothing beyond a
 * rejection. A component that renders "your selfie did not match" is asserting
 * something the product often does not know, and a confident wrong reason sends
 * the user to fix the thing that was never broken.
 *
 * So the list is of plausible causes rather than findings, and it is the same
 * list every time. The user still gets direction, which is the point the
 * research raised: "document not accepted" with nothing else is what leaves
 * people resubmitting identical files until their attempts run out. Naming the
 * usual causes gives them somewhere to start without pretending to know which
 * one applies.
 *
 * If a product does have a provider that returns reliable specifics, pass them
 * in and say "was" instead. That is a better screen. It is just not one the kit
 * can assume.
 */

export const kycRejectionIntro =
  "We could not approve the documents you sent. It may be for one of these reasons:";

export const kycRejectionCauses = [
  "The photo is blurry, cropped, or has glare. Retake it flat, in good light.",
  "The document is expired, or is not a type we can accept.",
  "Some details on the document are not fully readable.",
  "The selfie does not clearly show your face, or does not match the document.",
];
