import { useState, type CSSProperties } from 'react'
import { CATEGORY_BY_ID, type Product } from '../data'

// Imagen real si existe; si no, un envase ilustrado (PLACEHOLDER) con la marca y el tamaño. Proporción fija 4:5 → sin saltos de layout.
export function Visual({ p }: { p: Product }) {
  const [loaded, setLoaded] = useState(false)
  const cat = CATEGORY_BY_ID[p.category]
  if (p.image)
    return (
      <div className={`visual visual--img${loaded ? ' is-loaded' : ''}`}>
        <img src={p.image} alt={`${p.name}${p.brand ? ' ' + p.brand : ''}`} width={400} height={500} loading="lazy" decoding="async" onLoad={() => setLoaded(true)} />
      </div>
    )
  return (
    <div className="visual" style={{ '--tone': cat.tone } as CSSProperties} aria-hidden="true">
      <div className={`pack pack--${cat.shape}`}>
        <span className="pack__label">
          <b>{p.brand ?? cat.label}</b>
          {p.size && <i>{p.size}</i>}
        </span>
      </div>
    </div>
  )
}
