import { describe, expect, it } from 'vitest'

import { adsterra } from './ads'
import { splitHtmlAtHeading } from './blog'

describe('adsterra config', () => {
  it('configures unique keys for all banners, native units, popunder, social bar, and direct link', () => {
    expect(adsterra.popunderSrc).toBe(
      'https://afders.org/1/47f9363f6fd423cf71b1a0818396ad74',
    )
    expect(adsterra.socialBarSrc).toBe(
      'https://bicea.org/14/9f282becaceeeb053845d2c37e2688b6',
    )
    expect(adsterra.directLink).toBe(
      'https://arwf.org/4/d39552c3560acba882022da84d537462',
    )

    const nativeIds = [
      adsterra.native.footer.containerId,
      adsterra.native.inArticle.containerId,
    ]
    expect(new Set(nativeIds).size).toBe(2)

    const bannerKeys = Object.values(adsterra.banners).map((b) => b.key)
    expect(bannerKeys).toHaveLength(7)
    expect(new Set(bannerKeys).size).toBe(7)
  })
})

describe('splitHtmlAtHeading', () => {
  it('splits rendered HTML cleanly before the middle h2 when at least two headings exist', () => {
    const html =
      '<p>Intro</p><h2>One</h2><p>First</p><h2>Two</h2><p>Second</p>'
    const [top, bottom] = splitHtmlAtHeading(html)
    expect(top).toBe('<p>Intro</p><h2>One</h2><p>First</p>')
    expect(bottom).toBe('<h2>Two</h2><p>Second</p>')
  })

  it('keeps HTML intact when fewer than two h2 headings exist', () => {
    const html = '<p>Intro</p><h2>Only</h2><p>Body</p>'
    expect(splitHtmlAtHeading(html)).toEqual([html, ''])
  })
})
