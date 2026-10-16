import { m } from 'motion/react'
import { messages, waLink } from '../config'
import { CATEGORY_BY_ID, type Product } from '../data'
import { money } from '../lib'
import { WhatsAppIcon } from './Icons'
import { Visual } from './Visual'

export function ProductCard({ p, index }: { p: Product; index: number }) {
  const unavailable = p.available === false
  return (
    <m.li
      layout="position"
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, delay: Math.min(index, 8) * 0.03, ease: 'easeOut' } }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
      className="card"
    >
      <article aria-label={p.name}>
        <Visual p={p} />
        {p.tag && <span className="card__tag">{p.tag}</span>}
        <div className="card__body">
          <p className="card__cat">{CATEGORY_BY_ID[p.category].label}</p>
          <h3>{p.name}{p.brand ? ` ${p.brand}` : ''}</h3>
          {p.size && <p className="card__size">{p.size}</p>}
          {p.flavors && <p className="card__flavors"><span>Sabores:</span> {p.flavors.join(', ')}</p>}
          {p.description && <p className="card__desc">{p.description}</p>}
          <p className="card__price">
            {p.price != null ? <>{money(p.price)}{p.priceNote && <small> {p.priceNote}</small>}</> : <small>Consultá el precio</small>}
          </p>
          <m.a whileTap={{ scale: 0.96 }} className="btn btn--wa" href={waLink(messages.product(p))} target="_blank" rel="noopener noreferrer" aria-label={`Consultar por ${p.name}${p.brand ? ' ' + p.brand : ''} por WhatsApp`}>
            <WhatsAppIcon /> {unavailable ? 'Consultar reposición' : 'Consultar'}
          </m.a>
        </div>
      </article>
    </m.li>
  )
};