import { configureStore } from "@reduxjs/toolkit";
import ResumeSlice from "./ResumeSlice";

export const Store = configureStore({
  reducer: {
    resumes: ResumeSlice,
  },
});
