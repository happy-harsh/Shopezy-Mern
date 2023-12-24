import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
// fetch Product is an Action
export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
    const response = await axios.get('http://localhost:3001/api/allProducts',{withCredentials:true})

    return response.data;
})

export const productSlice = createSlice({
name:"products",
initialState:{
    data:null,
    loading:false,
    error:null
},
extraReducers:(builder)=>{
    builder.addCase(fetchProducts.pending, (state,action)=>{
        state.loading = true;
        state.error = null;
    }),
    builder.addCase(fetchProducts.fulfilled, (state,action)=>{
        state.loading = false;
        state.data = action.payload;
    }),
    builder.addCase(fetchProducts.rejected, (state,action)=>{
        state.loading = false;
        state.error = true;
        state.data = null;
    })
}
});


export default productSlice.reducer;

// Another way to write the extraReducer
// extraReducers:(builder)=>{
//     builder.addCase(fetchProducts.pending, (state,action)=>{
//         state.loading = true;
//         state.error = null;
//     }),
//     builder.addCase(fetchProducts.fulfilled, (state,action)=>{
//         state.loading = false;
//         state.data = action.payload;
//     }),
//     builder.addCase(fetchProducts.rejected, (state,action)=>{
//         state.loading = false;
//         state.error = true;
//         state.data = null;
//     })
// }