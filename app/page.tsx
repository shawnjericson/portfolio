"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { LangProvider, useLang } from "@/components/portfolio/lang"
import { TreeBackground, Nav, Foot, Contact, ProjectTable } from "@/components/portfolio/ui"
import { T } from "@/lib/portfolio"

const L1 = "Hello, my name is Tuấn Anh"
const L2 = "I'm a fullstack developer"

function Typed() {
  const [a, setA] = useState("")
  const [b, setB] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    const skip = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (skip) { setA(L1); setB(L2); setDone(true); return }
    const timers: any[] = []
    let i = 0, j = 0
    const two = () => {
      if (j >= L2.length) { setDone(true); return }
      setB(L2.slice(0, ++j)); timers.push(setTimeout(two, 44))
    }
    const one = () => {
      if (i >= L1.length) { timers.push(setTimeout(two, 260)); return }
      setA(L1.slice(0, ++i)); timers.push(setTimeout(one, 46))
    }
    timers.push(setTimeout(one, 300))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <>
      <div className="typed">{a}{!done && a.length < L1.length && <span className="caret" />}</div>
      <div className="typed two">{b}{(done || a.length === L1.length) && <span className="caret" />}</div>
    </>
  )
}

function CodePanel() {
  const { lang } = useLang()
  const lines = [
    ['<span class="cm">// tuan-anh.ts</span>'],
    ['<span class="kw">const</span> <span class="fn">me</span> = {'],
    ['&nbsp;&nbsp;name: <span class="st">"Đặng Lê Tuấn Anh"</span>,'],
    ['&nbsp;&nbsp;role: <span class="st">"Fullstack Developer"</span>,'],
    ['&nbsp;&nbsp;stack: [<span class="st">".NET"</span>, <span class="st">"Laravel"</span>, <span class="st">"Node"</span>, <span class="st">"React"</span>],'],
    [`&nbsp;&nbsp;builds: <span class="st">${lang === "vi" ? '"phần mềm vận hành"' : '"operations software"'}</span>,`],
    ["}"],
    [""],
    ['<span class="kw">export function</span> <span class="fn">howIWork</span>() {'],
    [`&nbsp;&nbsp;<span class="kw">return</span> <span class="st">${lang === "vi" ? '"Hiểu bài toán thật' : '"Understand the real problem'}</span>`],
    [`&nbsp;&nbsp;<span class="st">&nbsp;${lang === "vi" ? 'rồi mới mở editor."' : 'before opening the editor."'}</span>`],
    ["}"],
  ]
  return (
    <div className="glass fadeup in" id="codepanel">
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "14px 18px", borderBottom: "1px solid var(--line2)" }}>
        <span className="dot" style={{ background: "#E0685C" }} />
        <span className="dot" style={{ background: "#F5A623" }} />
        <span className="dot" style={{ background: "#93C46B" }} />
        <span style={{ fontFamily: "var(--font-mono),monospace", fontSize: 11.5, color: "var(--dim)", marginLeft: 12 }}>tuan-anh.ts</span>
      </div>
      <div className="code" style={{ padding: "20px 22px 24px" }}>
        {lines.map((l, i) => (
          <div className="code-row" key={i}>
            <span className="ln">{i + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: l[0] }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Home() {
  const { lang } = useLang()
  const x = T[lang]
  const seen = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".fadeup").forEach((e) => e.classList.add("in")); return
    }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) } })
    }, { threshold: 0.1 })
    document.querySelectorAll("section .glass, .prin").forEach((el) => {
      if (el.id === "codepanel") return
      el.classList.add("fadeup"); io.observe(el)
    })
    return () => io.disconnect()
  }, [lang])

  return (
    <>
      <TreeBackground />
      <Nav />
      <main ref={seen}>
        <section id="hero" className="wrap">
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 500px", gap: 46, alignItems: "center" }}>
            <div>
              <Typed />
              <div className="fadeup in" style={{ display: "flex", gap: 13, flexWrap: "wrap", marginTop: 36 }}>
                <Link className="btn solid" href="#projects">{x.cta1} <span style={{ fontSize: 15 }}>→</span></Link>
                <Link className="btn" href="#about">{x.cta2}</Link>
              </div>
              <div className="fadeup in" style={{ fontFamily: "var(--font-mono),monospace", fontSize: 11.5, color: "var(--dim)", marginTop: 32 }}>{x.meta}</div>
            </div>
            <CodePanel />
          </div>
        </section>

        <section className="wrap" style={{ paddingTop: 0 }}>
          <div className="glass" style={{ padding: "40px 44px" }}>
            <div className="eyebrow">{x.fromLabel}</div>
            <p style={{ fontSize: "clamp(18px,2.2vw,23px)", lineHeight: 1.68, marginTop: 18, maxWidth: "70ch", fontWeight: 300 }}
               dangerouslySetInnerHTML={{ __html: x.from }} />
          </div>
        </section>

        <ProjectTable />

        <section id="how" className="wrap">
          <div className="eyebrow">{x.howLabel}</div>
          <h2>{x.howHead}</h2>
          <div className="pr" style={{ marginTop: 30 }}>
            {x.prin.map((p: any, i: number) => (
              <div className="glass prin" key={i}>
                <h3>{p.h}</h3>
                <p className="q">{p.q}</p>
                <p>{p.p}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="wrap">
          <div className="glass" style={{ padding: "44px 46px" }}>
            <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 52, alignItems: "start" }}>
              <div>
                <div className="eyebrow">{x.aboutLabel}</div>
                <h2 style={{ maxWidth: "22ch" }}>{x.aboutHead}</h2>
                {x.about.map((s: string, i: number) => (
                  <p key={i} style={{ fontSize: 17.5, lineHeight: 1.76, color: "var(--muted)", marginTop: 16, maxWidth: "66ch" }}
                     dangerouslySetInnerHTML={{ __html: s }} />
                ))}
              </div>
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
  return <LangProvider><Home /></LangProvider>
}
