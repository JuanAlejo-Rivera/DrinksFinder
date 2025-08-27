import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../types"

type DrinkCardProps = {
    drink: Drink
}

export default function DrinkCard({ drink }: DrinkCardProps) {
    const selectRecipe = useAppStore((state) => state.selectRecipe)

    return (
        <div className="border border-amber-500 shadow-lg bg-gray-800 rounded-2xl overflow-hidden">

            <div className="overflow-hidden">
                <img
                    src={drink.strDrinkThumb}
                    alt={`imagen de ${drink.strDrink}`}
                    className="hover:scale-125 transition-transform hover:rotate-1 w-full object-cover"
                    onClick={() => selectRecipe(drink.idDrink)}
                />
            </div>

            <div className="p-5">
                <h2 className="text-2xl truncate font-bold text-white">{drink.strDrink}</h2>
                <button
                    type="button"
                    className="bg-amber-700 hover:bg-amber-800 mt-5 w-full p-3 font-semibold text-black text-lg rounded-lg shadow-md transition-colors"
                    onClick={() => selectRecipe(drink.idDrink)}
                >
                    Ver Receta 🍸
                </button>
            </div>

        </div>
    )
}
