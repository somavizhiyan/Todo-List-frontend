import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducers/dataReducer";

export const store = configureStore({
  reducer: {
    TodoDatas: todoReducer,
  },
});
