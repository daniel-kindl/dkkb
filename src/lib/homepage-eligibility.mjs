// Shared homepage-eligibility rule. Authored as plain JS with JSDoc types so both
// the validation scripts and the Astro/Vite-built site can import it without a build
// step. See docs/adr/0001-plain-js-for-shared-content-rules.md.

/**
 * Decide whether a content entry can appear on the homepage.
 *
 * An entry is eligible only when its type is not `index`, its status is `reviewed`
 * or `stable`, and `sidebar.hidden` is not `true`. The returned `violations` list
 * names every failed condition.
 *
 * @param {{ type: string, status: string, sidebar?: { hidden?: boolean } }} data
 * @returns {{ eligible: boolean, violations: Array<'type' | 'status' | 'hidden'> }}
 */
export function checkHomepageEligibility(data) {
  /** @type {Array<'type' | 'status' | 'hidden'>} */
  const violations = [];
  if (data?.type === 'index') violations.push('type');
  if (!['reviewed', 'stable'].includes(data?.status)) violations.push('status');
  if (data?.sidebar?.hidden === true) violations.push('hidden');
  return { eligible: violations.length === 0, violations };
}

/**
 * @param {{ type: string, status: string, sidebar?: { hidden?: boolean } }} data
 * @returns {boolean}
 */
export const isHomepageEligible = (data) => checkHomepageEligibility(data).eligible;
