import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import authSlice from './authSlice'
import testSlice from './testSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    testSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})

export default store

/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 */

/**  @type {import('react-redux').TypedUseSelectorHook<RootState>} */
export const useAppSelector = useSelector

export const useAppDispatch = useDispatch
