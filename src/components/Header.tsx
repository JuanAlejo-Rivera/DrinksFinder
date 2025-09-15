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
    <header className={isHome ? 'bg-[url(/bg.png)] bg-center bg-cover' : 'bg-slate-800'}>
      console.log({isHome})
      
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div className="relative w-full h-24">
            <img
              src="/logo.png"
              alt="logotipo_bebidas"
              className="absolute top-0 left-0 w-[350px]"
            />
          </div>
 
          <nav className="flex gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? 'text-amber-700 uppercase font-bold' : 'text-white uppercase font-bold'
              }
              to="/">Inicio</NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive ? 'text-amber-700 uppercase font-bold' : 'text-white uppercase font-bold'
              }
            >Favoritos</NavLink>
          </nav>
        </div>

        {isHome && (
          <form
            className="md:w-1/2 2xl:w-1/3  my-32 p-10 rounded-lg shadow-red-700/50 space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <label htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Nombre o ingredientes</label>
              <input
                id="ingredient"
                type="text"
                name="ingredient"
                className="bg-white p-3 w-full rounded-lg focus:outline-none"
                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, café"
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>

            <div className="space-y-4">
              <label htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg"
              >
                categoría</label>
              <select
                id="category"
                name="category"
                className="bg-white p-3 w-full rounded-lg focus:outline-none"
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
              className="cursor-pointer bg-amber-700 hover:bg-amber-800
             text-gray-00 font-extrabold w-full p-2 rounded-lg uppercase"
            />

          </form>
        )}

      </div>
    </header>
  )
}
