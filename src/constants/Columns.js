export const WATCHLIST_DROPDOWNS = [
  {
    id: "1",
    label: "Watch",
  },
  {
    id: "2",
    label: "Watch & Buy",
  },
  {
    id: "3",
    label: "Buy",
  },
  {
    id: "5",
    label: "Sell",
  },
  {
    id: "4",
    label: "Short",
  },
];

export const TRADE_TYPE_DROPDOWNS = [
  {
    id: 1,
    label: "Delivery",
  },
  {
    id: 2,
    label: "Intraday Buy (Cash)",
  },
  {
    id: 3,
    label: "Intraday Short (Cash)",
  },
  {
    id: 4,
    label: "Intraday Buy (Margin)",
  },
  {
    id: 5,
    label: "Intraday Short (Margin)",
  },
  {
    id: 6,
    label: "Carry Forward",
  },
  {
    id: 7,
    label: "Other",
  },
];

export const TRADE_ANALYSIS_DETAILS_COLUMNS = [
  "Month",
  "Total Trades",
  "Win Trades",
  "Loss Trades",
  "Win Ratio",
  "Loss Ratio",
  "Total Gain",
  "Total Bought",
  "Total Sold",
];

export const TRADE_ANALYSIS_USER_COLUMNS = [
  "User",
  ...TRADE_ANALYSIS_DETAILS_COLUMNS,
];

export const TRADE_FILTERS_DROPDOWNS = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "Gain",
  },
  {
    id: 3,
    label: "Loss",
  },
];
