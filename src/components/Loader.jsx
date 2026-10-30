import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useLang } from "../i18n"

const ease = [0.16, 1, 0.3, 1]

export default function Loader({ onDone }) {
  const { t } = useLang()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    let timer = 0
    let start = 0
    let cancelled = false

    const finish = () => {
      if (cancelled) return
      cancelled = true
      sessionStorage.setItem("mv-intro", "1")
      onDone()
    }

    const step = (time) => {
      if (cancelled) return
      if (!start) start = time
      const p = Math.min(1, (time - start) / 1600)
      const eased = 1 - (1 - p) ** 3
      setProgress(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(step)
      else timer = window.setTimeout(finish, 280)
    }

    const onKey = (event) => {
      if (event.key === "Enter") finish()
    }

    raf = requestAnimationFrame(step)
    window.addEventListener("keydown", onKey)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
      window.removeEventListener("keydown", onKey)
    }
  }, [onDone])

  return (
    <motion.div
      className="loader"
      role="dialog"
      aria-label={t.loader.label}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease }}
    >
      <div className="loader-top">
        <img className="loader-mark" src="/brand/mark-light.png" alt="Hokage Content" />
        <span>{t.loader.line}</span>
      </div>
      <p className="loader-count">{String(progress).padStart(3, "0")}</p>
      <div className="loader-foot">
        <div className="loader-bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <button
          type="button"
          className="loader-skip"
          onClick={() => {
            sessionStorage.setItem("mv-intro", "1")
            onDone()
          }}
        >
          {t.loader.enter}
        </button>
      </div>
    </motion.div>
  )
}
