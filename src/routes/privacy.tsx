import { Link, createFileRoute } from '@tanstack/react-router'

import { StaticPage } from '@/components/static-page'
import { contactEmail, siteName } from '@/lib/site'

export const Route = createFileRoute('/privacy')({
  head: () => ({ meta: [{ title: `Privacy policy | ${siteName}` }] }),
  component: () => (
    <StaticPage
      title="Privacy policy"
      intro="Last updated: 27 November 2026"
    >
      <p>
        This policy explains what information {siteName} (“we”, “us”) and our
        partners collect when you visit this website, and how it is used.
      </p>
      <h2>Information we collect</h2>
      <p>
        We do not ask you to create an account and we do not collect your name
        or email unless you contact us directly. Like most websites, our
        hosting provider automatically records basic technical data such as
        your IP address, browser type, and pages visited, for security and
        performance.
      </p>
      <h2>Advertising</h2>
      <p>
        This website is free to read because it shows advertising. We work
        with third-party advertising partners, including Adsterra. These
        partners may use cookies, web beacons, local storage, and similar
        technologies to show ads, measure their performance, limit how often
        you see the same ad, and prevent fraud. They may collect information
        such as your IP address, device type, browser, approximate location,
        and the pages you view. Ad units on this site are labeled
        “Advertisement” and may link to advertiser pages that have their own
        privacy policies.
      </p>
      <p>
        Some ad formats may ask your permission to send browser notifications.
        You can decline, or turn notifications off at any time in your browser
        settings.
      </p>
      <p>
        Our advertising partners process data under their own privacy policies.
        We do not sell personal information that we collect ourselves.
      </p>
      <h2>Cookies and your choices</h2>
      <ul>
        <li>You can block or delete cookies in your browser settings.</li>
        <li>
          You can opt out of personalised advertising from many companies via
          industry tools such as YourAdChoices or Your Online Choices.
        </li>
        <li>
          Blocking cookies may mean you still see ads, but they will be less
          relevant.
        </li>
      </ul>
      <h2>Children</h2>
      <p>
        This website is not directed at children under 13, and we do not
        knowingly collect their personal information.
      </p>
      <h2>Your rights</h2>
      <p>
        Depending on where you live (for example under the GDPR or India’s
        DPDP Act), you may have the right to access, correct, or delete
        personal data. Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>{' '}
        to make a request.
      </p>
      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. The latest version will
        always be on this page. See also our{' '}
        <Link to="/terms">terms and disclaimer</Link>.
      </p>
    </StaticPage>
  ),
})
