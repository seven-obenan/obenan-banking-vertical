/**
 * Deterministic pricing calculator using integer-cents math (P1-2).
 *
 * All EUR amounts are computed as integer cents (850 per location)
 * and only divided to EUR at display time, preventing floating-point drift.
 *
 * P1-3 fix: next-month preview explicitly defaults
 * active_locations_next_month = active_locations when not provided.
 */

import type { PricingInputs, PricingOutputs, ManualBaselineInputs, ManualBaselineOutputs, WorkloadBand } from "@/types/comparisonPricing";

// ── Constants ───────────────────────────────────────────────────────────────

const PRICE_PER_LOCATION_CENTS = 850; // EUR 8.50 in integer cents
const CAP_LOCATIONS = 6500;

// ── Obenan Pricing ──────────────────────────────────────────────────────────

export function calculatePricing(inputs: PricingInputs): PricingOutputs {
  const activeLocations = Math.max(Math.round(inputs.active_locations), 0);
  const newLocations = Math.max(Math.round(inputs.new_locations_added_this_month), 0);
  const fxRate = Math.max(inputs.eur_try_helper_rate, 0);

  // P1-3: explicit next-month assumption
  const activeNextMonth = Math.max(
    Math.round(inputs.active_locations_next_month ?? activeLocations),
    0
  );

  // Current month
  const billableThisMonth = Math.min(activeLocations, CAP_LOCATIONS);
  const feeCentsThisMonth = billableThisMonth * PRICE_PER_LOCATION_CENTS;
  const feeEurThisMonth = feeCentsThisMonth / 100;
  const feeTryThisMonth = feeEurThisMonth * fxRate;
  const capApplied = activeLocations >= CAP_LOCATIONS;

  // Next month preview (credit applied once)
  const nextMonthBeforeCap = Math.max(activeNextMonth - newLocations, 0);
  const nextMonthAfterCap = Math.min(nextMonthBeforeCap, CAP_LOCATIONS);
  const nextMonthFeeCents = nextMonthAfterCap * PRICE_PER_LOCATION_CENTS;
  const nextMonthFeeEur = nextMonthFeeCents / 100;

  return {
    active_locations: activeLocations,
    new_locations_added_this_month: newLocations,
    billable_locations_this_month: billableThisMonth,
    effective_monthly_fee_eur: feeEurThisMonth,
    helper_monthly_fee_try: feeTryThisMonth,
    cap_applied: capApplied,
    next_month_new_location_credit_count: newLocations,
    next_month_billable_after_credit_before_cap: nextMonthBeforeCap,
    next_month_billable_after_credit_and_cap: nextMonthAfterCap,
    next_month_fee_eur_preview: nextMonthFeeEur,
  };
}

// ── Manual Baseline ─────────────────────────────────────────────────────────

const WORKLOAD_BANDS: Record<WorkloadBand, {
  per100_direct_hours: number;
  overhead_ratio: number;
  fixed_tooling_eur: number;
}> = {
  low:  { per100_direct_hours: 52,  overhead_ratio: 0.15, fixed_tooling_eur: 900 },
  base: { per100_direct_hours: 76,  overhead_ratio: 0.20, fixed_tooling_eur: 1200 },
  high: { per100_direct_hours: 108, overhead_ratio: 0.25, fixed_tooling_eur: 1800 },
};

export function calculateManualBaseline(inputs: ManualBaselineInputs): ManualBaselineOutputs {
  const activeLocations = Math.max(Math.round(inputs.active_locations), 0);
  const band = WORKLOAD_BANDS[inputs.band];
  const hourlyRate = Math.max(inputs.hourly_rate_eur, 0);
  const fxRate = Math.max(inputs.eur_try_helper_rate, 0);

  const portfolioUnits = activeLocations / 100;
  const directHours = band.per100_direct_hours * portfolioUnits;
  const effectiveHours = directHours * (1 + band.overhead_ratio);

  // Use cents to avoid drift on labor
  const laborCentsMontly = Math.round(effectiveHours * hourlyRate * 100);
  const laborEurMonthly = laborCentsMontly / 100;
  const fixedTooling = band.fixed_tooling_eur;
  const totalMonthlyEur = laborEurMonthly + fixedTooling;

  return {
    portfolio_units: portfolioUnits,
    direct_hours: directHours,
    effective_hours: effectiveHours,
    labor_cost_monthly_eur: laborEurMonthly,
    fixed_tooling_eur: fixedTooling,
    total_cost_monthly_eur: totalMonthlyEur,
    total_cost_annual_eur: totalMonthlyEur * 12,
    total_cost_monthly_try: totalMonthlyEur * fxRate,
  };
}

// ── Formatting ──────────────────────────────────────────────────────────────

export function formatEur(value: number, locale: "tr" | "en" = "tr"): string {
  // Use consistent 2-decimal format for professional display
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatTry(value: number, locale: "tr" | "en" = "tr"): string {
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, locale: "tr" | "en" = "tr"): string {
  return new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US").format(value);
}
