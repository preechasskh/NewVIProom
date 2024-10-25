// specialRoomsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SpecialRoomsState {
  rooms: any[];
}

const initialState: SpecialRoomsState = {
  rooms: [],
};

const specialRoomsSlice = createSlice({
  name: "specialRooms",
  initialState,
  reducers: {
    setSpecialRooms: (state, action: PayloadAction<any[]>) => {
      state.rooms = action.payload;
    },
  },
});

export const { setSpecialRooms } = specialRoomsSlice.actions;
export default specialRoomsSlice.reducer;
