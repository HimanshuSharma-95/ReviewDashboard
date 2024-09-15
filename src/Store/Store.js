import {configureStore } from "@reduxjs/toolkit"
import AuthSlice from "./AuthSlice"
import ReviewSlice from "./ReviewSlice"


const store = configureStore({

    reducer:{
        auth:AuthSlice,
        rev:ReviewSlice
    }

})

export default store