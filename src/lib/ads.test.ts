import { describe, expect, it } from 'vitest'

import {
  adsterra,
  adsterraBannerEnabled,
  adsterraNativeEnabled,
} from './ads'

describe('adsterra config', () => {
  it('configures both native and 468x60 banner units', () => {
    expect(adsterraNativeEnabled).toBe(true)
    expect(adsterra.nativeSrc).toBe(
      'https://bicea.org/21/dcd35485fd8c10dda834f3c0305fb82f',
    )
    expect(adsterra.nativeContainerId).toBe(
      'container-dcd35485fd8c10dda834f3c0305fb82f',
    )

    expect(adsterraBannerEnabled).toBe(true)
    expect(adsterra.bannerKey).toBe('39c676b220692529bd50ca83d7627b52')
    expect(adsterra.bannerSrc).toBe(
      'https://bicea.org/22/39c676b220692529bd50ca83d7627b52',
    )
    expect(adsterra.bannerWidth).toBe(468)
    expect(adsterra.bannerHeight).toBe(60)
  })
})
