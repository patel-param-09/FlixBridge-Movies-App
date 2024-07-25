import { createSlice } from "@reduxjs/toolkit";


const WatchLater = createSlice({
    name: "watchlater",
    initialState:[],
    reducers:{
        addWatchLater: (state, action)=>{
            state.push(action.payload)
        },
        removeWatchLater: (state, action)=>{
            // console.log(action.payload);
            state.splice(action.payload,1)
        }
    }
})

export const {addWatchLater, removeWatchLater} = WatchLater.actions
export default WatchLater.reducer