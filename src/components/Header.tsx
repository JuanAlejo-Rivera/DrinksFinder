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
    <header className={isHome ? 'bg-[url(/bg.jpg)] bg-center bg-cover' : 'bg-slate-800'}>
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="logotipo" />
          </div>



          <nav className="flex gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? 'text-amber-600 uppercase font-bold' : 'text-white uppercase font-bold'
              }
              to="/">Inicio</NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive ? 'text-amber-600 uppercase font-bold' : 'text-white uppercase font-bold'
              }
            >Favoritos</NavLink>
          </nav>
        </div>

        {isHome && (
          <form
            className="md:w-1/2 2xl:w-1/3 bg-amber-600 my-32 p-10 rounded-lg shadow space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <label htmlFor="ingredient"
                className="block text-gray-800 uppercase font-extrabold text-lg"
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
                className="block text-gray-800 uppercase font-extrabold text-lg"
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
              className="cursor-pointer bg-orange-800 hover:bg-orange-900
             text-gray-00 font-extrabold w-full p-2 rounded-lg uppercase"
            />

          </form>
        )}

      </div>
    </header>
  )
}
