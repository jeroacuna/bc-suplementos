import { useState, type ReactNode } from 'react'
import { m } from 'motion/react'
import { SITE, messages, waLink } from '../config'
import { BRANDS, CATEGORIES, PRODUCTS, type CategoryId } from '../data'
import { money } from '../lib'
import { WhatsAppIcon } from './Icons'

const NAV = [['#categorias', 'Categorías'], ['#catalogo', 'Catálogo'], ['#confianza', 'Cómo comprar'], ['#contacto', 'Contacto']]
const wa = waLink(messages.general)

export const Logo = () => (SITE.logoSrc ? <img className="logo-img" src={SITE.logoSrc} alt={SITE.name} height={36} /> : <span className="logo"><b>BC</b> Suplementos</span>)

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return <m.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.45, ease: 'easeOut' }}>{children}</m.div>
}

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <div className="wrap header__in">
        <a href="#top" className="header__brand" aria-label={`${SITE.name}, inicio`}><Logo /></a>
        <nav id="menu" className={`nav${open ? ' is-open' : ''}`} aria-label="Principal">
          {NAV.map(([h, l]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
        </nav>
        <a className="btn btn--wa btn--sm" href={wa} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> WhatsApp</a>
        <button className="menu-btn" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>{open ? 'Cerrar' : 'Menú'}</button>
      </div>
    </header>
  )
}

export function Hero() {
  const feat = [PRODUCTS[0], PRODUCTS.find((p) => p.category === 'creatinas')!, PRODUCTS.find((p) => p.category === 'bcaa')!]
  return (
    <section className="hero" id="top">
      <div className="wrap hero__in">
        <div className="hero__copy">
          <h1>Entrená fuerte.<br />Suplementate bien.</h1>
          <p>Proteínas, creatinas, BCAA, pre entreno y más de las marcas que buscás. Elegí tu producto y consultanos directo por WhatsApp.</p>
          <div className="hero__cta">
            <a className="btn btn--signal" href="#catalogo">Ver catálogo</a>
            <a className="btn btn--ghost" href="#categorias">Explorar categorías</a>
          </div>
        </div>
        <div className="hero__packs" aria-hidden="true">
          {feat.map((p, i) => (
            <m.div key={p.id} className={`hp hp--${i}`} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: 'easeOut' }}>
              <div className={`pack pack--${CATEGORIES.find((c) => c.id === p.category)!.shape}`} style={{ '--tone': CATEGORIES.find((c) => c.id === p.category)!.tone } as React.CSSProperties}>
                <span className="pack__label"><b>{p.brand}</b><i>{p.size}</i></span>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Categories({ onPick }: { onPick: (c: CategoryId) => void }) {
  return (
    <section id="categorias" className="section" aria-labelledby="cat-t">
      <div className="wrap">
        <Reveal><h2 id="cat-t" className="h-section">Categorías</h2></Reveal>
        <ul className="tiles">
          {CATEGORIES.map((c) => {
            const items = PRODUCTS.filter((p) => p.category === c.id)
            const min = Math.min(...items.flatMap((p) => (p.price != null ? [p.price] : [])))
            return (
              <li key={c.id}>
                <button className="tile" style={{ '--tone': c.tone } as React.CSSProperties} onClick={() => { onPick(c.id); document.getElementById('catalogo')?.scrollIntoView() }}>
                  <span className="tile__name">{c.label}</span>
                  <span className="tile__meta">{items.length} {items.length === 1 ? 'producto' : 'productos'}{Number.isFinite(min) && <> – desde {money(min)}</>}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function Trust() {
  return (
    <section id="confianza" className="section trust" aria-labelledby="trust-t">
      <div className="wrap">
        <Reveal><h2 id="trust-t" className="h-section">Comprar es simple</h2></Reveal>
        <Reveal className="trust__grid">
          <ol className="steps">
            <li><b>Elegí</b> el producto en el catálogo.</li>
            <li><b>Tocá “Consultar”</b> y se abre WhatsApp con el mensaje listo.</li>
            <li><b>Coordinás</b> disponibilidad y entrega directo con nosotros.</li>
          </ol>
          <div className="trust__side">
            <p><b>Atención personalizada.</b> Te respondemos personas, no un formulario.</p>
            <p><b>Marcas que trabajamos:</b> {BRANDS.join(', ')}.</p>
            <a className="btn btn--wa" href={wa} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> ¿No encontrás lo que buscás? Consultanos</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer id="contacto" className="footer">
      <div className="wrap footer__in">
        <div><Logo /><p>Suplementos deportivos en {SITE.city}.</p></div>
        <nav aria-label="Pie de página">{NAV.slice(0, 3).map(([h, l]) => <a key={h} href={h}>{l}</a>)}</nav>
        <div className="footer__contact">
          <a href={wa} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.whatsappDisplay}</a>
          <a href={`https://instagram.com/${SITE.instagram}`} target="_blank" rel="noopener noreferrer">Instagram @{SITE.instagram}</a>
        </div>
      </div>
    </footer>
  )
}
