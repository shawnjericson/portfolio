"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { LangProvider, useLang } from "@/components/portfolio/lang"
import { TreeBackground, Nav, Foot, Contact, Shots } from "@/components/portfolio/ui"
import { T, TT, bySlug, nameOf } from "@/lib/portfolio"

function Detail() {
  const { lang } = useLang()
  const params = useParams<{ slug: string }>()
  const p = bySlug(String(params?.slug || ""))
  const x = T[lang]

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".fadeup").forEach((e) => e.classList.add("in")); return
    }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll("section .glass").forEach((el) => { el.classList.add("fadeup"); io.observe(el) })
    return () => io.disconnect()
  }, [lang, p])

  if (!p) {
    return (
      <main className="wrap" style={{ paddingTop: 120 }}>
        <Link className="backlink" href="/">{x.back}</Link>
      </main>
    )
  }

  const d = p[lang]
  const file: [string, string][] = [
    [x.dField, p.dl[lang]],
    [x.dRole, p.vai[lang]],
    [x.dTime, lang === "vi" ? p.date : p.dateEn],
    [x.dState, TT[p.tt][lang]],
  ]

  return (
    <>
      <TreeBackground />
      <Nav />
      <main>
        <section className="wrap" style={{ paddingTop: 92, paddingBottom: 0 }}>
          <Link className="backlink" href="/">{x.back}</Link>
          <div className="glass" style={{ padding: "42px 44px", marginTop: 18 }}>
            <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 52, alignItems: "start" }}>
              <div>
                <div className="eyebrow">{x.dProblem}</div>
                <h1 style={{ fontSize: "clamp(28px,4.2vw,44px)", fontWeight: 900, letterSpacing: "-1.3px", lineHeight: 1.14, margin: "16px 0 0", maxWidth: "19ch" }}>
                  {nameOf(p, lang)}
                </h1>
                <p style={{ fontSize: "clamp(17px,2vw,19px)", lineHeight: 1.74, color: "var(--muted)", marginTop: 20, maxWidth: "62ch" }}>{d.bai}</p>
              </div>
              <div style={{ borderLeft: "1px solid var(--line)", paddingLeft: 24 }}>
                <div className="flab" style={{ marginBottom: 14 }}>{x.dFile}</div>
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "9px 16px", fontFamily: "var(--font-mono),monospace", fontSize: 11.5, color: "var(--muted)" }}>
                  {file.map(([k, v]) => (
                    <div key={k} style={{ display: "contents" }}>
                      <div style={{ color: "var(--dim)" }}>{k}</div>
                      <div>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid var(--line2)", marginTop: 16, paddingTop: 14, fontFamily: "var(--font-mono),monospace", fontSize: 10.5, color: "var(--fire)", lineHeight: 1.95 }}>
                  {p.stack}
                </div>
              </div>
            </div>
          </div>
        </section>

        {!!d.qd.length && (
          <section className="wrap" style={{ paddingTop: 26 }}>
            <div className="glass" style={{ padding: "36px 40px" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 10, borderBottom: "1px solid var(--line)", paddingBottom: 16, marginBottom: 30 }}>
                <div className="eyebrow">{x.dDecide}</div>
                <div style={{ fontFamily: "var(--font-mono),monospace", fontSize: 11, color: "var(--dim)" }}>{x.dFree}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
                {d.qd.map((q: any, i: number) => (
                  <article className="dec" key={i}>
                    <div className="num">{String(i + 1).padStart(2, "0")}</div>
                    <h3>{q.h}</h3>
                    <div className="right">
                      <p className="body">{q.b}</p>
                      <p className="cost">
                        <span style={{ fontFamily: "var(--font-mono),monospace", fontSize: 9.5, letterSpacing: 1.4, color: "var(--dim)" }}>{x.dCost}&nbsp;&nbsp;</span>
                        {q.c}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {p.thin && (
          <section className="wrap" style={{ paddingTop: 26 }}>
            <div className="glass" style={{ padding: "28px 30px" }}>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--muted)", maxWidth: "62ch" }}>{x.dThin}</p>
            </div>
          </section>
        )}

        {p.gal && <Shots galKey={p.gal} />}

        <section className="wrap" style={{ paddingTop: 44 }}>
          <div className="glass" style={{ padding: "32px 34px" }}>
            <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 40, alignItems: "center" }}>
              <div><Link className="backlink" href="/">{x.back}</Link></div>
              <Contact />
            </div>
          </div>
        </section>
      </main>
      <Foot />
    </>
  )
}

export default function Page() {
  return <LangProvider><Detail /></LangProvider>
}
