import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { heroImage, menuImage, nav, profile } from "../data"
import { usePrefersReducedMotion } from "../hooks"
import { useLang } from "../i18n"
import LangSwitch from "./LangSwitch"

const ease = [0.16, 1, 0.3, 1]
const DUST = [
  { x: "12%", y: "22%", d: 11, delay: 0.2 },
  { x: "28%", y: "68%", d: 14, delay: 1.1 },
  { x: "63%", y: "18%", d: 12, delay: 0.6 },
  { x: "74%", y: "54%", d: 16, delay: 1.8 },
  { x: "86%", y: "36%", d: 13, delay: 0.4 },
  { x: "48%", y: "82%", d: 15, delay: 2.2 },
  { x: "18%", y: "44%", d: 10, delay: 1.4 },
  { x: "91%", y: "72%", d: 17, delay: 0.9 },
]

export default function Nav({ ready }) {
  const { t } = useLang()
  const reduce = usePrefersReducedMotion()
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 24)
      setHidden(y > last && y > 120)
      last = y
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle("menu-lock", open)
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.classList.remove("menu-lock")
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <>
      <motion.header
        className={`nav${solid || open ? " is-solid" : ""}${open ? " is-open" : ""}`}
        initial={{ y: -24, opacity: 0 }}
        animate={ready ? { y: hidden && !open ? -90 : 0, opacity: 1 } : { y: -24, opacity: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <a className="nav-brand" href="#top" aria-label={profile.name}>
          <img src="/brand/mark-light.png" alt="" />
        </a>
        <nav className="nav-links" aria-label={t.a11y.primaryNav}>
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {t.nav[item.href] ?? item.label}
            </a>
          ))}
        </nav>
        <div className="nav-end">
          <LangSwitch />
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? t.close : t.menu}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu"
            className="menu"
            aria-label={t.a11y.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="menu-stage" aria-hidden="true">
              <img
                className={`menu-still menu-still--cinema${reduce ? " is-still" : ""}`}
                src={heroImage.src}
                alt=""
              />
              <img
                className={`menu-still menu-still--portrait${reduce ? " is-still" : ""}`}
                src={menuImage.src}
                alt=""
              />
              <div className="menu-shade" />
              <div className="menu-grain" />
              <span className="menu-sweep" />
              {DUST.map((speck, index) => (
                <span
                  key={index}
                  className="menu-dust"
                  style={{
                    left: speck.x,
                    top: speck.y,
                    animationDuration: `${speck.d}s`,
                    animationDelay: `${speck.delay}s`,
                  }}
                />
              ))}
              <span className="menu-rule menu-rule--top" />
              <span className="menu-rule menu-rule--right" />
              <span className="menu-rule menu-rule--bottom" />
              <span className="menu-rule menu-rule--left" />
            </div>

            <div className="menu-copy">
              <motion.p
                className="menu-kicker"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease }}
              >
                {t.role} · {profile.location}
              </motion.p>

              {nav.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ y: 32, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + index * 0.07, duration: 0.65, ease }}
                  onClick={() => setOpen(false)}
                >
                  <em>{String(index + 1).padStart(2, "0")}</em>
                  {t.nav[item.href] ?? item.label}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
