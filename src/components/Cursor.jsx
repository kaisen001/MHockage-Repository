import { useEffect, useRef } from "react"

export default function Cursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const cursor = cursorRef.current
    if (!fine || reduce || !cursor) return

    document.body.classList.add("has-cursor")
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y
    let scale = 0.28
    let target = 0.28
    let label = ""
    let frame = 0
    const labelEl = cursor.querySelector("span")

    const loop = () => {
      x += (tx - x) * 0.22
      y += (ty - y) * 0.22
      scale += (target - scale) * 0.18
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      cursor.classList.toggle("is-hot", Boolean(label))
      if (labelEl) {
        labelEl.textContent = label
        labelEl.style.opacity = label ? "1" : "0"
      }
      frame = requestAnimationFrame(loop)
    }

    const onMove = (event) => {
      tx = event.clientX
      ty = event.clientY
      cursor.style.opacity = "1"
      const hot = event.target.closest("[data-cursor]")
      const interactive = event.target.closest("a, button, input, textarea")
      label = hot?.dataset.cursor || ""
      target = label ? 1 : interactive ? 0.55 : 0.28
    }

    const hide = () => {
      cursor.style.opacity = "0"
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseout", hide)
    frame = requestAnimationFrame(loop)

    return () => {
      document.body.classList.remove("has-cursor")
      cancelAnimationFrame(frame)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseout", hide)
    }
  }, [])

  return (
    <div className="cursor" ref={cursorRef} aria-hidden="true">
      <span />
    </div>
  )
}
