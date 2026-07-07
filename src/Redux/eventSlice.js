import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events: JSON.parse(localStorage.getItem("events")) || [],
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
}
const eventSlice = createSlice({
    name: "eventSlice",
    initialState,
    reducers: {
        addEvent: (state, action) => {
            state.events.push(action.payload);
            localStorage.setItem("events", JSON.stringify(state.events));
        },

        editEvent: (state, action) => {
            const eventIndex = state.events.findIndex((event) => event.id === action.payload.id);
            if (eventIndex !== -1) {
                state.events[eventIndex] = action.payload;
                localStorage.setItem("events", JSON.stringify(state.events));
            }
            const cartItemIndex = state.cartItems.findIndex((event) => event.id === action.payload.id);
            if (cartItemIndex !== -1) {
                const cartItemQuantity = state.cartItems[cartItemIndex].quantity;
                state.cartItems[cartItemIndex] = { ...action.payload, quantity: cartItemQuantity };
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            }
        },

        deleteEvent: (state, action) => {
            state.events = state.events.filter(event => event.id !== action.payload);
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            localStorage.setItem("events", JSON.stringify(state.events));
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        addCartItem: (state, action) => {
            const cartItemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (cartItemIndex === -1) {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            } else {
                state.cartItems[cartItemIndex].quantity++;
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        cartItemQuantityIncrement: (state, action) => {
            const cartItemIndex = state.cartItems.findIndex((item) => item.id === action.payload);
            if (cartItemIndex !== -1) {
                state.cartItems[cartItemIndex].quantity++;
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

            }
        },
        cartItemQuantityDecrement: (state, action) => {
            const cartItemIndex = state.cartItems.findIndex((item) => item.id === action.payload);
            if (cartItemIndex !== -1) {
                state.cartItems[cartItemIndex].quantity--;
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

            }
        },
        removeCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );

            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems)
            );
        },

    },
});


export const {
    addEvent,
    editEvent,
    deleteEvent,
    addCartItem,
    cartItemQuantityIncrement,
    cartItemQuantityDecrement,
    removeCartItem
} = eventSlice.actions;
export default eventSlice.reducer;