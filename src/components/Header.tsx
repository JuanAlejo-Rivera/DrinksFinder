import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"



export default function Header() {

  const initialState = ({
    ingredient: '',
    category: ''
  })

  const [searchFilters, setsearchFilters] = useState(initialState)

  const { pathname } = useLocation()
  const isHome = useMemo(() => pathname === '/', [pathname])

  const fetchCategories = useAppStore((state) => state.fetchCategories)
  const categories = useAppStore((state) => state.categories)
  const searchRecipies = useAppStore((state) => state.searchRecipies)
  const showNotification = useAppStore((state) => state.showNotification)

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setsearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //TODO: validar
    if (Object.values(searchFilters).includes('')) {
      showNotification({
        text: 'Todas los campos son obligatorios',
        error: true,
      })
      return
    }
    //Consultar las recetas
    searchRecipies(searchFilters)
    //restaurar la busqueda
    setsearchFilters(initialState)
  }

  return (
    <header className={isHome ? 'bg-[url(/bg.png)] bg-center bg-cover relative' : 'bg-gradient-to-r from-slate-800 via-slate-900 to-gray-900 shadow-lg'}>
      {isHome && <div className="absolute inset-0 bg-black/30"></div>}
      
      <div className="mx-auto container px-5 py-16 relative z-10">
        <div className="flex justify-between items-center">
       <div>
            <img className="w-40 drop-shadow-2xl" src="/logo.png" alt="logotipo" />
          </div>
 
          <nav className="flex gap-8">
            <NavLink
              className={({ isActive }) =>
                isActive ? 'text-amber-400 uppercase font-extrabold text-base tracking-widest hover:text-amber-300 transition-all duration-300 hover:scale-105' : 'text-white uppercase font-bold text-base tracking-widest hover:text-amber-400 transition-all duration-300 hover:scale-105'
              }
              to="/">Inicio</NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive ? 'text-amber-400 uppercase font-extrabold text-base tracking-widest hover:text-amber-300 transition-all duration-300 hover:scale-105' : 'text-white uppercase font-bold text-base tracking-widest hover:text-amber-400 transition-all duration-300 hover:scale-105'
              }
            >Favoritos</NavLink>
          </nav>
        </div>

        {isHome && (
          <form
            className="md:w-1/2 2xl:w-1/3 my-32 p-10 rounded-2xl bg-gray-900/40 backdrop-blur-xl border border-amber-500/30 shadow-2xl shadow-amber-500/20 space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-3">
              <label htmlFor="ingredient"
                className="block text-white uppercase font-bold text-sm tracking-wide"
              >
                Nombre o ingredientes</label>
              <input
                id="ingredient"
                type="text"
                name="ingredient"
                className="bg-white/95 p-3.5 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 text-gray-900 placeholder:text-gray-500"
                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, café"
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="category"
                className="block text-white uppercase font-bold text-sm tracking-wide"
              >
                categoría</label>
              <select
                id="category"
                name="category"
                className="bg-white/95 p-3.5 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 text-gray-900 cursor-pointer"
                onChange={handleChange}
                value={searchFilters.category}

              >
                <option value="">-- Seleccione --</option>
                {categories.drinks.map(category => (
                  <option
                    value={category.strCategory}
                    key={category.strCategory}
                  >
                    {category.strCategory}</option>
                ))}

              </select>
            </div>
            <input
              type="submit"
              value='Buscar Recetas'
              className="cursor-pointer bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600
             text-white font-bold w-full py-3.5 rounded-xl uppercase tracking-wide shadow-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 ease-out hover:-translate-y-0.5"
            />

          </form>
        )}

      </div>
    </header>
  )
}
