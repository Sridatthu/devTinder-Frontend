import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      if(newArray.length===0){
        return null;
      }
      return newArray;
    },
    clearRequest:(state,action)=>{
      return null;
    }
  },
});

export const { addRequests, removeRequest,clearRequest } = requestSlice.actions;
export default requestSlice.reducer;
