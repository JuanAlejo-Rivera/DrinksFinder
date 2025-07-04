import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipies } from "../services/RescipeService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from './../types/index';


export type RecipiesSliceType = {
    categories: Categories,
    drinks: Drinks,
    selectedRecipe: Recipe,
    modal: boolean,
    fetchCategories: () => Promise<void>
    searchRecipies: (searchFilters: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

export const createRecipiesSlice: StateCreator<RecipiesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,

    fetchCategories: async () => {
        const response = await getCategories();
        set({
            categories: response
        })
    },
    searchRecipies: async (filters) => {
        const response = await getRecipies(filters)
        // console.log(response)
        set({
            drinks: response
        })
    },
    selectRecipe: async (id) => {
        const response = await getRecipeById(id)
        // console.log(response)
        set({
            selectedRecipe: response,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }


})