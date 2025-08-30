import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CO2Data } from "../../utils/types.types";

const sliceName = "appSlice";
interface InitialState {
  settings: {
    data: Array<keyof CO2Data>;
    lastAdded: keyof CO2Data | null;
  };
}

const initialState: InitialState = {
  settings: {
    data: [],
    lastAdded: null,
  },
};

const appSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addSetting: (state, action: PayloadAction<keyof CO2Data>) => {
      state.settings.data.push(action.payload);
      state.settings.lastAdded = action.payload;
    },
    removeSetting: (state, action: PayloadAction<keyof CO2Data>) => {
      state.settings.data = state.settings.data.filter(
        (item) => item !== action.payload
      );
    },
    clearSettings: (state) => {
      state.settings.data = [];
      state.settings.lastAdded = null;
    },
  },
});

export const getAllSettings = (state: { appSlice: InitialState }) =>
  state.appSlice.settings.data;

export const getLastAddedSettings = (state: { appSlice: InitialState }) =>
  state.appSlice.settings.lastAdded;

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;
