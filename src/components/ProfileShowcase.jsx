import { motion } from 'framer-motion'
import { heroHighlights } from '../data'

const stackBadges = [
  'Angular', 'Java', 'Spring Boot', 'TypeScript',
  'MongoDB', 'OpenSearch', 'LlamaIndex', 'Ionic',
  'AWS', 'Docker', 'Python', 'Selenium',
]

const item = {
  hidden: { opacity: 0, scale: 0.88 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.5 + i * 0.06, duration: 0.3, ease: [0.2, 0.8, 0.2, 1] },
  }),
}

export function ProfileShowcase() {
  return (
    <motion.div
      className="profile-showcase"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.26, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* Identity block */}
      <div className="showcase-top">
        <div className="showcase-avatar" aria-hidden="true">
          <span>VS</span>
          <div className="showcase-avatar-ring" />
          <div className="showcase-avatar-ring showcase-avatar-ring--2" />
        </div>
        <div className="showcase-bio">
          <div className="showcase-availability">
            <span className="avail-dot" />
            Open to opportunities
          </div>
          <p>5+ years shipping production software across web, mobile, and AI search.</p>
        </div>
      </div>

      {/* Stack badges */}
      <div className="showcase-tags">
        {stackBadges.map((tag, i) => (
          <motion.span
            key={tag}
            className="showcase-tag"
            custom={i}
            initial="hidden"
            animate="show"
            variants={item}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Focus highlights */}
      <div className="showcase-highlights">
        {heroHighlights.map((h) => (
          <article key={h.title} className="showcase-highlight-card">
            <span className="highlight-kicker">{h.kicker}</span>
            <h3>{h.title}</h3>
            <p>{h.text}</p>
          </article>
        ))}
      </div>
    </motion.div>
  )
}
