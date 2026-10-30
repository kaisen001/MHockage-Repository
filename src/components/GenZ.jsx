import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Stack from "./Stack"
import { genz } from "../data"
import { useMediaQuery, usePrefersReducedMotion } from "../hooks"
import { useLang } from "../i18n"

const ease = [0.16, 1, 0.3, 1]
const isVideo = (src) => /\.(mp4|webm|mov)(\?.*)?$/i.test(src)

const blockVariants = {
  hidden: { opacity: 0, y: 44 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease, staggerChildren: 0.12 },
  },
}

const blockFade = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.9, ease, staggerChildren: 0.12 },
  },
}

const blockChild = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

function GenzBlock({ reduce, lift = false, children }) {
  return (
    <motion.div
      className="genz-block"
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.24 }}
      variants={lift ? blockVariants : blockFade}
    >
      {!reduce && (
        <>
          <span className="genz-block-rule" aria-hidden="true" />
          <span className="genz-block-sheen" aria-hidden="true" />
        </>
      )}
      {children}
    </motion.div>
  )
}

export default function GenZ() {
  const { t } = useLang()
  const ticker = [...t.genzMarks, ...t.genzMarks]
  const reduce = usePrefersReducedMotion()
  const compact = useMediaQuery("(max-width: 760px)")
  const [reelIndex, setReelIndex] = useState(0)
  const titleOf = (clip) => t.genzTitles?.[clip.id] ?? clip.title
  const reelCards = useMemo(
    () =>
      genz.map((clip) => (
        <img
          key={clip.src}
          src={encodeURI(isVideo(clip.src) ? clip.poster || clip.src : clip.src)}
          alt={t.genzTitles?.[clip.id] ?? clip.title}
          draggable={false}
        />
      )),
    [t],
  )
  const reelClip = genz[reelIndex] ?? genz[0]

  return (
    <section className="genz" id="genz">
      <div className="section-head">
        <span>{t.genz.kicker}</span>
        <motion.h2
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.7, ease }}
        >
          {t.genz.title}
        </motion.h2>
      </div>

      <p className="genz-log">
        {t.genz.log}
      </p>

      <div className="genz-ticker" aria-hidden="true">
        <div className="genz-ticker-track">
          {ticker.map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <i />
            </span>
          ))}
        </div>
      </div>

      {genz.length === 0 ? (
        <p className="genz-empty">{t.genz.empty}</p>
      ) : (
        <>
          {genz.length > 0 && (
            <GenzBlock reduce={reduce}>
              <motion.p className="genz-kicker" variants={blockChild}>
                {t.genz.gallery}
              </motion.p>
              <div className="genz-reel">
                <Stack
                  cards={reelCards}
                  layout="fan"
                  visible={compact ? 3 : 4}
                  spread={compact ? 0.42 : 0.55}
                  depth={0.5}
                  radius={14}
                  sendToBackOnClick
                  autoplay={!reduce}
                  autoplayDelay={4200}
                  pauseOnHover
                  onChange={setReelIndex}
                  label={t.genz.gallery}
                />
              </div>
              {reelClip && (
                <p className="genz-reel-caption">
                  <strong>{titleOf(reelClip)}</strong>
                  <span>
                    {t.cat[reelClip.category] ?? reelClip.category} · {reelClip.year}
                  </span>
                </p>
              )}
            </GenzBlock>
          )}

        </>
      )}
    </section>
  )
}
