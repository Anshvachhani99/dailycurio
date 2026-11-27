export interface AdsterraBannerUnit {
  key: string
  src: string
  width: number
  height: number
}

export interface AdsterraNativeUnit {
  src: string
  containerId: string
}

const env = import.meta.env

/**
 * Adsterra ad unit configuration.
 *
 * Each placement uses a distinct Adsterra zone key / container ID so multiple
 * banners and native units can coexist on the same page without collisions.
 */
export const adsterra = {
  popunderSrc:
    (env.VITE_ADSTERRA_POPUNDER_SRC as string | undefined) ||
    'https://afders.org/1/47f9363f6fd423cf71b1a0818396ad74',
  socialBarSrc:
    (env.VITE_ADSTERRA_SOCIAL_BAR_SRC as string | undefined) ||
    'https://bicea.org/14/9f282becaceeeb053845d2c37e2688b6',
  directLink:
    (env.VITE_ADSTERRA_DIRECT_LINK as string | undefined) ||
    'https://arwf.org/4/d39552c3560acba882022da84d537462',
  native: {
    footer: {
      src:
        (env.VITE_ADSTERRA_NATIVE_SRC as string | undefined) ||
        'https://bicea.org/21/dcd35485fd8c10dda834f3c0305fb82f',
      containerId:
        (env.VITE_ADSTERRA_NATIVE_CONTAINER_ID as string | undefined) ||
        'container-dcd35485fd8c10dda834f3c0305fb82f',
    } satisfies AdsterraNativeUnit,
    inArticle: {
      src:
        (env.VITE_ADSTERRA_NATIVE_ARTICLE_SRC as string | undefined) ||
        'https://bicea.org/21/cd0f73f086ebacde45c54451de83bdca',
      containerId:
        (env.VITE_ADSTERRA_NATIVE_ARTICLE_CONTAINER_ID as string | undefined) ||
        'container-cd0f73f086ebacde45c54451de83bdca',
    } satisfies AdsterraNativeUnit,
  },
  banners: {
    leaderboard728x90: {
      key: '9e3e6ac44700c823c06f55ae67536681',
      src: 'https://bicea.org/22/9e3e6ac44700c823c06f55ae67536681',
      width: 728,
      height: 90,
    } satisfies AdsterraBannerUnit,
    mobile320x50: {
      key: '0e9dc5d2a3991a9a766b9a7007df5aeb',
      src: 'https://bicea.org/22/0e9dc5d2a3991a9a766b9a7007df5aeb',
      width: 320,
      height: 50,
    } satisfies AdsterraBannerUnit,
    banner468Primary: {
      key: '39c676b220692529bd50ca83d7627b52',
      src: 'https://bicea.org/22/39c676b220692529bd50ca83d7627b52',
      width: 468,
      height: 60,
    } satisfies AdsterraBannerUnit,
    banner468Secondary: {
      key: 'bd755b206a316a66d90f3143ca453818',
      src: 'https://bicea.org/22/bd755b206a316a66d90f3143ca453818',
      width: 468,
      height: 60,
    } satisfies AdsterraBannerUnit,
    rectangle300x250: {
      key: '9d52c210232f0c4570a29d370daedd2f',
      src: 'https://bicea.org/22/9d52c210232f0c4570a29d370daedd2f',
      width: 300,
      height: 250,
    } satisfies AdsterraBannerUnit,
    skyscraper160x300: {
      key: '972e8caa9c09693039c410131ddff35c',
      src: 'https://bicea.org/22/972e8caa9c09693039c410131ddff35c',
      width: 160,
      height: 300,
    } satisfies AdsterraBannerUnit,
    skyscraper160x600: {
      key: '58064464cc277ae3b8e51fc801afc6b7',
      src: 'https://bicea.org/22/58064464cc277ae3b8e51fc801afc6b7',
      width: 160,
      height: 600,
    } satisfies AdsterraBannerUnit,
  },
}
