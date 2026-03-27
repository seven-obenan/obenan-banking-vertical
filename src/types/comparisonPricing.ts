/**
 * Canonical type contract for Obenan vs Kaydet vs Manual comparison section.
 * 
 * PATCH LOG (v2 — addresses pre-approval review findings):
 * [P1-1] ComparisonPricingPack now includes metadata, proof_bullets, disclaimer, formula_notes
 * [P1-2] PricingOutputs expanded with scenario_id, next_month_billable_*, next_month_fee_eur_preview
 * [P1-3] PricingInputs adds optional active_locations_next_month (defaults to active_locations)
 * [P2-4] Prefix normalization utility exported (ensureClaimPrefix)
 * [P2-5] ComparisonRow gains per-cell status fields; row-level status = highest uncertainty
 * [P2-6] proof_bullets canonical count = 5 (matches payload)
 * [P2-7] AbsoluteWordingPolicy type enforces stricter guardrail
 */

// ── Claim & Status ──────────────────────────────────────────────────────────

export type ClaimStatus = "Verified" | "Modeled" | "Strategic";

/**
 * Confidence hierarchy (ascending uncertainty):
 *   Verified < Modeled < Strategic
 * Row-level `status` = highest uncertainty among its three cell statuses.
 */
const STATUS_RANK: Record<ClaimStatus, number> = {
  Verified: 0,
  Modeled: 1,
  Strategic: 2,
};

export function highestUncertainty(...statuses: ClaimStatus[]): ClaimStatus {
  let max: ClaimStatus = "Verified";
  for (const s of statuses) {
    if (STATUS_RANK[s] > STATUS_RANK[max]) max = s;
  }
  return max;
}

// ── Prefix Normalization (P2-4) ─────────────────────────────────────────────

const CLAIM_PREFIXES: Record<ClaimStatus, string> = {
  Verified: "",
  Modeled: "Modeled estimate:",
  Strategic: "Strategic capability:",
};

/**
 * Prepend claim-status prefix only if the text doesn't already start with it.
 * Returns unmodified text for Verified status.
 */
export function ensureClaimPrefix(text: string, status: ClaimStatus): string {
  const prefix = CLAIM_PREFIXES[status];
  if (!prefix) return text;
  if (text.startsWith(prefix)) return text;
  return `${prefix} ${text}`;
}

// ── Comparison Row (P2-5: per-cell status, bilingual + headline) ─────────────

export type ComparisonRow = {
  category: string;
  metric: string;
  obenan: string;
  kaydet: string;
  manual: string;
  winner: "Obenan" | "Kaydet" | "Manual" | "Depends";
  /** Row-level status = highest uncertainty among obenan/kaydet/manual cells */
  status: ClaimStatus;
  /** Per-cell confidence levels */
  obenan_status: ClaimStatus;
  kaydet_status: ClaimStatus;
  manual_status: ClaimStatus;
  proof_note: string;
  /** Turkish translations */
  category_tr?: string;
  metric_tr?: string;
  obenan_tr?: string;
  kaydet_tr?: string;
  manual_tr?: string;
  proof_note_tr?: string;
  /** Short 1-line headlines for scanability */
  obenan_headline?: string;
  kaydet_headline?: string;
  manual_headline?: string;
  obenan_headline_tr?: string;
  kaydet_headline_tr?: string;
  manual_headline_tr?: string;
  /** Whether this row should render a logo strip in the Obenan cell */
  has_logo_strip?: "directory" | "oem";
  /** Business impact summary per row */
  business_impact?: string;
  business_impact_tr?: string;
};

// ── Pricing (P1-2, P1-3) ───────────────────────────────────────────────────

export type PricingInputs = {
  price_per_location_eur: 8.5;
  cap_locations: 6500;
  eur_try_helper_rate: number;
  active_locations: number;
  new_locations_added_this_month: number;
  /**
   * P1-3 fix: explicit next-month assumption.
   * Defaults to active_locations when omitted.
   * UI should state: "assumes current portfolio size unless changed."
   */
  active_locations_next_month?: number;
};

export type PricingOutputs = {
  scenario_id?: string;
  active_locations: number;
  new_locations_added_this_month: number;
  billable_locations_this_month: number;
  effective_monthly_fee_eur: number;
  helper_monthly_fee_try: number;
  cap_applied: boolean;
  next_month_new_location_credit_count: number;
  /** Before cap is applied */
  next_month_billable_after_credit_before_cap: number;
  /** After cap is applied */
  next_month_billable_after_credit_and_cap: number;
  next_month_fee_eur_preview: number;
};

// ── Manual Baseline ─────────────────────────────────────────────────────────

export type WorkloadBand = "low" | "base" | "high";

export type ManualBaselineInputs = {
  active_locations: number;
  band: WorkloadBand;
  hourly_rate_eur: number;
  eur_try_helper_rate: number;
};

export type ManualBaselineOutputs = {
  portfolio_units: number;
  direct_hours: number;
  effective_hours: number;
  labor_cost_monthly_eur: number;
  fixed_tooling_eur: number;
  total_cost_monthly_eur: number;
  total_cost_annual_eur: number;
  total_cost_monthly_try: number;
};

// ── Pack Root (P1-1: aligned with payload) ──────────────────────────────────

export type PackMetadata = {
  pack_id: string;
  created_at_utc: string;
  owner: string;
  currency_policy: string;
};

export type PackDisclaimer = {
  competition: string;
  currency: string;
};

export type AbsoluteWordingPolicy = {
  /**
   * P2-7: No absolute wording ("always", "never", "guaranteed") in any
   * competitive copy, regardless of claim status, unless backed by
   * independently verified evidence AND approved by legal/commercial owner.
   */
  rule: "no-absolutes-in-competitive-copy";
  allowed_exception: "independently-verified-and-legal-approved";
};

export type ComparisonPricingPack = {
  metadata: PackMetadata;
  positioning: {
    claim_style: "Evidence-led assertive";
    framing: "Obenan-first";
    narrative_order: "Core governance -> Advanced AI -> Cost and ROI";
    absolute_wording_policy: AbsoluteWordingPolicy;
  };
  pricing: PricingInputs & {
    formula_notes: string[];
  };
  pricing_output_examples: PricingOutputs[];
  rows: ComparisonRow[];
  /** P2-6: canonical count = 5 */
  proof_bullets: string[];
  cta_copy: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  disclaimer: PackDisclaimer;
};
