

## Reorganize Foundation Section Layout

### What Changes

The section will be restructured into 3 visual tiers:

**1. Anchor Card (full width, top position)**
- "Yapi Kredi Web Sitesi" moves from inside the NetworkLogoGrid to the very top, before the featured cards
- Keeps its current full-width hero treatment with 100% synced badge

**2. Featured Row 1 (3 large cards with progress bars)**
- Google -- 54%
- Facebook -- 0%
- Apple Haritalar -- 22% (updated from current 0%)

**3. Featured Row 2 (3 large cards with progress bars)**
- Bing -- 12% (promoted from network grid to featured)
- Yandex -- 43% (promoted from network grid to featured)
- TomTom -- 4% (promoted from network grid to featured)

**4. Remaining network grid + collapsible tiers** stay below as-is, minus the 3 platforms promoted above.

### Technical Details

**File: `src/components/FoundationSection.tsx`**

1. Update `currentPercent` values in the directories array:
   - `APPLE_MAPS`: 0 to 22
   - `BING`: 0 to 12
   - `YANDEX`: 0 to 43
   - `TOMTOM`: 0 to 4

2. Expand `featuredKeys` to include both rows:
   - Row 1: `["GOOGLE", "FACEBOOK", "APPLE_MAPS"]`
   - Row 2: `["BING", "YANDEX", "TOMTOM"]`

3. Restructure the JSX render order:
   - Anchor card rendered first (extracted from NetworkLogoGrid, placed as standalone full-width card)
   - Featured Row 1 (3-col grid)
   - Featured Row 2 (3-col grid)
   - NetworkLogoGrid with remaining tier 1 platforms (without anchor)
   - Collapsible tier 2/3 sections unchanged

4. Remove `anchorDirectory` prop from `NetworkLogoGrid` call since the anchor is now rendered separately above the featured cards. The anchor card JSX will be placed directly in `FoundationSection.tsx` using the same styling pattern currently in `NetworkLogoGrid.tsx`.

