const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1220 260" role="img" aria-label="HOKAGE CONTENT">
  <defs>
    <style>
      @keyframes tw-show { to { opacity: 1; } }
      @keyframes tw-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
      @media (prefers-reduced-motion: reduce) {
        text, .tw-caret { opacity: 1 !important; animation: none !important; }
      }
    </style>
  </defs>
  <text x="155" y="150" text-anchor="middle" font-size="104" font-family="'Courier New', Courier, monospace" font-weight="700" fill="#f7f6f3" opacity="0" style="animation:tw-show 0.01s linear 0.00s forwards">H</text>
  <text x="225" y="150" text-anchor="middle" font-size="104" font-family="'Courier New', Courier, monospace" font-weight="700" fill="#f7f6f3" opacity="0" style="animation:tw-show 0.01s linear 0.16s forwards">O</text>
  <text x="295" y="150" text-anchor="middle" font-size="104" font-family="'Courier New', Courier, monospace" font-weight="700" fill="#f7f6f3" opacity="0" style="animation:tw-show 0.01s linear 0.32s forwards">K</text>
  <text x="365" y="150" text-anchor="middle" font-size="104" font-family="'Courier New', Courier, monospace" font-weight="700" fill="#f7f6f3" opacity="0" style="animation:tw-show 0.01s linear 0.48s forwards">A</text>
  <text x="435" y="150" text-anchor="middle" font-size="104" font-family="'Courier New', Courier, monospace" font-weight="700" fill="#f7f6f3" opacity="0" style="animation:tw-show 0.01s linear 0.64s forwards">G</text>
  <text x="505" y="150" text-anchor="middle" font-size="104" font-family="'Courier New', Courier, monospace" font-weight="700" fill="#f7f6f3" opacity="0" style="animation:tw-show 0.01s linear 0.80s forwards">E</text>
  <text x="645" y="150" text-anchor="middle" font-size="104" font-family="'Courier New', Courier, monospace" font-weight="700" fill="#f7f6f3" opacity="0" style="animation:tw-show 0.01s linear 1.12s forwards">C</text>
  <text x="715" y="150" text-anchor="middle" font-size="104" font-family="'Courier New', Courier, monospace" font-weight="700" fill="#f7f6f3" opacity="0" style="animation:tw-show 0.01s linear 1.28s forwards">O</text>
  <text x="785" y="150" text-anchor="middle" font-size="104" font-family="'Courier New', Courier, monospace" font-weight="700" fill="#f7f6f3" opacity="0" style="animation:tw-show 0.01s linear 1.44s forwards">N</text>
  <text x="855" y="150" text-anchor="middle" font-size="104" font-family="'Courier New', Courier, monospace" font-weight="700" fill="#f7f6f3" opacity="0" style="animation:tw-show 0.01s linear 1.60s forwards">T</text>
  <text x="925" y="150" text-anchor="middle" font-size="104" font-family="'Courier New', Courier, monospace" font-weight="700" fill="#f7f6f3" opacity="0" style="animation:tw-show 0.01s linear 1.76s forwards">E</text>
  <text x="995" y="150" text-anchor="middle" font-size="104" font-family="'Courier New', Courier, monospace" font-weight="700" fill="#f7f6f3" opacity="0" style="animation:tw-show 0.01s linear 1.92s forwards">N</text>
  <text x="1065" y="150" text-anchor="middle" font-size="104" font-family="'Courier New', Courier, monospace" font-weight="700" fill="#f7f6f3" opacity="0" style="animation:tw-show 0.01s linear 2.08s forwards">T</text>
  <rect class="tw-caret" x="1113" y="72" width="10" height="92" fill="#5c80ce" opacity="0" style="animation:tw-show 0.01s linear 2.24s forwards, tw-blink 1s steps(1) 2.24s infinite" />
</svg>`

export default function TypewriterText({ className = "", style, width }) {
  return (
    <span
      className={className}
      style={{ display: "inline-block", lineHeight: 0, width, ...style }}
      dangerouslySetInnerHTML={{ __html: SVG }}
    />
  )
}
