import { useEffect, useMemo, useState } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"
import { ArrowBigUp } from "lucide-react"


export default function indexPage() {

  const drinks = useAppStore((state) => state.drinks)
  const hasDrinks = useMemo(() => drinks.drinks.length, [drinks])

  const [showArrow, setShowArrow] = useState(false)

  useEffect(() => {
    const handleScroll = () => window.scrollY > 300 ? setShowArrow(true) : setShowArrow(false)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-2">Recetas</h1>
      {hasDrinks ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 my-10 gap-6 md:gap-8">
          {drinks.drinks.map((drink) => (
            <DrinkCard
              key={drink.idDrink}
              drink={drink}
            />
          ))}
        </div>
      ) : (
        <p className="my-16 text-center text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          No hay resultado aún, utiliza el formulario para buscar recetas
        </p>
      )}

      {showArrow && hasDrinks && (
        <button
          onClick={handleScrollTop}
          className="arrow"
        >
          <ArrowBigUp />
        </button>
      )}


    </>
  )
}
