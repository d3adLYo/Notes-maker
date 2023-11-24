import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const notesSlice = createSlice({
    name:'notes',
    initialState,
    reducers: {
        setNotes: (state, action) => {
            return state = action.payload;
        },
        deleteAllNotes: (state) => {
            return state = [];
        }
    },
});

export const {setNotes, deleteAllNotes} = notesSlice.actions;
export default notesSlice.reducer;