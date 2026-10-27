import { motion } from "framer-motion"
import { aboutImage, profile } from "../data"
import { useLang } from "../i18n"

const ease = [0.16, 1, 0.3, 1]

export default function About() {
  const { t } = useLang()
  const fill = (text) => String(text ?? "").replaceAll("{location}", profile.location)

  return (
    <section className="about" id="about">
      <div className="about-grid">
        <motion.figure
          initial={{ clipPath: "inset(12% 12% 12% 12%)", opacity: 0 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.1, ease }}
        >
          <img src={aboutImage.src} alt={aboutImage.alt} />
          <figcaption>{t.about.caption}</figcaption>
        </motion.figure>

        <div>
          <div className="section-head">
            <span>{t.about.kicker}</span>
            <h2>{t.about.title}</h2>
          </div>
          <p className="lede">{t.about.lede}</p>
          <p>{fill(t.about.body)}</p>
          <dl className="facts">
            <div>
              <dt>{t.about.practice}</dt>
              <dd>{t.about.practiceValue}</dd>
            </div>
            <div>
              <dt>{t.about.based}</dt>
              <dd>{fill(t.about.basedValue)}</dd>
            </div>
            <div>
              <dt>{t.about.for}</dt>
              <dd>{t.about.forValue}</dd>
            </div>
          </dl>
        </div>
      </div>

      <blockquote>
        <p>“{t.about.quote}”</p>
        <footer>— {profile.name}</footer>
      </blockquote>
    </section>
  )
}
