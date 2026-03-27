# Codex CLI Agent Prompt — Akbank Audit Data Processor

> **Purpose**: You are a local data orchestration agent. You will parse a massive Akbank Google Maps audit JSON file, split it into digestible pieces that match an existing data contract, mine "diamond data" (highest-impact executive findings), and generate ready-to-paste prompts for a Lovable AI agent that will build the final web application.
>
> **You do NOT call Lovable.** You only organize data and write files.

---

## Table of Contents

1. [Your Role](#1-your-role)
2. [Input Files](#2-input-files)
3. [Output Files](#3-output-files)
4. [Data Contract — prospectPack Schema](#4-data-contract--prospectpack-schema)
5. [File-by-File Extraction Rules](#5-file-by-file-extraction-rules)
6. [Diamond Data Mining](#6-diamond-data-mining)
7. [Lovable AI Prompt Generation](#7-lovable-ai-prompt-generation)
8. [Quality Gates](#8-quality-gates)
9. [Akbank Brand Profile](#9-akbank-brand-profile)
10. [Reference: Yapı Kredi Example Data](#10-reference-yapi-kredi-example-data)

---

# 1. Your Role

You are a **data processing and reasoning agent** running locally via Codex CLI. Your job:

1. **READ** the Akbank audit JSON file (it may be very large — hundreds of MB)
2. **EXTRACT** specific data slices that map to a known TypeScript data contract
3. **REASON** about which findings are most impactful for an executive presentation
4. **WRITE** 7 structured JSON files into `akbank-data/`
5. **WRITE** 5 Lovable AI prompt files into `akbank-prompts/`

### Critical Constraints

- **Never modify the source JSON** — you are slicing, not editing
- **Preserve all Turkish characters** (UTF-8) — never transliterate or strip diacritics
- **Each output file must be under 50KB** — this is the Lovable AI upload limit
- **Use the exact field names** from the data contract below — Lovable components read these fields directly
- **All Google Maps URLs must include BOTH `query=` AND `query_place_id=`** — never `query_place_id` alone

---

# 2. Input Files

You will have access to:

| File | Description |
|------|-------------|
| `akbank-audit.json` (or similar name) | The massive audit JSON from the Google Maps scraper. Contains locations, reviews, clusters, categories, hours, etc. |
| `recipe/COMPLETE-RECIPE.md` | The full build recipe for the landing page — read this to understand what each component expects |
| This file (`recipe/CODEX-CLI-AGENT-PROMPT.md`) | Your instructions |

### Understanding the Audit JSON Structure

The audit JSON typically contains these top-level sections (field names may vary — adapt as needed):

```
{
  "metadata": { ... },           // Scrape date, bank name, totals
  "locations": [ ... ],          // Array of all discovered locations
  "clusters": [ ... ],           // Duplicate/proximity clusters
  "reviews": [ ... ],            // Scraped reviews
  "categories": [ ... ],         // Category assignments per location
  "unclaimed": [ ... ],          // Locations marked as unclaimed
  "hours_anomalies": [ ... ],    // Locations with suspicious hours
  ...
}
```

**Your first task**: Read the JSON and identify the actual top-level keys. Map them to the sections below. If a section doesn't exist, note it in your output and use reasonable defaults.

---

# 3. Output Files

Create two directories and write these files:

## `akbank-data/` — Structured Data Files

| # | File | Size Target | Feeds Component |
|---|------|-------------|-----------------|
| 1 | `01-prospect-core.json` | < 5KB | `prospectPack.ts` top-level fields |
| 2 | `02-clusters-top10.json` | < 30KB | `DuplicatesSection` |
| 3 | `03-quotes-top12.json` | < 15KB | `ReviewWaterfallSection` |
| 4 | `04-smoking-guns.json` | < 10KB | `SmokingGunsSection` |
| 5 | `05-unclaimed-summary.json` | < 5KB | `UnclaimedProofExplorer` |
| 6 | `06-review-intelligence.json` | < 10KB | `ReviewIntelligenceSection` |
| 7 | `07-diamond-insights.json` | < 20KB | Executive briefing guide + `SmokingGunsSection` / `HQProofSection` |

## `akbank-prompts/` — Lovable AI Prompts

| # | File | Purpose |
|---|------|---------|
| 1 | `prompt-phase1-data.md` | Create `prospectPack.ts` with core data |
| 2 | `prompt-phase2-evidence.md` | Populate all evidence components |
| 3 | `prompt-phase3-diamonds.md` | Update SmokingGuns and HQProof with diamond findings |
| 4 | `prompt-phase4-brand.md` | Apply Akbank branding colors and assets |
| 5 | `prompt-phase5-validate.md` | Run validation checklist |

---

# 4. Data Contract — prospectPack Schema

This is the EXACT shape that Lovable AI will use to create `src/data/prospectPack.ts`. Your output files must produce data that maps cleanly to these fields.

```typescript
export const prospectPack = {
  reportDate: {
    en: "string",  // e.g. "February 2026"
    tr: "string",  // e.g. "Şubat 2026"
  },
  prospect: {
    name: "Akbank",
    logoUrl: "/akbank-logo.png",       // Will be placed in /public/
    primaryColor: "#DC0005",            // Akbank red
    accentColor: "#191D2F",             // Akbank navy
  },
  official_network: {
    total: number,              // Total official locations (ATM + Branch)
    atm: number,                // ATM count
    branch: number,             // Branch count
    detected_on_maps: number,   // How many found on Google Maps
    missing_invisible: number,  // total - detected_on_maps
    visibility_rate: number,    // (detected / total) * 100, rounded to integer
  },
  inaction_cost: {
    new_shadows_per_month: "string",      // e.g. "3-5"
    confusion_reviews_per_month: "string", // e.g. "~50"
    unclaimed_at_risk: number,
  },
  unclaimed_data: {
    scrape_date: "string",          // ISO date from audit
    report_date: "string",         // Today's date
    total_all_categories: number,   // All unclaimed (bank + other)
    total_bank_atm: number,         // Bank/ATM unclaimed only
    other_categories: number,       // total_all - total_bank_atm
    atm_count: number,              // Unclaimed ATMs
    branch_count: number,           // Unclaimed branches
  },
  audit: {
    analysed_locations_total: number,
    shadow_locations: number,
    shadow_percentage: number,         // (shadow / analysed) * 100
    unclaimed_listings: number,
    unclaimed_percentage: number,
    duplicate_clusters: number,
    traffic_splitting_clusters: number, // Clusters where 3+ listings compete
    category_mismatches: number,
    twenty_four_hour_bank_violations: number,
    reviews_scanned: number,
    location_confusion_mentions: number,
    atm_malfunction_mentions: number,
    hq_shadow_count: number,           // Shadow listings near HQ
  },
  clustersTop10: [
    {
      rank: number,            // 1-10
      clusterId: number,
      city: "string",
      size: number,            // Total listings in cluster
      officialCount: number,
      shadowCount: number,
      isHQ: boolean,           // True if cluster is near Akbank HQ (Sabancı Center, Levent area)
      listings: [
        {
          segment: "Official" | "Shadow",
          title: "string",         // Exact Google Maps title
          placeId: "string",       // Google Place ID (starts with ChIJ...)
          address: "string",
          url: "string",           // MUST have both query= and query_place_id=
        }
      ]
    }
  ],
  quotesTop12: [
    {
      id: number,
      title: "string",           // Location name
      segment: "Official",
      stars: number,             // 1-5
      textTR: "string",          // Original Turkish review text
      textEN: "string",          // English translation
      categories: ["string"],    // "Location Confusion", "ATM Malfunction", "Service Complaint"
      placeId: "string",
      url: "string",
    }
  ],
  smokingGuns: [
    {
      id: number,               // 1-5
      title: "string",          // Short finding title (English)
      location: "string",       // City/area
      address: "string",        // Full address
      problem: "string",        // Finding description (English, "zero blame" tone)
      talkingPoint: "string",   // Executive talking point (English)
      url: "string",            // Maps URL
    }
  ],
  portfolio_results: {
    // THESE ARE OBENAN PORTFOLIO CONSTANTS — DO NOT CHANGE
    locations_analyzed: 1244,
    visibility_increase_median: 41.5,
    action_increase_median: 28.3,
    success_rate: 94,
    monthly_automated_actions: 507000,
    review_response_rate_target: 100,
    platforms_synced: 70,
    countries_served: 23,
    resync_hours: 24,
  },
  review_intelligence: {
    total_reviews_network_estimate: number,
    reviews_scanned_audit: number,
    unanswered_percentage: number,
    phone_complaints_detected: number,
    featured_case: {
      location: "string",
      city: "string",
      url: "string",
      review_text_tr: "string",
      review_text_en: "string",
      suggested_response_tr: "string",
      suggested_response_en: "string",
    }
  }
};
```

---

# 5. File-by-File Extraction Rules

## 5.1 `01-prospect-core.json`

Extract from the audit JSON:

1. **Bank identity**: Name = "Akbank", colors from brand profile (Section 9)
2. **Network totals**: Count all locations by type (ATM vs Branch). If the JSON has a `segment` or `type` field, use it. Otherwise, classify by title keywords:
   - ATM: title contains "ATM", "Bankamatik", "Para Yatırma"
   - Branch: everything else that's official
3. **Visibility**: Count locations detected on Google Maps vs official total
4. **Inaction cost**: Estimate based on:
   - `new_shadows_per_month`: Count shadows and divide by audit age in months (default "3-5")
   - `confusion_reviews_per_month`: Count reviews mentioning confusion / audit months (default "~50")
   - `unclaimed_at_risk`: Count of unclaimed listings

**Output shape**: Flat JSON matching `prospect`, `official_network`, `inaction_cost`, `unclaimed_data`, `audit` fields.

## 5.2 `02-clusters-top10.json`

1. Find all duplicate/proximity clusters in the data
2. Sort by cluster size (descending), then by shadow count (descending)
3. Take top 10
4. For each cluster, list all member listings with:
   - `segment`: "Official" or "Shadow" — classify based on ownership/verification status in the data
   - `title`: Exact Google Maps title
   - `placeId`: Must start with `ChIJ` — validate this
   - `address`: Full address string
   - `url`: Build as `https://www.google.com/maps/search/?api=1&query={URL_ENCODED_TITLE}&query_place_id={PLACE_ID}`
5. Mark clusters near Akbank HQ as `isHQ: true` (Akbank HQ = Sabancı Center, 4. Levent, İstanbul)

**Output shape**: Array matching `clustersTop10` schema.

## 5.3 `03-quotes-top12.json`

1. Scan all reviews in the audit
2. Filter to 1-star and 2-star reviews
3. Prioritize reviews that mention (in Turkish):
   - "yanlış konum" / "yanlış adres" (wrong location/address)
   - "burada yok" / "bulamadım" (not here / couldn't find)
   - "kapalı" but Google says open (closed but listed as open)
   - "ATM yok" / "çalışmıyor" (no ATM / not working)
   - "haritada yanlış" (wrong on map)
4. Select 12 reviews with maximum diversity (different cities, different issue types)
5. For each review:
   - `textTR`: Original Turkish text (preserve exactly)
   - `textEN`: Your English translation (accurate, not literal)
   - `categories`: Classify as "Location Confusion", "ATM Malfunction", or "Service Complaint"
6. Build Maps URL for each review's location

**Output shape**: Array matching `quotesTop12` schema.

## 5.4 `04-smoking-guns.json`

Select exactly **5 findings** that would make a bank executive react. These are the "credibility anchors" — specific, verifiable examples that prove systemic governance failures.

### The Five Archetypes (find one of each):

1. **Traffic-splitting cluster**: A single address where 3+ listings compete for visibility
2. **Hours violation**: A non-ATM listing showing 24/7 hours (branch can't be open 24/7)
3. **Naming/spelling error**: A misspelled or ASCII-degraded listing (e.g., "Akbnk" instead of "Akbank")
4. **HQ contamination**: Shadow listings near Akbank's headquarters (Sabancı Center, 4. Levent)
5. **Category pollution**: A non-bank listing (insurance, investment, bookstore) inside a bank cluster

For each finding, write:
- `title`: Short English title (e.g., "Traffic-splitting cluster at a single address")
- `location`: City and area
- `address`: Full address
- `problem`: 1-2 sentences in English using "zero blame" tone — frame as "legacy data artefact", not blame
- `talkingPoint`: One executive-ready sentence in English — what the CXO should take away
- `url`: Verified Maps URL

### Zero Blame Wording Examples

| ❌ Don't write | ✅ Write instead |
|----------------|-----------------|
| "Your data is broken" | "This legacy data artefact sits within 50m of the official branch" |
| "Nobody manages this" | "This listing exists outside current governance scope" |
| "This is a mess" | "Multiple entities compete for visibility at this address" |

**Output shape**: Array matching `smokingGuns` schema.

## 5.5 `05-unclaimed-summary.json`

1. Count all unclaimed listings
2. Split by type: ATM vs Branch vs Other categories
3. Include scrape date from audit metadata
4. Generate a summary that matches `unclaimed_data` schema
5. Also export first 100 unclaimed listings as a CSV-ready array with columns:
   `[title, city, category, placeId, maps_url, rating, reviews_count]`

**Output shape**:
```json
{
  "summary": { /* matches unclaimed_data schema */ },
  "sample_rows": [ /* first 100 for CSV generation */ ]
}
```

## 5.6 `06-review-intelligence.json`

1. **Total reviews**: Count or estimate total reviews across the network
2. **Reviews scanned**: How many were in the audit data
3. **Unanswered %**: Count reviews with no owner response / total scanned × 100
4. **Phone complaints**: Count reviews mentioning phone numbers, "aradım" (I called), "telefon" etc.
5. **Featured case**: Pick the SINGLE most impactful review for executive presentation:
   - Prefer: mentions wrong location + high emotion + from a real customer
   - Include the original Turkish and your English translation
   - Write a suggested professional response in both TR and EN (as if from "Akbank Dijital Ekibi")

**Output shape**: Matches `review_intelligence` schema.

## 5.7 `07-diamond-insights.json`

This is where your **reasoning shines**. Mine the entire dataset for the top 10 most impactful findings using the Diamond Scoring Formula (Section 6).

**Output shape**:
```json
{
  "methodology": "Diamond scoring: impact = (scale×3) + (verifiability×2) + (shock_value×1)",
  "scan_date": "ISO date",
  "total_findings_evaluated": number,
  "diamonds": [
    {
      "rank": 1,
      "finding_id": "unique-id",
      "category": "HQ Contamination | Hours Violation | Naming Error | Cluster Collision | Category Pollution | Unclaimed High-Traffic | Review Pattern",
      "title": "string",
      "description": "string (2-3 sentences, executive tone)",
      "evidence": {
        "location": "string",
        "city": "string",
        "address": "string",
        "placeId": "string",
        "url": "string (Maps URL)",
        "affected_listings_count": number
      },
      "scoring": {
        "scale": number,         // 1-5
        "verifiability": number,  // 1-5
        "shock_value": number,    // 1-5
        "impact_score": number    // weighted sum
      },
      "executive_framing": {
        "headline_tr": "string",
        "headline_en": "string",
        "talking_point_tr": "string",
        "talking_point_en": "string"
      },
      "lovable_component": "SmokingGunsSection | HQProofSection | DuplicatesSection | ReviewWaterfallSection | PolicyAnomaliesSection",
      "lovable_prompt_snippet": "string (1-2 lines telling Lovable what to do with this finding)"
    }
  ]
}
```

---

# 6. Diamond Data Mining

## The Scoring Formula

```
impact_score = (scale × 3) + (verifiability × 2) + (shock_value × 1)

Maximum possible score: (5×3) + (5×2) + (5×1) = 30
```

### Scoring Criteria

**Scale** (1-5): How many locations does this finding affect?
- 1 = Single location
- 2 = 2-5 locations
- 3 = 6-20 locations
- 4 = 21-100 locations
- 5 = 100+ locations or network-wide pattern

**Verifiability** (1-5): Can an executive verify this in 30 seconds?
- 1 = Requires data analysis to see
- 2 = Visible in Maps with some searching
- 3 = Visible with a single Maps link click
- 4 = Immediately obvious on Maps + shockingly clear
- 5 = Screenshottable, tweet-worthy evidence

**Shock Value** (1-5): Would a board member react?
- 1 = Minor data inconsistency
- 2 = Operational inefficiency
- 3 = Customer-facing problem
- 4 = Brand reputation risk
- 5 = "How is this possible at a major bank?" moment

### Categories to Scan

Methodically scan the audit data for findings in these categories, scoring each:

#### A. HQ-Area Governance Failures
- Look for: Shadow listings within 500m of Akbank HQ (Sabancı Center, 4. Levent, Büyükdere Cad., 34394 Sarıyer/İstanbul)
- Why it matters: "If HQ isn't pristine, customers assume the rest of the network isn't either"
- Typical score: Scale 2-3, Verifiability 5, Shock 5 = 16-19

#### B. Unclaimed ATMs at High-Traffic Locations
- Look for: Unclaimed listings at major transit hubs, shopping centers, airports, universities
- Why it matters: Unclaimed = anyone can edit the listing, post photos, change hours
- Typical score: Scale 3-5, Verifiability 4, Shock 3-4 = 17-23

#### C. 1-Star Reviews Mentioning Wrong Directions
- Look for: Reviews where customers went to the wrong place because of Maps data
- Why it matters: Direct customer harm from data governance failure
- Typical score: Scale 4-5, Verifiability 3-4, Shock 3-4 = 19-25

#### D. Duplicate Clusters (3+ Listings at One Address)
- Look for: Addresses where 3 or more Akbank-related listings compete
- Why it matters: Splits reviews, confuses routing, dilutes visibility
- Typical score: Scale 3-4, Verifiability 4-5, Shock 3-4 = 17-24

#### E. Category Mismatches
- Look for: Akbank listed as restaurant, gym, hospital, bookstore, etc.
- Why it matters: Google may stop showing the listing for banking queries
- Typical score: Scale 2-4, Verifiability 5, Shock 4-5 = 16-22

#### F. 24-Hour Bank Violations
- Look for: Non-ATM locations (branches, offices) listed with 24/7 hours
- Why it matters: Sends customers to locked doors at night
- Typical score: Scale 1-3, Verifiability 5, Shock 4 = 11-19

### Reasoning Process

For each potential diamond:

1. **Identify**: What is the finding? Cite specific data (placeId, title, address)
2. **Score**: Apply the formula with justification for each criterion
3. **Frame**: Write the executive headline and talking point
4. **Map**: Which Lovable component should display this? Write a 1-line prompt snippet.

Sort all diamonds by `impact_score` descending. Take top 10.

**IMPORTANT**: Diamond scoring must be deterministic. Same input → same ranking. Document your reasoning for borderline decisions.

---

# 7. Lovable AI Prompt Generation

For each phase, write a complete, copy-paste-ready prompt file. The human will paste these directly into the Lovable AI chat.

## 7.1 `prompt-phase1-data.md`

```markdown
# Phase 1: Create Akbank Data Contract

I'm building an executive location governance audit report for Akbank.
Attached is `01-prospect-core.json` containing the core audit data.

## Instructions

1. Read `recipe/COMPLETE-RECIPE.md` for the full build recipe and data contract
2. Create `src/data/prospectPack.ts` using the data from the attached JSON
3. The file must export `const prospectPack = { ... }` matching the schema in Section 4.1 of the recipe
4. Set `portfolio_results` to Obenan's standard values (these are constants, not Akbank-specific):
   - locations_analyzed: 1244
   - visibility_increase_median: 41.5
   - action_increase_median: 28.3
   - success_rate: 94
   - monthly_automated_actions: 507000
   - review_response_rate_target: 100
   - platforms_synced: 70
   - countries_served: 23
   - resync_hours: 24

5. Leave `clustersTop10`, `quotesTop12`, `smokingGuns` as empty arrays `[]` for now — Phase 2 will populate them.
6. The prospect colors are:
   - primaryColor: "#DC0005" (Akbank red)
   - accentColor: "#191D2F" (Akbank navy)

Do NOT create any components yet. Only create the data file.
```

**IMPORTANT**: After writing this template, INSERT the actual values from `01-prospect-core.json` into the prompt. The human should be able to paste it and go.

## 7.2 `prompt-phase2-evidence.md`

```markdown
# Phase 2: Populate Evidence Components

I'm continuing the Akbank audit report build. Here are the evidence data files:
- `02-clusters-top10.json` — Top 10 duplicate clusters
- `03-quotes-top12.json` — Top 12 customer reviews
- `05-unclaimed-summary.json` — Unclaimed listing stats
- `06-review-intelligence.json` — Review intelligence data

## Instructions

1. Update `src/data/prospectPack.ts` to include:
   - `clustersTop10` array from `02-clusters-top10.json`
   - `quotesTop12` array from `03-quotes-top12.json`
   - `review_intelligence` object from `06-review-intelligence.json`
   - Update `unclaimed_data` with values from `05-unclaimed-summary.json`

2. Also update `shadowEvidence` and `unclaimedEvidence` arrays with 6 representative entries each (pick diverse cities and issue types from the data)

3. Create CSV files for the unclaimed proof explorer:
   - `/public/data/unclaimed-bank-atm.csv` — bank/ATM unclaimed listings
   - `/public/data/unclaimed-all-categories.csv` — all categories
   - `/public/data/unclaimed-summary.json` — summary stats

4. Ensure every Maps URL has BOTH `query=` and `query_place_id=` parameters
5. Ensure all Turkish text is preserved exactly — no transliteration
6. Read `recipe/COMPLETE-RECIPE.md` Section 4.1 for the exact schema

Do NOT modify any component files. Only update data files.
```

**IMPORTANT**: Embed the actual JSON data inline or reference the attached files clearly.

## 7.3 `prompt-phase3-diamonds.md`

```markdown
# Phase 3: Update Evidence Sections with Diamond Findings

Here is `04-smoking-guns.json` and `07-diamond-insights.json` containing the highest-impact findings from the Akbank audit.

## Instructions

1. Update `src/data/prospectPack.ts`:
   - Replace the `smokingGuns` array with the 5 findings from `04-smoking-guns.json`

2. Update `src/components/SmokingGunsSection.tsx`:
   - Update the `content.tr.guns` array with Turkish translations of the 5 smoking guns
   - Keep the same card structure (icon, title, location, address, problem, talkingPoint, url)
   - Use "zero blame" framing — "legacy data artefact", not "broken data"

3. Update `src/components/HQProofSection.tsx`:
   - Replace "Levent / Plaza Bölgesi" with the actual Akbank HQ area
   - Update `hq_shadow_count` to match the audit data
   - Update location labels: "Sabancı Center / 4. Levent Bölgesi"

4. The Turkish translations for SmokingGunsSection should follow these patterns:
   - title: Short, descriptive (e.g., "Tek adreste trafik bölen küme")
   - problem: 1-2 sentences explaining the artefact
   - talkingPoint: Executive quote format with quotation marks

5. Read `recipe/COMPLETE-RECIPE.md` Section 3 for component specs

Replace all "Yapı Kredi" references with "Akbank" throughout.
```

## 7.4 `prompt-phase4-brand.md`

```markdown
# Phase 4: Apply Akbank Branding

## Brand Profile
- Bank name: Akbank
- Primary color: #DC0005 (Akbank signature red)
- Secondary color: #191D2F (dark navy)
- Accent color: #8151fd (purple, from their website)
- Logo: /public/akbank-logo.png (I'll upload this separately)
- Favicon: /public/favicon.ico (download from akbank.com/SiteAssets/img/favicon.ico)

## Instructions

1. Update `src/index.css` — replace ALL color tokens:
   - `--primary`: Change from `209 100% 29%` to `0 100% 43%` (Akbank red #DC0005 in HSL)
   - `--ring`: Same as primary
   - Keep `--cta` as Obenan teal (`173 77% 32%`) — do NOT change this
   - Keep `--destructive` as amber — do NOT use red for warnings (it clashes with brand red)
   - Update `--status-focus` if needed to avoid red collision

2. Update `tailwind.config.ts`:
   - Replace `yk-blue` with `akbank-red: "#DC0005"`
   - Replace `yk-blue-dark` with `akbank-red-dark: "#B30004"`
   - Replace `yk-navy` with `akbank-navy: "#191D2F"`
   - Keep `obenan-teal` unchanged

3. Update gradients in index.css:
   - `--gradient-keynote`: Replace blue hue with red hue
   - `--shadow-keynote`: Replace blue with red
   - `--shadow-chip`: Replace blue with red

4. Update components:
   - `CinematicIntro`: Change logo reference to `/akbank-logo.png`
   - `HeroSection`: Update badge text, logo path
   - `ClosingCTASection`: Update footer logo and "Prepared for Akbank" text

5. **CRITICAL — Red Brand Warning Policy**:
   - Since Akbank's brand is RED, warning/error states MUST use AMBER (#F59E0B), never red
   - Status: `status-watch` stays amber
   - Status: `status-focus` stays yellow/amber
   - `destructive` stays amber
   - Only `--primary` and brand-specific elements use red

6. Search for ALL instances of "Yapı Kredi" in the codebase — replace with "Akbank"
7. Search for ALL instances of "yapikredi" in file paths — rename to "akbank"

Read `recipe/COMPLETE-RECIPE.md` Section 6 for the full style token reference.
```

## 7.5 `prompt-phase5-validate.md`

```markdown
# Phase 5: Validation Checklist

Run through this complete validation checklist for the Akbank report.

## Automated Checks

1. **TR/EN Parity**: Toggle language between TR and EN. Verify:
   - No English text visible in TR mode
   - No Turkish text visible in EN mode
   - All `content.tr` and `content.en` objects have matching keys

2. **Zero-Stuck Counters**: Scroll through all sections. Every `AnimatedCounter` must show a non-zero final value. Check:
   - ValuePropositionSection: 3 metrics
   - TransformationSection: Hero + supporting grid
   - ClosingCTASection: Outcome counters

3. **Maps Links**: Click 10 random maps links across sections. Each must:
   - Open Google Maps (not a generic search)
   - Show the specific business listing
   - URL contains both `query=` and `query_place_id=`

4. **Pricing Numbers**: Verify in PricingComparisonSection:
   - Monthly fee = min(total_locations, 6500) × €8.50
   - Annual fee = monthly × 12
   - Free locations = max(0, total_locations - 6500)

5. **Mobile Layout (390px)**: All 23 sections readable, no horizontal overflow

6. **Brand Consistency**:
   - Search entire codebase for "Yapı Kredi" — must be zero (except recipe/docs)
   - Search for "#004990" (old blue) — must be zero
   - Primary color is red (#DC0005) everywhere
   - No red used for warnings/errors (must be amber)

7. **CSV Loading**: UnclaimedProofExplorer loads CSV and renders cards

8. **Console Errors**: Zero errors on full scroll-through

## Manual Spot-Checks

- [ ] CinematicIntro shows Akbank logo
- [ ] HeroSection shows correct network total
- [ ] SmokingGunsSection has 5 findings with valid Maps links
- [ ] HQProofSection references Sabancı Center / 4. Levent
- [ ] Platform count is "70+" everywhere (not "130+")
- [ ] No "Book a demo" or "Schedule a call" CTAs anywhere
```

---

# 8. Quality Gates

Before writing any output file, verify:

| Gate | Check | Action if Fail |
|------|-------|----------------|
| **Size** | File < 50KB | Trim arrays (fewer listings per cluster, fewer CSV rows) |
| **PlaceId** | Every placeId starts with `ChIJ` | Flag invalid ones, exclude from output |
| **Maps URL** | Every URL has `query=` AND `query_place_id=` | Rebuild URL from title + placeId |
| **Turkish** | All Turkish characters preserved | Never transliterate (ş→s, ı→i, etc.) |
| **Field names** | Match schema exactly | Cross-reference with Section 4 |
| **No content modification** | Data sliced, not altered | Review text preserved verbatim |
| **Diamond determinism** | Same input → same ranking | Document scoring for each diamond |

---

# 9. Akbank Brand Profile

```json
{
  "bank_name": "Akbank",
  "hq_address": "Sabancı Center, 4. Levent, Büyükdere Cad., 34394 Sarıyer/İstanbul",
  "hq_search_terms": ["Sabancı Center", "4. Levent", "Akbank Genel Müdürlük", "Büyükdere"],
  "primary_color": "#DC0005",
  "primary_color_hsl": "0 100% 43%",
  "secondary_color": "#191D2F",
  "accent_color": "#8151fd",
  "logo_url": "https://www.akbank.com/PublishingImages/akbfa.jpg",
  "favicon_url": "https://www.akbank.com/SiteAssets/img/favicon.ico",
  "red_brand_warning": "Since brand is RED, all warning/error states MUST use AMBER (#F59E0B). Never use red for destructive/warning UI elements.",
  "subsidiary_names_to_flag": [
    "Ak Yatırım",
    "Ak Portföy",
    "Ak Faktoring",
    "Ak Finansal Kiralama",
    "Akbank Direkt",
    "AkÖde"
  ]
}
```

---

# 10. Reference: Yapı Kredi Example Data

Here is a reference example showing what the output should look like, based on the Yapı Kredi implementation. Use this as a structural guide — your Akbank data will have different values.

### Example `smokingGuns` entry:
```json
{
  "id": 1,
  "title": "Traffic-splitting cluster at a single address",
  "location": "Denizli - Bayramyeri",
  "address": "Saraylar, 500/1. Sk., 20010 Denizli",
  "problem": "This legacy data artefact sits within 50 meters of multiple official branches, creating a cluster that splits reviews and routing signals at the exact same address.",
  "talkingPoint": "Even at a single address, multiple listings are competing for visibility — this is why governance must be centralized.",
  "url": "https://www.google.com/maps/search/?api=1&query=Yapi%20Kredi&query_place_id=ChIJvakmH7E_xxQRhzXGGyR1t78"
}
```

### Example `clustersTop10` entry:
```json
{
  "rank": 1,
  "clusterId": 2,
  "city": "Denizli",
  "size": 5,
  "officialCount": 3,
  "shadowCount": 2,
  "isHQ": false,
  "listings": [
    {
      "segment": "Official",
      "title": "Yapı Kredi - Bayramyeri Şubesi",
      "placeId": "ChIJyyI_H7E_xxQRfmcLJ0oOr5k",
      "address": "Saraylar, Saltak Cd. No:2, 20010 Denizli",
      "url": "https://www.google.com/maps/search/?api=1&query=Yap%C4%B1%20Kredi%20-%20Bayramyeri%20%C5%9Eubesi&query_place_id=ChIJyyI_H7E_xxQRfmcLJ0oOr5k"
    }
  ]
}
```

### Example `quotesTop12` entry:
```json
{
  "id": 1,
  "title": "Yapı Kredi Bankası - Rami Şubesi",
  "segment": "Official",
  "stars": 1,
  "textTR": "Gördüğüm en kötü banka şubesi, para çekmek için 2 saat sıra bekliyorsunuz...",
  "textEN": "The worst bank branch I've ever seen, you wait 2 hours in line...",
  "categories": ["Location Confusion", "Service Complaint"],
  "placeId": "ChIJ1XB_unm6yhQRcawCq7JSd6w",
  "url": "https://www.google.com/maps/search/?api=1&query=..."
}
```

### Example diamond entry:
```json
{
  "rank": 1,
  "finding_id": "hq-shadow-levent",
  "category": "HQ Contamination",
  "title": "Shadow listing cluster at Akbank HQ — Sabancı Center",
  "description": "Multiple unauthorized listings cluster around Akbank's headquarters at Sabancı Center in 4. Levent. These legacy data artefacts include subsidiary entities that fragment the official HQ presence and dilute executive-level visibility.",
  "evidence": {
    "location": "Sabancı Center, 4. Levent",
    "city": "İstanbul",
    "address": "Sabancı Center, Büyükdere Cad., 34394 Sarıyer/İstanbul",
    "placeId": "ChIJ...",
    "url": "https://www.google.com/maps/search/?api=1&query=...",
    "affected_listings_count": 8
  },
  "scoring": {
    "scale": 3,
    "verifiability": 5,
    "shock_value": 5,
    "impact_score": 24
  },
  "executive_framing": {
    "headline_tr": "Genel Müdürlük bölgesinde bile yönetişim boşlukları var",
    "headline_en": "Even the HQ area has governance gaps",
    "talking_point_tr": "Genel Müdürlük mükemmel değilse, müşteriler ağın geri kalanının da öyle olmadığını varsayar.",
    "talking_point_en": "If HQ isn't pristine, customers assume the rest of the network isn't either."
  },
  "lovable_component": "HQProofSection",
  "lovable_prompt_snippet": "Update HQProofSection to show Sabancı Center / 4. Levent with X shadow listings near HQ."
}
```

---

# Summary — What You Produce

When you're done, the human should have:

```
akbank-data/
├── 01-prospect-core.json        ← Bank identity + KPIs
├── 02-clusters-top10.json       ← Top 10 duplicate clusters
├── 03-quotes-top12.json         ← Top 12 worst reviews
├── 04-smoking-guns.json         ← 5 credibility anchors
├── 05-unclaimed-summary.json    ← Unclaimed stats + sample rows
├── 06-review-intelligence.json  ← Review analysis + featured case
└── 07-diamond-insights.json     ← Top 10 diamond findings with scoring

akbank-prompts/
├── prompt-phase1-data.md        ← "Create prospectPack.ts..."
├── prompt-phase2-evidence.md    ← "Populate evidence sections..."
├── prompt-phase3-diamonds.md    ← "Update SmokingGuns + HQProof..."
├── prompt-phase4-brand.md       ← "Apply Akbank red branding..."
└── prompt-phase5-validate.md    ← "Run validation checklist..."
```

Each prompt file should be self-contained — the human copies it into Lovable AI chat along with the referenced JSON file(s), and Lovable executes it.

**You are the bridge between raw audit data and a polished executive presentation. Find the diamonds. Organize the evidence. Write the prompts. Let Lovable build the app.**
