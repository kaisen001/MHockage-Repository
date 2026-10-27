import { useLang } from "../i18n"

export default function Marquee() {
  const { t } = useLang()
  const row = [...t.marks, ...t.marks]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <i>/</i>
          </span>
        ))}
      </div>
    </div>
  )
}
