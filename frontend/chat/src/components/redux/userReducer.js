import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username:null,
  contacts:[{}],
  chatUser:{},
  user:{}
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    'ADD_USERNAME':(state,action)=>{
      state.username = action.payload.username
    },
    'SEARCH_CONTACTS':(state,action)=>{
      state.contacts = action.payload.contacts
    },
    'CHAT_USER':(state,action)=>{
      state.chatUser = action.payload.chatUser
    },
    'SEARCH_USER_REMOVE':(state,action)=>{
     state.contacts=state.contacts.filter((item)=>item.username != action.payload.username)
    },
    'CURRENT_USER':(state,action)=>{
      state.user = action.payload.user
    }
  }
});

export const {CURRENT_USER,SEARCH_USER_REMOVE,CHAT_USER,SEARCH_CONTACTS,ADD_USERNAME} = userReducer.actions

export default userReducer.reducer
export const username = (state)=>state.user.username
export const contacts = (state)=>state.user.contacts
export const chatUser = (state)=>state.user.chatUser
export const user = (state)=>state.user.user