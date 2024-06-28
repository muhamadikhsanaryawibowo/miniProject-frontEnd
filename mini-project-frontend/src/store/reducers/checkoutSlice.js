import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    dataCheckout:[]
}

const checkoutSlice = createSlice ({
    name: 'checkout',
    initialState: {...initialState},
    reducers: {
        addCheckout: (state, action) => {
            const productExist = state.dataCheckout.find(data => data.productId === action.payload.productId)

            console.log(productExist)

            if(productExist){
                const quantity = parseInt(action.payload.quantity)
                productExist.quantity += quantity
            }else{
                state.dataCheckout.push(action.payload)
            }
        },
        plusQty: (state, action) => {
            const productExist = state.dataCheckout.find(data => data.productId === action.payload)
            productExist.quantity += 1
            console.log(action)
        },
        minusQty: (state, action) => {
            const productExist = state.dataCheckout.find(data => data.productId === action.payload)
            if(productExist.quantity > 1){
                productExist.quantity -= 1
            }else{
                productExist.quantity = 1
            }
        },
        removeCheckout: (state, action) => {
            const test = state.dataCheckout.filter(data => data.productId !== action.payload)
            state.dataCheckout = test;
        },
        resetCheckout: (state, action) => {
            state.dataCheckout = []
        }
    }
})

export const {addCheckout, removeCheckout, plusQty, minusQty, resetCheckout} = checkoutSlice.actions;
export default checkoutSlice.reducer;