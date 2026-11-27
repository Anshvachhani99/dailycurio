import { createFileRoute } from '@tanstack/react-router'

import { StaticPage } from '@/components/static-page'
import { contactEmail, siteName } from '@/lib/site'

export const Route = createFileRoute('/terms')({
  head: () => ({ meta: [{ title: `Terms & disclaimer | ${siteName}` }] }),
  component: () => (
    <StaticPage title="Terms & disclaimer" intro="Last updated: 23 November 2026">
      <h2>Use of this website</h2>
      <p>
        By using {siteName}, you agree to use it lawfully and not to copy or
        republish our articles without permission. Short quotes with a link
        back are welcome.
      </p>
      <h2>General information only</h2>
      <p>
        Our articles are for general information and education. They are not
        professional medical, financial, legal, or other advice. Always consult
        a qualified professional before making decisions about your health or
        money.
      </p>
      <h2>Accuracy</h2>
      <p>
        We work hard to keep articles accurate and up to date, but we cannot
        guarantee that every detail is complete or current. Prices, rules, and
        product features change often.
      </p>
      <h2>Advertising and external links</h2>
      <p>
        This website displays third-party advertisements and may link to other
        websites. We are not responsible for the content, products, or
        practices of advertisers or external sites.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{' '}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
      </p>
    </StaticPage>
  ),
})
