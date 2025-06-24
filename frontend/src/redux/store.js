import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import trendsReducer from "./slices/trendsSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootreducer = combineReducers({
  trends: trendsReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootreducer);

export const store = configureStore({
  reducer: persistedReducer,
});
