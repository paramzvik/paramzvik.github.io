import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const taglines = ['Full Stack Developer', 'LLM Workflow Builder', 'Angular + Java + Ionic']

export function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [taglineIndex, setTaglineIndex] = useState(0)
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    const progressTimer = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          window.clearInterval(progressTimer)
          return 100
        }
        return Math.min(100, value + 5)
      })
    }, 65)

    const copyTimer = window.setInterval(() => {
      setTaglineIndex((value) => (value + 1) % taglines.length)
    }, 550)

    const doneTimer = window.setTimeout(() => {
      onDoneRef.current()
    }, 1750)

    return () => {
      window.clearInterval(progressTimer)
      window.clearInterval(copyTimer)
      window.clearTimeout(doneTimer)
    }
  }, [])

  return (
    <motion.div
      className="loader"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="loader-copy">
        <span className="loader-kicker">Launching portfolio</span>
        <h2>{taglines[taglineIndex]}</h2>
        <div className="loader-bar">
          <span style={{ width: `${progress}%` }} />
        </div>
        <p>{progress}%</p>
      </div>
    </motion.div>
  )
}
