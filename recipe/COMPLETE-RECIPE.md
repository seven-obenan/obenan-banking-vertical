# YapiKredi Landing Recipe — Complete Pack

> **Version**: 1.0 · **Date**: 2026-02-09 · **Source**: Reverse-engineered from live implementation at yapikredi.obenan.tech

---

## Table of Contents

1. [README — Executive Summary](#1-readme--executive-summary)
2. [Narrative Flow](#2-narrative-flow)
3. [Component Specs](#3-component-specs)
4. [Data Contracts](#4-data-contracts)
5. [Copy Framework](#5-copy-framework)
6. [Style Tokens](#6-style-tokens)
7. [Proof System](#7-proof-system)
8. [Pricing Logic](#8-pricing-logic)
9. [QA Checklist](#9-qa-checklist)
10. [Playwright Smoke Tests](#10-playwright-smoke-tests)
11. [Known Pitfalls](#11-known-pitfalls)
12. [İş Bankası Migration Plan](#12-is-bankasi-migration-plan)

---

# 1. README — Executive Summary

## What This Page Is

A **single-page executive briefing report** positioned as a forensic "location governance audit" for a target bank prospect. It is NOT a sales page — it is a peer-to-peer strategic intelligence brief designed for online executive meetings.

## Strategy

1. **Open with authority**: Cinematic intro + credential chips establish Obenan as a peer, not a vendor
2. **Prove the problem exists**: Live Google Maps evidence the executive can verify themselves
3. **Show the transformation math**: Before/after with real portfolio data
4. **Present Obenan as the obvious choice**: Comparison matrix with claim confidence transparency
5. **Close with readiness, not urgency**: "This report was prepared for you" — no CTA buttons, no calendly links

## Core Principles

| Principle | Implementation |
|-----------|---------------|
| Zero Blame | All findings are "legacy data artefacts" or "opportunity zones" |
| Evidence-First | Every claim links to a verifiable Google Maps URL |
| Claim Confidence | Verified / Estimate-based / Exclusive — per-cell transparency |
| No Cold Outreach CTAs | No "Book a demo" or scheduling links anywhere |
| Full TR/EN Parity | Every string exists in both languages, no mixed leakage |
| Brand Names Sacred | "Emotion AI" never translated; "Kaydet" preserved as-is |

## Tech Stack

- React 18 + Vite + TypeScript + Tailwind CSS
- Framer Motion for animations
- shadcn/ui component library
- Supabase (auth + engagement tracking)
- Static CSV/JSON data files in `/public/data/`

## One-Pass Build Recipe for İş Bankası

The exact sequence a new Lovable agent should follow:

```
PHASE 1: DATA (Day 1)
├── 1.1 Run İş Bankası Google Maps audit → produce CSV/JSON
├── 1.2 Create new prospectPack.ts with İş Bankası data
├── 1.3 Create new comparisonPricingPack.ts (same Kaydet competitor, new prospect name)
├── 1.4 Place unclaimed CSV files in /public/data/
└── 1.5 Update unclaimed-summary.json

PHASE 2: BRAND (Day 1)
├── 2.1 Replace /public/yapikredi-logo.svg with İş Bankası logo
├── 2.2 Update CSS --primary from 209 100% 29% to İş Bankası blue
├── 2.3 Update tailwind.config.ts brand colors (yk → ib)
├── 2.4 Update CinematicIntro logo reference
├── 2.5 Update HeroSection badge text and logo
└── 2.6 Update ClosingCTASection footer logo and "Prepared for" text

PHASE 3: CONTENT (Day 2)
├── 3.1 Update all hardcoded "Yapı Kredi" strings in LanguageContext translations
├── 3.2 Update all inline content.tr/en objects in each component
├── 3.3 Replace review quotes (quotesTop12) with İş Bankası reviews
├── 3.4 Replace smokingGuns evidence with İş Bankası findings
├── 3.5 Replace clustersTop10 with İş Bankası clusters
├── 3.6 Replace shadowEvidence and unclaimedEvidence arrays
└── 3.7 Update review_intelligence featured case

PHASE 4: VALIDATION (Day 2)
├── 4.1 Run TR/EN toggle test — no English in TR mode, no Turkish in EN mode
├── 4.2 Verify all map links open correct profiles (query + query_place_id)
├── 4.3 Verify AnimatedCounter renders non-zero values
├── 4.4 Test mobile responsiveness at 390px width
├── 4.5 Run pricing calculator test with new location count
├── 4.6 Verify unclaimed proof explorer loads CSV and renders cards
├── 4.7 Run through all 23 sections — no broken images, no stale text
└── 4.8 Check for "Yapı Kredi" text anywhere — should be zero occurrences

PHASE 5: DEPLOY (Day 3)
├── 5.1 Set up Supabase auth (magic link email template with İş Bankası branding)
├── 5.2 Configure engagement tracking tables
├── 5.3 Deploy to isbank.lovable.app (or isbank.obenan.tech)
└── 5.4 Send magic link to internal team for review
```

---

# 2. Narrative Flow

## Section Order (23 sections)

| # | Component | Act | Conversion Role | Why It Exists |
|---|-----------|-----|-----------------|---------------|
| 0 | `CinematicIntro` | Gate | **Tone setter** | 4.5s branded intro positions this as a premium intelligence brief, not a webpage. Skip button respects time. |
| 1 | `HeroSection` | 1 | **Authority** | "One Command Center for 6,753 locations" — establishes scope and credibility with stat chips. |
| 2 | `ProductIdentitySection` | 1 | **Positioning** | Shows Obenan's exclusive capabilities in 8 cards. "Only with Obenan" framing. |
| 3 | `ValuePropositionSection` | 1 | **Impact preview** | Three giant numbers: invisible locations, response rate, monthly actions. Problem → Solution framing. |
| 4 | `TransformationSection` | 2 | **Before/After** | Scroll-driven toggle: Today vs With Obenan. Hero metrics + supporting grid with animated counters. |
| 5 | `FoundationSection` | 2 | **Platform proof** | "You're on Google. But what about 70 others?" Logo grid showing current 0% → 100% sync potential. |
| 6 | `GovernanceLayerSection` | 2 | **Control narrative** | Shows how scattered networks become centralized. Dashboard preview video. |
| 7 | `CustomerSuccessProofSection` | 2 | **Social proof** | Portfolio results from 1,244-location study. Median visibility increase, success rate. |
| 8 | `AIDiscoverySection` | 2 | **Future-proofing** | AI search readiness — ChatGPT, Gemini, Perplexity discovering locations. |
| 9 | `AIDataChatSection` | 2 | **Capability demo** | Shows AI chat interface for querying location data. |
| 10 | `VisibilityCrisisSection` | 3 | **Problem quantification** | Three cards: Total network → Visible → Governance area. Collapsible inaction cost panel. |
| 11 | `OpportunitySnapshot` | 3 | **Evidence summary** | Four KPI cards with expandable evidence: shadows, unclaimed, duplicates, confusion reviews. |
| 12 | `ReviewIntelligenceSection` | 3 | **Review deep-dive** | Unanswered reviews, phone complaint detection, featured case with suggested response. |
| 13 | `ReviewWaterfallSection` | 3 | **Review evidence** | Top 12 1-star reviews with original Turkish text + English translation. Clickable map links. |
| 14 | `DuplicatesSection` | 3 | **Cluster evidence** | Top 10 duplicate clusters showing official vs shadow listings at same addresses. |
| 15 | `SmokingGunsSection` | 3 | **Credibility anchors** | 5 handpicked "smoking gun" findings — traffic splitting, wrong hours, misspelling, HQ contamination. |
| 16 | `HQProofSection` | 3 | **Executive shock** | "Even Levent HQ has governance gaps" — shadow listings around headquarters. |
| 17 | `UnclaimedLocationsMarquee` | 3 | **Visual wow-factor** | Infinite scrolling rows of unclaimed location cards. Pause on hover, click opens Maps. |
| 18 | `UnclaimedProofExplorer` | 3 | **Self-verification** | Full searchable/filterable table of 976 unclaimed locations. "Verify it yourself" methodology. |
| 19 | `PolicyAnomaliesSection` | 3 | **Trust risk** | 24-hour violations + category mismatches. Screenshot evidence from Gölcük branch. |
| 20 | `PricingComparisonSection` | 4 | **Decision support** | 8-row Obenan vs Kaydet vs Manual matrix + pricing card + exclusive capabilities block. |
| 21 | `ExecutionPlanSection` | 4 | **Implementation clarity** | 4-week roadmap. "No additional workload from your team." |
| 22 | `ClosingCTASection` | 4 | **Dignified close** | Positive outcome counters + "This report was prepared for you" + Obenan × Prospect footer. |

## Narrative Arc

```
Act 1 (Identity): "We see your entire network. Here's what we can do."
  ↓
Act 2 (Capability): "Here's proof it works — real portfolio data."
  ↓
Act 3 (Evidence): "Here's what we found in YOUR network — verify it yourself."
  ↓
Act 4 (Decision): "Here's how we compare, what it costs, and how fast we deploy."
```

---

# 3. Component Specs

## 3.1 CinematicIntro

| Property | Value |
|----------|-------|
| **Objective** | Set premium tone, establish brand pairing |
| **Required inputs** | `onComplete` callback, prospect logo URL |
| **Props/State** | `phase: 0-3` (ring → logo → text → complete) |
| **Interaction** | Auto-advances on timers (500ms, 1500ms, 2500ms, 4500ms). "Skip →" button calls `onComplete` immediately. |
| **Mobile** | Full-screen fixed overlay. Logo scales down. Skip button bottom-right. |
| **Failure modes** | If logo fails to load, text still shows. Timer-based, no scroll dependency. |

## 3.2 HeroSection

| Property | Value |
|----------|-------|
| **Objective** | Establish scope — "One Command Center for N locations" |
| **Required inputs** | `prospectPack.official_network.total`, `portfolio_results`, `reportDate` |
| **Props/State** | Stateless — reads from `useLanguage()` and `prospectPack` |
| **Interaction** | Scroll indicator at bottom. No clickable elements. |
| **Mobile** | Stat chips wrap to 2 columns. Font scales down via responsive classes. |
| **Failure modes** | If `prospectPack` is undefined → crash. Must validate data contract. |

## 3.3 ValuePropositionSection

| Property | Value |
|----------|-------|
| **Objective** | Three giant impact numbers with Problem → Solution framing |
| **Required inputs** | `official_network.missing_invisible`, `portfolio_results.review_response_rate_target`, `portfolio_results.monthly_automated_actions` |
| **Props/State** | Uses `AnimatedCounter` with `key={value}` for re-animation |
| **Interaction** | Pure display — no interactions |
| **Mobile** | Stacks to single column. Font size responsive. |
| **Failure modes** | Counter stuck at 0 if `key` prop not set correctly. |

## 3.4 TransformationSection

| Property | Value |
|----------|-------|
| **Objective** | Before/After comparison with scroll-driven phase transition |
| **Required inputs** | Hero metrics data (hardcoded in component), `useScrollPhase` hook |
| **Props/State** | `phase: "suffering" | "transitioning" | "transformed"` via `useScrollPhase`. Manual toggle overrides scroll. |
| **Interaction** | Toggle buttons ("Today" / "With Obenan"). Scroll triggers auto-transition at 35% visibility. "See proof" link scrolls to unclaimed section. |
| **Mobile** | Cards stack vertically. Toggle bar remains centered. |
| **Failure modes** | Transition can fight user interaction — `isManuallyLocked` flag prevents this. |

## 3.5 FoundationSection

| Property | Value |
|----------|-------|
| **Objective** | "You're on Google. What about 70 others?" — directory sync visualization |
| **Required inputs** | Directory list with `currentPercent` per platform, logos from CDN |
| **Props/State** | `useScrollPhase` for Today/Obenan toggle. Collapsible sections for Tier 2/3 directories. |
| **Interaction** | Toggle, collapsible panels, "See proof" link |
| **Mobile** | Logo grid wraps. Collapsible sections work well on mobile. |
| **Failure modes** | CDN logos from preprodapi.obenan.com — if CDN down, broken images with no fallback. **Known risk.** |

## 3.6 VisibilityCrisisSection

| Property | Value |
|----------|-------|
| **Objective** | Quantify the governance gap: Total → Visible → Missing |
| **Required inputs** | `official_network` (total, detected_on_maps, missing_invisible), `inaction_cost`, `unclaimed_data` |
| **Props/State** | `showInactionPanel` toggle for collapsible cost panel |
| **Interaction** | Collapse/expand inaction details |
| **Mobile** | Three cards stack vertically. Collapsible panel works. |
| **Failure modes** | None significant — pure data display. |

## 3.7 UnclaimedProofExplorer

| Property | Value |
|----------|-------|
| **Objective** | Self-verification database — "Verify it yourself (no trust required)" |
| **Required inputs** | CSV files at `/public/data/unclaimed-bank-atm.csv` and `/public/data/unclaimed-all-categories.csv`, summary JSON |
| **Props/State** | `filter` (ALL/ATM/BRANCH), `searchQuery`, `visibleCount` (pagination), `showAllCategories` toggle, `linkValidationStats` |
| **Interaction** | Search, filter, paginate ("Load More"), click to open Maps, copy link/placeId |
| **Mobile** | Cards stack. Search/filter bar responsive. |
| **Failure modes** | CSV fetch failure → console error, empty data. No loading skeleton. Map link validation catches missing placeIds. |

## 3.8 PricingComparisonSection

| Property | Value |
|----------|-------|
| **Objective** | Decision support — Obenan vs Kaydet vs Manual across 8 dimensions + pricing |
| **Required inputs** | `comparisonPricingPack` (rows, pricing, exclusive capabilities), `calculatePricing()` |
| **Props/State** | Desktop: full matrix. Mobile: accordion cards with expand/collapse per row. |
| **Interaction** | Mobile: tap to expand rows. Desktop: static matrix. Badge legend explains confidence levels. |
| **Mobile** | Complete layout swap — `MatrixRowMobile` replaces `MatrixRowDesktop`. Min 8 taps to see all rows. **Known friction.** |
| **Failure modes** | Missing `_tr` fields fall back to English. Logo strip images depend on CDN. |

## 3.9 ClosingCTASection

| Property | Value |
|----------|-------|
| **Objective** | Dignified close with positive outcome counters |
| **Required inputs** | `portfolio_results`, `official_network`, `reportDate` |
| **Props/State** | Stateless |
| **Interaction** | None — no CTAs, no buttons, no links |
| **Mobile** | Counter grid: 2 columns. Footer text wraps. |
| **Failure modes** | None significant. |

---

# 4. Data Contracts

## 4.1 prospectPack Schema

```json
{
  "reportDate": { "en": "string", "tr": "string" },
  "prospect": {
    "name": "string",
    "logoUrl": "string (path to /public/)",
    "primaryColor": "string (#hex)",
    "accentColor": "string (#hex)"
  },
  "official_network": {
    "total": "number",
    "atm": "number",
    "branch": "number",
    "detected_on_maps": "number",
    "missing_invisible": "number",
    "visibility_rate": "number (0-100)"
  },
  "inaction_cost": {
    "new_shadows_per_month": "string (e.g. '3-5')",
    "confusion_reviews_per_month": "string (e.g. '~50')",
    "unclaimed_at_risk": "number"
  },
  "unclaimed_data": {
    "scrape_date": "string (ISO date)",
    "report_date": "string (ISO date)",
    "total_all_categories": "number",
    "total_bank_atm": "number",
    "other_categories": "number",
    "atm_count": "number",
    "branch_count": "number"
  },
  "audit": {
    "analysed_locations_total": "number",
    "shadow_locations": "number",
    "shadow_percentage": "number",
    "unclaimed_listings": "number",
    "unclaimed_percentage": "number",
    "duplicate_clusters": "number",
    "traffic_splitting_clusters": "number",
    "category_mismatches": "number",
    "twenty_four_hour_bank_violations": "number",
    "reviews_scanned": "number",
    "location_confusion_mentions": "number",
    "atm_malfunction_mentions": "number",
    "hq_shadow_count": "number"
  },
  "clustersTop10": [
    {
      "rank": "number",
      "clusterId": "number",
      "city": "string",
      "size": "number",
      "officialCount": "number",
      "shadowCount": "number",
      "isHQ": "boolean",
      "listings": [
        {
          "segment": "'Official' | 'Shadow'",
          "title": "string",
          "placeId": "string (Google Place ID)",
          "address": "string",
          "url": "string (Google Maps search URL with query + query_place_id)"
        }
      ]
    }
  ],
  "quotesTop12": [
    {
      "id": "number",
      "title": "string (location name)",
      "segment": "'Official'",
      "stars": "number (1-5)",
      "textTR": "string",
      "textEN": "string",
      "categories": ["string"],
      "placeId": "string",
      "url": "string (Maps URL)"
    }
  ],
  "smokingGuns": [
    {
      "id": "number",
      "title": "string",
      "location": "string",
      "address": "string",
      "problem": "string",
      "talkingPoint": "string",
      "url": "string (Maps URL)"
    }
  ],
  "portfolio_results": {
    "locations_analyzed": "number",
    "visibility_increase_median": "number",
    "action_increase_median": "number",
    "success_rate": "number",
    "monthly_automated_actions": "number",
    "review_response_rate_target": "number",
    "platforms_synced": "number",
    "countries_served": "number",
    "resync_hours": "number"
  },
  "review_intelligence": {
    "total_reviews_network_estimate": "number",
    "reviews_scanned_audit": "number",
    "unanswered_percentage": "number",
    "phone_complaints_detected": "number",
    "featured_case": {
      "location": "string",
      "city": "string",
      "url": "string",
      "review_text_tr": "string",
      "review_text_en": "string",
      "suggested_response_tr": "string",
      "suggested_response_en": "string"
    }
  }
}
```

## 4.2 Pricing Inputs/Outputs

```json
{
  "PricingInputs": {
    "price_per_location_eur": 8.5,
    "cap_locations": 6500,
    "eur_try_helper_rate": "number",
    "active_locations": "number",
    "new_locations_added_this_month": "number"
  },
  "PricingOutputs": {
    "billable_locations_this_month": "min(active_locations, 6500)",
    "effective_monthly_fee_eur": "billable * 8.50",
    "cap_applied": "boolean",
    "helper_monthly_fee_try": "fee_eur * fx_rate"
  }
}
```

## 4.3 Proof Link Format

```
https://www.google.com/maps/search/?api=1&query={URL_ENCODED_TITLE}&query_place_id={PLACE_ID}
```

**Rules:**
- ALWAYS include both `query=` AND `query_place_id=`
- NEVER use `query_place_id` alone (redirects to generic map view)
- URL-encode the title (Turkish characters included)
- If placeId is missing: fall back to `query=` only (last resort)

## 4.4 Claim Status Tags

```json
{
  "ClaimStatus": ["Verified", "Modeled", "Strategic"],
  "display_labels": {
    "Verified": { "tr": "Kanıtlanmış Obenan Yeteneği", "en": "Verified Obenan Capability" },
    "Modeled": { "tr": "Tahmine Dayalı Rakip Bilgisi", "en": "Estimate-based Competitor Info" },
    "Strategic": { "tr": "Sadece Obenan Erişimi", "en": "Exclusive Obenan Access" }
  },
  "colors": {
    "Verified": "status-excellent (green)",
    "Modeled": "status-watch (amber)",
    "Strategic": "primary (blue)"
  }
}
```

## 4.5 Comparison Row Schema

```json
{
  "category": "string",
  "metric": "string",
  "obenan": "string (capability description)",
  "kaydet": "string",
  "manual": "string",
  "winner": "'Obenan' | 'Kaydet' | 'Manual' | 'Depends'",
  "status": "ClaimStatus (row-level = highest uncertainty)",
  "obenan_status": "ClaimStatus",
  "kaydet_status": "ClaimStatus",
  "manual_status": "ClaimStatus",
  "proof_note": "string",
  "obenan_headline": "string (1-line scannable)",
  "business_impact": "string",
  "has_logo_strip": "'directory' | 'oem' | undefined",
  "_tr variants": "All fields above have _tr counterparts"
}
```

---

# 5. Copy Framework

## Voice & Tone

| Attribute | Rule |
|-----------|------|
| **Persona** | Forensic auditor presenting to a board — confident, objective, data-driven |
| **Blame** | NEVER blame the prospect. All problems are "legacy data artefacts" or "opportunity zones" |
| **Urgency** | Implied through data ("this control gap grows every month"), never through alarm language |
| **Competitors** | Name them factually (Kaydet). Prefix unverified claims with "Tahmine Dayalı" |
| **Absolutes** | NEVER use "always", "never", "guaranteed" in competitive copy unless independently verified AND legal-approved |

## Executive-Safe Wording Patterns

| Instead of... | Write... |
|---------------|----------|
| "Your data is broken" | "Legacy data artefacts detected across the network" |
| "You're losing customers" | "Customer navigation signals indicate optimization opportunity" |
| "Competitors are stealing your traffic" | "Multiple entities compete for visibility at the same address" |
| "This is urgent" | "This control gap grows every month" |
| "We're the best" | "These capabilities are exclusive to the Obenan platform" |
| "They can't do this" | "This functionality is not independently confirmed" |
| "Guaranteed results" | "Conservative projected impact based on portfolio data" |

## Technical-to-Business Translation

| Technical Term | Business Translation (TR) | Business Translation (EN) |
|---------------|--------------------------|--------------------------|
| Shadow listing | Gölge konum / eski veri kalıntısı | Shadow location / legacy data artefact |
| Unclaimed | Sahipsiz (yönetişim dışı) | Unclaimed (outside governance) |
| Duplicate cluster | Mükerrer kayıt kümesi | Duplicate cluster |
| RLS policy | — (never exposed to user) | — |
| API sync | Platform senkronizasyonu | Platform synchronization |
| Emotion AI | Emotion AI (NEVER translate) | Emotion AI |

## Forbidden Phrasing

- ❌ "Book a demo"
- ❌ "Schedule a call"
- ❌ "Limited time offer"
- ❌ "Act now"
- ❌ "Don't miss out"
- ❌ "Free trial"
- ❌ "ROI guarantee"
- ❌ "We always..."
- ❌ "Competitors never..."
- ❌ "100% guaranteed" (in competitive context)
- ❌ Any CTA that implies cold outreach

---

# 6. Style Tokens

## CSS Custom Properties (from index.css :root)

```json
{
  "colors": {
    "background": "0 0% 100%",
    "foreground": "220 13% 13%",
    "primary": "209 100% 29%",
    "primary-foreground": "0 0% 100%",
    "secondary": "220 14% 96%",
    "muted": "220 14% 96%",
    "muted-foreground": "220 9% 46%",
    "cta": "173 77% 32%",
    "cta-foreground": "0 0% 100%",
    "status-excellent": "142 71% 45%",
    "status-strong": "217 91% 60%",
    "status-watch": "38 92% 50%",
    "status-focus": "48 96% 53%",
    "destructive": "38 92% 50%",
    "border": "220 13% 91%",
    "ring": "209 100% 29%"
  },
  "brand_colors_tailwind": {
    "yk-blue": "#004990",
    "yk-blue-dark": "#004587",
    "yk-navy": "#0A2864",
    "obenan-teal": "#0d9488"
  },
  "gradients": {
    "gradient-hero": "linear-gradient(180deg, white 0%, hsl(220 14% 98%) 100%)",
    "gradient-keynote": "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(209 100% 29% / 0.08), transparent)",
    "gradient-subtle": "linear-gradient(180deg, hsl(220 14% 99%) 0%, hsl(220 14% 97%) 100%)",
    "gradient-cta": "linear-gradient(135deg, hsl(173 77% 32%) 0%, hsl(173 77% 40%) 100%)"
  },
  "shadows": {
    "shadow-chip": "0 1px 3px hsl(209 100% 29% / 0.08), 0 0 0 1px hsl(209 100% 29% / 0.04)",
    "shadow-keynote": "0 25px 50px -12px hsl(209 100% 29% / 0.12), 0 0 0 1px hsl(209 100% 29% / 0.05)",
    "shadow-cta": "0 4px 14px hsl(173 77% 32% / 0.25)",
    "shadow-glow": "0 0 40px hsl(209 100% 29% / 0.1)"
  },
  "typography": {
    "font-family": "'Inter', system-ui, sans-serif",
    "font-weights": [300, 400, 500, 600, 700, 800, 900]
  },
  "spacing": {
    "section-padding-y": "py-24",
    "section-padding-x": "px-4",
    "max-width": "max-w-5xl (content) / max-w-6xl (tables)",
    "card-padding": "p-6 to p-8",
    "card-radius": "rounded-2xl",
    "chip-radius": "rounded-full"
  },
  "radius": "0.75rem"
}
```

## Badge System

| Badge Type | Style |
|-----------|-------|
| Section badge | `text-sm font-medium uppercase tracking-wider text-primary bg-primary/10 px-4 py-2 rounded-full` |
| Stat chip | `bg-white/90 backdrop-blur-sm border border-border rounded-full px-4 py-2.5 shadow-chip` |
| Status: Verified | `bg-status-excellent/10 text-status-excellent border-status-excellent/20 rounded-full` |
| Status: Modeled | `bg-status-watch/10 text-status-watch border-status-watch/20 rounded-full` |
| Status: Strategic | `bg-primary/10 text-primary border-primary/20 rounded-full` |
| Risk warning | `bg-status-watch/10 border-status-watch/30 rounded-full` |

## Card Hierarchy

1. **Premium card**: `bg-white border border-border shadow-lg rounded-2xl` (main content)
2. **Subtle card**: `bg-secondary/30 rounded-2xl border border-border` (background stats)
3. **Status card**: Same as subtle + status-colored border (e.g., `border-status-excellent/20`)
4. **Comparison cell**: `bg-status-excellent/[0.04]` (Obenan) / `bg-status-watch/[0.04]` (Kaydet) / `bg-destructive/[0.03]` (Manual)

## CTA Hierarchy

This page has NO CTAs (by design). But for sections where emphasis is needed:
1. **Primary emphasis**: `bg-cta text-cta-foreground shadow-cta` (Obenan teal)
2. **Secondary emphasis**: `bg-primary text-primary-foreground` (prospect blue)
3. **Tertiary**: `bg-secondary text-foreground border-border`

---

# 7. Proof System

## Evidence Types

### 1. Duplicate Clusters
- **Data source**: `prospectPack.clustersTop10`
- **Display**: Cards showing official vs shadow count per city
- **Expandable**: Click to see individual listings with segment badges
- **Map links**: Each listing has a verified Maps URL

### 2. Customer Review Quotes
- **Data source**: `prospectPack.quotesTop12`
- **Display**: Review cards with star rating, original Turkish text, English translation
- **Categories**: Location Confusion, ATM Malfunction
- **Map links**: Each review links to the reviewed location

### 3. Smoking Guns
- **Data source**: `prospectPack.smokingGuns`
- **Display**: 5 handpicked findings with problem description + executive talking point
- **Purpose**: "Credibility anchors" — specific examples that prove systemic issues

### 4. Unclaimed Proof Explorer
- **Data source**: CSV files loaded at runtime (`/public/data/unclaimed-bank-atm.csv`)
- **Display**: Searchable, filterable table with 976 entries
- **Verification methodology**: "5 Seconds" — click Maps → look for "Claim this business"
- **Map link validation**: Three-priority system:
  1. Use exact `maps_url` from CSV if valid (has both `query=` and `query_place_id=`)
  2. Rebuild with title + placeId if maps_url invalid
  3. Last resort: title-only search (marks as missing placeId)

### 5. Policy Anomalies
- **Data source**: `prospectPack.twentyFourHourViolations`, `prospectPack.categoryMismatches`
- **Display**: Count badges + screenshot evidence (Gölcük branch)
- **Screenshot**: `/src/assets/golcuk-review-screenshot-tr.png` (TR) and `en.png` (EN)

### 6. HQ Proof
- **Data source**: `prospectPack.clustersTop10` filtered by `isHQ: true`
- **Purpose**: "Even headquarters has governance gaps" — high executive impact

## Map Link Validation Logic

```typescript
function validateAndBuildMapsUrl(location) {
  // Priority 1: Use exact CSV URL if it has both query= and query_place_id=
  if (maps_url && maps_url.includes('query=') && maps_url.includes(placeId)) {
    return { url: maps_url, isValid: true };
  }
  // Priority 2: Rebuild with both parameters
  if (placeId) {
    return { url: `https://www.google.com/maps/search/?api=1&query=${encode(title)}&query_place_id=${placeId}`, wasRebuilt: true };
  }
  // Priority 3: Title-only fallback
  return { url: `https://www.google.com/maps/search/?api=1&query=${encode(title)}`, hasMissingPlaceId: true };
}
```

## Fallback Rules

- Missing placeId → search by title only (flagged in Evidence Integrity Report)
- Missing maps_url → rebuild from title + placeId
- Missing title → use "Yapı Kredi" as default query text
- CDN image failure → no fallback currently (**known gap**)

---

# 8. Pricing Logic

## Formula

```
billable_locations = min(active_locations, 6500)
monthly_fee_eur = billable_locations × €8.50
annual_fee_eur = monthly_fee_eur × 12
```

## Integer-Cents Math

All calculations use integer cents (850 per location) to prevent floating-point drift. Only divide to EUR at display time.

## Full-Portfolio Example (YapiKredi)

```
active_locations = 6,753
cap = 6,500
billable = 6,500 (cap applied)
free_locations = 253
monthly_fee = 6,500 × €8.50 = €55,250.00
annual_fee = €55,250.00 × 12 = €663,000.00
```

## Framing

- "253 lokasyon ücretsiz dahil" — cap is positioned as generosity, not limitation
- "Tam Koruma Paketi" (Full Protection Package) — security framing
- "Aktif Korunan Lokasyon" (Actively Protected Locations) — protection language
- "Onay Bekleyen Riskli Noktalar" (Risk Points Awaiting Approval) — urgency without alarm

## Manual Baseline Comparison

Three intensity bands for "what it costs to do this manually":

| Band | Hours/100 locations | Overhead | Fixed tooling |
|------|-------------------|----------|---------------|
| Low | 52 | 15% | €900 |
| Base | 76 | 20% | €1,200 |
| High | 108 | 25% | €1,800 |

**Default display**: High band (maximizes contrast with Obenan pricing)

## TRY Helper Policy

- EUR is the contracting currency
- TRY values are "helper conversions only" — displayed with explicit disclaimer
- FX rate stored in `comparisonPricingPack.pricing.eur_try_helper_rate` (currently 39)
- UI disclaimer: "TRY değerleri yalnızca yardımcı dönüşümlerdir. Sözleşme ve faturalandırma EUR cinsindendir."

## Legal-Safe Disclaimers

1. "Competitor statements marked Modeled or Strategic require external verification before legal/commercial publication."
2. "TRY values are helper conversions only. Contracting and billing are in EUR."

---

# 9. QA Checklist

## Pre-Ship Verification

| # | Check | Pass/Fail Criteria | Priority |
|---|-------|-------------------|----------|
| 1 | **Language parity** | Toggle TR→EN→TR: no English text visible in TR mode, no Turkish in EN mode | HIGH |
| 2 | **Prospect name** | Search for old prospect name (e.g., "Yapı Kredi") — zero occurrences except in evidence data | HIGH |
| 3 | **KPI rendering** | All AnimatedCounter instances show non-zero final values | HIGH |
| 4 | **Map links** | Click 10 random links across sections — each opens correct Google Maps profile | HIGH |
| 5 | **Pricing numbers** | Monthly fee = min(locations, 6500) × 8.50. Annual = monthly × 12. | HIGH |
| 6 | **Mobile layout (390px)** | All sections readable, no horizontal overflow, comparison matrix collapses to cards | HIGH |
| 7 | **Intro skip** | Click "Skip →" immediately — main content loads with no errors | MEDIUM |
| 8 | **Unclaimed explorer** | CSV loads, filter works, search returns results, "Load More" adds rows | MEDIUM |
| 9 | **Marquee hover** | Marquee pauses on hover, cards are clickable | MEDIUM |
| 10 | **CDN images** | All logo images load (check Network tab for 404s from preprodapi.obenan.com) | MEDIUM |
| 11 | **Print layout** | Ctrl+P produces readable output (currently FAILS — known gap) | LOW |
| 12 | **Accessibility** | Focus indicators visible on interactive elements. Alt text on images. | LOW |
| 13 | **Performance** | First Contentful Paint < 2s on 4G. No layout shifts during animation. | LOW |
| 14 | **Console errors** | Zero errors in console on full page scroll-through | MEDIUM |
| 15 | **"130+ vs 70+"** | All platform count references use consistent number (should be "70+") | HIGH |

---

# 10. Playwright Smoke Tests

## Test 1: TR/EN Toggle Integrity

```
Step 1: Navigate to page, wait for intro to complete (or click Skip)
Step 2: Verify page is in Turkish (default) — check for "Tek Komuta Merkezi" in H1
Step 3: Click language toggle (top-right floating button with "EN" text)
Step 4: Verify page switched — check for "One Command Center" in H1
Step 5: Scroll to PricingComparisonSection — verify "Verified Obenan Capability" badge text
Step 6: Toggle back to TR — verify "Kanıtlanmış Obenan Yeteneği" badge text
Selector: Language toggle → button with text "EN" or "TR"
Pass: No mixed-language text in any mode
```

## Test 2: KPI Rendering (No Zero-Stuck States)

```
Step 1: Skip intro → scroll to ValuePropositionSection
Step 2: Wait 3 seconds for AnimatedCounter to complete
Step 3: Read first metric value — should be "3,100+" (not "0")
Step 4: Read second metric value — should be "100" (not "0")
Step 5: Read third metric value — should be "507,000+" (not "0")
Selector: .tabular-nums elements inside ValuePropositionSection
Pass: All three counters show non-zero final values
```

## Test 3: Map Link Opening Behavior

```
Step 1: Scroll to UnclaimedProofExplorer section
Step 2: Click first "Google Maps'te Aç" button
Step 3: Verify new tab opens with URL containing both "query=" and "query_place_id="
Step 4: Scroll to SmokingGunsSection
Step 5: Click first "Google Haritalar'da Görüntüle" link
Step 6: Verify URL format matches pattern
Selector: a[href*="google.com/maps"] or Button with text "Google Maps"
Pass: All links contain both query parameters
```

## Test 4: Section Readability (Scroll-Through)

```
Step 1: Skip intro
Step 2: Scroll slowly through all 23 sections
Step 3: At each section, verify: H2 heading visible, no overlapping text, no empty cards
Step 4: At TransformationSection, verify toggle switches between "Today" and "With Obenan"
Step 5: At FoundationSection, verify logo grid renders (no broken images)
Pass: No section has invisible/broken content
```

## Test 5: Pricing Numbers

```
Step 1: Scroll to PricingComparisonSection
Step 2: Find pricing card
Step 3: Verify monthly fee displays "€55.250,00" (TR) or "€55,250.00" (EN)
Step 4: Verify annual fee displays "€663.000,00" (TR) or "€663,000.00" (EN)
Step 5: Verify "253 lokasyon ücretsiz" text (cap benefit)
Pass: Numbers match formula: min(6753, 6500) × 8.50 = 55,250
```

---

# 11. Known Pitfalls

## HIGH Priority

| # | Pitfall | Impact | Avoidance |
|---|---------|--------|-----------|
| 1 | **"130+ vs 70+" inconsistency** | ProductIdentitySection says "130+ dizin" while all other sections say "70+". Executives will notice. | Standardize to "70+" everywhere or update ProductIdentitySection if 130+ is correct. |
| 2 | **No sticky navigation** | 23 sections with no way to jump. Executives lose their place. | Add a sticky TOC or at minimum a "Back to top" button. |
| 3 | **CDN dependency for logos** | All directory/OEM logos load from `preprodapi.obenan.com`. If CDN is down during a live demo, broken images. | Download and bundle critical logos locally in `/public/logos/`. |
| 4 | **"100% Yanıt Oranı (Garantili)"** | "(Guaranteed)" is an absolute claim that violates the project's own Absolute Wording Policy. | Change to "Hedeflenen" (Targeted) or add "Modeled estimate:" prefix. |
| 5 | **No print stylesheet** | Executives may want to PDF the report. Current layout breaks on print. | Add `@media print` styles or generate a separate PDF export. |

## MEDIUM Priority

| # | Pitfall | Impact | Avoidance |
|---|---------|--------|-----------|
| 6 | **Mobile matrix: 8 taps needed** | Each comparison row requires tap to expand. Full matrix review = minimum 8 taps. | Consider "Expand all" button or show headlines without tapping. |
| 7 | **Marquee cards hard to click on mobile** | Infinite scroll makes cards moving targets on touch devices. | Ensure pause-on-touch (not just hover). Consider stopping on first touch. |
| 8 | **Dual localization sources** | `LanguageContext.translations` AND per-component `content.tr/en` objects. If they diverge, bugs. | Pick one approach. Per-component inline is simpler for this use case. |
| 9 | **Intro blocks tracking** | Session tracking waits for auth, but intro plays before auth check. 4.5s of untracked time. | Initialize tracking earlier, or track intro separately. |
| 10 | **CSV data loaded at runtime** | If CSV fetch fails (network issue), UnclaimedProofExplorer shows empty state with no user feedback. | Add loading skeleton and error message. |

## LOW Priority

| # | Pitfall | Impact | Avoidance |
|---|---------|--------|-----------|
| 11 | **No error boundaries** | A single broken component crashes the entire page. | Add React ErrorBoundary per section. |
| 12 | **AnimatedCounter locale** | Counter uses browser locale by default. Ensure `key` remount pattern is used for language switches. | Already handled in most places but verify on language toggle. |
| 13 | **Magic link expiry** | If auth magic link expires, user sees a generic error with no graceful re-entry. | Add link-expired detection and "Request new link" UX. |

---

# 12. İş Bankası Migration Plan

## Brand Swap Steps

### 12.1 Logo
- [ ] Obtain İş Bankası SVG logo (similar size/proportion to yapikredi-logo.svg)
- [ ] Place at `/public/isbank-logo.svg`
- [ ] Update references in:
  - `CinematicIntro.tsx` (line ~101)
  - `HeroSection.tsx` (line ~63)
  - `ClosingCTASection.tsx` (line ~96)

### 12.2 Colors
- [ ] Update `index.css` `:root`:
  - `--primary`: Change from `209 100% 29%` (YK blue #004990) to İş Bankası blue
  - `--ring`: Match to new primary
  - `--gradient-primary`: Update HSL values
  - `--gradient-keynote`: Update opacity hue
  - `--shadow-glow`: Update hue reference
  - `--shadow-chip`: Update hue reference
  - `--shadow-keynote`: Update hue reference
- [ ] Update `tailwind.config.ts`:
  - Rename `yk` color group to `ib` (or `isbank`)
  - Update hex values
- [ ] `--cta` (Obenan teal) stays THE SAME — this is Obenan's brand color, not the prospect's

### 12.3 Typography
- [ ] Keep Inter font — it's the design system font, not prospect-specific
- [ ] If İş Bankası has a brand font, add it to Google Fonts import in `index.css`

## Data Source Swap Steps

### 12.4 prospectPack.ts
- [ ] Update `prospect.name`: "İş Bankası"
- [ ] Update `prospect.logoUrl`: "/isbank-logo.svg"
- [ ] Update `prospect.primaryColor`: İş Bankası hex
- [ ] Replace ALL audit data with İş Bankası audit results
- [ ] Replace `clustersTop10` with İş Bankası clusters
- [ ] Replace `quotesTop12` with İş Bankası reviews
- [ ] Replace `smokingGuns` with İş Bankası findings
- [ ] Replace `review_intelligence` featured case
- [ ] Update `reportDate` to current date
- [ ] Update `official_network` with İş Bankası network size

### 12.5 Unclaimed Data
- [ ] Replace `/public/data/unclaimed-bank-atm.csv` with İş Bankası data
- [ ] Replace `/public/data/unclaimed-all-categories.csv`
- [ ] Replace `/public/data/unclaimed-summary.json`

### 12.6 Comparison Pricing Pack
- [ ] Update `comparisonPricingPack.metadata.pack_id`: "isbank_obenan_kaydet_manual_pricing_v1"
- [ ] Update `pricing.active_locations` with İş Bankası network size
- [ ] Recalculate `pricing_output_examples` for new location count
- [ ] Update any İş-specific competitor name if different from Kaydet
- [ ] Keep all comparison rows identical (they describe Obenan capabilities, not prospect-specific)

### 12.7 Screenshots
- [ ] Replace `/src/assets/golcuk-review-screenshot-tr.png` with İş Bankası equivalent
- [ ] Replace EN version

## What to Keep Identical

- ✅ All component architecture and file structure
- ✅ Pricing formula (€8.50 × min(N, 6500))
- ✅ Comparison matrix structure (8 rows, 3 columns)
- ✅ Claim confidence system (Verified/Modeled/Strategic)
- ✅ Proof system architecture (CSV → parser → explorer)
- ✅ Map link validation logic (query + query_place_id)
- ✅ Animation system (Framer Motion, useScrollPhase)
- ✅ Design tokens (except --primary color)
- ✅ Copy framework (Zero Blame, no absolutes, no CTAs)
- ✅ Language toggle mechanism
- ✅ "Emotion AI" brand name preservation
- ✅ Obenan teal CTA color

## What to Customize

- 🔄 Prospect name in all inline content objects
- 🔄 Logo SVG
- 🔄 Primary brand color
- 🔄 All audit data (network size, shadows, unclaimed, reviews, clusters)
- 🔄 Report date
- 🔄 Auth email template branding
- 🔄 Domain (isbank.obenan.tech or isbank.lovable.app)

## Final Acceptance Gates

| Gate | Criteria |
|------|----------|
| 1. Data integrity | All KPIs in components match prospectPack values |
| 2. Brand purity | Zero "Yapı Kredi" text outside evidence data (reviews may reference it historically) |
| 3. Language parity | Full TR/EN coverage with no mixed-language strings |
| 4. Map link validity | 10 random links open correct Google Maps profiles |
| 5. Pricing accuracy | Monthly and annual fees match formula for İş Bankası network size |
| 6. Mobile readiness | All sections readable at 390px width |
| 7. Performance | Page loads under 3s on 4G |
| 8. Auth flow | Magic link arrives, grants access, engagement tracked |

---

## Top 10 Strongest Patterns to Reuse

1. **Centralized data contract** — `prospectPack.ts` as single source of truth for all KPIs
2. **Bilingual inline content** — `content.tr/en` objects in each component; no i18n library overhead
3. **AnimatedCounter with key-remount** — `key={value}` forces re-animation, prevents zero-stuck
4. **Scroll-phase driven storytelling** — `useScrollPhase` auto-transitions "Today vs Obenan" on scroll
5. **Claim confidence transparency** — per-cell Verified/Modeled/Strategic with color-coded badges
6. **Map link safety** — `query + query_place_id` pattern with three-priority validation
7. **Apple Keynote aesthetic** — gradient-keynote, shadow-chip, shadow-keynote CSS tokens
8. **Cap-as-generosity pricing** — "253 locations free" reframes billing cap as a selling point
9. **Self-verification proof explorer** — "Verify it yourself" with live Maps links builds trust
10. **Zero-blame copy framework** — "legacy data artefacts" positioning protects the executive relationship

## Top 10 Weaknesses to Fix in Future Clones

1. **No sticky nav/TOC** → Add section indicators or floating mini-nav (HIGH)
2. **Mobile comparison matrix** → Show headlines without tap, or add "Expand All" (HIGH)
3. **CDN logo dependency** → Bundle critical logos locally (HIGH)
4. **"Guaranteed" absolute claim** → Fix wording to comply with own policy (HIGH)
5. **No print stylesheet** → Add `@media print` or PDF export (HIGH)
6. **"130+ vs 70+" inconsistency** → Standardize platform count (HIGH)
7. **No loading/error states for CSV** → Add skeleton + error handling (MEDIUM)
8. **Marquee touch UX** → Implement pause-on-touch for mobile (MEDIUM)
9. **Dual localization sources** → Consolidate to one approach (MEDIUM)
10. **No error boundaries** → Wrap each section in ErrorBoundary (LOW)

---

*End of recipe. This document is executable by a new Lovable AI agent with no additional decisions needed.*
