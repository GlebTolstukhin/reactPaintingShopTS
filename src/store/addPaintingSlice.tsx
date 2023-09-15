import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type TPainting = {
    type: string,
    paintingName: string,
    authorFullName: string,
    status: string,
    price: {
      value: number,
      currencyCode: string
    },
    discount: number | null,
    id: string 
}
type TPayload = {
    name: string,
    author: string,
    price: string,
}
interface IAddingState {
    isAdding: boolean
}


export const addPainting = createAsyncThunk<TPainting[], TPayload, {rejectValue: string}>(
    "paintings/fetchPaintings",
    async function (payload, {rejectWithValue}) {
        
        const response = await fetch("http://localhost:3001/paintings", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        body: JSON.stringify({
            type: "painting",
            paintingName: payload.name,
            authorFullName: payload.author,
            status: "available",
            price: {
              value: +payload.price,
              currencyCode: "USD"
                },
            discount: null,
            }
            )
        })
        if(!response.ok) {
            return rejectWithValue("Bad response")
        }
        return rejectWithValue("Done")

    }    
)
const initialState: IAddingState = {
    isAdding: false,
}

const addPaintingSlice = createSlice({
    name: "paintings",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(addPainting.pending, (state) => {
            state.isAdding = true
        })
        .addCase(addPainting.fulfilled, (state) => {
            state.isAdding = false
        })
        .addCase(addPainting.rejected, (state) => {
            state.isAdding = false
        })
    },
})

export default addPaintingSlice.reducer