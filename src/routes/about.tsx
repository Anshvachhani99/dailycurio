import { Link, createFileRoute } from '@tanstack/react-router'

import { StaticPage } from '@/components/static-page'
import { siteName } from '@/lib/site'

export const Route = createFileRoute('/about')({
  head: () => ({ meta: [{ title: `About | ${siteName}` }] }),
  component: () => (
    <StaticPage
      title="About Daily Curio"
      intro="Smart, practical reads for curious minds — on any topic worth knowing."
    >
      <p>
        Daily Curio is an independent online magazine. We publish short,
        practical guides on technology, personal finance, health, travel,
        food, science, lifestyle, and entertainment.
      </p>
      <h2>What we believe</h2>
      <ul>
        <li>
          <strong>Useful beats clever.</strong> Every article should leave you
          with something you can actually use.
        </li>
        <li>
          <strong>Plain language.</strong> No jargon without an explanation.
        </li>
        <li>
          <strong>Respect your time.</strong> Most of our guides take under
          five minutes to read.
        </li>
      </ul>
      <h2>How we keep it free</h2>
      <p>
        Daily Curio is free to read and supported by advertising. Ads never
        influence what we write about. Read more in our{' '}
        <Link to="/privacy">privacy policy</Link>.
      </p>
      <h2>Say hello</h2>
      <p>
        Have a topic idea or spotted a mistake? <Link to="/contact">Contact us</Link>{' '}
        — we read every message.
      </p>
    </StaticPage>
  ),
})
