import { useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

const spring = { type: "spring", stiffness: 260, damping: 30, mass: 0.9 }
const SWIPE = 60

export default function PackDeck({ packs, bookHref, labels }) {
  const [active, setActive] = useState(0)
  const dragged = useRef(false)
  const reduced = useReducedMotion()
  const count = packs.length
  const current = Math.min(active, count - 1)

  const go = (index) => setActive(Math.max(0, Math.min(count - 1, index)))

  const onDragEnd = (_event, { offset, velocity }) => {
    const swipe = offset.x + velocity.x * 0.2
    if (swipe < -SWIPE) go(current + 1)
    else if (swipe > SWIPE) go(current - 1)
    setTimeout(() => {
      dragged.current = false
    }, 0)
  }

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      go(current + 1)
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      go(current - 1)
    }
  }

  return (
    <div
      className="pack-deck"
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <motion.div
        className="pack-deck-track"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragStart={() => {
          dragged.current = true
        }}
        onDragEnd={onDragEnd}
      >
        {packs.map((pack, index) => {
          const offset = index - current
          const distance = Math.abs(offset)
          const side = Math.sign(offset)
          const hidden = distance > 2
          return (
            <motion.article
              key={pack.id}
              className={`pack-card${offset === 0 ? " is-active" : ""}${pack.featured ? " is-featured" : ""}`}
              aria-hidden={offset !== 0}
              initial={false}
              animate={{
                x: `${offset === 0 ? 0 : side * (distance * 92 + 8)}%`,
                rotateY: reduced ? 0 : -side * 22,
                scale: offset === 0 ? 1 : distance === 1 ? 0.84 : 0.7,
                opacity: hidden ? 0 : offset === 0 ? 1 : distance === 1 ? 0.85 : 0.35,
                filter: offset === 0 ? "brightness(1)" : "brightness(0.62)",
              }}
              transition={reduced ? { duration: 0 } : spring}
              style={{ zIndex: 10 - distance, pointerEvents: hidden ? "none" : "auto" }}
              onClick={() => {
                if (!dragged.current && offset !== 0) go(index)
              }}
            >
              <div className="pack-card-media">
                <img src={pack.image} alt="" draggable={false} loading="lazy" />
                <span>{pack.index}</span>
                {pack.featured && <strong>{labels.popular}</strong>}
              </div>
              <div className="pack-card-body">
                <em>{pack.family}</em>
                <h3>{pack.title}</h3>
                <p className="pack-card-price">{pack.price}</p>
                <ul>
                  {pack.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a
                  className="pack-card-cta"
                  href={bookHref(pack)}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={offset === 0 ? 0 : -1}
                  draggable={false}
                >
                  {labels.cta}
                </a>
              </div>
            </motion.article>
          )
        })}
      </motion.div>

      <div className="pack-deck-controls">
        <button type="button" onClick={() => go(current - 1)} disabled={current === 0} aria-label={labels.prev}>
          ←
        </button>
        <div className="pack-deck-dots">
          {packs.map((pack, index) => (
            <button
              key={pack.id}
              type="button"
              className={index === current ? "is-on" : undefined}
              onClick={() => go(index)}
              aria-label={pack.title}
              aria-current={index === current ? "true" : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(current + 1)}
          disabled={current === count - 1}
          aria-label={labels.next}
        >
          →
        </button>
      </div>

      <div className="pack-deck-live" aria-live="polite" aria-atomic="true">
        {`${packs[current]?.title ?? ""}, ${current + 1} / ${count}`}
      </div>
    </div>
  )
}
