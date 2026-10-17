// ✏️ CATÁLOGO: editá productos acá. Precios y sabores tomados de https://bcsuplementos.tiiny.site/ (verificar antes de publicar).
export type CategoryId = 'proteinas' | 'creatinas' | 'salud' | 'preentreno' | 'bcaa' | 'geles' | 'quemadores' | 'masa' | 'barritas'
export interface Category { id: CategoryId; label: string; shape: 'tub' | 'bottle' | 'sachet'; tone: string }
export interface Product {
  id: string; name: string; category: CategoryId
  brand?: string; size?: string; flavors?: string[]; price?: number; priceNote?: string
  tone?: string // color del envase ilustrado (si no, usa el de la categoría)
  description?: string; image?: string // image: ruta en /public (ej. '/productos/ena-1kg.webp')
  available?: boolean; tag?: string // solo cargar si el dato es confiable
}

export const CATEGORIES: Category[] = [
  { id: 'proteinas', label: 'Proteínas', shape: 'tub', tone: '#22c55e' },
  { id: 'creatinas', label: 'Creatinas', shape: 'tub', tone: '#e8ece9' },
  { id: 'salud', label: 'Colágeno, magnesio y omega 3', shape: 'bottle', tone: '#86efac' },
  { id: 'preentreno', label: 'Pre entreno', shape: 'tub', tone: '#15803d' },
  { id: 'bcaa', label: 'BCAA', shape: 'tub', tone: '#9aa39d' },
  { id: 'geles', label: 'Geles', shape: 'sachet', tone: '#bbf7d0' },
  { id: 'quemadores', label: 'Quemadores de grasa', shape: 'bottle', tone: '#4ade80' },
  { id: 'masa', label: 'Aumentador de masa', shape: 'tub', tone: '#4ade80' },
  { id: 'barritas', label: 'Barritas', shape: 'sachet', tone: '#34d399' },
]
export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<CategoryId, Category>

const slug = (...parts: (string | undefined)[]) =>
  parts.filter(Boolean).join(' ').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
// 📷 FOTOS: cada archivo de /public/productos/ se llama como el id del producto (ej. ena-proteina-1-kg.webp). Para sumar una foto, subí el archivo y agregá su id acá.
const PHOTOS = new Set<string>([
  'proteina-endoy-pack-star-nutrition-1-kg',
  'proteina-ena-500-g',
  'proteina-ena-1-kg',
  'proteina-xbody-1-kg',
  'proteina-gold-nutrition-1-kg',
  'creatina-star-nutrition-150-g',
  'creatina-star-nutrition-300-g',
  'creatina-en-tarro-star-nutrition-300-g',
  'creatina-en-tarro-star-nutrition-500-g',
  'creatina-star-nutrition-1-kg',
  'creatina-innolab-300-g',
  'creatina-en-doy-pack-xbody-300-g',
  'creatina-xbody-1-kg',
  'creatina-gold-nutrition-300-g',
  'creatina-gentech-500-g',
  'creatina-con-electrolitos',
  'creatina-ena-300-g',
  'creatina-ena-1-kg',
  'colageno-sport-ena-30-usos',
  'omega-3-star-nutrition-30-usos',
  'omega-3-gold-nutrition-30-usos',
  'magnesio-en-polvo-sabor-limonada-60-usos',
  'pre-entreno-war-ena',
  'pre-entreno-v8-star-nutrition',
  'bcaa-star-nutrition',
  'bcaa-en-capsulas-ena',
  'bcaa-en-polvo-ena',
  'bcaa-one-fit',
  'gel-con-cafeina-caja-nutremax-12-unidades',
  'cutter-quemador',
  'multivitaminico-htn',
  'aumentador-de-masa-ena-1-5-kg',
])
const P = (category: CategoryId, name: string, brand: string | undefined, size: string | undefined, price: number, flavors?: string[], priceNote?: string, description?: string): Product =>
  { const id = slug(name, brand, size); return { id, category, name, brand, size, price, flavors, priceNote, description, image: PHOTOS.has(id) ? `/productos/${id}.webp` : undefined } }

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
  // Barritas Gentech Iron Bar: unidad $4.000, caja de 20 $45.000 (la caja se separa por sabor cuando lleguen las fotos)
  ...(
    [['Banana', '#eab308'], ['Cookies and Cream', '#38bdf8'], ['Coco', '#e8ece9'], ['Chocolate', '#a16207'], ['Frutilla', '#e11d48'], ['Dulce de leche crunch', '#ea580c']] as const
  ).map(([flavor, tone]) => ({ ...P('barritas', `Iron Bar ${flavor}`, 'Gentech', undefined, 4000, undefined, 'c/u'), tone })),
  P('barritas', 'Iron Bar, caja', 'Gentech', '20 unidades', 45000, undefined, 'por caja'),
]
export const BRANDS = [...new Set(PRODUCTS.flatMap((p) => (p.brand ? [p.brand] : [])))]