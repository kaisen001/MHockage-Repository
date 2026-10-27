import { useState } from "react"
import { motion } from "framer-motion"
import { packContact, profile } from "../data"
import { useLang } from "../i18n"

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.35" cy="6.65" r="1.15" fill="currentColor" />
    </svg>
  )
}

function TikTokMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.2 3c.35 2.55 1.85 4.25 4.5 4.55v2.55c-1.52-.02-2.92-.5-4.5-1.42v6.72A6.15 6.15 0 0 1 8.1 21.6 6.15 6.15 0 0 1 2 15.45 6.15 6.15 0 0 1 8.1 9.3c.34 0 .67.03 1 .09v2.72a3.5 3.5 0 0 0-1-.14 3.42 3.42 0 0 0-3.4 3.48 3.42 3.42 0 0 0 3.4 3.48 3.42 3.42 0 0 0 3.4-3.48V3h2.7Z"
      />
    </svg>
  )
}

export default function Contact() {
  const { t } = useLang()
  const [shift, setShift] = useState({ x: 0, y: 0 })
  const handle = packContact.social.label

  return (
    <section className="contact" id="contact">
      <div className="contact-grid">
        <div>
          <div className="section-head">
            <span>{t.contact.kicker}</span>
          </div>
          <motion.a
            className="mail"
            href={`mailto:${profile.email}`}
            data-cursor={t.cursor.mail}
            animate={{ x: shift.x, y: shift.y }}
            transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.4 }}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect()
              setShift({
                x: (event.clientX - (rect.left + rect.width / 2)) * 0.12,
                y: (event.clientY - (rect.top + rect.height / 2)) * 0.2,
              })
            }}
            onMouseLeave={() => setShift({ x: 0, y: 0 })}
          >
            {profile.email}
          </motion.a>
          <ul className="contact-meta">
            <li>{profile.location}</li>
            <li>{profile.coordinates}</li>
            <li>{t.booking}</li>
          </ul>
          <div className="contact-social">
            <a
              href={packContact.social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Instagram ${handle}`}
            >
              <InstagramMark />
            </a>
            <a
              href={packContact.tiktok.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`TikTok ${handle}`}
            >
              <TikTokMark />
            </a>
            <span>{handle}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
