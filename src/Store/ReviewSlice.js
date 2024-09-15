import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    reviews : null
}


const ReviewSlice = createSlice({

    name:"rev",
    initialState : initialState,
    reducers : {
        savereviews:(state,action)=>{

            state.reviews = action.payload

        },
        deletereviews:(state,action)=>{
            state.reviews = null
        }

    }

})


export const {savereviews,deletereviews} = ReviewSlice.actions

export default ReviewSlice.reducer