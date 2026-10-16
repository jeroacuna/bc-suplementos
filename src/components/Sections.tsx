import { useEffect, useState, type ReactNode } from 'react'
import { m, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { SITE, messages, waLink } from '../config'
import { BRANDS, CATEGORIES, PRODUCTS, type CategoryId } from '../data'
import { WhatsAppIcon } from './Icons'

const NAV = [['#catalogo', 'Catálogo'], ['#confianza', 'Cómo comprar'], ['#contacto', 'Contacto']]
const wa = waLink(messages.general)
const goCatalog = () => document.getElementById('catalogo')?.scrollIntoView()

export const Logo = () => (SITE.logoSrc ? <img className="logo-img" src={SITE.logoSrc} alt={SITE.name} width={85} height={44} decoding="async" /> : <span className="logo"><b>BC</b> Suplementos</span>)

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <m.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay, ease: 'easeOut' }}>{children}</m.div>
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const { scrollY, scrollYProgress } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8))
  useEffect(() => {
    const els = ['top', ...NAV.map(([h]) => h.slice(1))].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id === 'top' ? '' : e.target.id)), { rootMargin: '-40% 0px -55% 0px' })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])
  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap header__in">
        <a href="#top" className="header__brand" aria-label={`${SITE.name}, inicio`}><Logo /></a>
        <nav id="menu" className={`nav${open ? ' is-open' : ''}`} aria-label="Principal">
          {NAV.map(([h, l]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} aria-current={active === h.slice(1) ? 'true' : undefined}>
              {l}
              {active === h.slice(1) && <m.span layoutId="nav-line" className="nav__line" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
            </a>
          ))}
        </nav>
        <a className="btn btn--wa btn--sm" href={wa} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> WhatsApp</a>
        <button className="menu-btn" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>{open ? 'Cerrar' : 'Menú'}</button>
      </div>
      <m.div className="progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
    </header>
  )
}

function CountUp({ to }: { to: number }) {
  const reduce = useReducedMotion()
  const [v, setV] = useState(reduce ? to : 0)
  useEffect(() => {
    if (reduce) return setV(to)
    let raf = 0
    const t0 = performance.now() + 500
    const tick = (t: number) => {
      const k = Math.min(Math.max((t - t0) / 1100, 0), 1)
      setV(Math.round(to * (1 - (1 - k) ** 3)))
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, reduce])
  return <>{v}</>
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } } }
const rise = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } } }

export function Hero({ onPick }: { onPick: (c: CategoryId) => void }) {
  const stats: [number, string][] = [[PRODUCTS.length, 'productos'], [CATEGORIES.length, 'categorías'], [BRANDS.length, 'marcas']]
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true" />
      <m.div className="wrap hero__in" variants={stagger} initial="hidden" animate="show">
        <m.h1 variants={rise}>Entrená fuerte.<br /><span>Suplementate bien.</span></m.h1>
        <m.p variants={rise} className="hero__lead">Proteínas, creatinas, BCAA, pre entreno y más de las marcas que buscás. Elegí tu producto y consultanos directo por WhatsApp.</m.p>
        <m.div variants={rise} className="hero__cta">
          <a className="btn btn--signal" href="#catalogo">Ver catálogo</a>
          <a className="btn btn--ghost" href={wa} target="_blank" rel="noopener noreferrer">Consultar por WhatsApp</a>
        </m.div>
        <m.div variants={rise} className="hero__quick" role="group" aria-label="Ir directo a una categoría">
          {CATEGORIES.map((c) => (
            <button key={c.id} className="pill" onClick={() => { onPick(c.id); goCatalog() }}>{c.label}</button>
          ))}
        </m.div>
        <m.dl variants={rise} className="stats">
          {stats.map(([n, l]) => <div key={l}><dt>{l}</dt><dd><CountUp to={n} /></dd></div>)}
        </m.dl>
      </m.div>
    </section>
  )
}

export function Brands() {
  const group = (hidden?: boolean) => (
    <ul className="brands__group" aria-hidden={hidden || undefined}>
      {BRANDS.map((b) => <li key={b}>{b}</li>)}
    </ul>
  )
  return (
    <section className="brands" aria-label="Marcas que trabajamos">
      <div className="brands__track">{group()}{group(true)}</div>
    </section>
  )
}

const STEPS = [['Elegí', 'el producto en el catálogo.'], ['Tocá “Consultar”', 'y se abre WhatsApp con el mensaje listo.'], ['Coordinás', 'disponibilidad y entrega directo con nosotros.']]

export function Trust() {
  return (
    <section id="confianza" className="section trust" aria-labelledby="trust-t">
      <div className="wrap">
        <Reveal><h2 id="trust-t" className="h-section">Comprar es simple</h2></Reveal>
        <div className="trust__grid">
          <ol className="steps">
            {STEPS.map(([b, t], i) => (
              <m.li key={b} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: i * 0.1, ease: 'easeOut' }}>
                <b>{b}</b> {t}
              </m.li>
            ))}
          </ol>
          <Reveal className="trust__side" delay={0.15}>
            <p><b>Atención personalizada.</b> Te respondemos personas, no un formulario.</p>
            <p><b>Marcas que trabajamos:</b> {BRANDS.join(', ')}.</p>
            <a className="btn btn--wa" href={wa} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> ¿No encontrás lo que buscás? Consultanos</a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer id="contacto" className="footer">
      <div className="wrap footer__in">
        <div><Logo /><p>Suplementos deportivos en {SITE.city}.</p></div>
        <nav aria-label="Pie de página">{NAV.slice(0, 2).map(([h, l]) => <a key={h} href={h}>{l}</a>)}</nav>
        <div className="footer__contact">
          <a href={wa} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.whatsappDisplay}</a>
          <a href={`https://instagram.com/${SITE.instagram}`} target="_blank" rel="noopener noreferrer">Instagram @{SITE.instagram}</a>
        </div>
      </div>
    </footer>
  )
};