// utils/currency.ts
export const currencySymbols: Record<string, string> = {
  GHS: "GH₵", // Ghana Cedi
  USD: "USD$",
  EUR: "€",
  GBP: "£",
};

export const conversionRates: Record<string, number> = {
  GHS: 1,      // Base
  USD: 0.085,  // Example rate
  EUR: 0.078,
  GBP: 0.067,
};
