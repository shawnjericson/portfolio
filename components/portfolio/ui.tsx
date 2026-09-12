"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useLang } from "./lang"
import { T, GALLERY, TT, TTC, DOMS, TECHS, PROJECTS, nameOf } from "@/lib/portfolio"

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/* ═══════════ NỀN: B+TREE CHẠY THẬT ═══════════
   Cây B bậc 4: chèn khoá, nút đầy thì tách, tách lan lên trên, cây cao thêm tầng.
   Thỉnh thoảng tra một khoá rồi soi đường từ gốc xuống lá. */
type BNode = { keys: number[]; kids: BNode[]; leaf: boolean; x: number; y: number; tx: number; ty: number }

export function TreeBackground() {
  const ref = useRef<HTMLCanvasElement>(null)
  const footHover = useRef(0)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext("2d")
    if (!ctx) return
    if (reduced()) return

    const ORDER = 4, MAXK = ORDER - 1
    const node = (leaf: boolean): BNode => ({ keys: [], kids: [], leaf, x: 0, y: 0, tx: 0, ty: 0 })
    let root = node(true), nkeys = 0
    let hi: BNode[] | null = null, hiUntil = 0

    const splitChild = (par: BNode, i: number) => {
      const full = par.kids[i], mid = MAXK >> 1, right = node(full.leaf), up = full.keys[mid]
      right.keys = full.keys.slice(mid + 1); full.keys = full.keys.slice(0, mid)
      if (!full.leaf) { right.kids = full.kids.slice(mid + 1); full.kids = full.kids.slice(0, mid + 1) }
      right.x = full.x; right.y = full.y
      par.keys.splice(i, 0, up); par.kids.splice(i + 1, 0, right)
    }
    const insNonFull = (n: BNode, k: number) => {
      let i = n.keys.length - 1
      if (n.leaf) { while (i >= 0 && k < n.keys[i]) i--; n.keys.splice(i + 1, 0, k); return }
      while (i >= 0 && k < n.keys[i]) i--
      i++
      if (n.kids[i].keys.length === MAXK) { splitChild(n, i); if (k > n.keys[i]) i++ }
      insNonFull(n.kids[i], k)
    }
    const insert = (k: number) => {
      if (root.keys.length === MAXK) {
        const s = node(false); s.kids.push(root); s.x = root.x; s.y = root.y; splitChild(s, 0); root = s
      }
      insNonFull(root, k); nkeys++
    }
    const search = (k: number) => {
      const path: BNode[] = []; let n: BNode | undefined = root
      while (n) { path.push(n)
        let i = 0; while (i < n.keys.length && k > n.keys[i]) i++
        if (i < n.keys.length && n.keys[i] === k) return path
        if (n.leaf) return path
        n = n.kids[i] }
      return path
    }
    const allKeys = (n: BNode, out: number[] = []) => {
      out.push(...n.keys); n.kids.forEach((c) => allKeys(c, out)); return out
    }

    let W = 0, H = 0
    const resize = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2)
      W = cv.clientWidth; H = cv.clientHeight
      cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0)
    }
    window.addEventListener("resize", resize); resize()

    let TRGB = "150,52,20", TOP = 0.085
    const readTone = () => {
      const cs = getComputedStyle(document.documentElement)
      TRGB = (cs.getPropertyValue("--tree-rgb") || TRGB).trim()
      TOP = parseFloat(cs.getPropertyValue("--tree-op")) || TOP
    }
    readTone()

    const layout = () => {
      const levels: BNode[][] = [], leaves: BNode[] = []
      const walk = (n: BNode, d: number) => {
        (levels[d] = levels[d] || []).push(n)
        if (n.leaf) leaves.push(n); else n.kids.forEach((c) => walk(c, d + 1))
      }
      walk(root, 0)
      const padX = W * 0.08, usable = W - padX * 2
      leaves.forEach((n, i) => { n.tx = padX + usable * ((i + 0.5) / leaves.length) })
      for (let d = levels.length - 2; d >= 0; d--)
        levels[d].forEach((n) => {
          n.tx = n.kids.length ? n.kids.reduce((s, c) => s + c.tx, 0) / n.kids.length : W / 2
        })
      const top = H * 0.2, gap = Math.min(112, (H * 0.56) / Math.max(1, levels.length - 1))
      levels.forEach((row, d) => row.forEach((n) => { n.ty = top + d * gap }))
      return levels
    }
    const rr = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath()
      ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r)
      ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
      ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r)
      ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath()
    }

    let raf = 0, lastIns = 0, lastQ = 0, boost = 0
    for (let i = 0; i < 9; i++) insert(Math.floor(Math.random() * 900) + 100)

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (now - lastIns > 1500) {
        lastIns = now
        if (nkeys > 30) { root = node(true); nkeys = 0; hi = null }
        else insert(Math.floor(Math.random() * 900) + 100)
      }
      if (now - lastQ > 5200 && nkeys > 6) {
        lastQ = now
        const ks = allKeys(root)
        hi = search(ks[Math.floor(Math.random() * ks.length)]); hiUntil = now + 2100
      }
      if (hi && now > hiUntil) hi = null
      boost += (footHover.current - boost) * 0.07

      const levels = layout(), base = TOP + boost * 0.42
      ctx.clearRect(0, 0, W, H)
      levels.forEach((row) => row.forEach((n) => { n.x += (n.tx - n.x) * 0.11; n.y += (n.ty - n.y) * 0.11 }))
      ctx.lineWidth = 1
      levels.forEach((row) => row.forEach((n) => n.kids.forEach((c) => {
        const on = !!hi && hi.indexOf(n) >= 0 && hi.indexOf(c) >= 0
        ctx.strokeStyle = `rgba(${TRGB},${on ? 0.62 + boost * 0.3 : base * 0.72})`
        ctx.beginPath(); ctx.moveTo(n.x, n.y + 11); ctx.lineTo(c.x, c.y - 11); ctx.stroke()
      })))
      ctx.font = `10px ${getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace"}, monospace`
      ctx.textAlign = "center"; ctx.textBaseline = "middle"
      levels.forEach((row) => row.forEach((n) => {
        const w = Math.max(26, n.keys.length * 22), on = !!hi && hi.indexOf(n) >= 0
        rr(n.x - w / 2, n.y - 11, w, 22, 6)
        ctx.fillStyle = `rgba(${TRGB},${on ? 0.16 + boost * 0.14 : base * 0.1})`; ctx.fill()
        ctx.strokeStyle = `rgba(${TRGB},${on ? 0.8 + boost * 0.2 : base})`
        ctx.lineWidth = on ? 1.4 : 1; ctx.stroke()
        /* số chỉ hiện khi người xem rê xuống chân trang */
        if (boost > 0.15) {
          ctx.fillStyle = `rgba(${TRGB},${boost * (on ? 0.9 : 0.5)})`
          ctx.fillText(n.keys.join(" "), n.x, n.y + 0.5)
        }
      }))
    }
    raf = requestAnimationFrame(frame)

    const foot = document.getElementById("foot")
    const on = () => { footHover.current = 1 }
    const off = () => { footHover.current = 0 }
    foot?.addEventListener("mouseenter", on)
    foot?.addEventListener("mouseleave", off)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      foot?.removeEventListener("mouseenter", on)
      foot?.removeEventListener("mouseleave", off)
    }
  }, [])

  return (
    <div id="bg" aria-hidden="true">
      <div className="blob b1" style={{ width: 640, height: 640, left: -140, top: -80, background: "var(--blobA)" }} />
      <div className="blob b2" style={{ width: 720, height: 720, right: -160, top: 120, background: "var(--blobB)" }} />
      <div className="blob b3" style={{ width: 520, height: 520, left: "40%", top: "52%", background: "var(--blobC)" }} />
      <div className="blob b4" style={{ width: 420, height: 420, right: "12%", bottom: -80, background: "var(--blobD)" }} />
      <div id="scrim" />
      <canvas id="tree" ref={ref} />
    </div>
  )
}

