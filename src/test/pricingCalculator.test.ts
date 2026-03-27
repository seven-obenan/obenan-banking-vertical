import { describe, it, expect } from "vitest";
import { calculatePricing, calculateManualBaseline, formatEur } from "@/lib/pricingCalculator";
import { ensureClaimPrefix, highestUncertainty } from "@/types/comparisonPricing";
import { comparisonPricingPack } from "@/data/comparisonPricingPack";

// ── P1-2: Integer-cents precision ───────────────────────────────────────────

describe("calculatePricing — integer cents math", () => {
  it("matches scenario L1000_A0 exactly", () => {
    const result = calculatePricing({
      price_per_location_eur: 8.5,
      cap_locations: 6500,
      eur_try_helper_rate: 39,
      active_locations: 1000,
      new_locations_added_this_month: 0,
    });
    expect(result.billable_locations_this_month).toBe(1000);
    expect(result.effective_monthly_fee_eur).toBe(8500);
    expect(result.helper_monthly_fee_try).toBe(331500);
    expect(result.cap_applied).toBe(false);
    expect(result.next_month_fee_eur_preview).toBe(8500);
  });

  it("matches scenario L1000_A100 with credit", () => {
    const result = calculatePricing({
      price_per_location_eur: 8.5,
      cap_locations: 6500,
      eur_try_helper_rate: 39,
      active_locations: 1000,
      new_locations_added_this_month: 100,
    });
    expect(result.next_month_new_location_credit_count).toBe(100);
    expect(result.next_month_billable_after_credit_before_cap).toBe(900);
    expect(result.next_month_fee_eur_preview).toBe(7650);
  });

  it("caps at 6500 for 7200 locations", () => {
    const result = calculatePricing({
      price_per_location_eur: 8.5,
      cap_locations: 6500,
      eur_try_helper_rate: 39,
      active_locations: 7200,
      new_locations_added_this_month: 0,
    });
    expect(result.billable_locations_this_month).toBe(6500);
    expect(result.effective_monthly_fee_eur).toBe(55250);
    expect(result.cap_applied).toBe(true);
  });

  it("credit doesn't bypass cap for L7200_A300", () => {
    const result = calculatePricing({
      price_per_location_eur: 8.5,
      cap_locations: 6500,
      eur_try_helper_rate: 39,
      active_locations: 7200,
      new_locations_added_this_month: 300,
    });
    expect(result.next_month_billable_after_credit_before_cap).toBe(6900);
    expect(result.next_month_billable_after_credit_and_cap).toBe(6500);
    expect(result.next_month_fee_eur_preview).toBe(55250);
  });

  it("no floating-point drift on 8.5 multiplication", () => {
    // 3653 * 8.5 = 31050.5 — ensure exact
    const result = calculatePricing({
      price_per_location_eur: 8.5,
      cap_locations: 6500,
      eur_try_helper_rate: 39,
      active_locations: 3653,
      new_locations_added_this_month: 0,
    });
    expect(result.effective_monthly_fee_eur).toBe(31050.5);
  });

  it("clamps negative inputs to zero", () => {
    const result = calculatePricing({
      price_per_location_eur: 8.5,
      cap_locations: 6500,
      eur_try_helper_rate: 39,
      active_locations: -100,
      new_locations_added_this_month: -50,
    });
    expect(result.billable_locations_this_month).toBe(0);
    expect(result.effective_monthly_fee_eur).toBe(0);
  });
});

// ── P1-3: Next-month explicit assumption ────────────────────────────────────

describe("calculatePricing — next-month preview assumption", () => {
  it("defaults next month to current active_locations when not provided", () => {
    const result = calculatePricing({
      price_per_location_eur: 8.5,
      cap_locations: 6500,
      eur_try_helper_rate: 39,
      active_locations: 3000,
      new_locations_added_this_month: 100,
    });
    // next_month_before_cap = 3000 - 100 = 2900
    expect(result.next_month_billable_after_credit_before_cap).toBe(2900);
  });

  it("uses explicit active_locations_next_month when provided", () => {
    const result = calculatePricing({
      price_per_location_eur: 8.5,
      cap_locations: 6500,
      eur_try_helper_rate: 39,
      active_locations: 3000,
      new_locations_added_this_month: 100,
      active_locations_next_month: 3200,
    });
    // next_month_before_cap = 3200 - 100 = 3100
    expect(result.next_month_billable_after_credit_before_cap).toBe(3100);
    expect(result.next_month_fee_eur_preview).toBe(26350);
  });
});

// ── P2-4: Prefix normalization ──────────────────────────────────────────────

describe("ensureClaimPrefix — no double-prefix", () => {
  it("prepends 'Modeled estimate:' when missing", () => {
    const result = ensureClaimPrefix("some description", "Modeled");
    expect(result).toBe("Modeled estimate: some description");
  });

  it("does NOT double-prefix when already present", () => {
    const result = ensureClaimPrefix("Modeled estimate: periodic update cycle", "Modeled");
    expect(result).toBe("Modeled estimate: periodic update cycle");
  });

  it("returns text unchanged for Verified status", () => {
    const result = ensureClaimPrefix("48-hour resync", "Verified");
    expect(result).toBe("48-hour resync");
  });

  it("handles Strategic prefix correctly", () => {
    const result = ensureClaimPrefix("Strategic capability: no MCP confirmed", "Strategic");
    expect(result).toBe("Strategic capability: no MCP confirmed");
  });

  it("prepends Strategic when missing", () => {
    const result = ensureClaimPrefix("no MCP confirmed", "Strategic");
    expect(result).toBe("Strategic capability: no MCP confirmed");
  });
});

