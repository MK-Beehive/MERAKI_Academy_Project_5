import { createSlice } from "@reduxjs/toolkit";
const offerSlice = createSlice({
  name: "offer",
  initialState: { offer: [] },
  reducers: {
    setOffer: (state, action) => {
      console.log(action.payload);
      state.offer = action.payload;
    },
    setOfferByUser: (state, action) => {
        const userId = action.payload.userId;
        const offers = state.offer.filter((offer) => offer.user_id === userId);
        state.offer = action.payload;
        console.log("offer: ",action.payload);
    
      }
  }
});

export const { setOffer,setOfferByUser } = offerSlice.actions;

export default offerSlice.reducer;
