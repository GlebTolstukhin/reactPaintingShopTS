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
    paintingList: TPainting[],
    isLoading: boolean,
    error: string | null
}

export const fetchPaintings = createAsyncThunk<TPainting[], void, {rejectValue: string}>(
    "paintings/fetchPaintings",
    async function (_, {rejectWithValue}) {
        
        const response = await fetch("http://localhost:3001/paintings")
        if (!response.ok) {
            return rejectWithValue("Bad response")
        }   
        const data = await response.json()
        return data
    }    
)



const initialState: IPaintingState = {
    paintingList: [],
    isLoading: false,
    error: null,
}

const paintingSlice = createSlice({
    name: "paintings",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPaintings.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        .addCase(fetchPaintings.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = null
            state.paintingList = action.payload
        })

    },
})

export default paintingSlice.reducer