import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userProfile: false,
  contact: false,
  userInfo: false,
  showLoginReq: false,
  logout: false,
  searching: false,
  group: false,
  failure: {
    result: false,
    msg: null
  },
  success: {
    result: false,
    msg: null
  },
}

const clickReducer = createSlice({
  name: 'click',
  initialState,
  reducers: {
    'CLICK_YOUR_PROFILE': (state, action) => {
      state.userProfile = action.payload.userProfile
    },
    'CLICK_CONTACT': (state, action) => {
      state.contact = action.payload.contact
    },
    'CLICK_CONTACT_INFO': (state, action) => {
      state.userInfo = action.payload.userInfo
    },
    'CLICK_LOGIN_REQ': (state, action) => {
      state.showLoginReq = action.payload.show
    },
    'CLICK_LOGOUT': (state, action) => {
      state.logout = action.payload.logout
    },
    'CLICK_SEARCH': (state, action) => {
      state.searching = action.payload.search
    },
    'CLICK_CREATE_GROUP': (state, action) => {
      state.group = action.payload.group
    },
    'SHOW_FAILURE': (state, action) => {
      state.failure.result = action.payload.result
      state.failure.msg = action.payload.msg
    },
    'SHOW_SUCCESS': (state, action) => {
      state.success.result = action.payload.result
      state.success.msg = action.payload.msg
    }
  }
});

export const { SHOW_SUCCESS, SHOW_FAILURE, CLICK_CREATE_GROUP, CLICK_SEARCH, CLICK_LOGOUT, CLICK_LOGIN_REQ, CLICK_YOUR_PROFILE, CLICK_CONTACT, CLICK_CONTACT_INFO } = clickReducer.actions

export default clickReducer.reducer
export const userProfile = (state) => state.click.userProfile
export const contact = (state) => state.click.contact
export const userInfo = (state) => state.click.userInfo
export const showLoginReq = (state) => state.click.showLoginReq
export const logout = (state) => state.click.logout
export const searching = (state) => state.click.searching
export const group = (state) => state.click.group
export const failure = (state) => state.click.failure
export const success = (state) => state.click.success
