import { Suspense, lazy, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader } from './components/Loader'
import { ProfileShowcase } from './components/ProfileShowcase'
import {
  careerTimeline,
  certifications,
  contactLinks,
  focusAreas,
  footerLinks,
  heroHighlights,
  heroStats,
  profile,
  projects,
  skillColumns,
} from './data'

const SkillCloud = lazy(() =>
  import('./components/SkillCloud').then((module) => ({ default: module.SkillCloud })),
)

const navItems = [
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const rotatingPhrases = ['RAG systems', 'Angular products', 'mobile releases', 'search workflows']

const reveal = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.2, 0.8, 0.2, 1] },
  },
}

function SectionHeading({ label, title, text }) {
  return (
    <div className="section-heading">
      <span className="section-label">{label}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}

function App() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 56)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPhraseIndex((value) => (value + 1) % rotatingPhrases.length)
    }, 2400)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const onMove = (event) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`)
    }

    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <>
      <AnimatePresence>{!isReady ? <Loader key="loader" onDone={() => setIsReady(true)} /> : null}</AnimatePresence>

      <div className="app-shell">
        <div className="pointer-glow" aria-hidden="true" />
        <div className="page-orb page-orb-left" aria-hidden="true" />
        <div className="page-orb page-orb-right" aria-hidden="true" />

        <header className={`site-header${isScrolled ? ' site-header--scrolled' : ''}`}>
          <a className="brand" href="#top" aria-label="Vikram portfolio home">
            <span className="brand-mark">VV</span>
            <span className="brand-copy">
              <strong>{profile.shortName}</strong>
              <span>{profile.role}</span>
            </span>
          </a>

          <div className="header-right">
            <nav className="site-nav" aria-label="Primary">
              {navItems.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
            <button
              className="theme-toggle"
              onClick={() => setIsDark((d) => !d)}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? '☀︎' : '☾'}
            </button>
          </div>
        </header>

        <main id="top">
          <section className="hero">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.12 }}
            >
              <div className="eyebrow-row">
                <span className="eyebrow-chip">{profile.role}</span>
                <span className="eyebrow-location">{profile.location}</span>
              </div>

              <h1>
                Shipping <span>{rotatingPhrases[phraseIndex]}</span> with strong product judgment.
              </h1>
              <p className="hero-summary">{profile.summary}</p>

              <div className="hero-actions">
                <a className="button button-primary" href="/Resume.pdf" target="_blank" rel="noreferrer">
                  Resume
                </a>
                <a className="button button-secondary" href={contactLinks.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a className="button button-secondary" href={contactLinks.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>

              <div className="hero-stats">
                {heroStats.map((item) => (
                  <article key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </article>
                ))}
              </div>
            </motion.div>

            <ProfileShowcase />
          </section>

          <motion.section
            className="section section-signal"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
          >
            <SectionHeading
              label="Selected strengths"
              title="Full stack execution with a real AI-product layer, not just buzzwords."
              text="Five years of shipping across Angular, Java, Ionic, and OpenSearch — with consistent end-to-end ownership across UI, APIs, mobile, and AI-assisted features."
            />

            <div className="focus-grid">
              {focusAreas.map((item) => (
                <article key={item.title} className="focus-card">
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="section"
            id="projects"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
          >
            <SectionHeading
              label="Projects"
              title="Four real products. Four different problems."
              text="Each project is drawn from production work — built to solve real user and business problems, not to showcase a tech stack."
            />

            <div className="project-grid">
              {projects.map((project) => (
                <article key={project.title} className="project-card">
                  <div className="project-top">
                    <span>{project.tag}</span>
                    <strong>{project.year}</strong>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.highlights.map((highlight) => (
                      <span key={highlight}>{highlight}</span>
                    ))}
                  </div>
                  <div className="project-card-arrow">View details ↗</div>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="section experience-shell"
            id="experience"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
          >
            <div>
              <SectionHeading
                label="Career"
                title="A progression from QA discipline to product-facing full stack delivery."
                text="From testing networked systems at TCS to owning full Angular and Java surfaces at Enablix — 5+ years of increasing product responsibility."
              />

              <div className="timeline">
                {careerTimeline.map((item) => (
                  <article key={item.title} className="timeline-item">
                    <div className="timeline-line" aria-hidden="true">
                      <span />
                    </div>
                    <div className="timeline-card">
                      <p className="timeline-period">{item.period}</p>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="timeline-tags">
                        {item.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="credential-panel">
              <SectionHeading
                label="Signals"
                title="Supporting credentials"
                text="Certifications, languages spoken, and internal awards from TCS and Enablix."
              />

              <div className="credential-grid">
                {certifications.map((card) => (
                  <article key={card.title} className="credential-card">
                    <h3>{card.title}</h3>
                    <ul>
                      {card.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            className="section skills-shell"
            id="skills"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
          >
            <div className="skills-copy">
              <SectionHeading
                label="Skills"
                title="The complete technical picture."
                text="Breadth across frontend, backend, mobile, and AI retrieval — with depth in Angular, Java, and Spring Boot. Push the balls."
              />

              <div className="skill-columns">
                {skillColumns.map((column) => (
                  <article key={column.title} className="skill-column">
                    <h3>{column.title}</h3>
                    <ul>
                      {column.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <Suspense fallback={<div className="skill-cloud-shell">Loading skill cloud...</div>}>
              <SkillCloud />
            </Suspense>
          </motion.section>

          <motion.section
            className="contact-panel"
            id="contact"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
          >
            <div className="contact-copy">
              <span className="section-label">Contact</span>
              <h2>Available for strong product engineering roles and high-trust teams.</h2>
              <p>
                Open to full-time roles with real problems. Remote, Bengaluru, or Hyderabad. Let's talk.
              </p>
            </div>

            <div className="contact-stack">
              <a href={`mailto:${contactLinks.email}`}>{contactLinks.email}</a>
              <a href={contactLinks.linkedin} target="_blank" rel="noreferrer">
                linkedin.com/in/vikramvissamsetti
              </a>
              <a href={contactLinks.github} target="_blank" rel="noreferrer">
                github.com/paramzvik
              </a>
            </div>
          </motion.section>
        </main>

        <footer className="site-footer">
          <p>
            <strong>{profile.shortName}</strong> designing cleaner systems across web, mobile, and AI-assisted product surfaces.
          </p>
          <div className="footer-links">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
