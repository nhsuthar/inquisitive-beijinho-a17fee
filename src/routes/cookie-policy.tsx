import { createFileRoute } from '@tanstack/react-router'
import { Navigation, SiteFooter } from './index'

export const Route = createFileRoute('/cookie-policy')({
  component: CookiePolicyPage,
})

function CookiePolicyPage() {
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
            Cookie Policy
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
            This Cookie Policy explains how Dukani Global uses cookies and similar technologies on our website to ensure a functional and streamlined user experience.
          </p>

          <h2 className="font-display" style={{ fontSize: '1.6rem', color: '#0A0A0A', marginTop: '48px', marginBottom: '20px', fontWeight: 300 }}>
            1. What Are Cookies?
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.
          </p>

          <h2 className="font-display" style={{ fontSize: '1.6rem', color: '#0A0A0A', marginTop: '48px', marginBottom: '20px', fontWeight: 300 }}>
            2. How We Use Cookies
          </h2>
          <p style={{ marginBottom: '24px' }}>
            We only use essential/functional cookies on this website. These cookies are strictly necessary to support the basic operations of the site, including:
          </p>
          <ul style={{ paddingLeft: '24px', marginBottom: '24px', listStyleType: 'square' }}>
            <li>Maintaining page performance and response stability.</li>
            <li>Enabling interactive navigation elements.</li>
            <li>Remembering form states during active browser sessions.</li>
          </ul>

          <h2 className="font-display" style={{ fontSize: '1.6rem', color: '#0A0A0A', marginTop: '48px', marginBottom: '20px', fontWeight: 300 }}>
            3. Third-Party Cookies
          </h2>
          <p style={{ marginBottom: '24px' }}>
            We do not use any third-party tracking, analytical, or advertising cookies on this website. We respect your digital privacy and limit data tracking exclusively to essential operational parameters.
          </p>

          <h2 className="font-display" style={{ fontSize: '1.6rem', color: '#0A0A0A', marginTop: '48px', marginBottom: '20px', fontWeight: 300 }}>
            4. Managing Your Cookie Settings
          </h2>
          <p style={{ marginBottom: '24px' }}>
            Most web browsers allow you to control or block cookies through their settings menu. However, please note that blocking essential cookies may affect the functionality and styling responsiveness of our website.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
