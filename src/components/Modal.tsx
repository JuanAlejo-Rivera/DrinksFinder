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
          <li key={i} className="mb-1 text-white">
            <span className="font-semibold text-white">{ingredient}</span> - {measure}
          </li>
        )
      }
    }
    return <ul className="list-disc pl-6">{ingredients}</ul>
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
          <div className="fixed inset-0 bg-black/60" />
        </TransitionChild>

        {/* Contenido */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-2xl bg-gray-700 px-6 py-6 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                
                {/* Título */}
                <DialogTitle as="h3" className="text-white text-3xl font-extrabold my-4 text-center">
                  {selectedRecipe.strDrink}
                </DialogTitle>

                {/* Imagen */}
                <img
                  src={selectedRecipe.strDrinkThumb}
                  alt={`Imagen de ${selectedRecipe.strDrink}`}
                  className="mx-auto w-80 rounded-lg shadow-lg"
                />

                {/* Ingredientes */}
                <DialogTitle as="h3" className="text-amber-700 text-2xl font-bold mt-6 mb-3">
                  Ingredientes y Cantidades
                </DialogTitle>
                {renderIngredients()}

                {/* Instrucciones ES */}
                {selectedRecipe.strInstructionsES && (
                  <>
                    <DialogTitle as="h3" className="text-amber-700 text-2xl font-bold mt-6 mb-3">
                      Instrucciones
                    </DialogTitle>
                    <p className="text-lg text-white leading-relaxed">
                      {selectedRecipe.strInstructionsES}
                    </p>
                  </>
                )}

                {/* Instrucciones EN */}
                {selectedRecipe.strInstructions && (
                  <>
                    <DialogTitle as="h3" className="text-amber-700 text-2xl font-bold mt-6 mb-3">
                      Instructions
                    </DialogTitle>
                    <p className="text-lg text-white leading-relaxed">
                      {selectedRecipe.strInstructions}
                    </p>
                  </>
                )}

                {/* Botones */}
                <div className="mt-8 flex justify-between gap-4">
                  <button
                    type="button"
                    className="w-full rounded-lg bg-gray-800 p-3 font-bold uppercase text-white shadow hover:bg-gray-900 transition"
                    onClick={closeModal}
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    className={`w-full rounded-lg p-3 font-bold uppercase text-white shadow transition 
                      ${favoriteExists(selectedRecipe.idDrink) 
                        ? 'bg-red-800 hover:bg-red-900' 
                        : 'bg-amber-700 hover:bg-amber-800'
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
