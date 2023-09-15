import { configureStore } from "@reduxjs/toolkit";
import paintingSlice from "./paintingSlice"
import toBasketSlice from "./toBasketSlice";
import filterSlice from "./filterSlice";
import addPaintingSlice from "./addPaintingSlice";



const store = configureStore({
    reducer: {
        paintings: paintingSlice,
        toBasket: toBasketSlice,
        filter: filterSlice,
        addPainting: addPaintingSlice,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch