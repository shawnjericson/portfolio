"use client"

import { createContext, useContext, useEffect, useState } from "react"

export type Lang = "en" | "vi"

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
})

/** Mặc định tiếng Anh. Ai đã từng chọn tiếng Việt thì lần sau mở lại vẫn là tiếng Việt. */
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, set] = useState<Lang>("en")

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang")
      if (saved === "vi" || saved === "en") set(saved)
    } catch {}
  }, [])

  const setLang = (l: Lang) => {
    set(l)
    try {
      localStorage.setItem("lang", l)
    } catch {}
    if (typeof document !== "undefined") document.documentElement.lang = l
  }

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
