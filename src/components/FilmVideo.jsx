import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const ease = [0.16, 1, 0.3, 1]
const fly = { duration: 0.75, ease }
const FRAME_SRC = "/stills/Frame.png"

function containingBlock(el) {
  return el?.closest(".study") ?? null
}

function boxOf(el, root) {
  const rect = el.getBoundingClientRect()
  const origin = root?.getBoundingClientRect()
  return {
    top: rect.top - (origin?.top ?? 0),
    left: rect.left - (origin?.left ?? 0),
    width: rect.width,
    height: rect.height,
  }
}

function stageBox(root, aspect = 16 / 9) {
  const width = root?.clientWidth ?? window.innerWidth
  const height = root?.clientHeight ?? window.innerHeight
  const pad = Math.min(width, height) * 0.06
  const maxW = width - pad * 2
  const maxH = height - pad * 2
  let nextH = maxH
  let nextW = nextH * aspect
  if (nextW > maxW) {
    nextW = maxW
    nextH = nextW / aspect
  }
  return {
    top: (height - nextH) / 2,
    left: (width - nextW) / 2,
    width: nextW,
    height: nextH,
  }
}

export default function FilmVideo({ src, poster, label }) {
  const videoRef = useRef(null)
  const gateRef = useRef(null)
  const phaseRef = useRef("idle")
  const aspectRef = useRef(16 / 9)
  const [phase, setPhase] = useState("idle")
  const [coords, setCoords] = useState(null)

  phaseRef.current = phase
  const out = phase !== "idle"

  useEffect(() => {
    setPhase("idle")
    setCoords(null)
    const video = videoRef.current
    return () => video?.pause()
  }, [src])

  useLayoutEffect(() => {
    if (phase !== "opening") return
    const root = containingBlock(gateRef.current)
    setCoords(stageBox(root, aspectRef.current))
    setPhase("open")
  }, [phase])

  useEffect(() => {
    if (phase !== "open") return undefined
    const onResize = () => setCoords(stageBox(containingBlock(gateRef.current), aspectRef.current))
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [phase])

  const playFromFrame = () => {
    const video = videoRef.current
    const gate = gateRef.current
    if (!video || !gate) return
    const root = containingBlock(gate)
    setCoords(boxOf(gate, root))
    setPhase("opening")
    video.play()
  }

  const toggleWhileOut = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play()
    else video.pause()
  }

  const returnToFrame = () => {
    const gate = gateRef.current
    const root = containingBlock(gate)
    if (gate) setCoords(boxOf(gate, root))
    setPhase("closing")
  }

  return (
    <div className={`film-strip${out ? " is-open" : ""}`}>
      <div className="film-gate" ref={gateRef}>
        <motion.video
          ref={videoRef}
          src={encodeURI(src)}
          poster={poster ? encodeURI(poster) : undefined}
          playsInline
          preload="auto"
          onLoadedMetadata={() => {
            const video = videoRef.current
            if (video?.videoWidth && video.videoHeight) {
              aspectRef.current = video.videoWidth / video.videoHeight
            }
          }}
          initial={false}
          animate={
            coords
              ? {
                  top: coords.top,
                  left: coords.left,
                  width: coords.width,
                  height: coords.height,
                }
              : {
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }
          }
          transition={phase === "idle" ? { duration: 0 } : fly}
          onEnded={returnToFrame}
          onAnimationComplete={() => {
            if (phaseRef.current !== "closing") return
            setPhase("idle")
            setCoords(null)
            if (videoRef.current) videoRef.current.currentTime = 0
          }}
          style={{
            position: coords ? "fixed" : "absolute",
            zIndex: coords ? 215 : 1,
            objectFit: coords ? "contain" : "cover",
          }}
          aria-label={label}
        />
        {poster && phase === "idle" && (
          <img className="film-poster" src={encodeURI(poster)} alt="" />
        )}
        <img className="film-frame-art" src={FRAME_SRC} alt="" />
        <AnimatePresence>
          {phase === "idle" && (
            <motion.button
              type="button"
              className="film-play"
              onClick={playFromFrame}
              aria-label="Play video"
              data-cursor="Play"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              <span className="film-play-icon" aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {out && (
          <motion.div
            className="film-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      {phase === "open" && coords && (
        <button
          type="button"
          className="film-hit"
          aria-label="Pause video"
          data-cursor="Pause"
          onClick={toggleWhileOut}
          style={{
            top: coords.top,
            left: coords.left,
            width: coords.width,
            height: coords.height,
          }}
        />
      )}
    </div>
  )
}
