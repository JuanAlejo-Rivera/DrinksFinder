import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import   DrinkCard  from "../components/DrinkCard"



export default function indexPage() {

  const drinks = useAppStore((state) => state.drinks)

  const hasDrinks = useMemo(() => drinks.drinks.length, [drinks])


  return (
    <>
      <h1 className="text-6xl font-extrabold text-amber-700">Recetas</h1>
      {hasDrinks ? (
        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 my-10 gap-10">
          {drinks.drinks.map((drink) => (
            <DrinkCard
              key={drink.idDrink}
              drink ={drink}
            />
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl text-gray-200">
          No hay resultado aún, utiliza el formulario para buscar recetas
        </p>
      )}
    </>
  )
}
