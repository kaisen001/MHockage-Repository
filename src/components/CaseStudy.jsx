import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { projects } from "../data"
import { useLang } from "../i18n"
import FilmVideo from "./FilmVideo"

const ease = [0.16, 1, 0.3, 1]

export default function CaseStudy({ project: baseProject, onClose, onSelect }) {
  const { t, localizeProject } = useLang()
  const project = localizeProject(baseProject)
  const scroller = useRef(null)
  const index = projects.findIndex((item) => item.id === project.id)
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowRight") onSelect(next.id)
      if (event.key === "ArrowLeft") onSelect(prev.id)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose, onSelect, next.id, prev.id])

  useEffect(() => {
    scroller.current?.scrollTo(0, 0)
  }, [project.id])

  return (
    <motion.article
      className="study"
      role="dialog"
      aria-modal="true"
      aria-labelledby="study-title"
      ref={scroller}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={{ clipPath: "inset(0% 0 0 0)" }}
      exit={{ clipPath: "inset(100% 0 0 0)" }}
      transition={{ duration: 0.75, ease }}
    >
      <div className="study-top">
        <span>
          {project.index} / {String(projects.length).padStart(2, "0")}
        </span>
        <button type="button" onClick={onClose}>
          {t.close}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease }}
        >
          <p className="study-kicker">
            {project.category} · {project.year}
          </p>
          <h2 id="study-title">{project.title}</h2>
          <p className="study-log">{project.logline}</p>

          <dl className="study-facts">
            <div>
              <dt>{t.study.role}</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>{t.study.runtime}</dt>
              <dd>{project.runtime}</dd>
            </div>
            <div>
              <dt>{t.study.note}</dt>
              <dd>{project.note}</dd>
            </div>
          </dl>

          <div className="study-stills">
            {project.stills.map((still, stillIndex) => {
              const src = typeof still === "string" ? still : still.src
              const poster = typeof still === "string" ? undefined : still.poster
              const isVideo = /\.(mp4|webm|mov)(\?.*)?$/i.test(src)
              return (
                <figure
                  key={src}
                  className={isVideo ? "is-film" : undefined}
                  style={isVideo ? undefined : { background: project.tone }}
                >
                  {isVideo ? (
                    <FilmVideo
                      src={src}
                      poster={poster}
                      label={`${project.title}, ${t.study.shot} ${stillIndex + 1}`}
                    />
                  ) : (
                    <img src={src} alt={`${project.title}, ${t.study.still} ${stillIndex + 1}`} />
                  )}
                </figure>
              )
            })}
          </div>

          <div className="study-switch">
            <button type="button" onClick={() => onSelect(prev.id)} data-cursor={t.cursor.prev}>
              <em>{t.study.previous}</em>
              {prev.title}
            </button>
            <button type="button" onClick={() => onSelect(next.id)} data-cursor={t.cursor.next}>
              <em>{t.study.next}</em>
              {next.title}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.article>
  )
}
