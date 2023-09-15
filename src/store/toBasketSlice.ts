import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

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
interface IPaintingState {
    isPatching: boolean,
}

type TPayload = {
    id: string
    status: string
}

export const toBasket = createAsyncThunk<TPainting[], TPayload, {rejectValue: string}>(
    "paintings/fetchPaintings",
    async function (payload, {rejectWithValue}) {

        const response = await fetch(`http://localhost:3001/paintings/${payload.id}`, {
            method: "PATCH",
            body: JSON.stringify({status: payload.status}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
        if(!response.ok) {
            return rejectWithValue("Bad response")
        }
        return rejectWithValue("Done")
    }    
)

const initialState: IPaintingState = {
    isPatching: false,
}

const toBasketSlice = createSlice({
    name: "paintings",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(toBasket.pending, (state) => {
            state.isPatching = true
        })
        .addCase(toBasket.fulfilled, (state) => {
            state.isPatching = false
        })
        .addCase(toBasket.rejected, (state) => {
            state.isPatching = false
        })
    },
})

export default toBasketSlice.reducer