import { describe, expect, it } from "vitest"
import { formatMoney } from "./format"
describe("formatMoney", () => {
  it("formats regional money", () =>
    expect(formatMoney({ amount: 125.5, currencyCode: "zar" })).toContain("125,50"))
  it("does not invent missing prices", () => expect(formatMoney(null)).toBe("Price unavailable"))
})
