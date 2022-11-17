import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export default authSlice.reducer
export const { setUser } = authSlice.actions
