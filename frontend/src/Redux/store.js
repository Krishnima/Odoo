import { configureStore } from '@reduxjs/toolkit'

const dummyReducer = (state = {}, action) => {
  return state
}

export const store = configureStore({
  reducer: {
    dummyReducer: dummyReducer
  },
  devTools:true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export default store;