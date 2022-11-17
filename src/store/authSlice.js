import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(state.user))
    },
  },
})

export default authSlice.reducer
export const { setUser } = authSlice.actions
