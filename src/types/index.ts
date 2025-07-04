import { DrinkAPIResponse, DrinksAPIResponse, RecipeAPIResponseSchema } from './../schemas/recipes-schema';
import {z} from 'zod'
import { CategoriesAPIresponseSchema, SearchFilterSchema } from '../schemas/recipes-schema'


export type Categories = z.infer<typeof CategoriesAPIresponseSchema>
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type Drinks = z.infer<typeof DrinksAPIResponse>
export type Drink = z.infer<typeof DrinkAPIResponse>
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>