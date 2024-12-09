import { test, expect } from '@playwright/test'

test('Validate Example Domain page', async ({ page }) => {

    await page.goto('https://example.com/')
    await expect(page).toHaveTitle('Example Domain')
    expect(page.url()).toContain('example.com')
    await expect(page.locator('body')).toContainText('This domain is for use in illustrative examples')
    const h1Locator = page.locator('h1')
    await expect(h1Locator).toHaveText('Example Domain')
})

test('Validate Playwright homepage', async ({ page }) => {

  await page.goto('https://playwright.dev/')
  expect(page.url().startsWith('https://playwright.dev'))
  const getStartedLinks = page.locator('a:has-text("Get started")')
  await expect(getStartedLinks).toHaveCount(1)
})

test('Validate search', async ({ page }) => {
  await page.goto('https://www.google.com')

  const searchInput = page.getByTitle('search')
    await searchInput.fill('Playwright')
    await searchInput.press('Enter')

    const results = page.locator('#search')
    await expect(results).toBeVisible()

    await expect(results).toContainText('Playwright')
})

test('Validate result of Get started click', async ({ page }) => {
  await page.goto('https://playwright.dev/')
  await expect(page).toHaveTitle(/Playwright/)
  await page.click('a:has-text("Get started")')
  await expect(page).toHaveURL(/\/docs/)
})