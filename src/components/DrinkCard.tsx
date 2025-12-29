import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../types"

type DrinkCardProps = {
    drink: Drink
}

export default function DrinkCard({ drink }: DrinkCardProps) {
    const selectRecipe = useAppStore((state) => state.selectRecipe)

    return (
        <div className="group relative border border-amber-500/30 shadow-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/60 hover:-translate-y-1 transition-all duration-300 ease-out">

            <div className="overflow-hidden relative">
                <img
                    src={drink.strDrinkThumb}
                    alt={`imagen de ${drink.strDrink}`}
                    className="hover:scale-110 transition-transform duration-500 ease-out w-full object-cover cursor-pointer aspect-square"
                    onClick={() => selectRecipe(drink.idDrink)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-6">
                <h2 className="text-2xl truncate font-bold text-white mb-4 group-hover:text-amber-400 transition-colors duration-300">{drink.strDrink}</h2>
                <button
                    type="button"
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 mt-2 w-full py-3 px-4 font-semibold text-white text-base rounded-xl shadow-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 ease-out transform hover:-translate-y-0.5"
                    onClick={() => selectRecipe(drink.idDrink)}
                >
                    Ver Receta
                </button>
            </div>

        </div>
    )
}
