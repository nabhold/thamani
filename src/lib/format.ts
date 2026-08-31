import type { Money } from "./medusa/types"
export function formatMoney(money: Money | null, locale = "en-ZA") {
  if (!money) return "Price unavailable"
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: money.currencyCode.toUpperCase(),
  }).format(money.amount)
}