/* ═══════════ THANH ĐIỀU HƯỚNG ═══════════ */
export function Nav() {
  const { lang, setLang } = useLang()
  const x = T[lang]
  const to = ["projects", "how", "about", "contact"]
  return (
    <nav>
      <div className="navpill">
        <Link className="me" href="/">TUẤN ANH</Link>
        <span className="sep" />
        {x.nav.map((label: string, i: number) => (
          <Link key={to[i]} href={`/#${to[i]}`}>{label}</Link>
        ))}
        <span className="sep" />
        <button type="button" className="lang" aria-pressed={lang === "vi"} onClick={() => setLang("vi")}>VI</button>
        <button type="button" className="lang" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
      </div>
    </nav>
  )
}

export function Foot() {
  const { lang } = useLang()
  return (
    <footer className="wrap" id="foot">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 18, flexWrap: "wrap" }}>
        <span>Đặng Lê Tuấn Anh · {T[lang].foot}</span>
        <span>© 2026</span>
      </div>
    </footer>
  )
}

export function Contact() {
  const { lang } = useLang()
  const x = T[lang]
  return (
    <div id="contact" style={{ fontFamily: "var(--font-mono),monospace", fontSize: 12.5, lineHeight: 2.2, color: "var(--muted)" }}>
      <div style={{ fontSize: 10, letterSpacing: 1.8, color: "var(--dim)", marginBottom: 10 }}>{x.contact}</div>
      <div><a href="mailto:shawnjericson@gmail.com" style={{ color: "var(--fire)", textDecoration: "none" }}>shawnjericson@gmail.com</a></div>
      <div>0383 382 869</div>
      <div><a href="https://github.com/shawnjericson" target="_blank" rel="noopener noreferrer" style={{ color: "var(--fire)", textDecoration: "none" }}>github.com/shawnjericson</a></div>
      <div style={{ marginTop: 18 }}><span className="btn" style={{ fontSize: 12, padding: "11px 20px" }}>{x.cv}</span></div>
    </div>
  )
}

