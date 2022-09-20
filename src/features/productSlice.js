import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    status: null
}

export const fetchProducts = createAsyncThunk('prodcuts/fetchProducts', async () => {
    const response = await axios.get('http://localhost:5000/products');
    return response?.data;
})

const productSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {},
    // extraReducers: {
    //     [fetchProducts.pending]: (state) => {
    //         state.status = 'pending';
    //     },
    //     [fetchProducts.fulfilled]: (state, { payload }) => {
    //         state.products = payload;
    //     },
    //     [fetchProducts.rejected]: (state) => {
    //         state.status = 'Request Failed';
    //     }
    // }
})

export default productSlice.reducer;
// export const {} = productSlice.actions;