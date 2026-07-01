import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: MarivaGlobal,
})

// ─── Curated image collection ─────────────────────────────────────────────────
const IMG = {
  hero: '/imh.png',
  about: '/about-group.jpg',
  divPropDev: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
  divHotels: 'https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=800&q=80',
  divResorts: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  divCommercial: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  divInvestment: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  divAssets: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=800&q=80',
  proj1: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85',
  proj2: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=85',
  proj3: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=85',
  proj4: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=85',
  hospitality: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=85',
  hosPool: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80',
  hosDining: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
  hosSpa: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
  hosInterior: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80',
  ceo: '/manuela-di-guevara.jpg',
  coo: '/alia-minhas.jpg',
  cfo: '/francesco-merola.jpg',
  faisal: '/faisal-iftikhar.jpg',
  julietta: '/julietta.jpg',
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
}: {
  target: number
  suffix?: string
  label: string
  prefix?: string
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
    if (!started) return
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
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div
        className="font-display"
        style={{
          fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
          fontWeight: 300,
          color: '#0A0A0A',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          marginBottom: '12px',
        }}
      >
        {prefix}{count}{suffix}
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
    { label: 'Projects', href: '#projects' },
    { label: 'Hospitality', href: '#hospitality' },
    { label: 'Investments', href: '#investments' },
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
          zIndex: 100,
          padding: '0 5vw',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(10, 10, 10, 0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201, 164, 106, 0.12)' : 'none',
          transition: 'background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{ textDecoration: 'none', lineHeight: 1.1 }}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <div
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.38em',
              color: '#F8F6F2',
              fontWeight: 400,
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
            }}
          >
            MARIVA
          </div>
          <div
            style={{
              fontSize: '0.58rem',
              letterSpacing: '0.48em',
              color: '#C9A46A',
              fontWeight: 400,
              fontFamily: 'Inter, sans-serif',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}
          >
            GLOBAL
          </div>
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
        <div style={{ marginBottom: '60px' }}>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.4em', color: '#C9A46A', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' }}>
            MARIVA GLOBAL
          </div>
        </div>
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
        <div style={{ marginTop: '60px' }}>
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
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '640px',
        background: '#0A0A0A',
        overflow: 'hidden',
      }}
    >
      {/* Background image with Ken Burns */}
      <div
        className="hero-bg"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${IMG.hero}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          willChange: 'transform',
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(160deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.75) 100%)',
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
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: '10vh',
          paddingLeft: '7vw',
          paddingRight: '7vw',
        }}
      >
        <p
          className="section-label hero-label"
          style={{ color: '#C9A46A', marginBottom: '28px' }}
        >
          Mariva Global · Est. 2004
        </p>

        <h1
          className="font-display hero-title"
          style={{
            fontSize: 'clamp(3rem, 6.5vw, 8rem)',
            fontWeight: 300,
            color: '#F8F6F2',
            lineHeight: 1.04,
            letterSpacing: '-0.01em',
            margin: '0 0 32px',
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
            fontSize: 'clamp(0.82rem, 1.1vw, 0.95rem)',
            lineHeight: 1.8,
            color: 'rgba(248, 246, 242, 0.68)',
            marginBottom: '52px',
            fontWeight: 300,
          }}
        >
          Mariva Global develops landmark real estate, luxury hospitality, and global
          investment opportunities that redefine modern living.
        </p>

        <div className="hero-cta" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <a href="#projects" className="btn-gold">
            Explore Projects
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(48px, 6vw, 100px)',
          alignItems: 'center',
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
          <p
            className="reveal reveal-d3"
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.9,
              color: '#6B6560',
              marginBottom: '24px',
              fontWeight: 300,
              maxWidth: '520px',
            }}
          >
            Founded with a singular vision, Mariva Global has grown into one of the
            region's most respected diversified investment and development groups. We
            create places that endure — properties that define skylines, resorts that
            redefine hospitality, and commercial spaces that inspire.
          </p>
          <p
            className="reveal reveal-d4"
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.9,
              color: '#6B6560',
              marginBottom: '48px',
              fontWeight: 300,
              maxWidth: '520px',
            }}
          >
            Our portfolio spans property development, luxury hotels and resorts, mixed-use
            developments, commercial real estate, and strategic global partnerships — united
            by an uncompromising standard of quality.
          </p>

          <div
            className="reveal reveal-d5"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px 32px',
              marginBottom: '48px',
            }}
          >
            {[
              'Property Development',
              'Luxury Hotels & Resorts',
              'Mixed-use Developments',
              'Commercial Real Estate',
              'Investment Opportunities',
              'Asset Management',
              'Global Partnerships',
            ].map((item) => (
              <span
                key={item}
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                  color: '#2B2B2B',
                  fontWeight: 400,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span
                  style={{
                    width: '4px',
                    height: '4px',
                    background: '#C9A46A',
                    borderRadius: '50%',
                    flexShrink: 0,
                  }}
                />
                {item}
              </span>
            ))}
          </div>

          <a href="#divisions" className="btn-outline-dark reveal reveal-d6">
            Our Divisions
          </a>
        </div>

        {/* Right: image */}
        <div className="reveal-right" style={{ position: 'relative' }}>
          <div
            className="img-zoom"
            style={{
              aspectRatio: '4/5',
              maxHeight: '680px',
            }}
          >
            <img
              src={IMG.about}
              alt="Mariva Global architectural portfolio"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              loading="lazy"
            />
          </div>
          {/* Gold corner accent */}
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
    img: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80',
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
              Nine Pillars of
              <br />
              <em style={{ fontStyle: 'italic', color: 'rgba(248,246,242,0.65)' }}>
                Global Excellence
              </em>
            </h2>
          </div>
          <a
            href="#projects"
            className="btn-outline-white reveal"
            style={{ flexShrink: 0 }}
          >
            View All Projects
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
                <div>
                  <span className="gold-line" style={{ marginBottom: '16px' }} />
                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 400,
                      color: '#F8F6F2',
                      lineHeight: 1.15,
                      margin: '0 0 12px',
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
    name: 'Mariva One Tower',
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
    name: 'The Mariva Residences',
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
    name: 'Mariva Financial Centre',
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
            Signature Projects
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
            Each project is a singular statement — a convergence of location, architecture,
            and meticulous craft executed to the highest global standard.
          </p>
        </div>

        {/* Project grid — editorial asymmetric layout */}
        <div style={{ display: 'grid', gap: '3px' }}>
          {/* Row 1: large + 2 small */}
          <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '3px' }}>
            <ProjectCard project={PROJECTS[0]} delay={1} />
            <div style={{ display: 'grid', gap: '3px' }}>
              <ProjectCard project={PROJECTS[1]} delay={2} compact />
              <ProjectCard project={PROJECTS[2]} delay={3} compact />
            </div>
          </div>
          {/* Row 2: large */}
          <ProjectCard project={PROJECTS[3]} delay={1} wide />
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
      style={{ aspectRatio: wide ? '16/6' : compact ? '4/3' : '4/5' }}
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
            alt="Mariva luxury hospitality — infinity pool"
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
            Why Mariva
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
            }}
          >
            Numbers That Speak
            <br />
            <em style={{ fontStyle: 'italic', color: '#6B6560' }}>to Our Scale</em>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'clamp(48px, 6vw, 80px)',
          }}
        >
          <StatCounter target={20} suffix="+" label="Years of Excellence" />
          <StatCounter target={100} suffix="+" label="Projects Delivered" />
          <StatCounter target={5} suffix="+" label="Countries" />
          <StatCounter target={47} prefix="" suffix="M+" label="Sq Ft Developed" />
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
    title: 'Tokenisation',
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
                <div>
                  <span className="gold-line" style={{ marginBottom: '16px' }} />
                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 400,
                      color: '#F8F6F2',
                      lineHeight: 1.15,
                      margin: '0 0 12px',
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
        padding: 'clamp(80px, 12vw, 160px) 7vw',
        textAlign: 'center',
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
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <span className="gold-line reveal" style={{ margin: '0 auto 48px', display: 'block' }} />
        <blockquote
          className="font-display reveal reveal-d1"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 5rem)',
            fontWeight: 300,
            color: '#F8F6F2',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            margin: '0 0 32px',
            fontStyle: 'italic',
          }}
        >
          "We don't simply construct buildings.
          <br />
          We create destinations that inspire generations."
        </blockquote>
        <p
          className="section-label reveal reveal-d2"
          style={{ color: '#C9A46A', marginBottom: '8px' }}
        >
          Manuela Di Guevara Fabbri
        </p>
        <p
          className="reveal reveal-d3"
          style={{
            fontSize: '0.78rem',
            color: 'rgba(248,246,242,0.4)',
            fontWeight: 300,
            margin: 0,
            letterSpacing: '0.06em',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Founder & Chairman, Mariva Global
        </p>
        <span className="gold-line reveal reveal-d4" style={{ margin: '48px auto 0', display: 'block' }} />
      </div>
    </section>
  )
}

