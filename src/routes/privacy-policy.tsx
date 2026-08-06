import { createFileRoute } from '@tanstack/react-router'
import { Navigation, SiteFooter } from './index'

export const Route = createFileRoute('/privacy-policy')({
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  return (
    <div style={{ background: '#F8F6F2', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />

      {/* Hero-like header */}
      <div style={{ background: '#0A0A0A', padding: '160px 7vw 80px', textAlign: 'left' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p className="section-label" style={{ color: '#C9A46A', marginBottom: '16px', fontSize: '0.65rem' }}>
            LEGAL NOTICE
          </p>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
              color: '#F8F6F2',
              fontWeight: 300,
              margin: 0,
            }}
          >
            Privacy Policy
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '80px 7vw', boxSizing: 'border-box' }}>
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            color: '#2B2B2B',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.95rem',
            lineHeight: 1.8,
            fontWeight: 300,
          }}
        >
          <p style={{ marginBottom: '32px', fontSize: '1.05rem', lineHeight: 1.8, fontWeight: 400 }}>
            Dukani Global is committed to protecting and respecting your privacy. This Privacy Policy details our practices regarding the collection, processing, and storage of your personal data.
          </p>

          <h2 className="font-display" style={{ fontSize: '1.6rem', color: '#0A0A0A', marginTop: '48px', marginBottom: '20px', fontWeight: 300 }}>
            1. Information We Collect
          </h2>
          <p style={{ marginBottom: '24px' }}>
            We collect information that you choose to provide directly to us through our enquiry forms, email communications, or other contact interfaces. This may include your name, email address, corporate association, and details of your request.
          </p>

          <h2 className="font-display" style={{ fontSize: '1.6rem', color: '#0A0A0A', marginTop: '48px', marginBottom: '20px', fontWeight: 300 }}>
            2. How We Use Your Data
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Any data you share with Dukani Global is utilized strictly for professional coordination purposes:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '24px', listStyleType: 'square' }}>
            <li>Responding to and managing your development or investment enquiries.</li>
            <li>Providing information on relevant commercial opportunities if requested.</li>
            <li>Fulfilling legal obligations and statutory corporate responsibilities.</li>
          </ul>

          <h2 className="font-display" style={{ fontSize: '1.6rem', color: '#0A0A0A', marginTop: '48px', marginBottom: '20px', fontWeight: 300 }}>
            3. Data Sharing and Protection
          </h2>
          <p style={{ marginBottom: '24px' }}>
            We do not sell, rent, or lease personal information to third parties. We employ advanced technical and organizational security measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction.
          </p>

          <h2 className="font-display" style={{ fontSize: '1.6rem', color: '#0A0A0A', marginTop: '48px', marginBottom: '20px', fontWeight: 300 }}>
            4. Your Legal Rights
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Under applicable data protection legislation (including the UK GDPR and the Data Protection Act 2018), you have rights regarding access to, correction of, or deletion of your personal data. To exercise these rights, please contact us directly at <a href="mailto:private@dukani.global" style={{ color: '#C9A46A', textDecoration: 'none' }}>private@dukani.global</a>.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
