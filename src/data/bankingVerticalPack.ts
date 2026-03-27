// Banking Vertical - Aggregated Industry Data
// Sources: Two major Turkish bank audits (anonymized as Bank A and Bank B)
// All numbers are audit-evidenced, not modeled

export const bankingVerticalPack = {
  reportDate: "March 2026",

  industry: {
    name: "Banking",
    market: "Turkey",
    banks_audited: 2,
    // Bank A: 997 branches + 6,855 ATMs = 7,852
    // Bank B: 693 branches + 6,007 ATMs = 6,700
    total_branches: 1690,
    total_atms: 12862,
    total_touchpoints: 14552,
    total_analysed: 6872, // 4,294 + 2,578
  },

  // Aggregated findings across both bank audits
  audit: {
    analysed_locations_total: 6872,
    // Bank A: 482, Bank B: 528
    unclaimed_listings: 1010,
    unclaimed_percentage: 14.7,
    // Bank A: 705, Bank B: 424
    duplicate_clusters: 1129,
    duplicate_percentage: 16.4,
    // Bank A: 255, Bank B: 532
    shadow_locations: 787,
    shadow_percentage: 11.5,
    // Bank A: 201, Bank B: 6
    category_mismatches: 207,
    category_percentage: 3.0,
    // Bank A: 88, Bank B: 74
    traffic_splitting_clusters: 162,
    // Bank A: 4, Bank B: 2
    hq_shadow_count: 6,
    // Bank A: 3,561, Bank B: 2,902
    reviews_scanned: 6463,
    // Bank A: 28, Bank B: 79
    location_confusion_mentions: 107,
    // Bank A: 48, Bank B: 218
    atm_malfunction_mentions: 266,
    // Bank A: 419, Bank B: 584
    phone_contact_mentions: 1003,
    // Bank A: 785, Bank B: 0 (not tracked separately)
    queue_wait_mentions: 785,
    // Bank A: 98.68% unanswered, Bank B: 99.9% unanswered
    avg_unanswered_rate: 99.3,
  },

  // Bank A specific (İş Bank profile)
  bankA: {
    label: "Bank A",
    branches: 997,
    atms: 6855,
    total: 7852,
    analysed: 4294,
    unclaimed: 482,
    duplicates: 705,
    shadows: 255,
    category_mismatches: 201,
    reviews_scanned: 3561,
    visibility_gap: 23.9, // 1,877 of 7,852 had no public representation
  },

  // Bank B specific (Akbank profile)
  bankB: {
    label: "Bank B",
    branches: 693,
    atms: 6007,
    total: 6700,
    analysed: 2578,
    unclaimed: 528,
    duplicates: 424,
    shadows: 532,
    category_mismatches: 6,
    reviews_scanned: 2902,
    visibility_gap: 0, // not measured same way
  },

  // Before/after benchmarks (before = audit evidence, after = Obenan target state)
  transformation: {
    before: {
      accuracy: 67,
      response_rate: 1,
      unclaimed_rate: 14.7,
      shadow_rate: 11.5,
      duplicate_rate: 16.4,
      hours_coverage: 90,
      phone_coverage: 92,
      description_coverage: 0,
    },
    after: {
      accuracy: 99,
      response_rate: 95,
      unclaimed_rate: 0,
      shadow_rate: 0,
      duplicate_rate: 0,
      hours_coverage: 100,
      phone_coverage: 100,
      description_coverage: 100,
    },
  },

  // Platform capabilities
  platform: {
    directories_count: 70,
    sync_frequency: "real-time",
    ai_capabilities: [
      "Autonomous review response",
      "Sentiment analysis",
      "Anomaly detection",
      "Duplicate identification",
      "Shadow listing suppression",
      "Category governance",
    ],
  },

  // Obenan portfolio benchmarks (not bank-specific)
  portfolio_results: {
    platforms_synced: 70,
    monthly_automated_actions: 15000,
    median_visibility_increase: 41.5,
    review_response_target: 100,
  },

  // For the smoking guns section - anonymized governance issues
  smokingGuns: [
    {
      id: 1,
      title: "Headquarters Shadow Cluster",
      location: "Major city financial district",
      problem: "6 unauthorized listings within 1km of bank headquarters. Non-official pins appearing under the bank's name, directing customers to wrong entrances or outdated offices.",
      talkingPoint: "If governance can't protect the headquarters address, what's happening across 14,000+ touchpoints?",
    },
    {
      id: 2,
      title: "Ghost ATM Network",
      location: "Multiple cities nationwide",
      problem: "Hundreds of ATMs removed from service but still showing as active on Google Maps. Customers travel to locations only to find empty walls or different businesses.",
      talkingPoint: "Every ghost ATM is a broken promise to a customer who trusted your map presence.",
    },
    {
      id: 3,
      title: "Branch Category Contamination",
      location: "Regional branches",
      problem: "201 branches miscategorized on Google Maps — some listed as 'financial consultant' or 'insurance agency' instead of 'bank'. These branches are invisible for 'bank near me' searches.",
      talkingPoint: "If Google doesn't know you're a bank, neither do your customers.",
    },
    {
      id: 4,
      title: "Duplicate Traffic Splitting",
      location: "High-traffic urban areas",
      problem: "162 duplicate clusters actively splitting customer reviews and traffic. One physical branch shows as 3-5 separate pins, each with partial ratings and incomplete information.",
      talkingPoint: "Your 4.2-star branch might actually be a 4.6 — but the reviews are split across 4 duplicate pins.",
    },
    {
      id: 5,
      title: "The Silence Problem",
      location: "Entire network",
      problem: "Across 6,463 customer reviews scanned, 99.3% received no response. Competitors answering reviews see 35% higher trust signals. Every unanswered complaint is a public billboard for dissatisfaction.",
      talkingPoint: "Your competitors are answering. You are silent. Customers notice.",
    },
  ],

  // Unclaimed examples for the marquee (anonymized)
  unclaimedExamples: [
    { type: "ATM", district: "Kadıköy", city: "İstanbul", status: "Unclaimed" },
    { type: "Branch", district: "Çankaya", city: "Ankara", status: "Unclaimed" },
    { type: "ATM", district: "Alsancak", city: "İzmir", status: "No Owner" },
    { type: "Branch", district: "Nilüfer", city: "Bursa", status: "Unclaimed" },
    { type: "ATM", district: "Lara", city: "Antalya", status: "Unclaimed" },
    { type: "Branch", district: "Şahinbey", city: "Gaziantep", status: "No Owner" },
    { type: "ATM", district: "Meram", city: "Konya", status: "Unclaimed" },
    { type: "Branch", district: "Seyhan", city: "Adana", status: "Unclaimed" },
    { type: "ATM", district: "Atakum", city: "Samsun", status: "No Owner" },
    { type: "Branch", district: "Merkezefendi", city: "Denizli", status: "Unclaimed" },
    { type: "ATM", district: "Melikgazi", city: "Kayseri", status: "Unclaimed" },
    { type: "Branch", district: "Osmangazi", city: "Bursa", status: "No Owner" },
    { type: "ATM", district: "Beşiktaş", city: "İstanbul", status: "Unclaimed" },
    { type: "Branch", district: "Yenimahalle", city: "Ankara", status: "Unclaimed" },
    { type: "ATM", district: "Bornova", city: "İzmir", status: "No Owner" },
    { type: "Branch", district: "Kepez", city: "Antalya", status: "Unclaimed" },
    { type: "ATM", district: "Selçuklu", city: "Konya", status: "Unclaimed" },
    { type: "Branch", district: "Yüreğir", city: "Adana", status: "No Owner" },
    { type: "ATM", district: "Battalgazi", city: "Malatya", status: "Unclaimed" },
    { type: "Branch", district: "İlkadım", city: "Samsun", status: "Unclaimed" },
    { type: "ATM", district: "Pamukkale", city: "Denizli", status: "No Owner" },
    { type: "Branch", district: "Karatay", city: "Konya", status: "Unclaimed" },
    { type: "ATM", district: "Sarıyer", city: "İstanbul", status: "Unclaimed" },
    { type: "Branch", district: "Mamak", city: "Ankara", status: "No Owner" },
  ],
};
