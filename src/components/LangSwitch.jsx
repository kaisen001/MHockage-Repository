import { useEffect, useId, useRef, useState } from "react"
import { useLang } from "../i18n"

function FlagUk() {
  return (
    <svg className="lang-flag" viewBox="0 0 60 30" aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0 60 30M60 0 0 30" stroke="#fff" strokeWidth="10" />
      <path d="M0 0 60 30M60 0 0 30" stroke="#c8102e" strokeWidth="6" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="16" />
      <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="10" />
    </svg>
  )
}

function FlagFr() {
  return (
    <svg className="lang-flag" viewBox="0 0 60 40" aria-hidden="true">
      <rect width="20" height="40" fill="#002395" />
      <rect x="20" width="20" height="40" fill="#fff" />
      <rect x="40" width="20" height="40" fill="#ed2939" />
    </svg>
  )
}

const flags = { en: FlagUk, fr: FlagFr }

export default function LangSwitch() {
  const { lang, setLang, languages, t } = useLang()
  const [open, setOpen] = useState(false)
  const root = useRef(null)
  const listId = useId()
  const current = languages.find((item) => item.id === lang) ?? languages[0]
  const Flag = flags[current.id] ?? FlagUk

  useEffect(() => {
    if (!open) return undefined
    const onPointer = (event) => {
      if (!root.current?.contains(event.target)) setOpen(false)
    }
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("pointerdown", onPointer)
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("pointerdown", onPointer)
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  const pick = (id) => {
    setLang(id)
    setOpen(false)
  }

  return (
    <div className={`lang-switch${open ? " is-open" : ""}`} ref={root}>
      <button
        type="button"
        className="lang-switch-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={t.lang.label}
        onClick={() => setOpen((value) => !value)}
      >
        <Flag />
        <span>{current.short}</span>
        <svg className="lang-caret" viewBox="0 0 12 8" aria-hidden="true">
          <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
      {open && (
        <ul className="lang-menu" id={listId} role="listbox" aria-label={t.lang.label}>
          {languages.map((item) => {
            const ItemFlag = flags[item.id]
            const selected = item.id === lang
            return (
              <li key={item.id} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={selected ? "is-on" : undefined}
                  onClick={() => pick(item.id)}
                >
                  <ItemFlag />
                  <span>{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
