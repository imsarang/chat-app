import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userProfile : false,
}

const clickReducer = createSlice({
  name: 'click',
  initialState,
  reducers: {
    'CLICK_YOUR_PROFILE':(state,action)=>{
        state.userProfile = action.payload.userProfile
    }
  }
});

export const {CLICK_YOUR_PROFILE} = clickReducer.actions

export default clickReducer.reducer