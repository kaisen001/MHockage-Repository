import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion"
import Loader from "./components/Loader"
import Cursor from "./components/Cursor"
import Nav from "./components/Nav"
import Hero from "./components/Hero"
import Marquee from "./components/Marquee"
import Work from "./components/Work"
import CaseStudy from "./components/CaseStudy"
import FrameStudy from "./components/FrameStudy"
import GenZ from "./components/GenZ"
import About from "./components/About"
import Catalogue from "./components/Catalogue"
import Contact from "./components/Contact"
import { profile, projects } from "./data"
import { useLang } from "./i18n"

export default function App() {
  const { t } = useLang()
  const [ready, setReady] = useState(() => {
    if (typeof window === "undefined") return false
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    return reduce || sessionStorage.getItem("mv-intro") === "1"
  })
  const [activeId, setActiveId] = useState(projects[0].id)
  const [studyId, setStudyId] = useState(null)
  const finishIntro = useCallback(() => setReady(true), [])
  const study = projects.find((project) => project.id === studyId) || null
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  useEffect(() => {
    document.body.classList.toggle("lock", Boolean(studyId))
  }, [studyId])

  return (
    <>
      <a className="skip" href="#work">
        {t.skip}
      </a>
      <motion.div className="progress" style={{ scaleX }} />
      <Cursor />
      <AnimatePresence>{!ready && <Loader onDone={finishIntro} />}</AnimatePresence>
      <Nav ready={ready} />
      <main>
        <Hero play={ready} />
        <Marquee />
        <Work activeId={activeId} onActive={setActiveId} onOpen={setStudyId} />
        <FrameStudy />
        <GenZ />
        <Catalogue />
        <About />
        <Contact />
      </main>
      <footer className="footer">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>{profile.location}</span>
      </footer>
      <AnimatePresence>
        {study && (
          <CaseStudy
            key="study"
            project={study}
            onClose={() => setStudyId(null)}
            onSelect={setStudyId}
          />
        )}
      </AnimatePresence>
    </>
  )
}
