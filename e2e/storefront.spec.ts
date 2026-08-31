import { expect, test } from "@playwright/test"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)

test("home is keyboard-readable and has no serious accessibility violations", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Useful")
  await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") })
  const violations = await page.evaluate(async () => {
    const axe = (
      window as typeof window & {
        axe: { run: () => Promise<{ violations: Array<{ impact: string | null; id: string }> }> }
      }
    ).axe
    const result = await axe.run()
    return result.violations.filter(({ impact }) => impact === "critical" || impact === "serious")
  })
  expect(violations).toEqual([])
})

test("cart and checkout are not indexable", async ({ page }) => {
  for (const path of ["/cart", "/checkout"]) {
    await page.goto(path)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/)
  }
})
