import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { packCategories, packContact, packs } from "../data"
import { useLang } from "../i18n"
import PackDeck from "./PackDeck"

const ease = [0.16, 1, 0.3, 1]

export default function Catalogue() {
  const { t } = useLang()
  const [family, setFamily] = useState("all")
  const visible = useMemo(() => {
    const list = family === "all" ? packs : packs.filter((pack) => pack.category === family)
    return list.map((pack) => {
      const extra = t.packCopy[pack.id]
      return extra ? { ...pack, ...extra } : pack
    })
  }, [family, t])

  const bookHref = (pack) =>
    `${packContact.whatsapp.href}?text=${encodeURIComponent(`${t.packs.message} ${pack.title} (${pack.price})`)}`

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
        {t.packs.log && <p className="catalogue-log">{t.packs.log}</p>}
      </div>

      <div className="catalogue-tabs" role="tablist" aria-label={t.packs.tabs}>
        {packCategories.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={family === item.id}
            className={family === item.id ? "is-on" : undefined}
            onClick={() => setFamily(item.id)}
          >
            {t.packCats[item.id] ?? item.label}
          </button>
        ))}
      </div>

      <PackDeck
        key={family}
        packs={visible}
        bookHref={bookHref}
        labels={{
          region: t.packs.tabs,
          popular: t.packs.popular,
          cta: t.packs.cta,
          prev: t.packs.prev,
          next: t.packs.next,
        }}
      />

      <div className="catalogue-book">
        <div>
          <p>{t.packs.book}</p>
          <span>{t.packs.bookHint}</span>
        </div>
        <div className="catalogue-actions">
          <a href={packContact.phone.href}>
            {t.packs.calls} {packContact.phone.label}
          </a>
        </div>
      </div>
    </section>
  )
}
