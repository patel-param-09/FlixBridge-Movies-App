import { configureStore } from "@reduxjs/toolkit";
import watchLaterSlice from "../features/watchLaterSlice";

const store = configureStore({
    reducer:{
        name:watchLaterSlice
    }
})

export default store