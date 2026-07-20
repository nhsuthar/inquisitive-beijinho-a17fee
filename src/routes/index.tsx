import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: DukaniGlobal,
})

// ─── Curated image collection ─────────────────────────────────────────────────
const IMG = {
  hero: '/imh.jpeg',
  heroMobile: '/imh-mobile.jpg',
  about: '/about-group.jpg',
  divPropDev: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
  divHotels: '/div-hotels.jpg',
  divResorts: '/div-resorts.jpg',
  divCommercial: '/div-commercial.jpg',
  divInvestment: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  divAssets: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=800&q=80',
  proj1: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85',
  proj2: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=85',
  proj3: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=85',
  proj4: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=85',
  hospitality: '/hospitality-sunset.jpg',
  hosPool: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80',
  hosDining: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
  hosSpa: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
  hosInterior: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80',
  ceo: '/manuela-di-guevara.jpg',
  coo: '/alia-minhas.jpg',
  cfo: '/francesco-merola.jpg',
  faisal: '/faisal-iftikhar.jpg',
  julietta: '/julietta.jpg',
  eduart: '/eduart-lacaj.jpg',
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.07, rootMargin: '0px 0px -60px 0px' }
    )
    document
      .querySelectorAll('.reveal, .reveal-left, .reveal-right')
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── StatCounter ──────────────────────────────────────────────────────────────

