import { createFileRoute } from '@tanstack/react-router'

import { StaticPage } from '@/components/static-page'
import { contactEmail, siteName } from '@/lib/site'

export const Route = createFileRoute('/contact')({
  head: () => ({ meta: [{ title: `Contact | ${siteName}` }] }),
  component: () => (
    <StaticPage
      title="Contact us"
      intro="Questions, corrections, topic suggestions, or partnership enquiries — we’d love to hear from you."
    >
      <p>
        Email us at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. We
        usually reply within two working days.
      </p>
      <h2>Corrections</h2>
      <p>
        If you find an error in one of our articles, please include the article
        link and what needs fixing. We update articles promptly.
      </p>
      <h2>Advertising</h2>
      <p>
        For advertising or sponsorship enquiries, email us with the subject
        line “Advertising”.
      </p>
    </StaticPage>
  ),
})
