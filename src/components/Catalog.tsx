import { useMemo, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { CATEGORIES, PRODUCTS, type CategoryId } from '../data'
import { matches, sortProducts, type Sort } from '../lib'
import { SearchIcon } from './Icons'
import { ProductCard } from './ProductCard'
import { Reveal } from './Sections'

export type CategoryFilter = CategoryId | 'all'
const hasPrices = PRODUCTS.some((p) => p.price != null)

export function Catalog({ category, onCategory }: { category: CategoryFilter; onCategory: (c: CategoryFilter) => void }) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<Sort>('default')
  const searched = useMemo(() => (query.trim() ? PRODUCTS.filter((p) => matches(p, query)) : PRODUCTS), [query])
  const visible = useMemo(() => sortProducts(category === 'all' ? searched : searched.filter((p) => p.category === category), sort), [searched, category, sort])
  const count = (id: CategoryId) => searched.filter((p) => p.category === id).length
  const filtered = query.trim() !== '' || category !== 'all' || sort !== 'default'
  const reset = () => { setQuery(''); onCategory('all'); setSort('default') }

  return (
    <section id="catalogo" className="section catalog" aria-labelledby="catalogo-t">
      <div className="wrap">
        <Reveal><h2 id="catalogo-t" className="h-section">Catálogo</h2></Reveal>
        <div className="toolbar">
          <div className="search">
            <label htmlFor="q" className="sr-only">Buscar por nombre o marca</label>
            <SearchIcon />
            <input id="q" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscá por nombre o marca" autoComplete="off" enterKeyHint="search" />
            <AnimatePresence>
              {query && (
                <m.button type="button" className="search__clear" aria-label="Borrar búsqueda" onClick={() => setQuery('')} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.12 }}>×</m.button>
              )}
            </AnimatePresence>
          </div>
          {hasPrices && (
            <div className="sort">
              <label htmlFor="sort">Ordenar</label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                <option value="default">Destacados</option>
                <option value="name">Nombre (A–Z)</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
              </select>
            </div>
          )}
        </div>
        <div className="chips" role="group" aria-label="Filtrar por categoría">
          <button className="chip" aria-pressed={category === 'all'} onClick={() => onCategory('all')}>
            {category === 'all' && <m.span layoutId="chip-pill" className="chip__pill" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
            <span className="chip__txt">Todos <span>{searched.length}</span></span>
          </button>
          {CATEGORIES.map((c) => (
            <button key={c.id} className="chip" aria-pressed={category === c.id} disabled={count(c.id) === 0 && category !== c.id} onClick={() => onCategory(c.id)}>
              {category === c.id && <m.span layoutId="chip-pill" className="chip__pill" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
              <span className="chip__txt">{c.label} <span>{count(c.id)}</span></span>
            </button>
          ))}
        </div>
        <div className="status">
          <p role="status" aria-live="polite"><m.span key={visible.length} className="status__n" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>{visible.length === 1 ? '1 producto' : `${visible.length} productos`}</m.span></p>
          {filtered && <button className="link" onClick={reset}>Limpiar filtros</button>}
        </div>
        {visible.length > 0 ? (
          <ul className="grid">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
            </AnimatePresence>
          </ul>
        ) : (
          <m.div className="empty" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <h3>No encontramos “{query.trim() || 'esa combinación'}”</h3>
            <p>Probá con otra palabra, revisá la categoría elegida o mostrá todo el catálogo. También podés consultarnos por lo que buscás.</p>
            <button className="btn btn--solid" onClick={reset}>Mostrar todos los productos</button>
          </m.div>
        )}
      </div>
    </section>
  )
}