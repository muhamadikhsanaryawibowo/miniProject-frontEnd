import { combineReducers, configureStore } from "@reduxjs/toolkit";
import checkoutSlice from "./reducers/checkoutSlice"

const rootReducer = combineReducers ({
    checkout: checkoutSlice,
})

const store = configureStore({
    reducer: rootReducer
});

export default store