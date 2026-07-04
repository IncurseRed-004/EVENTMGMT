import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import eventSlice from "./eventSlice"

const store = configureStore({
    reducer:{
        userState:userSlice,
        eventState: eventSlice
    }
});
export default store;