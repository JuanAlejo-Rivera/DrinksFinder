import { StateCreator } from 'zustand'
import { Recipe } from '../types'
import { createNotificationSlice, NotificationSliceType } from './notificationSlice'

export type FavoriteSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void


}

export const createFavoriteSlice: StateCreator<FavoriteSliceType & NotificationSliceType,[],[], FavoriteSliceType> = (set, get, api) => ({
    favorites: [],


    handleClickFavorite: (recipe) => {
        if (get().favoriteExists(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se eliminó de favoritos',
                error: false
            })
        } else {
            set((state) => ({
                favorites: [...state.favorites, recipe]
                // favorites: [...get().favorites, recipe] // otra manera
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se agrego a favoritos',
                error: false
            })
        }
        //con get recuperamos el estado actual de favorites
        // y con set lo actualizamos en localStorage
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },

    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    //si se trabaja con persist esta funcion no es necesaria
    // ya que se guarda automaticamente en localStorage
    loadFromStorage: () => {
        const storeFavorites = localStorage.getItem('favorites')
        if (storeFavorites) {
            set({
                favorites: JSON.parse(storeFavorites)
            })
        }
    }
})

