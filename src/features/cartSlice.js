import { createSlice } from "@reduxjs/toolkit"
import { toast } from 'react-toastify';

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, { payload }) => {
            const itemIndex = state.cartItems.findIndex(item => item.id === payload.id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info(`Increased ${payload.name} quantity`, {
                    position: "bottom-left"
                })
            } else {
                const newProduct = { ...payload, cartQuantity: 1 }
                state.cartItems.push(newProduct)
                toast.success(`Added ${newProduct.name} to cart`, {
                    position: "bottom-left"
                })
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        updateCartQuantity: (state, { payload }) => {
            state.cartTotalQuantity = payload;
        }
    }
})

export default cartSlice.reducer;
export const { addToCart, updateCartQuantity } = cartSlice.actions;