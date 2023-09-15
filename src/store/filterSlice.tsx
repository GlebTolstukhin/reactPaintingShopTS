import {createSlice, PayloadAction} from "@reduxjs/toolkit"



const filterSlice = createSlice({
    name: "filter",
    initialState: {
        filter: "",
    },
    reducers: {
        addFilter(state, action: PayloadAction<string>) {
            state.filter = action.payload
        }
    }
  
})
export const {addFilter} = filterSlice.actions

export default filterSlice.reducer