// ─── Leadership Section ───────────────────────────────────────────────────────

const LEADERS = [
  {
    name: 'Manuela Di Guevara Fabbri',
    role: 'Founder & Chairman',
    bio: 'A visionary entrepreneur with 25 years at the forefront of international real estate, Manuela founded Mariva Global in 2004 with a mandate to develop places of enduring beauty and value.',
    img: IMG.ceo,
  },
  {
    name: 'Alia Minhas',
    role: 'Chief Executive Officer',
    bio: 'Former partner at Foster + Partners and advisor to sovereign wealth funds, Alia joined Mariva in 2015 and now leads strategic direction across all global divisions.',
    img: IMG.coo,
  },
  {
    name: 'Francesco Merola',
    role: 'Chief Investment Officer',
    bio: 'With deep expertise in cross-border capital allocation from Goldman Sachs and KKR, Francesco oversees the group\'s investment strategy and global partnerships.',
    img: IMG.cfo,
  },
  {
    name: 'Faisal Iftikhar',
    role: 'Chief Development Officer',
    bio: 'With over two decades of leading luxury residential and commercial developments globally, Faisal directs Mariva\'s architectural master planning and construction delivery.',
    img: IMG.faisal,
  },
  {
    name: 'Julietta',
    role: 'Director Sales & Marketing',
    bio: 'Independent property developer/trader, specializing in land acquisition and resale to major groups such as Kaufman & Broad, Constructa, or Nexity.',
    img: IMG.julietta,
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
            <em style={{ fontStyle: 'italic', color: '#6B6560' }}>Mariva Global</em>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 'clamp(32px, 4vw, 56px)',
          }}
        >
          {LEADERS.map((leader, i) => (
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
      </div>
    </section>
  )
}

// ─── Sustainability Section ───────────────────────────────────────────────────

const SUSTAIN_ITEMS = [
  {
    label: 'Green Development',
    description: 'LEED Platinum and BREEAM Outstanding certifications across our entire portfolio.',
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
    description: 'AI-driven building management systems that reduce energy consumption by up to 40%.',
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
    label: 'Renewable Energy',
    description: 'All Mariva properties powered by 100% renewable energy by 2028.',
    icon: (
      <svg className="sustain-icon" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="6" />
        <path d="M20 4v4M20 32v4M4 20h4M32 20h4M8.3 8.3l2.8 2.8M28.9 28.9l2.8 2.8M8.3 31.7l2.8-2.8M28.9 11.1l2.8-2.8" />
      </svg>
    ),
  },
  {
    label: 'Sustainable Hospitality',
    description: 'Farm-to-table dining, zero-waste operations, and carbon-neutral resort experiences.',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(48px, 6vw, 80px)',
            alignItems: 'center',
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
                margin: '0 0 24px',
              }}
            >
              Building a
              <br />
              <em style={{ fontStyle: 'italic', color: 'rgba(248,246,242,0.55)' }}>Better World</em>
            </h2>
            <p
              className="reveal reveal-d2"
              style={{
                fontSize: '0.88rem',
                lineHeight: 1.9,
                color: 'rgba(248,246,242,0.5)',
                fontWeight: 300,
                maxWidth: '440px',
              }}
            >
              Environmental responsibility is integral to everything we build. Our net-zero
              commitment guides every design decision — from materials sourcing to operational
              carbon across our global portfolio.
            </p>
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
  { city: 'Dubai', country: 'UAE', x: 663, y: 237, primary: true },
  { city: 'London', country: 'UK', x: 478, y: 130, primary: false },
  { city: 'Riyadh', country: 'KSA', x: 638, y: 256, primary: false },
  { city: 'Singapore', country: 'SGP', x: 818, y: 302, primary: false },
  { city: 'New York', country: 'USA', x: 218, y: 183, primary: false },
]

function GlobalPresenceSection() {
  return (
    <section
      style={{ background: '#F8F6F2', padding: 'clamp(80px, 10vw, 140px) 7vw' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(48px, 6vw, 72px)', textAlign: 'center' }}>
          <p className="section-label reveal" style={{ color: '#C9A46A', marginBottom: '20px' }}>
            Global Presence
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
            Five Continents.
            <br />
            <em style={{ fontStyle: 'italic', color: '#6B6560' }}>One Vision.</em>
          </h2>
        </div>

        {/* World map SVG */}
        <div
          className="reveal"
          style={{
            background: '#0A0A0A',
            padding: '48px',
            position: 'relative',
          }}
        >
          <svg
            viewBox="0 0 1000 500"
            style={{ width: '100%', display: 'block' }}
            aria-label="World map showing Mariva Global office locations"
          >
            {/* Simplified continent shapes */}
            {/* North America */}
            <path
              className="map-continent"
              d="M 145 58 L 280 50 L 350 70 L 360 110 L 340 160 L 310 200 L 290 240 L 270 280 L 235 295 L 210 270 L 180 240 L 160 210 L 130 190 L 110 155 L 105 120 L 120 85 Z"
            />
            {/* Greenland */}
            <path
              className="map-continent"
              d="M 310 25 L 370 20 L 400 45 L 390 75 L 360 85 L 320 75 L 305 50 Z"
            />
            {/* South America */}
            <path
              className="map-continent"
              d="M 215 305 L 285 295 L 315 315 L 325 360 L 310 410 L 280 455 L 245 465 L 215 440 L 198 400 L 195 355 L 205 320 Z"
            />
            {/* Europe */}
            <path
              className="map-continent"
              d="M 445 50 L 560 48 L 580 75 L 570 120 L 545 160 L 510 175 L 475 170 L 450 150 L 435 115 L 440 75 Z"
            />
            {/* Africa */}
            <path
              className="map-continent"
              d="M 448 185 L 578 178 L 598 230 L 590 305 L 565 375 L 530 435 L 490 462 L 455 450 L 430 400 L 420 330 L 432 255 L 443 210 Z"
            />
            {/* Asia (simplified) */}
            <path
              className="map-continent"
              d="M 575 45 L 740 38 L 850 42 L 930 70 L 950 130 L 940 200 L 900 265 L 850 300 L 790 315 L 720 310 L 660 285 L 600 270 L 570 225 L 560 175 L 568 110 L 570 70 Z"
            />
            {/* Indian subcontinent */}
            <path
              className="map-continent"
              d="M 680 220 L 730 210 L 755 240 L 745 295 L 715 325 L 685 310 L 668 270 Z"
            />
            {/* Southeast Asia */}
            <path
              className="map-continent"
              d="M 790 255 L 850 245 L 870 280 L 860 320 L 835 340 L 800 330 L 782 295 Z"
            />
            {/* Oceania */}
            <path
              className="map-continent"
              d="M 820 345 L 935 335 L 958 380 L 950 430 L 910 460 L 860 455 L 825 420 L 810 385 Z"
            />
            {/* Japan */}
            <path
              className="map-continent"
              d="M 882 130 L 908 120 L 920 145 L 905 168 L 883 162 Z"
            />

            {/* Connection lines between offices */}
            {OFFICES.map((from, fi) =>
              OFFICES.slice(fi + 1).map((to) => (
                <line
                  key={`${from.city}-${to.city}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className="map-connection"
                />
              ))
            )}

            {/* Office dots */}
            {OFFICES.map((office) => (
              <g key={office.city}>
                {/* Pulse ring */}
                <circle
                  cx={office.x}
                  cy={office.y}
                  r={office.primary ? 14 : 10}
                  className="map-dot-ring"
                  style={{ animationDelay: `${Math.random() * 2}s` }}
                />
                {/* Main dot */}
                <circle
                  cx={office.x}
                  cy={office.y}
                  r={office.primary ? 5 : 3.5}
                  className="map-dot"
                />
                {/* Label */}
                <text
                  x={office.x}
                  y={office.y - 14}
                  fill="#C9A46A"
                  fontSize="9"
                  fontFamily="Inter, sans-serif"
                  textAnchor="middle"
                  letterSpacing="1"
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1px',
            background: 'rgba(201,164,106,0.15)',
            marginTop: '3px',
          }}
        >
          {OFFICES.map((office, i) => (
            <div
              key={office.city}
              className={`reveal reveal-d${i + 1}`}
              style={{
                background: '#F8F6F2',
                padding: '28px 24px',
                borderTop: office.primary ? '2px solid #C9A46A' : '2px solid transparent',
              }}
            >
              <p className="section-label" style={{ color: '#C9A46A', marginBottom: '6px', fontSize: '0.55rem' }}>
                {office.country}
              </p>
              <p
                className="font-display"
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 400,
                  color: '#0A0A0A',
                  margin: 0,
                  lineHeight: 1.2,
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

const TESTIMONIALS = [
  {
    quote:
      'Mariva Global delivered beyond every expectation. The Mariva One Tower isn\'t just a building — it is a statement about what is possible.',
    name: 'H.E. Khalid Al-Rashid',
    title: 'Minister of Urban Development',
  },
  {
    quote:
      'The level of craft, the attention to detail, and the sophistication Mariva brings to every project sets them apart entirely from their peers.',
    name: 'Victoria Chen',
    title: 'Principal Architect, Zaha Hadid Architects',
  },
  {
    quote:
      'Our investment in the Mariva portfolio has delivered exceptional risk-adjusted returns, underpinned by genuinely world-class assets.',
    name: 'Richard Ashworth',
    title: 'Managing Director, Sovereign Capital Partners',
  },
]

function TestimonialsSection() {
  return (
    <section
      style={{ background: '#0A0A0A', padding: 'clamp(80px, 10vw, 140px) 7vw' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          <p className="section-label reveal" style={{ color: '#C9A46A', marginBottom: '20px' }}>
            Testimonials
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
            Trusted by the World's
            <br />
            <em style={{ fontStyle: 'italic', color: 'rgba(248,246,242,0.55)' }}>Most Discerning</em>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'clamp(32px, 4vw, 56px)',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`testimonial-card reveal reveal-d${i + 1}`}
            >
              {/* Quote mark */}
              <div
                className="font-display"
                style={{
                  fontSize: '5rem',
                  lineHeight: 0.8,
                  color: '#C9A46A',
                  opacity: 0.35,
                  marginBottom: '24px',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;
              </div>
              <blockquote
                className="font-display"
                style={{
                  fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
                  fontWeight: 300,
                  color: '#F8F6F2',
                  lineHeight: 1.5,
                  margin: '0 0 32px',
                  fontStyle: 'italic',
                }}
              >
                {t.quote}
              </blockquote>
              <div>
                <p
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    color: '#F8F6F2',
                    margin: '0 0 4px',
                    letterSpacing: '0.04em',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {t.name}
                </p>
                <p
                  style={{
                    fontSize: '0.72rem',
                    color: 'rgba(248,246,242,0.4)',
                    fontWeight: 300,
                    margin: 0,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {t.title}
                </p>
              </div>
            </div>
          ))}
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
              or are exploring our hospitality experiences — we welcome your enquiry.
            </p>

            {/* Office info */}
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}
            >
              {[
                {
                  city: 'Dubai (Global HQ)',
                  address: 'Mariva One Tower, Level 42\nDowntown Dubai, UAE',
                  tel: '+971 4 XXX XXXX',
                  email: 'global@marivaglobal.com',
                },
                {
                  city: 'London',
                  address: '45 Berkeley Square, Mayfair\nLondon, W1J 5AS',
                  tel: '+44 20 XXXX XXXX',
                  email: 'london@marivaglobal.com',
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
                  <p style={{ fontSize: '0.82rem', color: '#2B2B2B', margin: '0 0 4px', fontWeight: 300 }}>
                    {office.tel}
                  </p>
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
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.38em',
                  color: '#F8F6F2',
                  fontWeight: 400,
                  fontFamily: 'Inter, sans-serif',
                  textTransform: 'uppercase',
                }}
              >
                MARIVA
              </div>
              <div
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.48em',
                  color: '#C9A46A',
                  fontWeight: 400,
                  fontFamily: 'Inter, sans-serif',
                  textTransform: 'uppercase',
                  marginTop: '2px',
                }}
              >
                GLOBAL
              </div>
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
              Building exceptional places and creating enduring value across five continents.
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: '20px', marginTop: '28px' }}>
              {['LinkedIn', 'Instagram', 'X'].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{
                    fontSize: '0.62rem',
                    letterSpacing: '0.14em',
                    color: 'rgba(248,246,242,0.35)',
                    textDecoration: 'none',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#C9A46A')}
                  onMouseLeave={(e) =>
                    ((e.target as HTMLAnchorElement).style.color = 'rgba(248,246,242,0.35)')
                  }
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          {[
            {
              title: 'Company',
              links: ['About Mariva', 'Our History', 'Leadership', 'Sustainability', 'Newsroom'],
            },
            {
              title: 'Divisions',
              links: [
                'Property Development',
                'Luxury Hotels',
                'Resorts',
                'Commercial',
                'Investment',
              ],
            },
            {
              title: 'Offices',
              links: ['Dubai — HQ', 'London', 'Riyadh', 'Singapore', 'New York'],
            },
          ].map((col) => (
            <div key={col.title}>
              <p
                className="section-label"
                style={{ color: '#C9A46A', marginBottom: '20px', fontSize: '0.55rem' }}
              >
                {col.title}
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
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
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <p
              className="section-label"
              style={{ color: '#C9A46A', marginBottom: '20px', fontSize: '0.55rem' }}
            >
              Newsletter
            </p>
            <p
              style={{
                fontSize: '0.78rem',
                color: 'rgba(248,246,242,0.4)',
                fontWeight: 300,
                lineHeight: 1.7,
                marginBottom: '20px',
              }}
            >
              Receive our quarterly perspectives on luxury real estate and global markets.
            </p>
            <div style={{ display: 'flex', gap: '0' }}>
              <input
                type="email"
                placeholder="Email address"
                style={{
                  flex: 1,
                  background: 'rgba(248,246,242,0.06)',
                  border: '1px solid rgba(201,164,106,0.2)',
                  borderRight: 'none',
                  padding: '11px 14px',
                  color: '#F8F6F2',
                  fontSize: '0.72rem',
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                  minWidth: 0,
                }}
              />
              <button
                className="btn-gold"
                style={{ padding: '11px 16px', fontSize: '0.6rem', flexShrink: 0 }}
              >
                →
              </button>
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
            © 2024 Mariva Global. All rights reserved.
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

// ─── Root Component ───────────────────────────────────────────────────────────

function MarivaGlobal() {
  useScrollReveal()

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <DivisionsSection />
      <ProjectsSection />
      <HospitalitySection />
      <StatsSection />
      <InvestmentsSection />
      <PhilosophySection />
      <LeadershipSection />
      <SustainabilitySection />
      <GlobalPresenceSection />
      <TestimonialsSection />
      <ContactSection />
      <SiteFooter />
    </div>
  )
}
