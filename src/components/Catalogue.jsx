import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { packCategories, packContact, packs } from "../data"
import { useLang } from "../i18n"
import FlexCarousel from "./FlexCarousel"

const ease = [0.16, 1, 0.3, 1]

export default function Catalogue() {
  const { t } = useLang()
  const [family, setFamily] = useState("all")
  const [activeId, setActiveId] = useState(packs[0].id)
  const localize = (pack) => {
    const extra = t.packCopy[pack.id]
    return extra ? { ...pack, ...extra } : pack
  }
  const visible = useMemo(
    () => (family === "all" ? packs : packs.filter((pack) => pack.category === family)),
    [family],
  )
  const slides = useMemo(
    () =>
      visible.map((pack) => {
        const copy = t.packCopy[pack.id]
        const familyLabel = copy?.family ?? pack.family
        return {
          src: pack.image,
          alt: `${pack.title} — ${familyLabel}`,
          title: pack.title,
          subtitle: pack.price,
          id: pack.id,
        }
      }),
    [visible, t],
  )
  const current = localize(visible.find((pack) => pack.id === activeId) ?? visible[0])

  const pickFamily = (id) => {
    setFamily(id)
    const next = id === "all" ? packs : packs.filter((pack) => pack.category === id)
    setActiveId(next[0]?.id ?? packs[0].id)
  }

  return (
    <section className="catalogue" id="packs">
      <div className="catalogue-head">
        <div className="section-head">
          <span>{t.packs.kicker}</span>
          <motion.h2
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.7, ease }}
          >
            {t.packs.title}
          </motion.h2>
        </div>
        <p className="catalogue-log">{t.packs.log}</p>
      </div>

      <div className="catalogue-tabs" role="tablist" aria-label={t.packs.tabs}>
        {packCategories.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={family === item.id}
            className={family === item.id ? "is-on" : undefined}
            onClick={() => pickFamily(item.id)}
          >
            {t.packCats[item.id] ?? item.label}
          </button>
        ))}
      </div>

      <div className="catalogue-stage">
        <FlexCarousel
          key={`${family}-${t.packs.title}`}
          items={slides}
          preset="liquid"
          intro="rise"
          fit="portrait"
          cardHeight={0.52}
          gap={14}
          radius={8}
          captureWheel={false}
          autoplay
          interval={5}
          onChange={(_index, item) => {
            if (item?.id) setActiveId(item.id)
          }}
        />
      </div>

      {current && (
        <article className={`catalogue-sheet${current.featured ? " is-featured" : ""}`}>
          <header>
            <span>{current.index}</span>
            <em>{current.family}</em>
          </header>
          <div>
            <h3>{current.title}</h3>
            <p className="catalogue-price">{current.price}</p>
          </div>
          <ul>
            {current.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <footer>
            <span>{current.tag}</span>
            {current.featured && <strong>{t.packs.popular}</strong>}
          </footer>
        </article>
      )}

      <div className="catalogue-book">
        <div>
          <p>{t.packs.book}</p>
          <span>{t.packs.bookHint}</span>
        </div>
        <div className="catalogue-actions">
          <a href={packContact.whatsapp.href} target="_blank" rel="noreferrer">
            WhatsApp {packContact.whatsapp.label}
          </a>
          <a href={packContact.phone.href}>
            {t.packs.calls} {packContact.phone.label}
          </a>
        </div>
      </div>
    </section>
  )
}
