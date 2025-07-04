import { createFavoriteSlice, FavoriteSliceType } from './favoriteSlice';
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipiesSlice, RecipiesSliceType } from "./recipeSlice";
import { createNotificationSlice, NotificationSliceType } from './notificationSlice';


// a contiene set, get, y api
export const useAppStore = create<RecipiesSliceType & FavoriteSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipiesSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a),

})))







// ### se puede hacer con persist que es una funcion de zustand
// con este metodo se guarda en localStorage, pero te evitas guardarlo manualmente, no necesitarias, loadFromStorage ni el useEffect en Layout.tsx
//gracias al partialize podemos elegir que parte del estado se guarda en localStorage, en este caso solo los favoritos, no guarda ambos slices, ya que no es necesario

// import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";

// import { createFavoriteSlice, FavoriteSliceType } from './favoriteSlice';
// import { createRecipiesSlice, RecipiesSliceType } from './recipeSlice';

// type AppState = RecipiesSliceType & FavoriteSliceType;

// export const useAppStore = create<AppState>()(
//   devtools(
//     persist(
//       (...a) => ({
//         ...createRecipiesSlice(...a),
//         ...createFavoriteSlice(...a),
//       }),
//       {
//         name: 'app-storage', // clave en localStorage
//         partialize: (state) => ({
//           favorites: state.favorites // Solo guarda esta parte
//         })
//       }
//     ),
//     { name: 'AppStore' } // Nombre para las devtools
//   )
// );