/* ═══════════ PHÓNG ẢNH ═══════════
   Bấm để mở to. Qua lại bằng mũi tên, phím ← →, hoặc vuốt trên điện thoại. */
export function Shots({ galKey }: { galKey: string }) {
  const { lang } = useLang()
  const x = T[lang]
  const list: any[] = GALLERY[galKey] || []
  const [open, setOpen] = useState(-1)
  const touch = useRef({ x: 0, y: 0 })

  const go = useCallback((d: number) => setOpen((i) => (i + d + list.length) % list.length), [list.length])

  useEffect(() => {
    if (open < 0) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(-1)
      else if (e.key === "ArrowLeft") go(-1)
      else if (e.key === "ArrowRight") go(1)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = "" }
  }, [open, go])

  if (!list.length) return null
  const pick = (s: any) => (lang === "en" && s.en ? s.en : s.vi)
  const cap = (s: any) => s.cap[lang === "vi" ? 0 : 1]
  const cur = open >= 0 ? list[open] : null

  return (
    <>
      <section className="wrap" style={{ paddingTop: 34 }}>
        <div style={{ paddingTop: 4, marginBottom: 20, display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div className="eyebrow">{x.dShots} · {list.length}</div>
          <div style={{ fontFamily: "var(--font-mono),monospace", fontSize: 11, color: "var(--dim)" }}>{x.shotNote}</div>
        </div>
        <div className="grid">
          {list.map((s, i) => (
            <button key={i} type="button" className="shot" onClick={() => setOpen(i)}>
              <img
                src={`/shots/${galKey}/${pick(s)}-sm.jpg`}
                srcSet={`/shots/${galKey}/${pick(s)}-sm.jpg 800w, /shots/${galKey}/${pick(s)}.jpg 2400w`}
                sizes="(max-width: 640px) 92vw, (max-width: 1100px) 46vw, 300px"
                alt={cap(s)}
                loading="lazy"
              />
              <span className="scap">{cap(s)}</span>
            </button>
          ))}
        </div>
      </section>

      {cur && (
        <div
          id="lb"
          className="on show"
          role="dialog"
          aria-modal="true"
          aria-label={cap(cur)}
          onClick={(e) => { if ((e.target as HTMLElement).classList.contains("veil")) setOpen(-1) }}
          onTouchStart={(e) => { touch.current = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY } }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touch.current.x
            const dy = e.changedTouches[0].clientY - touch.current.y
            if (Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
          }}
        >
          <div className="veil" />
          <button className="close" type="button" aria-label="Close" onClick={() => setOpen(-1)}>✕</button>
          <button className="prev" type="button" aria-label="Previous" onClick={() => go(-1)}>‹</button>
          <button className="next" type="button" aria-label="Next" onClick={() => go(1)}>›</button>
          {/* ảnh 2400px, nét trên cả màn retina */}
          <img src={`/shots/${galKey}/${pick(cur)}.jpg`} alt={cap(cur)} />
          <div className="bar">
            <span className="num">{open + 1} / {list.length}</span>
            <span className="cap">{cap(cur)}</span>
          </div>
        </div>
      )}
    </>
  )
}

