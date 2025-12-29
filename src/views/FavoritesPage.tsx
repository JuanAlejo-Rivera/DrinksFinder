import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

export default function FavoritesPage() {

    const favorites = useAppStore((state) => state.favorites)
    const hasFavorites = useMemo(() => favorites.length, [favorites])

    return (
        <>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-2 animate-fadeIn">Favoritos</h1>

            {hasFavorites ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 my-10 gap-6 md:gap-8">
                {favorites.map(drink => (
                    <DrinkCard
                        key={drink.idDrink}
                        drink={drink}
                    />
                ))}
            </div>) : (
                <p className="my-16 text-center text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-slideUp">Los favoritos se mostrarán aquí</p>
            )}
        </>
    )
}
