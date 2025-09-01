// utils/currency.ts

// Currency symbols
export const currencySymbols: Record<string, string> = {
  GHS: "GH₵",
  USD: "USD$",
  EUR: "€",
  GBP: "£",
}

// Prices for each currency, plan, and billing cycle
export const tierPrices: Record<
  string,
  Record<
    string,
    {
      monthly: number
      yearly: number
    }
  >
> = {
  GHS: {
    basic: { monthly: 450, yearly: 4500 },
    standard: { monthly: 950, yearly: 9500 },
    premium: { monthly: 1450, yearly: 14500 },
  },
  USD: {
    basic: { monthly: 49, yearly: 499 },
    standard: { monthly: 69, yearly: 699 },
    premium: { monthly: 99, yearly: 999 },
  },
  EUR: {
    basic: { monthly: 45, yearly: 459 },
    standard: { monthly: 65, yearly: 659 },
    premium: { monthly: 95, yearly: 959 },
  },
  GBP: {
    basic: { monthly: 39, yearly: 399 },
    standard: { monthly: 59, yearly: 599 },
    premium: { monthly: 89, yearly: 899 },
  },
}
