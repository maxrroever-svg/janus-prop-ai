// Mock data for the Janus AI platform - NYC & Puerto Rico focus

export const mockDeals = [
  // Brooklyn Deals
  {
    id: "deal-1",
    address: "1247 Atlantic Avenue",
    city: "Brooklyn",
    state: "NY",
    zip: "11216",
    lat: 40.6782,
    lon: -73.9442,
    propertyType: "Multi-Family",
    units: 4,
    distressSignals: ["tax_delinquency", "building_violations"],
    score: 87,
    status: "NEW",
    listPrice: 650000,
    arv: 850000,
    rehab: 120000,
    noi: 78000,
    coc: 14.2,
    dscr: 1.45
  },
  {
    id: "deal-2", 
    address: "156 MacDonough Street",
    city: "Brooklyn",
    state: "NY",
    zip: "11233",
    lat: 40.6829,
    lon: -73.9441,
    propertyType: "Single Family",
    units: 1,
    distressSignals: ["below_market_rent", "lien"],
    score: 82,
    status: "REVIEWING",
    listPrice: 420000,
    arv: 580000,
    rehab: 85000,
    noi: 52000,
    coc: 12.8,
    dscr: 1.32
  },

  // Queens Deals
  {
    id: "deal-3",
    address: "91-15 Corona Avenue", 
    city: "Queens",
    state: "NY",
    zip: "11368",
    lat: 40.7498,
    lon: -73.8648,
    propertyType: "Multi-Family",
    units: 3,
    distressSignals: ["tax_delinquency"],
    score: 79,
    status: "NEW",
    listPrice: 580000,
    arv: 720000,
    rehab: 95000,
    noi: 68000,
    coc: 13.5,
    dscr: 1.38
  },

  // Bronx Deals
  {
    id: "deal-4",
    address: "1455 Webster Avenue",
    city: "Bronx", 
    state: "NY",
    zip: "10456",
    lat: 40.8303,
    lon: -73.9097,
    propertyType: "Multi-Family",
    units: 2,
    distressSignals: ["building_violations", "below_market_rent"],
    score: 75,
    status: "NEW",
    listPrice: 385000,
    arv: 520000,
    rehab: 75000,
    noi: 48000,
    coc: 15.1,
    dscr: 1.28
  },

  // San Juan, PR Deals
  {
    id: "deal-5",
    address: "1567 Calle San Sebastián",
    city: "San Juan",
    state: "PR", 
    zip: "00901",
    lat: 18.4671,
    lon: -66.1185,
    propertyType: "Single Family",
    units: 1,
    distressSignals: ["tax_delinquency", "lien"],
    score: 89,
    status: "NEW",
    listPrice: 185000,
    arv: 285000,
    rehab: 45000,
    noi: 32000,
    coc: 18.7,
    dscr: 1.52
  },
  {
    id: "deal-6",
    address: "234 Avenida Ashford",
    city: "San Juan",
    state: "PR",
    zip: "00907", 
    lat: 18.4574,
    lon: -66.0847,
    propertyType: "Multi-Family",
    units: 4,
    distressSignals: ["below_market_rent"],
    score: 84,
    status: "REVIEWING",
    listPrice: 320000,
    arv: 425000,
    rehab: 60000,
    noi: 54000,
    coc: 16.9,
    dscr: 1.41
  },

  // Carolina, PR Deals
  {
    id: "deal-7",
    address: "789 Calle Principal",
    city: "Carolina", 
    state: "PR",
    zip: "00983",
    lat: 18.3809,
    lon: -65.9574,
    propertyType: "Single Family",
    units: 1,
    distressSignals: ["building_violations"],
    score: 77,
    status: "NEW", 
    listPrice: 165000,
    arv: 235000,
    rehab: 35000,
    noi: 28000,
    coc: 17.2,
    dscr: 1.48
  },

  // Bayamón, PR Deals
  {
    id: "deal-8",
    address: "456 Calle Degetau",
    city: "Bayamón",
    state: "PR",
    zip: "00956",
    lat: 18.3988,
    lon: -66.1614,
    propertyType: "Multi-Family",
    units: 2,
    distressSignals: ["tax_delinquency", "below_market_rent"],
    score: 81,
    status: "NEW",
    listPrice: 195000,
    arv: 275000,
    rehab: 40000,
    noi: 36000,
    coc: 19.4,
    dscr: 1.55
  }
];

export const mockComps = {
  "deal-1": [
    {
      address: "1245 Atlantic Avenue",
      distanceKm: 0.1,
      beds: 2,
      baths: 1,
      sqft: 950,
      price: 485000,
      soldAt: "2024-01-15",
      capRate: 6.8
    },
    {
      address: "89 MacDonough Street", 
      distanceKm: 0.2,
      beds: 3,
      baths: 2,
      sqft: 1200,
      price: 520000,
      soldAt: "2024-02-03",
      capRate: 7.1
    }
  ]
};

export const mockOwners = {
  "deal-1": {
    name: "Maria Rodriguez",
    email: "mrodriguez@email.com",
    phone: "(718) 555-0123",
    mailingAddress: "1247 Atlantic Avenue, Brooklyn, NY 11216"
  },
  "deal-5": {
    name: "Carlos Méndez",
    email: "cmendez@email.com", 
    phone: "(787) 555-0198",
    mailingAddress: "1567 Calle San Sebastián, San Juan, PR 00901"
  }
};

export const agentStatusMessages = {
  THEME_SCOUT: {
    idle: "Ready to scan permits, liens, violations...",
    running: "Scanning permits, liens, violations...",
    done: "Market data compiled. 3 distress signals found.",
    error: "Data source unavailable. Retrying..."
  },
  UNDERWRITER: {
    idle: "Standing by for comp analysis...",
    running: "Analyzing comps and sensitivities...", 
    done: "Comps aligned. Sensitivities ready.",
    error: "Comp data incomplete. Manual review needed."
  },
  LEGAL: {
    idle: "Title research ready...",
    running: "Reviewing title, liens, zoning...",
    done: "3 findings—review required.",
    error: "Title records unavailable."
  },
  CAPITAL: {
    idle: "Lender network standby...",
    running: "Calculating DSCR, matching lenders...",
    done: "DSCR pass @ 6.75%.",
    error: "Rate data stale. Refreshing..."
  },
  OUTREACH: {
    idle: "Contact research ready...",
    running: "Matching owner, preparing drafts...",
    done: "Owner matched. Drafts prepared.",
    error: "Contact information incomplete."
  }
};