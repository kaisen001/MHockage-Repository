import { motion } from "framer-motion"
import { postureImage, profile } from "../data"
import { useLang } from "../i18n"
import TypewriterText from "./TypewriterText"

const ease = [0.16, 1, 0.3, 1]

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

export default function Hero({ play }) {
  const { t } = useLang()
  const ticker = [...t.hero.credits, ...t.hero.credits]

  return (
    <section className="hero" id="top">
      <h1 className="visually-hidden">{profile.name}</h1>
      <div className="hero-stage">
        <div className="hero-band hero-band--top" aria-hidden="true">
          <img src={postureImage.src} alt="" />
          <div className="hero-ticker">
            <div className="hero-ticker-track">
              {ticker.map((item, index) => (
                <span key={`${item}-${index}`}>
                  {item}
                  <i />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-still-frame">
          <motion.img
            className="hero-still"
            src={postureImage.src}
            alt={t.a11y.heroImage}
            initial={{ opacity: 0 }}
            animate={play ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, ease }}
          />
          {play && (
            <div className="hero-flap" aria-hidden="true">
              <TypewriterText className="hero-type" width="100%" />
            </div>
          )}
        </div>

        <div className="hero-band hero-band--bottom" aria-hidden="true">
          <img src={postureImage.src} alt="" />
        </div>
      </div>

      <motion.div
        className="hero-copy"
        initial="hidden"
        animate={play ? "show" : "hidden"}
        variants={fade}
      >
        <span>{profile.location}</span>
        <a className="hero-cta" href="#work" data-cursor={t.cursor.work}>
          {t.hero.cta}
        </a>
      </motion.div>
    </section>
  )
}
