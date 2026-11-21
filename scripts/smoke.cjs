/* Browser smoke test: every route at phone and desktop widths.
   Usage: npm run build && npx vite preview --port 4173 & node scripts/smoke.cjs [screenshotDir] */
const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const BASE = process.env.BASE_URL || 'http://localhost:4173'
const SHOTS = process.argv[2]
const read = (p) => fs.readFileSync(path.join(__dirname, '..', p), 'utf8')
const modules = [...read('src/content/modules.ts').matchAll(/id: '([a-z-]+)',\n\s+title/g)].map((m) => m[1])
const tools = [...read('src/tools/meta.ts').matchAll(/\{ id: '([a-z-]+)'/g)].map((m) => m[1])
const cases = fs
  .readdirSync(path.join(__dirname, '../src/content/cases'))
  .flatMap((f) => [...read(`src/content/cases/${f}`).matchAll(/^# .*#([a-z0-9-]+)/gm)].map((m) => m[1]))

const routes = [
  '/', '/learn', '/tools', '/practice', '/cases', '/whats-new', '/references', '/normal-values', '/settings',
  ...modules.map((m) => `/learn/${m}`),
  ...tools.map((t) => `/tools/${t}`),
  ...cases.map((c) => `/cases/${c}`),
  '/modules/anemias', '/tools/cbc-interpreter', '/assessment', '/no-such-page',
]

;(async () => {
  const browser = await chromium.launch()
  const failures = []
  for (const vp of [{ name: 'phone', width: 390, height: 844 }, { name: 'desktop', width: 1366, height: 900 }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
    const page = await ctx.newPage()
    let errors = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(String(e)))
    for (const r of routes) {
      errors = []
      await page.goto(BASE + r, { waitUntil: 'networkidle' })
      await page.waitForSelector('h1', { timeout: 8000 }).catch(() => errors.push('no <h1>'))
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      if (overflow > 1) errors.push(`horizontal overflow ${overflow}px`)
      if (errors.length) failures.push(`[${vp.name}] ${r}: ${errors.join(' | ')}`)
      if (SHOTS && ['/', '/learn/neonatal', '/tools/cbc', '/tools/smear-atlas', '/practice', '/cases/pale-toddler', '/tools/scores'].includes(r)) {
        await page.screenshot({ path: path.join(SHOTS, `${vp.name}${r.replace(/\//g, '_') || '_home'}.png`), fullPage: false })
      }
    }
    // Interactions
    await page.goto(BASE + '/learn/foundations', { waitUntil: 'networkidle' })
    const opt = page.locator('[aria-label="Answer options"] button').first()
    await opt.click()
    if (!(await page.locator('text=/Correct|Not quite/').first().isVisible())) failures.push(`[${vp.name}] quick check did not reveal feedback`)
    await page.goto(BASE + '/tools/cbc', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Milk-drinking toddler' }).click()
    if (!(await page.locator('text=Mentzer index').first().isVisible())) failures.push(`[${vp.name}] CBC preset did not compute Mentzer`)
    await page.goto(BASE + '/learn/neonatal#vkdb', { waitUntil: 'networkidle' })
    await page.waitForTimeout(300)
    const top = await page.evaluate(() => document.getElementById('vkdb')?.getBoundingClientRect().top ?? 9999)
    if (top > 200) failures.push(`[${vp.name}] hash deep link did not scroll (top=${top})`)
    await page.goto(BASE + '/cases/pale-toddler', { waitUntil: 'networkidle' })
    await page.locator('[aria-label="Answer options"] button').first().click()
    await page.getByRole('button', { name: /Continue/ }).click()
    if ((await page.locator('ol > li').count()) < 2) failures.push(`[${vp.name}] case did not advance`)
    await ctx.close()
  }
  // Search palette
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  await page.keyboard.press('Control+k')
  await page.getByLabel('Search', { exact: true }).last().fill('FNAIT')
  await page.waitForTimeout(400)
  const hits = await page.locator('[role="dialog"] button').count()
  if (hits < 2) failures.push('search returned no results for FNAIT')
  if (SHOTS) await page.screenshot({ path: path.join(SHOTS, 'desktop_search.png') })
  await browser.close()

  console.log(`Checked ${routes.length} routes × 2 viewports + interactions.`)
  if (failures.length) {
    console.log('FAILURES:\n' + failures.join('\n'))
    process.exit(1)
  }
  console.log('All smoke checks passed.')
})()
