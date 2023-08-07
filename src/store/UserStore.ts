import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../api/auth";

export type UserType = {
  name: string
  email: string
}


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      name: '',
      email: '',
      tel: '',
      role: '',
      id: -1
    },
    isLogin: false
  },
  reducers: {
    loginUser(state, action) {
      const { payload } = action
      state.user.name = payload.name
      state.user.email = payload.email
      state.user.tel = payload.tel
      state.user.role = payload.role
      state.user.id = payload.id
      state.isLogin = true
    },
    logoutUser(state) {
      state.user = {
        name: '',
        email: '',
        tel: '',
        role: '',
        id: -1,
      }
      state.isLogin = false
    },
    getUserState(state) {
      return state
    },
    setUserName(state, action) {
      const {payload} = action
      state.user.name = payload.name
    },
    setUserEmail(state, action){
      const {payload} = action
      state.user.email = payload.email
    }
  }
})

const { actions, reducer } = userSlice

export const { loginUser, logoutUser, getUserState, setUserName, setUserEmail } = actions

export default reducer