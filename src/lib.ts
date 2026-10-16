import type { Product } from './data'
export const norm = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
export const money = (n: number) => '$' + new Intl.NumberFormat('es-AR').format(n)
export type Sort = 'default' | 'name' | 'price-asc' | 'price-desc'
export const matches = (p: Product, q: string) => {
  const t = norm(q).trim().split(/\s+/).filter(Boolean)
  const hay = norm([p.name, p.brand, p.size, ...(p.flavors ?? [])].filter(Boolean).join(' '))
  return t.every((w) => hay.includes(w))
}
export const sortProducts = (list: Product[], sort: Sort) => {
  if (sort === 'default') return list
  const byName = (a: Product, b: Product) => (a.brand ?? '').localeCompare(b.brand ?? '', 'es') || a.name.localeCompare(b.name, 'es')
  const price = (p: Product, dir: 1 | -1) => (p.price ?? (dir === 1 ? Infinity : -Infinity))
  return [...list].sort(sort === 'name' ? byName : (a, b) => (sort === 'price-asc' ? price(a, 1) - price(b, 1) : price(b, -1) - price(a, -1)))
}
