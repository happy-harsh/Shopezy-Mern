import {configureStore, createSlice} from "@reduxjs/toolkit"
import authSliceReducer from "./slices/authSlice"
import productSliceReducer from "./slices/productSlice"
import adminAuthSlice from "./slices/adminAuthSlice"
import cartSliceReducer from "./slices/cartSlice"

// authCheck is the name of Slice authSlice
// authSlice is the reducer from the authSlice
// authSlice contains 

export const store = configureStore({
    reducer:{
        authCheck:authSliceReducer,
        products: productSliceReducer,
        adminAuthCheck: adminAuthSlice,
        cart:cartSliceReducer
    }
})