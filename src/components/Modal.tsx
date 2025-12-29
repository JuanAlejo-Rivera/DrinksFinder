import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, JSX } from 'react'
import { useAppStore } from '../stores/useAppStore'
import { Recipe } from '../types'

export default function Modal() {

  const modal = useAppStore((state) => state.modal)
  const closeModal = useAppStore((state) => state.closeModal)
  const selectedRecipe = useAppStore((state) => state.selectedRecipe)
  const handleClickFavorite = useAppStore((state) => state.handleClickFavorite)
  const favoriteExists = useAppStore((state) => state.favoriteExists)

  const renderIngredients = () => {
    const ingredients: JSX.Element[] = []
    for (let i = 1; i <= 15; i++) {
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe]
      const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe]

      if (ingredient && measure) {
        ingredients.push(
          <li key={i} className="mb-2 text-gray-200 text-base leading-relaxed">
            <span className="font-semibold text-amber-400">{ingredient}</span> <span className="text-gray-400">—</span> {measure}
          </li>
        )
      }
    }
    return <ul className="space-y-1 pl-1">{ingredients}</ul>
  }

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        
        {/* Fondo oscuro */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </TransitionChild>

        {/* Contenido */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl px-8 py-8 text-left shadow-2xl border border-amber-500/20 transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                
                {/* Título */}
                <DialogTitle as="h3" className="text-white text-3xl font-extrabold mb-6 text-center">
                  {selectedRecipe.strDrink}
                </DialogTitle>

                {/* Imagen */}
                <img
                  src={selectedRecipe.strDrinkThumb}
                  alt={`Imagen de ${selectedRecipe.strDrink}`}
                  className="mx-auto w-full max-w-md rounded-2xl shadow-2xl shadow-amber-500/10 border border-amber-500/10"
                />

                {/* Ingredientes */}
                <DialogTitle as="h3" className="text-amber-400 text-xl font-bold mt-8 mb-4">
                  Ingredientes y Cantidades
                </DialogTitle>
                {renderIngredients()}

                {/* Instrucciones ES */}
                {selectedRecipe.strInstructionsES && (
                  <>
                    <DialogTitle as="h3" className="text-amber-400 text-xl font-bold mt-8 mb-4">
                      Instrucciones
                    </DialogTitle>
                    <p className="text-base text-gray-200 leading-relaxed">
                      {selectedRecipe.strInstructionsES}
                    </p>
                  </>
                )}

                {/* Instrucciones EN */}
                {selectedRecipe.strInstructions && (
                  <>
                    <DialogTitle as="h3" className="text-amber-400 text-xl font-bold mt-8 mb-4">
                      Instructions
                    </DialogTitle>
                    <p className="text-base text-gray-200 leading-relaxed">
                      {selectedRecipe.strInstructions}
                    </p>
                  </>
                )}

                {/* Botones */}
                <div className="mt-10 flex flex-col sm:flex-row justify-between gap-4">
                  <button
                    type="button"
                    className="w-full rounded-xl bg-gray-700/80 hover:bg-gray-600/80 p-3.5 font-bold uppercase text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-out border border-gray-600/50"
                    onClick={closeModal}
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    className={`w-full rounded-xl p-3.5 font-bold uppercase text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-out
                      ${favoriteExists(selectedRecipe.idDrink) 
                        ? 'bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 border border-red-600/50' 
                        : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 border border-amber-500/50'
                      }`}
                    onClick={() => {
                      handleClickFavorite(selectedRecipe)
                      closeModal()
                    }}
                  >
                    {favoriteExists(selectedRecipe.idDrink) ? 'Eliminar Favorito' : 'Agregar a Favoritos'}
                  </button>
                </div>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