/* ═══════════ BẢNG DỰ ÁN, LỌC KIỂU FLIP ═══════════ */
export function ProjectTable() {
  const { lang } = useLang()
  const x = T[lang]
  const [tech, setTech] = useState<string | null>(null)
  const [dom, setDom] = useState<string | null>(null)
  const rows = useRef<Record<string, HTMLAnchorElement | null>>({})
  const firstTops = useRef<Record<string, number>>({})

  const hit = (p: any) => (!tech || p.tech.indexOf(tech) >= 0) && (!dom || p.dom === dom)
  const shown = PROJECTS.filter(hit)

  /* FLIP: trước khi đổi bộ lọc, ghi lại chỗ cũ của từng dòng. */
  const snapshot = () => {
    const m: Record<string, number> = {}
    PROJECTS.forEach((p) => {
      const el = rows.current[p.slug]
      if (el && !el.classList.contains("out")) m[p.slug] = el.getBoundingClientRect().top
    })
    firstTops.current = m
  }

  useEffect(() => {
    if (reduced()) return
    const was = firstTops.current
    let i = 0
    PROJECTS.forEach((p) => {
      const el = rows.current[p.slug]
      if (!el || !hit(p)) return
      const now = el.getBoundingClientRect().top
      const before = was[p.slug]
      if (before === undefined) {
        el.style.transition = "none"; el.style.opacity = "0"; el.style.transform = "translateY(-10px)"
        const k = i
        requestAnimationFrame(() => {
          el.style.transition = ""; el.style.transitionDelay = `${k * 42}ms`
          el.style.opacity = ""; el.style.transform = ""
        })
      } else if (Math.abs(before - now) > 0.5) {
        el.style.transition = "none"; el.style.transform = `translateY(${before - now}px)`
        const k = i
        requestAnimationFrame(() => {
          el.style.transition = ""; el.style.transitionDelay = `${k * 30}ms`; el.style.transform = ""
        })
      }
      i++
    })
  }, [tech, dom])

  return (
    <section id="projects" className="wrap">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div className="eyebrow">{x.projLabel}</div>
          <h2>{x.projHead}</h2>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "baseline", fontFamily: "var(--font-mono),monospace", fontSize: 12 }}>
          <span style={{ color: "var(--dim)" }}>{shown.length} {x.of}</span>
          <button className="chip" type="button" onClick={() => { snapshot(); setTech(null); setDom(null) }}>{x.reset}</button>
        </div>
      </div>

      <div className="glass" style={{ padding: "26px 26px 12px", marginTop: 26 }}>
        <div style={{ display: "grid", gridTemplateColumns: "84px 1fr", gap: "12px 18px", alignItems: "center", paddingBottom: 22, borderBottom: "1px solid var(--line2)" }}>
          <span className="flab">{x.stack}</span>
          <div className="chips">
            {TECHS.map((v) => (
              <button key={v} type="button" className="chip" aria-pressed={tech === v}
                onClick={() => { snapshot(); setTech(tech === v ? null : v) }}>{v}</button>
            ))}
          </div>
          <span className="flab">{x.field}</span>
          <div className="chips">
            {DOMS.map((d) => (
              <button key={d[0]} type="button" className="chip" aria-pressed={dom === d[0]}
                onClick={() => { snapshot(); setDom(dom === d[0] ? null : d[0]) }}>
                {lang === "vi" ? d[1] : d[2]}
              </button>
            ))}
          </div>
        </div>

        <div>
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              ref={(el) => { rows.current[p.slug] = el }}
              className={`prow${hit(p) ? "" : " out"}`}
            >
              <div>
                <div className="pname">{nameOf(p, lang)}</div>
                <div className="prole">{p.vai[lang]}</div>
              </div>
              <div className="pdesc">{p[lang].mo}</div>
              <div className="ptech">{p.stack}</div>
              <div style={{ textAlign: "right" }}>
                <span className="tag" style={{ color: TTC[p.tt], borderColor: TTC[p.tt] }}>{TT[p.tt][lang]}</span>
              </div>
            </Link>
          ))}
        </div>

        {!shown.length && (
          <p style={{ fontFamily: "var(--font-mono),monospace", fontSize: 12, color: "var(--flame)", padding: "18px 12px 12px" }}>{x.empty}</p>
        )}
      </div>

      <p style={{ fontFamily: "var(--font-mono),monospace", fontSize: 11.5, color: "var(--dim)", marginTop: 14 }}>{x.openHint}</p>
    </section>
  )
}
