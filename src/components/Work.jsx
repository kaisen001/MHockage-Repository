import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { projects } from "../data"
import { useLang } from "../i18n"

export default function Work({ activeId, onActive, onOpen }) {
  const refs = useRef([])
  const active = projects.find((project) => project.id === activeId) ?? projects[0]

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.46
      let best = projects[0].id
      let bestDist = Infinity
      refs.current.forEach((el, index) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const dist = Math.abs(rect.top + rect.height / 2 - mid)
        if (dist < bestDist) {
          bestDist = dist
          best = projects[index].id
        }
      })
      onActive((current) => (current === best ? current : best))
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [onActive])

  return (
    <section className="work" id="work">
      <div className="section-head">
        <span>Selected work</span>
        <h2>Pieces that earned their runtime.</h2>
      </div>

      <div className="work-layout">
        <div className="work-list">
          <AnimatePresence mode="popLayout">
            <motion.p
              key={active.title}
              className="work-watermark"
              aria-hidden="true"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              {active.title}
            </motion.p>
          </AnimatePresence>

          {projects.map((project, index) => {
            const isActive = project.id === active.id
            return (
              <button
                key={project.id}
                type="button"
                ref={(el) => {
                  refs.current[index] = el
                }}
                className={`work-row${isActive ? " is-active" : ""}`}
                data-cursor="View"
                onMouseEnter={() => onActive(project.id)}
                onFocus={() => onActive(project.id)}
                onClick={() => onOpen(project.id)}
              >
                <span className="row-shot" style={{ background: project.tone }}>
                  <img src={project.image} alt="" />
                </span>
                <span className="work-index">{project.index}</span>
                <span className="work-copy">
                  <span className="work-title">{project.title}</span>
                  <span className="work-meta">
                    {project.category} · {project.runtime}
                  </span>
                </span>
                <span className="work-year">{project.year}</span>
              </button>
            )
          })}
        </div>

        <button
          type="button"
          className="work-stage"
          data-cursor="View"
          onClick={() => onOpen(active.id)}
        >
          <span className="work-frame" style={{ background: active.tone }}>
            {projects.map((project) => (
              <img
                key={project.id}
                src={project.image}
                alt=""
                className={project.id === active.id ? "is-on" : ""}
              />
            ))}
          </span>
          <span className="work-stage-copy">
            <strong>{active.title}</strong>
            <em>
              {active.category} · {active.year}
            </em>
          </span>
        </button>
      </div>
    </section>
  )
}