function StatCounter({
  target,
  suffix = '+',
  label,
  prefix = '',
  staticVal,
}: {
  target?: number
  suffix?: string
  label: string
  prefix?: string
  staticVal?: string
}) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started || target === undefined) return
    let startTime: number | null = null
    const duration = 2400
    const animate = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [started, target])

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        flex: '1 1 260px',
        maxWidth: '340px',
        margin: '0 auto',
      }}
    >
      <div
        className="font-display"
        style={{
          fontSize: staticVal ? 'clamp(1.8rem, 3.2vw, 2.8rem)' : 'clamp(3.5rem, 6vw, 5.5rem)',
          fontWeight: 300,
          color: '#0A0A0A',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: '12px',
          height: 'clamp(3.5rem, 6vw, 5.5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {staticVal ? staticVal : `${prefix}${count.toLocaleString()}${suffix}`}
      </div>
      <span className="section-label" style={{ color: '#C9A46A' }}>
        {label}
      </span>
    </div>
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Divisions', href: '#divisions' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 300,
          padding: scrolled ? 'clamp(6px, 1vh, 10px) 5vw' : 'clamp(10px, 2vh, 18px) 5vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: menuOpen ? 'transparent' : (scrolled ? 'rgba(10,10,10,0.97)' : 'transparent'),
          backdropFilter: menuOpen ? 'none' : (scrolled ? 'blur(10px)' : 'none'),
          borderBottom: menuOpen ? '1px solid transparent' : (scrolled ? '1px solid rgba(201,164,106,0.15)' : '1px solid transparent'),
          transition: 'background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease, padding 0.5s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <img
            src="/logo.png"
            alt="Dukani Global Logo"
            className="header-logo"
            style={{
              width: 'auto',
              display: 'block',
            }}
          />
        </a>

        {/* Desktop links */}
        <div
          style={{
            display: 'flex',
            gap: '36px',
            alignItems: 'center',
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{ color: '#F8F6F2' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-gold"
            style={{ padding: '9px 22px', fontSize: '0.6rem' }}
          >
            Enquire
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="show-mobile"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
          aria-label="Toggle menu"
        >
          <span
            style={{
              display: 'block',
              width: '24px',
              height: '1px',
              background: '#F8F6F2',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '18px',
              height: '1px',
              background: '#F8F6F2',
              transition: 'opacity 0.3s ease',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              display: 'block',
              width: '24px',
              height: '1px',
              background: '#F8F6F2',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div className={`mobile-nav-overlay ${menuOpen ? 'open' : 'closed'}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-item"
              style={{ transitionDelay: `${i * 0.05}s` }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div style={{ marginTop: '40px' }}>
          <a href="#contact" className="btn-gold" onClick={() => setMenuOpen(false)}>
            Enquire Now
          </a>
        </div>
      </div>
    </>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="hero-section">
      {/* Background image */}
      <div
        className="hero-bg"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${IMG.hero}')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top',
          willChange: 'transform',
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(358deg, rgba(10, 10, 10, 0.35) 0%, rgb(108 105 105 / 75%) 100%)',
        }}
      />

      {/* Vertical gold line accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '5vw',
          width: '1px',
          height: '100px',
          background: 'linear-gradient(to bottom, transparent, #C9A46A, transparent)',
          opacity: 0.5,
        }}
      />

      {/* Content */}
      <div
        className="hero-content-container"
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 'clamp(130px, 18vh, 170px)',
          paddingBottom: 'clamp(40px, 8vh, 80px)',
          paddingLeft: '7vw',
          paddingRight: '7vw',
          boxSizing: 'border-box',
        }}
      >
        <p
          className="section-label hero-label"
          style={{ color: '#C9A46A', marginBottom: 'clamp(14px, 2.5vh, 26px)' }}
        >
          Dukani Global · Est. 2026
        </p>

        <h1
          className="font-display hero-title"
          style={{
            fontSize: 'clamp(1.95rem, 6vw, 8rem)',
            fontWeight: 300,
            color: '#F8F6F2',
            lineHeight: 1.04,
            letterSpacing: '-0.01em',
            margin: '0 0 clamp(16px, 3vh, 28px)',
            maxWidth: '1000px',
          }}
        >
          Building Exceptional Places.
          <br />
          <em style={{ fontStyle: 'italic', color: 'rgba(248,246,242,0.78)' }}>
            Creating Enduring Value.
          </em>
        </h1>

        <p
          className="hero-sub"
          style={{
            maxWidth: '520px',
            fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)',
            lineHeight: 1.8,
            color: 'rgba(248, 246, 242, 0.68)',
            marginBottom: 'clamp(28px, 6vh, 48px)',
            fontWeight: 300,
          }}
        >
          Dukani Global develops landmark real estate, luxury hospitality, and global
          investment opportunities that redefine modern living.
        </p>

        <div className="hero-cta" style={{ display: 'flex', gap: 'clamp(12px, 3vw, 20px)', flexWrap: 'wrap' }}>
          <a href="#divisions" className="btn-gold">
            Explore Divisions
          </a>
          <a href="#about" className="btn-outline-white">
            Our Vision
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          right: '5vw',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '14px',
          color: 'rgba(248, 246, 242, 0.4)',
          fontSize: '0.58rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontFamily: 'Inter, sans-serif',
          writingMode: 'vertical-lr',
        }}
      >
        <div
          className="scroll-line"
          style={{ width: '1px', height: '56px', background: '#C9A46A', opacity: 0.55 }}
        />
        Scroll
      </div>
    </section>
  )
}

// ─── About Section ────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: '#F8F6F2',
        padding: 'clamp(80px, 10vw, 140px) 7vw',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(48px, 6vw, 100px)',
          alignItems: 'stretch',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Left: text */}
        <div>
          <p className="section-label reveal" style={{ color: '#C9A46A', marginBottom: '24px' }}>
            About the Group
          </p>
          <span className="gold-line reveal reveal-d1" style={{ marginBottom: '40px' }} />
          <h2
            className="font-display reveal reveal-d2"
            style={{
              fontSize: 'clamp(2.4rem, 4vw, 4.5rem)',
              fontWeight: 300,
              color: '#0A0A0A',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              margin: '0 0 32px',
            }}
          >
            A Legacy of Architectural&nbsp;
            <em style={{ fontStyle: 'italic' }}>Ambition</em>
          </h2>

          {/* Sub-heading / Lead */}
          <p
            className="reveal reveal-d3"
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.9,
              color: '#6B6560',
              marginBottom: '24px',
              fontWeight: 300,
              maxWidth: '560px',
            }}
          >
            Building exceptional places through intelligence, capital and design. Where technology, capital and construction converge.
          </p>

          {/* Description */}
          <p
            className="reveal reveal-d4"
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.9,
              color: '#6B6560',
              marginBottom: '48px',
              fontWeight: 300,
              maxWidth: '560px',
            }}
          >
            Founded on the belief that exceptional developments emerge when vision, capital, and execution work as one, Dukani Global creates places designed to inspire, endure, and generate lasting value.
          </p>

          {/* Our Philosophy & Our Legacy Columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '32px',
              marginBottom: '48px',
            }}
          >
            {/* Our Philosophy */}
            <div className="reveal reveal-d5">
              <h4
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: '#C9A46A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  margin: '0 0 16px',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Our Philosophy
              </h4>
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.8,
                  color: '#6B6560',
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                The most enduring projects are built on three foundations: Intelligence to imagine what is possible, Capital to transform vision into reality, and Execution to deliver lasting impact.
              </p>
            </div>

            {/* Our Legacy */}
            <div className="reveal reveal-d6">
              <h4
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: '#C9A46A',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  margin: '0 0 16px',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Our Legacy
              </h4>
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.8,
                  color: '#6B6560',
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                We are not simply building properties. We are creating exceptional places, enabling new models of ownership, and shaping assets designed to stand the test of time.
              </p>
            </div>
          </div>

          <a href="#divisions" className="btn-outline-dark reveal reveal-d7">
            Our Divisions
          </a>
        </div>

        {/* Right: image */}
        <div className="reveal-right" style={{ position: 'relative', height: '100%' }}>
          <div
            className="img-zoom"
            style={{
              height: '100%',
              minHeight: '480px',
            }}
          >
            <img
              src={IMG.about}
              alt="Dukani Global architectural portfolio"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              loading="lazy"
            />
          </div>
          {/* Gold corner accents */}
          <div
            style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-20px',
              width: '80px',
              height: '80px',
              borderRight: '1px solid #C9A46A',
              borderBottom: '1px solid #C9A46A',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              width: '80px',
              height: '80px',
              borderLeft: '1px solid #C9A46A',
              borderTop: '1px solid #C9A46A',
              pointerEvents: 'none',
            }}
          />

        </div>
      </div>
    </section>
  )
}

// ─── Divisions Section ────────────────────────────────────────────────────────

const DIVISIONS = [
  {
    title: 'Property Development',
    description: 'Landmark residential and urban mixed-use developments across key global markets.',
    img: IMG.divPropDev,
    tag: '01',
  },
  {
    title: 'Luxury Hotels',
    description: 'Curated five-star hospitality experiences that set new standards for urban stays.',
    img: IMG.divHotels,
    tag: '02',
  },
  {
    title: 'Resorts & Retreats',
    description: "Award-winning destination resorts in the world's most sought-after locations.",
    img: IMG.divResorts,
    tag: '03',
  },
  {
    title: 'Commercial Spaces',
    description: 'Premium grade-A offices and retail destinations designed for global enterprise.',
    img: IMG.divCommercial,
    tag: '04',
  },
  {
    title: 'Infrastructure',
    description: 'Modern transportation, energy, and civic infrastructure projects driving sustainable development.',
    img: '/div-infrastructure.jpg',
    tag: '05',
  },
  {
    title: 'Hospitals',
    description: 'State-of-the-art medical and healthcare facilities designed for wellness and clinical excellence.',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    tag: '06',
  },
  {
    title: 'Yacht Clubs',
    description: 'Exclusive private marinas and premium waterfront clubhouse destinations for elite yachting.',
    img: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80',
    tag: '07',
  },
  {
    title: 'Golf Clubs',
    description: 'Championship-grade golf courses and premium country clubs crafted by world-class designers.',
    img: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=800&q=80',
    tag: '08',
  },
  {
    title: 'Sports Stadiums',
    description: 'Iconic athletic venues and multi-purpose arenas hosting premier international sporting events.',
    img: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800&q=80',
    tag: '09',
  },
]

function DivisionsSection() {
  return (
    <section
      id="divisions"
      style={{ background: '#0A0A0A', padding: 'clamp(80px, 10vw, 140px) 7vw clamp(20px, 3vw, 40px) 7vw' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 'clamp(48px, 6vw, 80px)',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <p className="section-label reveal" style={{ color: '#C9A46A', marginBottom: '20px' }}>
              Business Divisions
            </p>
            <h2
              className="font-display reveal reveal-d1"
              style={{
                fontSize: 'clamp(2.4rem, 4vw, 4.5rem)',
                fontWeight: 300,
                color: '#F8F6F2',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                margin: 0,
              }}
            >
              Ambitious
              <br />
              <em style={{ fontStyle: 'italic', color: 'rgba(248,246,242,0.65)' }}>
                Development Goals
              </em>
            </h2>
          </div>
          <a
            href="#contact"
            className="btn-outline-white reveal"
            style={{ flexShrink: 0 }}
          >
            Partner With Us
          </a>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2px',
          }}
        >
          {DIVISIONS.map((div, i) => (
            <div
              key={div.tag}
              className={`division-card reveal reveal-d${Math.min(i + 1, 6)}`}
              style={{ aspectRatio: '4/5' }}
            >
              <img
                src={div.img}
                alt={div.title}
                className="card-img"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                loading="lazy"
              />
              {/* Dark overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.3) 55%, rgba(10,10,10,0.1) 100%)',
                }}
              />
              {/* Content */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  zIndex: 10,
                }}
              >
                <span
                  className="section-label"
                  style={{ color: 'rgba(201, 164, 106, 0.7)', fontSize: '0.55rem' }}
                >
                  {div.tag}
                </span>
                <div style={{ minHeight: '11rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <span className="gold-line" style={{ marginBottom: '16px' }} />
                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 400,
                      color: '#F8F6F2',
                      lineHeight: 1.15,
                      margin: '0 0 12px',
                      minHeight: '3.68rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}
                  >
                    {div.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.78rem',
                      color: 'rgba(248, 246, 242, 0.6)',
                      fontWeight: 300,
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {div.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Projects Section ─────────────────────────────────────────────────────────

const PROJECTS = [
  {
    name: 'Dukani One Tower',
    location: 'Dubai, UAE',
    status: 'Completed',
    year: '2023',
    type: 'Mixed-Use',
    description:
      'A 68-storey landmark redefining the Downtown Dubai skyline, comprising luxury residences, a five-star hotel, and curated retail spaces.',
    img: IMG.proj1,
    size: 'large',
  },
  {
    name: 'The Dukani Residences',
    location: 'London, UK',
    status: 'Completed',
    year: '2022',
    type: 'Residential',
    description:
      'An exclusive collection of 42 ultra-prime apartments in the heart of Mayfair.',
    img: IMG.proj2,
    size: 'small',
  },
  {
    name: 'Dukani Financial Centre',
    location: 'Riyadh, KSA',
    status: 'Under Construction',
    year: '2025',
    type: 'Commercial',
    description:
      '250,000 sq ft of Grade-A office space forming part of the new Riyadh financial district.',
    img: IMG.proj3,
    size: 'small',
  },
  {
    name: 'Riva Palm Resort',
    location: 'Maldives',
    status: 'Completed',
    year: '2021',
    type: 'Resort',
    description:
      'An all-water-villa island resort across 74 private overwater villas, recipient of the 2022 World Luxury Hotel Award.',
    img: IMG.proj4,
    size: 'large',
  },
]

function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{ background: '#F8F6F2', padding: 'clamp(80px, 10vw, 140px) 7vw' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          <p className="section-label reveal" style={{ color: '#C9A46A', marginBottom: '20px' }}>
            Current, Pipeline and Future
          </p>
          <h2
            className="font-display reveal reveal-d1"
            style={{
              fontSize: 'clamp(2.4rem, 4vw, 4.5rem)',
              fontWeight: 300,
              color: '#0A0A0A',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              margin: '0 0 24px',
              maxWidth: '700px',
            }}
          >
            Places That Define
            <br />
            <em style={{ fontStyle: 'italic', color: '#6B6560' }}>Their Generation</em>
          </h2>
          <p
            className="reveal reveal-d2"
            style={{
              fontSize: '0.88rem',
              color: '#6B6560',
              fontWeight: 300,
              lineHeight: 1.8,
              maxWidth: '500px',
            }}
          >
            Each project is a singular statement, a convergence of location, architecture,
            and meticulous craft executed to the highest global standard.
          </p>
        </div>

        {/* Project grid - editorial asymmetric layout */}
        <div className="projects-grid-container">
          <div className="projects-desktop-grid">
            {/* Row 1: large + 2 small */}
            <div className="projects-row-1">
              <ProjectCard project={PROJECTS[0]} delay={1} />
              <div className="projects-row-1-sub">
                <ProjectCard project={PROJECTS[1]} delay={2} compact />
                <ProjectCard project={PROJECTS[2]} delay={3} compact />
              </div>
            </div>
            {/* Row 2: large */}
            <ProjectCard project={PROJECTS[3]} delay={1} wide />
          </div>

          <div className="projects-mobile-carousel">
            {PROJECTS.map((project, idx) => (
              <div className="projects-carousel-item" key={project.name}>
                <ProjectCard project={project} delay={idx + 1} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <a href="#contact" className="btn-outline-dark reveal">
            Request Full Portfolio
          </a>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  delay,
  compact = false,
  wide = false,
}: {
  project: (typeof PROJECTS)[0]
  delay: number
  compact?: boolean
  wide?: boolean
}) {
  return (
    <div
      className={`project-card reveal reveal-d${Math.min(delay, 6)}`}
      style={{
        aspectRatio: wide ? '16/6' : compact ? 'auto' : '4/5',
        height: '100%',
      }}
    >
      <img
        src={project.img}
        alt={project.name}
        className="project-img"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        loading="lazy"
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.15) 60%, transparent 100%)',
        }}
      />
      <div
        className="project-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10,10,10,0.12)',
          opacity: 0,
          transition: 'opacity 0.4s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: compact ? '20px 24px' : '28px 32px',
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px',
          }}
        >
          <span className="section-label" style={{ color: '#C9A46A', fontSize: '0.55rem' }}>
            {project.type}
          </span>
          <span
            style={{
              width: '3px',
              height: '3px',
              background: 'rgba(201,164,106,0.5)',
              borderRadius: '50%',
            }}
          />
          <span
            style={{
              fontSize: '0.6rem',
              color: 'rgba(248,246,242,0.5)',
              letterSpacing: '0.1em',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {project.status} · {project.year}
          </span>
        </div>
        <h3
          className="font-display"
          style={{
            fontSize: compact ? '1.3rem' : '1.8rem',
            fontWeight: 400,
            color: '#F8F6F2',
            margin: '0 0 4px',
            lineHeight: 1.15,
          }}
        >
          {project.name}
        </h3>
        <p
          style={{
            fontSize: '0.72rem',
            color: 'rgba(248,246,242,0.55)',
            fontWeight: 300,
            margin: 0,
            letterSpacing: '0.06em',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {project.location}
        </p>
        {!compact && (
          <p
            style={{
              fontSize: '0.8rem',
              color: 'rgba(248,246,242,0.65)',
              fontWeight: 300,
              margin: '12px 0 0',
              lineHeight: 1.7,
              maxWidth: '480px',
            }}
          >
            {project.description}
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Hospitality Section ──────────────────────────────────────────────────────

function HospitalitySection() {
  return (
    <section
      id="hospitality"
      style={{ background: '#0A0A0A', padding: 'clamp(80px, 10vw, 140px) 7vw' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          <p className="section-label reveal" style={{ color: '#C9A46A', marginBottom: '20px' }}>
            Hospitality
          </p>
          <h2
            className="font-display reveal reveal-d1"
            style={{
              fontSize: 'clamp(2.4rem, 4vw, 4.5rem)',
              fontWeight: 300,
              color: '#F8F6F2',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              margin: '0 0 24px',
            }}
          >
            Every Stay,
            <br />
            <em style={{ fontStyle: 'italic', color: 'rgba(248,246,242,0.55)' }}>
              An Extraordinary Experience
            </em>
          </h2>
        </div>

        {/* Hero hospitality image */}
        <div
          className="img-zoom reveal"
          style={{
            aspectRatio: '21/9',
            marginBottom: '3px',
            maxHeight: '600px',
            position: 'relative',
          }}
        >
          <img
            src={IMG.hospitality}
            alt="Dukani luxury hospitality, infinity pool"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.1) 60%)',
            }}
          />
          <div style={{ position: 'absolute', top: '50%', left: '7%', transform: 'translateY(-50%)' }}>
            <p className="section-label" style={{ color: '#C9A46A', marginBottom: '12px', fontSize: '0.55rem' }}>
              Riva Palm Resort · Maldives
            </p>
            <p
              className="font-display"
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 3rem)',
                fontWeight: 300,
                color: '#F8F6F2',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Where the ocean meets
              <br />
              <em style={{ fontStyle: 'italic' }}>the infinite horizon</em>
            </p>
          </div>
        </div>

        {/* 4-image grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '3px',
          }}
        >
          {[
            { img: IMG.hosPool, label: 'Infinity Pools' },
            { img: IMG.hosDining, label: 'Fine Dining' },
            { img: IMG.hosSpa, label: 'Spa & Wellness' },
            { img: IMG.hosInterior, label: 'Private Suites' },
          ].map((item, i) => (
            <div
              key={item.label}
              className={`img-zoom reveal reveal-d${i + 1}`}
              style={{ aspectRatio: '3/4', position: 'relative' }}
            >
              <img
                src={item.img}
                alt={item.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 50%)',
                }}
              />
              <p
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  margin: 0,
                  fontSize: '0.72rem',
                  fontWeight: 400,
                  color: '#F8F6F2',
                  letterSpacing: '0.1em',
                  fontFamily: 'Inter, sans-serif',
                  textTransform: 'uppercase',
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Stats Section ────────────────────────────────────────────────────────────

function StatsSection() {
  return (
    <section
      id="stats"
      style={{ background: '#F8F6F2', padding: 'clamp(80px, 10vw, 140px) 7vw' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(56px, 7vw, 96px)' }}>
          <p className="section-label reveal" style={{ color: '#C9A46A', marginBottom: '20px' }}>
            Why Dukani
          </p>
          <h2
            className="font-display reveal reveal-d1"
            style={{
              fontSize: 'clamp(2.4rem, 4vw, 4.5rem)',
              fontWeight: 300,
              color: '#0A0A0A',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              margin: '0 auto 24px',
              maxWidth: '640px',
              textTransform: 'uppercase',
            }}
          >
            Our Experience
          </h2>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(48px, 6vw, 80px)',
          }}
        >
          <StatCounter target={80} suffix="+" label="Combined Leadership Experience" />
          <StatCounter target={2200} suffix="+" label="Projects Delivered" />
          <StatCounter target={300} suffix="+" label="Professionals Led" />
          <StatCounter staticVal="Global Network" label="of Investors, Developers & Operators" />
        </div>

        {/* Horizontal rule */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(201,164,106,0.35), transparent)',
            margin: 'clamp(56px, 7vw, 96px) 0 0',
          }}
        />
      </div>
    </section>
  )
}

// ─── Investments Section ──────────────────────────────────────────────────────

const INVESTMENT_DIVISIONS = [
  {
    title: 'Institutional Investment',
    description: 'Institutional-grade investment vehicles offering access to exceptional real assets.',
    img: IMG.divInvestment,
    tag: '01',
  },
  {
    title: 'Asset Management',
    description: 'Active portfolio management maximising long-term value across our global holdings.',
    img: IMG.divAssets,
    tag: '02',
  },
  {
    title: 'Dukani Digital Assets',
    description: 'Fractional digital ownership unlocking liquidity in premier global real estate assets.',
    img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    tag: '03',
  },
]

function InvestmentsSection() {
  return (
    <section
      id="investments"
      style={{ background: '#0A0A0A', padding: 'clamp(80px, 10vw, 140px) 7vw' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 'clamp(48px, 6vw, 80px)',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <p className="section-label reveal" style={{ color: '#C9A46A', marginBottom: '20px' }}>
              Capital Management
            </p>
            <h2
              className="font-display reveal reveal-d1"
              style={{
                fontSize: 'clamp(2.4rem, 4vw, 4.5rem)',
                fontWeight: 300,
                color: '#F8F6F2',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                margin: 0,
              }}
            >
              Investment
            </h2>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2px',
          }}
        >
          {INVESTMENT_DIVISIONS.map((div, i) => (
            <div
              key={div.tag}
              className={`division-card reveal reveal-d${Math.min(i + 1, 6)}`}
              style={{ aspectRatio: '4/5' }}
            >
              <img
                src={div.img}
                alt={div.title}
                className="card-img"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                loading="lazy"
              />
              {/* Dark overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.3) 55%, rgba(10,10,10,0.1) 100%)',
                }}
              />
              {/* Content */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  zIndex: 10,
                }}
              >
                <span
                  className="section-label"
                  style={{ color: 'rgba(201, 164, 106, 0.7)', fontSize: '0.55rem' }}
                >
                  {div.tag}
                </span>
                <div style={{ minHeight: '11rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <span className="gold-line" style={{ marginBottom: '16px' }} />
                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 400,
                      color: '#F8F6F2',
                      lineHeight: 1.15,
                      margin: '0 0 12px',
                      minHeight: '3.68rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}
                  >
                    {div.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.78rem',
                      color: 'rgba(248, 246, 242, 0.6)',
                      fontWeight: 300,
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {div.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Philosophy Section ───────────────────────────────────────────────────────

function PhilosophySection() {
  return (
    <section
      style={{
        background: '#0A0A0A',
        padding: 'clamp(20px, 3vw, 40px) 7vw clamp(80px, 12vw, 160px) 7vw',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle geometric background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(201,164,106,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <span className="gold-line reveal" style={{ margin: '0 auto 48px', display: 'block' }} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(48px, 6vw, 96px)',
            alignItems: 'stretch',
            textAlign: 'left',
          }}
        >
          {/* Quote 1: Alia Minhas */}
          <div className="reveal reveal-d1" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <blockquote
              className="font-display"
              style={{
                fontSize: 'clamp(1.3rem, 2vw, 1.8rem)',
                fontWeight: 300,
                color: '#F8F6F2',
                lineHeight: 1.6,
                letterSpacing: '-0.01em',
                margin: '0 0 32px',
                fontStyle: 'italic',
              }}
            >
              "The next generation of real assets will be shaped by artificial intelligence, digital ownership, and intelligent infrastructure. Our ambition is to build at the convergence of technology, capital, and the built environment, creating platforms and places designed for the future."
            </blockquote>
            <div>
              <p
                className="section-label"
                style={{ color: '#C9A46A', marginBottom: '8px', fontSize: '0.75rem', fontWeight: 600 }}
              >
                Alia Minhas
              </p>
              <p
                style={{
                  fontSize: '0.78rem',
                  color: 'rgba(248,246,242,0.4)',
                  fontWeight: 300,
                  margin: 0,
                  letterSpacing: '0.06em',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Co-Chief Executive Officer
              </p>
            </div>
          </div>

          {/* Quote 2: Manuela LECCA */}
          <div className="reveal reveal-d2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <blockquote
              className="font-display"
              style={{
                fontSize: 'clamp(1.3rem, 2vw, 1.8rem)',
                fontWeight: 300,
                color: '#F8F6F2',
                lineHeight: 1.6,
                letterSpacing: '-0.01em',
                margin: '0 0 32px',
                fontStyle: 'italic',
              }}
            >
              "Great developments are ultimately about people. Through trusted relationships, shared vision, and a commitment to excellence, we create places that inspire communities, attract investment, and endure for generations."
            </blockquote>
            <div>
              <p
                className="section-label"
                style={{ color: '#C9A46A', marginBottom: '8px', fontSize: '0.75rem', fontWeight: 600 }}
              >
                Manuela Di Guevara Fabbri
              </p>
              <p
                style={{
                  fontSize: '0.78rem',
                  color: 'rgba(248,246,242,0.4)',
                  fontWeight: 300,
                  margin: 0,
                  letterSpacing: '0.06em',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Co-Chief Executive Officer
              </p>
            </div>
          </div>
        </div>

        <span className="gold-line reveal reveal-d3" style={{ margin: '64px auto 0', display: 'block' }} />
      </div>
    </section>
  )
}

// ─── Leadership Section ───────────────────────────────────────────────────────

const MINDS_BEHIND = [
  {
    name: 'Alia Minhas',
    role: 'Co-Chief Executive Officer',
    bio: 'Entrepreneur, investor, and strategic business leader with experience across finance, technology, life sciences, and venture development. Leads Dukani Global\'s corporate strategy, innovation, investment activities, and long-term growth initiatives.',
    img: IMG.coo,
  },
  {
    name: 'Manuela Di Guevara Fabbri',
    role: 'Co-Chief Executive Officer',
    bio: 'International entrepreneur and business executive with extensive experience leading global enterprises and developing strategic partnerships across international markets. Oversees Dukani Global\'s stakeholder relationships, business development, and global expansion strategy.',
    img: IMG.ceo,
  },
]

const EXECUTIVE_TEAM = [
  {
    name: 'Faisal Bin Iftikhar',
    role: 'Managing Director & Global Head of Development',
    bio: 'Faisal Bin Iftikhar is an experienced developer and entrepreneur who leads a team of more than 200 professionals across international real estate and development projects. At Dukani Global, he leads project origination, strategic partnerships, investment opportunities, and the Group\'s global development pipeline.',
    img: IMG.faisal,
  },
  {
    name: 'Julietta Passante',
    role: 'Managing Director, Global Partnerships',
    bio: 'Julietta Passante is an entrepreneur and international business executive with extensive experience across real estate, investments, and business development. At Dukani Global, she leads the Group\'s global partnerships, investor engagement, and stakeholder relationships.',
    img: IMG.julietta,
  },
  {
    name: 'Eduart Lacaj',
    role: 'Managing Director & Global Head of Construction',
    bio: 'Eduart Lacaj is a construction executive with over 15 years of industry experience. He leads a team of more than 100 professionals and has delivered over 2,000 projects, he oversees construction, project delivery, quality, and operational excellence across Dukani Global\'s international portfolio.',
    img: IMG.eduart,
    hidden: true,
  },
]

function LeadershipSection() {
  return (
    <section
      id="leadership"
      style={{ background: '#F8F6F2', padding: 'clamp(80px, 10vw, 140px) 7vw' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          <p className="section-label reveal" style={{ color: '#C9A46A', marginBottom: '20px' }}>
            Leadership
          </p>
          <h2
            className="font-display reveal reveal-d1"
            style={{
              fontSize: 'clamp(2.4rem, 4vw, 4.5rem)',
              fontWeight: 300,
              color: '#0A0A0A',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            The Minds Behind
            <br />
            <em style={{ fontStyle: 'italic', color: '#6B6560' }}>Dukani Global</em>
          </h2>
        </div>

        {/* Primary Founders */}
        <div className="leadership-grid">
          {MINDS_BEHIND.map((leader, i) => (
            <div
              key={leader.name}
              className={`reveal reveal-d${i + 1}`}
            >
              {/* Portrait */}
              <div
                className="img-zoom"
                style={{
                  aspectRatio: '3/4',
                  marginBottom: '24px',
                  position: 'relative',
                }}
              >
                <img
                  src={leader.img}
                  alt={leader.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'grayscale(15%)',
                  }}
                  loading="lazy"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(10,10,10,0.25) 0%, transparent 60%)',
                  }}
                />
              </div>
              {/* Info */}
              <span className="gold-line" style={{ marginBottom: '16px' }} />
              <p className="section-label" style={{ color: '#C9A46A', marginBottom: '6px', fontSize: '0.55rem' }}>
                {leader.role}
              </p>
              <h3
                className="font-display"
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 400,
                  color: '#0A0A0A',
                  margin: '0 0 14px',
                  lineHeight: 1.2,
                }}
              >
                {leader.name}
              </h3>
              <p
                style={{
                  fontSize: '0.82rem',
                  lineHeight: 1.8,
                  color: '#6B6560',
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                {leader.bio}
              </p>
            </div>
          ))}
        </div>

        {/* Executive Management Team */}
        <div
          style={{
            marginTop: 'clamp(64px, 8vw, 110px)',
            borderTop: '1px solid rgba(201,164,106,0.15)',
            paddingTop: 'clamp(48px, 6vw, 80px)',
          }}
        >
          <div style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>
            <p className="section-label reveal" style={{ color: '#C9A46A', marginBottom: '16px' }}>
              Executive Board
            </p>
            <h3
              className="font-display reveal reveal-d1"
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 3rem)',
                fontWeight: 300,
                color: '#0A0A0A',
                margin: 0,
              }}
            >
              Executive Leadership Team
            </h3>
          </div>

          <div className="leadership-grid">
            {EXECUTIVE_TEAM.filter(l => !l.hidden).map((leader, i) => (
              <div
                key={leader.name}
                className={`reveal reveal-d${i + 1}`}
              >
                {/* Portrait */}
                <div
                  className="img-zoom"
                  style={{
                    aspectRatio: '3/4',
                    marginBottom: '20px',
                    position: 'relative',
                  }}
                >
                  <img
                    src={leader.img}
                    alt={leader.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'grayscale(15%)',
                    }}
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to top, rgba(10,10,10,0.2) 0%, transparent 60%)',
                    }}
                  />
                </div>
                {/* Info */}
                <span className="gold-line" style={{ marginBottom: '12px' }} />
                <p
                  className="section-label"
                  style={{
                    color: '#C9A46A',
                    marginBottom: '4px',
                    fontSize: '0.52rem',
                    minHeight: '28px',
                  }}
                >
                  {leader.role}
                </p>
                <h4
                  className="font-display"
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 400,
                    color: '#0A0A0A',
                    margin: '0 0 10px',
                    lineHeight: 1.25,
                  }}
                >
                  {leader.name}
                </h4>
                <p
                  style={{
                    fontSize: '0.78rem',
                    lineHeight: 1.7,
                    color: '#6B6560',
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Sustainability Section ───────────────────────────────────────────────────

const SUSTAIN_ITEMS = [
  {
    label: 'Green Development',
    description: 'Responsible design and sustainable development practices incorporated throughout our projects and communities.',
    icon: (
      <svg className="sustain-icon" viewBox="0 0 40 40">
        <path d="M20 4C20 4 8 12 8 22a12 12 0 0024 0C32 12 20 4 20 4z" />
        <path d="M20 4v28" />
        <path d="M20 16l-6 4" />
        <path d="M20 20l6-4" />
      </svg>
    ),
  },
  {
    label: 'Smart Buildings',
    description: 'Innovative technologies and intelligent systems that enhance operational efficiency and occupant experience.',
    icon: (
      <svg className="sustain-icon" viewBox="0 0 40 40">
        <rect x="10" y="6" width="20" height="28" rx="1" />
        <path d="M16 14h8M16 19h8M16 24h8" />
        <circle cx="20" cy="30" r="1.5" />
        <path d="M15 6V4M25 6V4" />
      </svg>
    ),
  },
  {
    label: 'Resource Efficiency',
    description: 'Energy-conscious infrastructure, water stewardship, and sustainable resource management across our developments.',
    icon: (
      <svg className="sustain-icon" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="6" />
        <path d="M20 4v4M20 32v4M4 20h4M32 20h4M8.3 8.3l2.8 2.8M28.9 28.9l2.8 2.8M8.3 31.7l2.8-2.8M28.9 11.1l2.8-2.8" />
      </svg>
    ),
  },
  {
    label: 'Responsible Hospitality',
    description: 'Community-focused destinations that create long-term value while supporting local economies and cultures.',
    icon: (
      <svg className="sustain-icon" viewBox="0 0 40 40">
        <path d="M8 32c0-8 4-16 12-20 8 4 12 12 12 20" />
        <path d="M20 12v20" />
        <path d="M12 20c4-2 8-2 8 0" />
        <path d="M28 22c-4-2-8-2-8 0" />
        <circle cx="20" cy="35" r="2" />
      </svg>
    ),
  },
]

function SustainabilitySection() {
  return (
    <section
      style={{ background: '#0A0A0A', padding: 'clamp(80px, 10vw, 140px) 7vw' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(48px, 6vw, 80px)',
            alignItems: 'start',
          }}
        >
          <div>
            <p className="section-label reveal" style={{ color: '#C9A46A', marginBottom: '20px' }}>
              Sustainability
            </p>
            <h2
              className="font-display reveal reveal-d1"
              style={{
                fontSize: 'clamp(2.4rem, 4vw, 4.5rem)',
                fontWeight: 300,
                color: '#F8F6F2',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                margin: '0 0 32px',
              }}
            >
              Creating Legacies,
              <br />
              <em style={{ fontStyle: 'italic', color: 'rgba(248,246,242,0.55)' }}>Not Just Buildings</em>
            </h2>

            {/* Lead Paragraph */}
            <p
              className="font-display reveal reveal-d2"
              style={{
                fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
                lineHeight: 1.5,
                color: '#F8F6F2',
                fontWeight: 300,
                marginBottom: '24px',
                fontStyle: 'italic',
                maxWidth: '500px',
              }}
            >
              We believe the most sustainable developments are those that people continue to value, admire, and enjoy for generations.
            </p>

            {/* Body Paragraphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '480px' }}>
              <p
                className="reveal reveal-d3"
                style={{
                  fontSize: '0.88rem',
                  lineHeight: 1.8,
                  color: 'rgba(248,246,242,0.5)',
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                At Dukani Global, sustainability is expressed through timeless architecture, intelligent innovation, and a commitment to creating places of enduring significance. Every project is guided by a simple principle: build less for the moment, and more for the future.
              </p>
              <p
                className="reveal reveal-d4"
                style={{
                  fontSize: '0.88rem',
                  lineHeight: 1.8,
                  color: 'rgba(248,246,242,0.5)',
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                By combining thoughtful design, emerging technologies, and responsible development practices, we create exceptional environments that respect their surroundings, elevate everyday experiences, and stand as enduring landmarks for generations to come.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(28px, 3vw, 48px)',
            }}
          >
            {SUSTAIN_ITEMS.map((item, i) => (
              <div
                key={item.label}
                className={`reveal reveal-d${i + 1}`}
                style={{ borderTop: '1px solid rgba(201,164,106,0.2)', paddingTop: '24px' }}
              >
                <div style={{ marginBottom: '20px' }}>{item.icon}</div>
                <h4
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: '#F8F6F2',
                    letterSpacing: '0.04em',
                    margin: '0 0 10px',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {item.label}
                </h4>
                <p
                  style={{
                    fontSize: '0.78rem',
                    color: 'rgba(248,246,242,0.45)',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Global Presence ──────────────────────────────────────────────────────────

const OFFICES = [
  { city: 'Zug', country: 'SWITZERLAND', x: 422, y: 405, primary: false, textAnchor: 'end', dx: -8, dy: -6 },
  { city: 'London', country: 'UNITED KINGDOM', x: 400, y: 370, primary: false, textAnchor: 'end', dx: -8, dy: -12 },
  { city: 'Milano', country: 'ITALY', x: 423, y: 410, primary: false, textAnchor: 'start', dx: 8, dy: -6 },
  { city: 'Monaco', country: 'MONACO', x: 419, y: 416, primary: false, textAnchor: 'start', dx: 8, dy: 14 },
  { city: 'Lisbon', country: 'PORTUGAL', x: 387, y: 429, primary: false, textAnchor: 'end', dx: -8, dy: -6 },
  { city: 'Riyadh', country: 'SAUDI ARABIA', x: 525, y: 460, primary: false, textAnchor: 'end', dx: -8, dy: -4 },
  { city: 'Abu Dhabi', country: 'UAE', x: 534, y: 466, primary: false, textAnchor: 'start', dx: 8, dy: -10 },
  { city: 'Muscat', country: 'OMAN', x: 540, y: 472, primary: false, textAnchor: 'start', dx: 8, dy: 14 },
]

function GlobalPresenceSection() {
  const [viewBox, setViewBox] = useState("30.767 241.591 784.077 458.627")
  const isMobileMap = viewBox === "330 270 280 270"

  useEffect(() => {
    if (window.innerWidth < 768) {
      setViewBox("330 270 280 270")
    }
  }, [])

  return (
    <section
      style={{ background: '#F8F6F2', padding: 'clamp(80px, 10vw, 140px) 7vw' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(48px, 6vw, 72px)', textAlign: 'center' }}>
          <p className="section-label reveal" style={{ color: '#C9A46A', marginBottom: '20px', textTransform: 'uppercase' }}>
            GLOBAL PRESENCE
          </p>
          <h2
            className="font-display reveal reveal-d1"
            style={{
              fontSize: 'clamp(2.4rem, 4vw, 4.5rem)',
              fontWeight: 300,
              color: '#0A0A0A',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            Global Reach.
            <br />
            <em style={{ fontStyle: 'italic', color: '#6B6560' }}>Enduring Vision.</em>
          </h2>
        </div>

        {/* World map SVG */}
        <div
          className="reveal map-scroll-container"
          style={{
            background: '#0A0A0A',
            padding: 0,
            position: 'relative',
          }}
        >
          <svg
            className="map-svg-element"
            viewBox={viewBox}
            style={{ width: '100%', display: 'block' }}
            aria-label="World map showing Dukani Global office locations"
          >
            {/* Real World Map Background Image */}
            <image
              href="/world-map.svg"
              x="30.767"
              y="241.591"
              width="784.077"
              height="458.627"
              style={{ opacity: 1 }}
            />
            {/* Office labels only (dots and connections removed) */}
            {OFFICES.map((office) => (
              <g key={office.city}>
                {/* Label */}
                <text
                  x={office.x + (office.dx || 0)}
                  y={office.y + (office.dy || 0)}
                  fill="#C9A46A"
                  fontSize={isMobileMap ? "5.5" : "9"}
                  fontFamily="Inter, sans-serif"
                  textAnchor={office.textAnchor || 'middle'}
                  letterSpacing={isMobileMap ? "0.5" : "1"}
                  className="map-label"
                >
                  {office.city.toUpperCase()}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Office list */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${OFFICES.length}, minmax(130px, 1fr))`,
            gap: '1px',
            background: 'rgba(201,164,106,0.15)',
            marginTop: '3px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {OFFICES.map((office, i) => (
            <div
              key={office.city}
              className={`reveal reveal-d${i + 1}`}
              style={{
                background: '#F8F6F2',
                padding: '24px clamp(12px, 2vw, 24px)',
                borderTop: office.primary ? '2px solid #C9A46A' : '2px solid transparent',
              }}
            >
              <p
                className="font-display"
                style={{
                  fontSize: 'clamp(0.72rem, 0.95vw, 0.95rem)',
                  fontWeight: 400,
                  color: '#0A0A0A',
                  margin: '0 0 6px',
                  lineHeight: 1.2,
                  letterSpacing: '0.02em',
                  whiteSpace: 'normal',
                }}
              >
                {office.country}
              </p>
              <p
                className="section-label"
                style={{
                  color: '#C9A46A',
                  margin: 0,
                  fontSize: '0.62rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                {office.city}
              </p>
              {office.primary && (
                <p
                  style={{
                    fontSize: '0.65rem',
                    color: '#C9A46A',
                    margin: '6px 0 0',
                    letterSpacing: '0.1em',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Global HQ
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

// ─── The Mariva Engine ─────────────────────────────────────────────────────────

const ENGINE_PILLARS = [
  {
    tag: '01',
    label: 'Mind',
    title: 'Technology & Intelligence',
    description:
      'Harnessing artificial intelligence, advanced software, data, and emerging technologies to transform how real assets are conceived, developed, financed, and operated.',
  },
  {
    tag: '02',
    label: 'Heart',
    title: 'Capital & Ownership',
    description:
      'Connecting opportunity with investment through strategic partnerships, innovative capital structures, and future Dukani Digital Assets platforms that broaden access to exceptional real-world assets.',
  },
  {
    tag: '03',
    label: 'Body',
    title: 'Design & Delivery',
    description:
      'Creating architecturally distinctive developments, luxury hospitality destinations, infrastructure, and strategic assets that combine beauty, functionality, and long-term value.',
  },
]

function DukaniEngineSection() {
  return (
    <section
      id="engine"
      style={{ background: '#0A0A0A', padding: 'clamp(80px, 10vw, 140px) 7vw' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(56px, 7vw, 96px)' }}>
          <p className="section-label reveal" style={{ color: '#C9A46A', marginBottom: '20px' }}>
            Strategic Pillars
          </p>
          <h2
            className="font-display reveal reveal-d1"
            style={{
              fontSize: 'clamp(2.4rem, 4vw, 4.5rem)',
              fontWeight: 300,
              color: '#F8F6F2',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              margin: '0 auto 24px',
              maxWidth: '640px',
              textTransform: 'uppercase',
            }}
          >
            The Dukani Engine
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(32px, 4vw, 56px)',
          }}
        >
          {ENGINE_PILLARS.map((pillar, i) => (
            <div
              key={pillar.label}
              className={`reveal reveal-d${i + 1}`}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(201, 164, 106, 0.12)',
                padding: 'clamp(32px, 4vw, 48px)',
                position: 'relative',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '280px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C9A46A'
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.background = 'rgba(201, 164, 106, 0.03)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201, 164, 106, 0.12)'
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
              }}
            >
              {/* Massive low-opacity number indicator */}
              <div
                className="font-display"
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '24px',
                  fontSize: '4.5rem',
                  fontWeight: 300,
                  color: '#C9A46A',
                  opacity: 0.08,
                  userSelect: 'none',
                  lineHeight: 1,
                }}
              >
                {pillar.tag}
              </div>

              <div>
                {/* Gold Section Label */}
                <p
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: '#C9A46A',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    margin: '0 0 20px',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {pillar.label}
                </p>

                {/* Title */}
                <h3
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
                    fontWeight: 300,
                    color: '#F8F6F2',
                    margin: '0 0 16px',
                    lineHeight: 1.3,
                  }}
                >
                  {pillar.title}
                </h3>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.8,
                  color: 'rgba(248, 246, 242, 0.65)',
                  fontWeight: 300,
                  margin: 0,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── The Founders' Circle Section ─────────────────────────────────────────────

function FoundersCircleSection() {
  return (
    <section
      id="founders-circle"
      style={{
        background: '#0A0A0A',
        padding: 'clamp(100px, 12vw, 160px) 7vw',
        textAlign: 'center',
        borderTop: '1px solid rgba(201, 164, 106, 0.15)',
        borderBottom: '1px solid rgba(201, 164, 106, 0.15)',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p
          className="section-label reveal"
          style={{
            color: '#C9A46A',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontSize: 'clamp(0.75rem, 1vw, 0.85rem)',
          }}
        >
          The Founders' Circle
        </p>
        <h2
          className="font-display reveal reveal-d1"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
            fontWeight: 300,
            color: '#F8F6F2',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            margin: '0 auto 36px',
            maxWidth: '700px',
          }}
        >
          A Rare Invitation,
          <br />
          <em style={{ fontStyle: 'italic', color: '#C9A46A' }}>Before the World Arrives</em>
        </h2>
        <p
          className="reveal reveal-d2"
          style={{
            fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
            color: 'rgba(248, 246, 242, 0.75)',
            fontWeight: 300,
            lineHeight: 1.85,
            marginBottom: '16px',
          }}
        >
          Before Dukani Global opens its doors to the market, a limited circle of investors and partners will be given first access, first pricing, and first choice. This is not a public launch. It is a quiet invitation, extended to those who recognise value before it becomes obvious to everyone else.
        </p>
        <p
          className="reveal reveal-d3 font-display"
          style={{
            fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
            color: '#C9A46A',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.6,
            marginBottom: '48px',
          }}
        >
          Membership is limited by design, not by demand.
        </p>
        <div className="reveal reveal-d4">
          <a href="#contact" className="btn-gold">
            Request Private Access
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    enquiry: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      style={{ background: '#F8F6F2', padding: 'clamp(80px, 10vw, 140px) 7vw' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(48px, 8vw, 120px)',
          }}
        >
          {/* Left: info */}
          <div>
            <p className="section-label reveal" style={{ color: '#C9A46A', marginBottom: '20px' }}>
              Contact
            </p>
            <h2
              className="font-display reveal reveal-d1"
              style={{
                fontSize: 'clamp(2.4rem, 4vw, 4.5rem)',
                fontWeight: 300,
                color: '#0A0A0A',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                margin: '0 0 32px',
              }}
            >
              Begin a
              <br />
              <em style={{ fontStyle: 'italic', color: '#6B6560' }}>Conversation</em>
            </h2>
            <p
              className="reveal reveal-d2"
              style={{
                fontSize: '0.88rem',
                lineHeight: 1.9,
                color: '#6B6560',
                fontWeight: 300,
                marginBottom: '52px',
                maxWidth: '400px',
              }}
            >
              Whether you represent an institutional investor, seek a development partnership,
              or are exploring our hospitality experiences, we welcome your enquiry.
            </p>

            {/* Office info */}
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}
            >
              {[
                {
                  city: 'Abu Dhabi',
                  address: 'Business avenue tower office 1901\nAbu Dhabi',
                  email: 'global@dukaniglobal.com',
                },
              ].map((office, i) => (
                <div
                  key={office.city}
                  className={`reveal reveal-d${i + 3}`}
                  style={{
                    borderLeft: '1px solid rgba(201,164,106,0.35)',
                    paddingLeft: '20px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      color: '#C9A46A',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      margin: '0 0 10px',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {office.city}
                  </p>
                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: '#6B6560',
                      fontWeight: 300,
                      lineHeight: 1.7,
                      margin: '0 0 8px',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {office.address}
                  </p>
                  {office.tel && (
                    <p style={{ fontSize: '0.82rem', color: '#2B2B2B', margin: '0 0 4px', fontWeight: 300 }}>
                      {office.tel}
                    </p>
                  )}
                  <p style={{ fontSize: '0.82rem', color: '#2B2B2B', margin: 0, fontWeight: 300 }}>
                    {office.email}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal reveal-right">
            {submitted ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '100%',
                  minHeight: '360px',
                  textAlign: 'center',
                }}
              >
                <span className="gold-line" style={{ margin: '0 auto 32px' }} />
                <h3
                  className="font-display"
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 300,
                    color: '#0A0A0A',
                    margin: '0 0 16px',
                  }}
                >
                  Thank You
                </h3>
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: '#6B6560',
                    fontWeight: 300,
                    lineHeight: 1.8,
                    maxWidth: '360px',
                    margin: '0 auto',
                  }}
                >
                  Your enquiry has been received. A member of our team will be in touch
                  within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.58rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#A09990',
                      marginBottom: '6px',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="luxury-input"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.58rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#A09990',
                      marginBottom: '6px',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="luxury-input"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.58rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#A09990',
                      marginBottom: '6px',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Nature of Enquiry
                  </label>
                  <select
                    className="luxury-select"
                    value={form.enquiry}
                    onChange={(e) => setForm({ ...form, enquiry: e.target.value })}
                  >
                    <option value="" disabled>
                      Select enquiry type
                    </option>
                    <option>Investment Opportunities</option>
                    <option>Development Partnership</option>
                    <option>Hospitality & Reservations</option>
                    <option>Commercial Leasing</option>
                    <option>Media & Press</option>
                    <option>General Enquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.58rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: '#A09990',
                      marginBottom: '6px',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="luxury-input"
                    placeholder="Tell us about your enquiry"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ resize: 'none' }}
                  />
                </div>

                <button type="submit" className="btn-gold" style={{ alignSelf: 'flex-start' }}>
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function SiteFooter() {
  return (
    <footer
      style={{
        background: '#0A0A0A',
        padding: 'clamp(56px, 7vw, 96px) 7vw clamp(32px, 4vw, 48px)',
        borderTop: '1px solid rgba(201,164,106,0.15)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 'clamp(36px, 4vw, 60px)',
            marginBottom: 'clamp(48px, 6vw, 80px)',
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '24px' }}>
              <img
                src="/logo.png"
                alt="Dukani Global Logo"
                style={{
                  height: 'clamp(90px, 12vw, 120px)',
                  width: 'auto',
                  display: 'block',
                }}
              />
            </div>
            <p
              style={{
                fontSize: '0.78rem',
                color: 'rgba(248,246,242,0.38)',
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: '260px',
              }}
            >
              Building exceptional places and creating enduring value.
            </p>
          </div>

          {/* Company Column */}
          <div>
            <p
              className="section-label"
              style={{ color: '#C9A46A', marginBottom: '20px', fontSize: '0.55rem' }}
            >
              Company
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'About Dukani', href: '#about' },
                { name: 'Leadership', href: '#leadership' },
                { name: 'Sustainability', href: '#sustainability' },
                { name: 'Contact Us', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '0.78rem',
                      color: 'rgba(248,246,242,0.45)',
                      textDecoration: 'none',
                      fontWeight: 300,
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#F8F6F2')}
                    onMouseLeave={(e) =>
                      ((e.target as HTMLAnchorElement).style.color = 'rgba(248,246,242,0.45)')
                    }
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisions Column */}
          <div>
            <p
              className="section-label"
              style={{ color: '#C9A46A', marginBottom: '20px', fontSize: '0.55rem' }}
            >
              Divisions
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Property Development', href: '#divisions' },
                { name: 'Luxury Hotels', href: '#divisions' },
                { name: 'Resorts & Retreats', href: '#divisions' },
                { name: 'Commercial Spaces', href: '#divisions' },
                { name: 'Dukani Digital Assets', href: '#divisions' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '0.78rem',
                      color: 'rgba(248,246,242,0.45)',
                      textDecoration: 'none',
                      fontWeight: 300,
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#F8F6F2')}
                    onMouseLeave={(e) =>
                      ((e.target as HTMLAnchorElement).style.color = 'rgba(248,246,242,0.45)')
                    }
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <p
              className="section-label"
              style={{ color: '#C9A46A', marginBottom: '20px', fontSize: '0.55rem' }}
            >
              Contact
            </p>
            <p
              style={{
                fontSize: '0.78rem',
                color: 'rgba(248,246,242,0.45)',
                lineHeight: 1.7,
                fontWeight: 300,
                margin: '0 0 12px',
                whiteSpace: 'pre-line',
              }}
            >
              Business avenue tower office 1901
              {"\n"}Abu Dhabi, UAE
            </p>
            <p
              style={{
                fontSize: '0.78rem',
                color: 'rgba(248,246,242,0.45)',
                fontWeight: 300,
                margin: '0 0 20px',
              }}
            >
              <a
                href="mailto:global@dukaniglobal.com"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#F8F6F2')}
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = 'rgba(248,246,242,0.45)')
                }
              >
                global@dukaniglobal.com
              </a>
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {[
                {
                  name: 'LinkedIn',
                  url: '#',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  )
                },
                {
                  name: 'Instagram',
                  url: '#',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )
                },
                {
                  name: 'X',
                  url: '#',
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                    </svg>
                  )
                }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  aria-label={social.name}
                  style={{
                    color: 'rgba(248,246,242,0.35)',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLAnchorElement;
                    target.style.color = '#C9A46A';
                    target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLAnchorElement;
                    target.style.color = 'rgba(248,246,242,0.35)';
                    target.style.transform = 'none';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(201,164,106,0.1)',
            paddingTop: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <p
            style={{
              fontSize: '0.68rem',
              color: 'rgba(248,246,242,0.25)',
              fontWeight: 300,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            © 2026 Dukani Global. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: '0.65rem',
                  color: 'rgba(248,246,242,0.25)',
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = 'rgba(248,246,242,0.6)')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = 'rgba(248,246,242,0.25)')
                }
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Scroll To Top Component ──────────────────────────────────────────────────

function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }
    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: 'clamp(24px, 4vw, 40px)',
        right: 'clamp(24px, 4vw, 40px)',
        zIndex: 90,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: hovered ? '#C9A46A' : 'rgba(10, 10, 10, 0.85)',
        border: hovered ? '1px solid #C9A46A' : '1px solid rgba(201, 164, 106, 0.4)',
        color: hovered ? '#0A0A0A' : '#C9A46A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? 'scale(1.1) translateY(-4px)' : 'scale(1) translateY(0)') : 'scale(0.8) translateY(20px)',
        pointerEvents: visible ? 'auto' : 'none',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease, color 0.3s ease',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
      }}
      aria-label="Scroll to top"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          transition: 'transform 0.3s ease',
        }}
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  )
}

// ─── Root Component ───────────────────────────────────────────────────────────

function DukaniGlobal() {
  useScrollReveal()

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <DivisionsSection />
      <PhilosophySection />
      <LeadershipSection />
      <DukaniEngineSection />
      <StatsSection />
      {/* <ProjectsSection /> */}
      {/* <HospitalitySection /> */}
      {/* <InvestmentsSection /> */}
      <SustainabilitySection />
      <GlobalPresenceSection />
      <FoundersCircleSection />
      <ContactSection />
      <SiteFooter />
      <ScrollToTop />
    </div>
  )
}
