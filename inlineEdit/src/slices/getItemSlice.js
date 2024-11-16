import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    loading:false,
    error: {}

}

const getItemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    getItemRequest:(state,action)=>{
        state.loading = true
    },
    getItemSuccess:(state,action)=>{
        state.loading = false
        state.items = action.payload
    },
    getItemFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
    }

  }
});

export const {getItemRequest,getItemSuccess,getItemFailure} = getItemSlice.actions

export default getItemSlice.reducer