// ── P2-5: Row status = highest uncertainty ──────────────────────────────────

describe("highestUncertainty", () => {
  it("returns Strategic when any cell is Strategic", () => {
    expect(highestUncertainty("Verified", "Strategic", "Verified")).toBe("Strategic");
  });

  it("returns Modeled when highest is Modeled", () => {
    expect(highestUncertainty("Verified", "Modeled", "Verified")).toBe("Modeled");
  });

  it("returns Verified when all are Verified", () => {
    expect(highestUncertainty("Verified", "Verified", "Verified")).toBe("Verified");
  });
});

// ── P2-5: Data pack row status consistency ──────────────────────────────────

describe("comparisonPricingPack rows — per-cell status consistency", () => {
  it("row-level status equals highest uncertainty of its cells", () => {
    for (const row of comparisonPricingPack.rows) {
      const expected = highestUncertainty(row.obenan_status, row.kaydet_status, row.manual_status);
      expect(row.status).toBe(expected);
    }
  });
});

// ── P2-6: Proof bullet count ────────────────────────────────────────────────

describe("comparisonPricingPack — proof bullets", () => {
  it("has exactly 5 proof bullets (canonical count)", () => {
    expect(comparisonPricingPack.proof_bullets).toHaveLength(5);
  });
});

// ── P1-1: Pack schema completeness ──────────────────────────────────────────

describe("comparisonPricingPack — schema alignment", () => {
  it("has metadata field", () => {
    expect(comparisonPricingPack.metadata.pack_id).toBeDefined();
    expect(comparisonPricingPack.metadata.currency_policy).toBeDefined();
  });

  it("has disclaimer field", () => {
    expect(comparisonPricingPack.disclaimer.competition).toBeDefined();
    expect(comparisonPricingPack.disclaimer.currency).toBeDefined();
  });

  it("has formula_notes in pricing", () => {
    expect(comparisonPricingPack.pricing.formula_notes.length).toBeGreaterThan(0);
  });

  it("pricing_output_examples have expanded fields", () => {
    for (const ex of comparisonPricingPack.pricing_output_examples) {
      expect(ex.next_month_billable_after_credit_before_cap).toBeDefined();
      expect(ex.next_month_billable_after_credit_and_cap).toBeDefined();
      expect(ex.next_month_fee_eur_preview).toBeDefined();
    }
  });

  it("every row has per-cell status fields", () => {
    for (const row of comparisonPricingPack.rows) {
      expect(row.obenan_status).toBeDefined();
      expect(row.kaydet_status).toBeDefined();
      expect(row.manual_status).toBeDefined();
    }
  });
});

// ── Manual baseline sanity ──────────────────────────────────────────────────

describe("calculateManualBaseline", () => {
  it("base band at 3653 locations matches expected range", () => {
    const result = calculateManualBaseline({
      active_locations: 3653,
      band: "base",
      hourly_rate_eur: 10,
      eur_try_helper_rate: 39,
    });
    // 36.53 units * 91.2 eff hours * 10 EUR + 1200 fixed
    expect(result.total_cost_monthly_eur).toBeCloseTo(34515.36, 1);
  });

  it("monotonic: low < base < high at same location count", () => {
    const inputs = { active_locations: 1000, hourly_rate_eur: 10, eur_try_helper_rate: 39 };
    const low = calculateManualBaseline({ ...inputs, band: "low" as const });
    const base = calculateManualBaseline({ ...inputs, band: "base" as const });
    const high = calculateManualBaseline({ ...inputs, band: "high" as const });
    expect(low.total_cost_monthly_eur).toBeLessThan(base.total_cost_monthly_eur);
    expect(base.total_cost_monthly_eur).toBeLessThan(high.total_cost_monthly_eur);
  });
});

// ── Scenario regression: all 12 pack examples ───────────────────────────────

describe("pricing scenario regression — all 12 pack examples", () => {
  const pack = comparisonPricingPack;
  for (const scenario of pack.pricing_output_examples) {
    it(`scenario ${scenario.scenario_id} matches`, () => {
      const result = calculatePricing({
        price_per_location_eur: 8.5,
        cap_locations: 6500,
        eur_try_helper_rate: 39,
        active_locations: scenario.active_locations,
        new_locations_added_this_month: scenario.new_locations_added_this_month,
      });
      expect(result.billable_locations_this_month).toBe(scenario.billable_locations_this_month);
      expect(result.effective_monthly_fee_eur).toBe(scenario.effective_monthly_fee_eur);
      expect(result.helper_monthly_fee_try).toBe(scenario.helper_monthly_fee_try);
      expect(result.cap_applied).toBe(scenario.cap_applied);
      expect(result.next_month_new_location_credit_count).toBe(scenario.next_month_new_location_credit_count);
      expect(result.next_month_billable_after_credit_before_cap).toBe(scenario.next_month_billable_after_credit_before_cap);
      expect(result.next_month_billable_after_credit_and_cap).toBe(scenario.next_month_billable_after_credit_and_cap);
      expect(result.next_month_fee_eur_preview).toBe(scenario.next_month_fee_eur_preview);
    });
  }
});
