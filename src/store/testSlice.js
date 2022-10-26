import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const testSlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export default testSlice.reducer

export const { setValue } = testSlice.actions
