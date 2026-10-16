// ✏️ CATÁLOGO: editá productos acá. Precios y sabores tomados de https://bcsuplementos.tiiny.site/ (verificar antes de publicar).
export type CategoryId = 'proteinas' | 'creatinas' | 'salud' | 'preentreno' | 'bcaa' | 'geles' | 'quemadores' | 'masa'
export interface Category { id: CategoryId; label: string; shape: 'tub' | 'bottle' | 'sachet'; tone: string }
export interface Product {
  id: string; name: string; category: CategoryId
  brand?: string; size?: string; flavors?: string[]; price?: number; priceNote?: string
  description?: string; image?: string // image: ruta en /public (ej. '/productos/ena-1kg.webp')
  available?: boolean; tag?: string // solo cargar si el dato es confiable
}

export const CATEGORIES: Category[] = [
  { id: 'proteinas', label: 'Proteínas', shape: 'tub', tone: '#22c55e' },
  { id: 'creatinas', label: 'Creatinas', shape: 'tub', tone: '#111111' },
  { id: 'salud', label: 'Colágeno, magnesio y omega 3', shape: 'bottle', tone: '#86efac' },
  { id: 'preentreno', label: 'Pre entreno', shape: 'tub', tone: '#15803d' },
  { id: 'bcaa', label: 'BCAA', shape: 'tub', tone: '#404040' },
  { id: 'geles', label: 'Geles', shape: 'sachet', tone: '#bbf7d0' },
  { id: 'quemadores', label: 'Quemadores de grasa', shape: 'bottle', tone: '#052e16' },
  { id: 'masa', label: 'Aumentador de masa', shape: 'tub', tone: '#166534' },
]
export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<CategoryId, Category>

let n = 0
const P = (category: CategoryId, name: string, brand: string | undefined, size: string | undefined, price: number, flavors?: string[], priceNote?: string, description?: string): Product =>
  ({ id: `${category}-${++n}`, category, name, brand, size, price, flavors, priceNote, description })

const S = 'Star Nutrition', G = 'Gold Nutrition'
export const PRODUCTS: Product[] = [
  P('proteinas', 'Proteína Endoy Pack', S, '1 kg', 88000, ['Frutilla', 'Vainilla', 'Chocolate', 'Cookies', 'Banana']),
  P('proteinas', 'Proteína', 'Ena', '500 g', 55000, ['Chocolate', 'Vainilla', 'Sin sabor']),
  P('proteinas', 'Proteína', 'Ena', '1 kg', 85000, ['Chocolate', 'Vainilla', 'Cookies', 'Frutilla']),
  P('proteinas', 'Proteína', 'Xbody', '1 kg', 66000, ['Frutilla', 'Vainilla', 'Chocolate']),
  P('proteinas', 'Proteína', 'Gentech', '1 kg', 70000, ['Frutilla', 'Vainilla', 'Chocolate']),
  P('proteinas', 'Proteína', 'Body Advance', '1 kg', 47000, ['Chocolate', 'Vainilla']),
  P('proteinas', 'Proteína', G, '1 kg', 76000, ['Frutilla', 'Vainilla', 'Chocolate', 'Sin sabor']),
  P('proteinas', 'Proteína', 'One Fit', '1 kg', 55000, ['Vainilla', 'Frutilla', 'Chocolate', 'Dulce de leche']),
  P('creatinas', 'Creatina', 'One Fit', '200 g', 20000),
  P('creatinas', 'Creatina', S, '150 g', 22000),
  P('creatinas', 'Creatina', S, '300 g', 32000),
  P('creatinas', 'Creatina en tarro', S, '300 g', 34000),
  P('creatinas', 'Creatina en tarro', S, '500 g', 50000),
  P('creatinas', 'Creatina', S, '1 kg', 86000),
  P('creatinas', 'Creatina', 'Innolab', '300 g', 28000),
  P('creatinas', 'Creatina en doy pack', 'Xbody', '300 g', 23500),
  P('creatinas', 'Creatina', 'Xbody', '1 kg', 58000),
  P('creatinas', 'Creatina', G, '300 g', 30000),
  P('creatinas', 'Creatina', 'Gentech', '500 g', 47000),
  P('creatinas', 'Creatina con electrolitos', undefined, undefined, 35500),
  P('creatinas', 'Creatina', 'Ena', '300 g', 32000, ['Con sabor', 'Sin sabor']),
  P('creatinas', 'Creatina', 'Ena', '1 kg', 86000),
  P('salud', 'Colágeno Sport', 'Ena', '30 usos', 34000),
  P('salud', 'Omega 3', S, '30 usos', 36000),
  P('salud', 'Omega 3', G, '30 usos', 34000),
  P('salud', 'Magnesio', 'One Fit', '60 usos', 16500),
  P('salud', 'Magnesio en cápsulas', undefined, undefined, 20000, undefined, undefined, 'Disponible en marca Ena o Star Nutrition.'),
  P('salud', 'Magnesio en polvo sabor limonada', undefined, '60 usos', 23000),
  P('preentreno', 'Pre entreno War', 'Ena', undefined, 34000),
  P('preentreno', 'Pre entreno V8', S, undefined, 35000),
  P('bcaa', 'BCAA', S, undefined, 34000),
  P('bcaa', 'BCAA en cápsulas', 'Ena', undefined, 21500),
  P('bcaa', 'BCAA en polvo', 'Ena', undefined, 26000),
  P('bcaa', 'BCAA', 'One Fit', undefined, 23500),
  P('geles', 'Gel con cafeína, caja', 'Nutremax', '12 unidades', 26000, ['Naranja', 'Caramelo salado', 'Uva'], 'por caja'),
  P('geles', 'Gel con cafeína, unidad', 'Nutremax', undefined, 2500, ['Naranja', 'Caramelo salado', 'Uva'], 'c/u'),
  P('quemadores', 'Cutter quemador', undefined, undefined, 23500),
  P('quemadores', 'Multivitamínico', 'HTN', undefined, 23000),
  P('quemadores', 'Quemador de grasa', S, undefined, 27500),
  P('masa', 'Aumentador de masa', 'Ena', '1,5 kg', 58000, ['Chocolate', 'Vainilla']),
]
export const BRANDS = [...new Set(PRODUCTS.flatMap((p) => (p.brand ? [p.brand] : [])))]