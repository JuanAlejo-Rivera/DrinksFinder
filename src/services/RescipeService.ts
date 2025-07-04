import axios from "axios";
import { CategoriesAPIresponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../schemas/recipes-schema";
import { Drink, SearchFilter } from "../types";

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

export async function getCategories() {
    const url = `${API_BASE_URL}list.php?c=list`;
    const { data } = await axios(url);
    const result = CategoriesAPIresponseSchema.safeParse(data);
    if (result.success) {
        return result.data
    }
}

export async function getRecipies(filter: SearchFilter) {
    const url = `${API_BASE_URL}filter.php?c=${filter.category}&i=${filter.ingredient}`
    const { data } = await axios(url)
    const result = DrinksAPIResponse.safeParse(data)
    if (result.success) {
        return result.data
    }
}


export async function getRecipeById(id: Drink['idDrink']) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const { data } = await axios(url)
    // console.log(data.drinks[0])
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    if (result.success) {
        return result.data
    }
}

