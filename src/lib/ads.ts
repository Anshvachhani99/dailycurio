/**
 * Adsterra ad unit configuration.
 *
 * Units:
 * - Native Banner: script + container div rendered on every page.
 * - Banner (468x60): iframe-format banner rendered via `atOptions` + script.
 *
 * Optional `VITE_ADSTERRA_*` environment variables override the defaults below.
 */
const config = {
  nativeSrc: 'https://bicea.org/21/dcd35485fd8c10dda834f3c0305fb82f',
  nativeContainerId: 'container-dcd35485fd8c10dda834f3c0305fb82f',
  bannerKey: '39c676b220692529bd50ca83d7627b52',
  bannerSrc: 'https://bicea.org/22/39c676b220692529bd50ca83d7627b52',
  bannerWidth: 468,
  bannerHeight: 60,
} as const

const env = import.meta.env

export const adsterra = {
  nativeSrc:
    (env.VITE_ADSTERRA_NATIVE_SRC as string | undefined) || config.nativeSrc,
  nativeContainerId:
    (env.VITE_ADSTERRA_NATIVE_CONTAINER_ID as string | undefined) ||
    config.nativeContainerId,
  bannerKey:
    (env.VITE_ADSTERRA_BANNER_KEY as string | undefined) || config.bannerKey,
  bannerSrc:
    (env.VITE_ADSTERRA_BANNER_SRC as string | undefined) || config.bannerSrc,
  bannerWidth: config.bannerWidth,
  bannerHeight: config.bannerHeight,
}

export const adsterraNativeEnabled = Boolean(
  adsterra.nativeSrc && adsterra.nativeContainerId,
)

export const adsterraBannerEnabled = Boolean(
  adsterra.bannerKey && adsterra.bannerSrc,
)
