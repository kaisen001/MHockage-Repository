import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LightTunnel from "./LightTunnel"
import OrbitImages from "./OrbitImages"
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
  const [open, setOpen] = useState(null)
  const [reelIndex, setReelIndex] = useState(0)
  const stills = genz.filter((item) => !isVideo(item.src))
  const reelCards = useMemo(
    () =>
      genz.map((clip) => (
        <img
          key={clip.src}
          src={encodeURI(isVideo(clip.src) ? clip.poster || clip.src : clip.src)}
          alt={clip.title}
          draggable={false}
        />
      )),
    [],
  )
  const reelClip = genz[reelIndex] ?? genz[0]
  const orbitPlates = useMemo(() => {
    const plates = [
      ...stills.map((item) => ({
        ...item,
        src: encodeURI(item.src),
        alt: item.title,
        type: "image",
      })),
      ...genz
        .filter((item) => isVideo(item.src))
        .map((item) => ({
          title: item.title,
          category: item.category,
          year: item.year,
          src: encodeURI(item.src),
          poster: item.poster ? encodeURI(item.poster) : undefined,
          alt: item.title,
          type: "video",
        })),
    ]
    return plates.length > 0 && plates.length < 6 ? [...plates, ...plates] : plates
  }, [stills])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

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
                />
              </div>
              {reelClip && (
                <p className="genz-reel-caption">
                  <strong>{reelClip.title}</strong>
                  <span>
                    {t.cat[reelClip.category] ?? reelClip.category} · {reelClip.year}
                  </span>
                </p>
              )}
            </GenzBlock>
          )}

          {orbitPlates.length > 0 && (
            <GenzBlock reduce={reduce} lift>
              <motion.p className="genz-kicker" variants={blockChild}>
                {t.genz.orbit}
              </motion.p>
              <motion.div className="genz-orbit" variants={blockChild}>
                {!reduce && (
                  <LightTunnel
                    className="genz-orbit-tunnel"
                    cableColor="#e3a27a"
                    pulseColor="#f3ecdf"
                    tunnelColor="#e3a27a"
                    tunnelOpacity={0.1}
                    speed={0.08}
                    flowDirection="inward"
                    pulseSpeed={1.35}
                    pulseDensity={0.42}
                    cableCount={48}
                    thickness={0.28}
                    glow={0.9}
                    brightness={0.85}
                    fadeNear={0.32}
                    fadeFar={1.8}
                    size={1.08}
                    mouseStrength={0.16}
                    grain
                    grainIntensity={0.04}
                    intro
                  />
                )}
                <OrbitImages
                  key={compact ? "phone" : "desk"}
                  images={orbitPlates}
                  altPrefix="GEN Z still"
                  shape="ellipse"
                  radiusX={700}
                  radiusY={compact ? 300 : 170}
                  showPath
                  pathColor="rgba(227, 162, 122, 0.38)"
                  pathWidth={1.5}
                  pathDash={7}
                  itemSize={compact ? 240 : 92}
                  itemRadius={compact ? 14 : 8}
                  depth={0.55}
                  duration={48}
                  rotation={-8}
                  hoverScale={1.08}
                  hoverSpeed={0.28}
                  shadow={0.45}
                  draggable
                  clickToFront
                  paused={reduce || Boolean(open)}
                  intro={!reduce}
                  onItemClick={(index) => setOpen(orbitPlates[index] ?? null)}
                  centerContent={
                    <div className="genz-orbit-core">
                      <span>GEN Z</span>
                      <em>Festival</em>
                    </div>
                  }
                />
              </motion.div>
            </GenzBlock>
          )}
        </>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="genz-loupe"
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <button
              type="button"
              className="genz-loupe-back"
              aria-label={t.close}
              onClick={() => setOpen(null)}
            />
            <motion.figure
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.45, ease }}
            >
              {isVideo(open.src) ? (
                <video
                  key={open.src}
                  src={open.src}
                  poster={open.poster}
                  autoPlay
                  playsInline
                  controls
                />
              ) : (
                <img src={open.src} alt={open.title} />
              )}
              <figcaption>
                <strong>{open.title}</strong>
                <span>
                  {open.category} · {open.year}
                </span>
              </figcaption>
            </motion.figure>
            <button type="button" className="genz-loupe-close" onClick={() => setOpen(null)}>
              {t.close}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
