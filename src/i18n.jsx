import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { copy, languages } from "./copy"

const LanguageContext = createContext(null)
const STORAGE = "hkc-lang"

function readLang() {
  try {
    const saved = localStorage.getItem(STORAGE)
    if (saved === "en" || saved === "fr") return saved
  } catch {
    /* private mode */
  }
  const locale = typeof navigator !== "undefined" ? navigator.language : "en"
  return locale.toLowerCase().startsWith("fr") ? "fr" : "en"
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE, lang)
    } catch {
      /* private mode */
    }
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: copy[lang] ?? copy.en,
      languages,
    }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLang must sit inside LanguageProvider")
  return ctx
}
