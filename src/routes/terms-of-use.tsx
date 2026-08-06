import { createFileRoute } from '@tanstack/react-router'
import { Navigation, SiteFooter } from './index'

export const Route = createFileRoute('/terms-of-use')({
  component: TermsOfUsePage,
})

function TermsOfUsePage() {
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
            Terms of Use
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
            Welcome to the website of Dukani Global. By accessing or using this site, you agree to comply with and be bound by the following Terms of Use.
          </p>

          <h2 className="font-display" style={{ fontSize: '1.6rem', color: '#0A0A0A', marginTop: '48px', marginBottom: '20px', fontWeight: 300 }}>
            1. Use of Website Content
          </h2>
          <p style={{ marginBottom: '24px' }}>
            All text, images, logos, graphics, and other materials on this website are the property of Dukani Global Capital Ltd or its partners. You may view and print pages for your personal, non-commercial use only. Any other reproduction, distribution, or modifications of this content without prior written permission is strictly prohibited.
          </p>

          <h2 className="font-display" style={{ fontSize: '1.6rem', color: '#0A0A0A', marginTop: '48px', marginBottom: '20px', fontWeight: 300 }}>
            2. Professional Clients Only
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Dukani Global Capital Ltd provides corporate finance, real estate, and investment services exclusively directed to Professional Clients and Eligible Counterparties. Our services are not directed at, or available to, Retail Clients.
          </p>

          <h2 className="font-display" style={{ fontSize: '1.6rem', color: '#0A0A0A', marginTop: '48px', marginBottom: '20px', fontWeight: 300 }}>
            3. Disclaimer of Liability
          </h2>
          <p style={{ marginBottom: '24px' }}>
            The information contained on this website is for general informational purposes only and does not constitute financial, investment, tax, or legal advice. While we endeavor to keep the website information accurate and up-to-date, we make no warranties of any kind regarding the completeness, accuracy, reliability, or availability of the information.
          </p>

          <h2 className="font-display" style={{ fontSize: '1.6rem', color: '#0A0A0A', marginTop: '48px', marginBottom: '20px', fontWeight: 300 }}>
            4. External Links
          </h2>
          <p style={{ marginBottom: '24px' }}>
            This website may contain links to external third-party sites. These links are provided for convenience only. Dukani Global does not endorse, control, or take responsibility for the content, privacy practices, or operations of third-party websites.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
