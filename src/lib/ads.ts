/**
 * Monetag MultiTag (all-in-one) configuration.
 *
 * In the Monetag dashboard: Sites → add this site → MultiTag → "Get code".
 * The snippet looks like:
 *   <script src="https://XXXX.com/88/tag.min.js" data-zone="123456" async data-cfasync="false"></script>
 *
 * Paste the `src` and `data-zone` values below (or set the VITE_MONETAG_* environment
 * variables, which take priority). The tag is only injected when both values are set,
 * so the site works normally before you have an account.
 *
 * Site verification: if Monetag gives you a meta tag like
 *   <meta name="monetag" content="abc123">
 * paste the `content` value into `verificationMeta`. If it gives you a file
 * (e.g. sw.js), drop it into the `public/` folder unchanged.
 *
 * Direct Link: a Monetag URL (e.g. https://uplcm.com/4/123456) that earns when
 * visitors click it. It is shown as clearly labeled "Sponsored" links in the
 * header and after each article. Leave it empty to hide those links.
 */
const config = {
  multiTagSrc: 'https://quge5.com/88/tag.min.js',
  zoneId: '314415',
  verificationMeta: '767aae2794bfbb56e75a5656d317e19a',
  directLink: 'https://uplcm.com/4/12330962',
}

const env = import.meta.env

export const monetag = {
  multiTagSrc: (env.VITE_MONETAG_MULTITAG_SRC as string | undefined) || config.multiTagSrc,
  zoneId: (env.VITE_MONETAG_ZONE_ID as string | undefined) || config.zoneId,
  verificationMeta:
    (env.VITE_MONETAG_VERIFICATION as string | undefined) || config.verificationMeta,
  directLink:
    (env.VITE_MONETAG_DIRECT_LINK as string | undefined) || config.directLink,
}

export const monetagEnabled = Boolean(monetag.multiTagSrc && monetag.zoneId)
