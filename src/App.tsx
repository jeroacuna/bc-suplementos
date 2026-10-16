import { useState } from 'react'
import { Catalog, type CategoryFilter } from './components/Catalog'
import { Categories, Footer, Header, Hero, Trust } from './components/Sections'

export default function App() {
  const [category, setCategory] = useState<CategoryFilter>('all')
  return (
    <>
      <a className="skip" href="#catalogo">Ir al catálogo</a>
      <Header />
      <main>
        <Hero />
        <Categories onPick={setCategory} />
        <Catalog category={category} onCategory={setCategory} />
        <Trust />
      </main>
      <Footer />
    </>
  )
}
