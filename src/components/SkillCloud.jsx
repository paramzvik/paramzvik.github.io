import { useEffect, useRef } from 'react'
import { floatingSkills } from '../data'

function createNodes(width, height) {
  return floatingSkills.map((skill, index) => {
    const column = index % 3
    const row = Math.floor(index / 3)
    const x = width * (0.22 + column * 0.26)
    const y = height * (0.2 + row * 0.2)

    return {
      label: skill,
      radius: 48 + (index % 3) * 8,
      x,
      y,
      homeX: x,
      homeY: y,
      vx: 0,
      vy: 0,
    }
  })
}

export function SkillCloud() {
  const containerRef = useRef(null)
  const ballRefs = useRef([])
  const animationRef = useRef(0)
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const nodesRef = useRef([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return undefined
    }

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      nodesRef.current = createNodes(width, height)
    }

    const tick = () => {
      const bounds = container.getBoundingClientRect()

      nodesRef.current.forEach((node, index) => {
        const dxHome = node.homeX - node.x
        const dyHome = node.homeY - node.y
        node.vx += dxHome * 0.004
        node.vy += dyHome * 0.004

        if (mouseRef.current.active) {
          const dxMouse = node.x - mouseRef.current.x
          const dyMouse = node.y - mouseRef.current.y
          const distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse) || 1
          const forceRadius = 110

          if (distance < forceRadius) {
            const force = (1 - distance / forceRadius) * 0.8
            node.vx += (dxMouse / distance) * force
            node.vy += (dyMouse / distance) * force
          }
        }

        node.vx *= 0.94
        node.vy *= 0.94
        node.x += node.vx
        node.y += node.vy

        if (node.x < node.radius) {
          node.x = node.radius
          node.vx *= -0.86
        }
        if (node.x > bounds.width - node.radius) {
          node.x = bounds.width - node.radius
          node.vx *= -0.86
        }
        if (node.y < node.radius) {
          node.y = node.radius
          node.vy *= -0.86
        }
        if (node.y > bounds.height - node.radius) {
          node.y = bounds.height - node.radius
          node.vy *= -0.86
        }

        const element = ballRefs.current[index]
        if (element) {
          element.style.transform = `translate(${node.x - node.radius}px, ${node.y - node.radius}px)`
        }
      })

      animationRef.current = window.requestAnimationFrame(tick)
    }

    resize()
    animationRef.current = window.requestAnimationFrame(tick)

    const handleMove = (event) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      }
    }

    const handleLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener('resize', resize)
    container.addEventListener('pointermove', handleMove)
    container.addEventListener('pointerleave', handleLeave)

    return () => {
      window.cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      container.removeEventListener('pointermove', handleMove)
      container.removeEventListener('pointerleave', handleLeave)
    }
  }, [])

  return (
    <div className="skill-cloud-shell">
      <div className="skill-cloud" ref={containerRef}>
        {floatingSkills.map((skill, index) => (
          <div
            key={skill}
            className="skill-ball"
            ref={(element) => {
              ballRefs.current[index] = element
            }}
          >
            {skill}
          </div>
        ))}
      </div>
      <p className="skill-cloud-note">Push the balls with your cursor. They bounce, drift, and settle back into formation.</p>
    </div>
  )
}
