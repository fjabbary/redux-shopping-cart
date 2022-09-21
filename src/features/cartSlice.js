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
        removeFromCart: (state, { payload }) => {
            console.log(payload);
            state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== payload.id);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

            toast.error(`${payload.productName} removed from cart`, {
                position: "bottom-left"
            })
        },
        changeQuantity: (state, { payload }) => {
            const newCartItem = state.cartItems.map(cartItem => {
                if (cartItem.id === payload.id && payload.type === "inc") {
                    return { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 }

                } else if (cartItem.id === payload.id && payload.type === "dec" && cartItem.cartQuantity > 1) {
                    return { ...cartItem, cartQuantity: cartItem.cartQuantity - 1 }
                }
                return cartItem
            })
            state.cartItems = newCartItem;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify([]))
            toast.error('Cart cleared', {
                position: "bottom-left"
            })
        },
        getTotal: (state, action) => {
            const { totalQuantity, totalCost } = state.cartItems.reduce((cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;
                cartTotal.totalCost += itemTotal;
                cartTotal.totalQuantity += cartQuantity

                return cartTotal;
            },
                {
                    totalQuantity: 0,
                    totalCost: 0
                })

            state.cartTotalQuantity = totalQuantity
            state.cartTotalAmount = totalCost
        }
    }
})

export default cartSlice.reducer;
export const { addToCart, removeFromCart, changeQuantity, clearCart, getTotal } = cartSlice.actions;