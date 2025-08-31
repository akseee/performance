import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { CO2Data } from "../../utils/types.types";

const sliceName = "applicationSlice";
interface InitialState {
  settings: {
    data: Array<keyof CO2Data>;
    lastAdded: keyof CO2Data | null;
  };
  form: {
    query: string;
    year: number | null;
    sort: string;
  };
}

const initialState: InitialState = {
  settings: {
    data: [],
    lastAdded: null,
  },
  form: {
    query: "",
    year: null,
    sort: "name-asc",
  },
};

const applicationSlice = createSlice({
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

    changeYear: (state, action: PayloadAction<number>) => {
      state.form.year = action.payload;
    },

    changeQuery: (state, action: PayloadAction<string>) => {
      state.form.query = action.payload;
    },

    changeSort: (state, action: PayloadAction<string>) => {
      state.form.sort = action.payload;
    },
  },
});

export const getAllSettings = createSelector(
  [(state: { appSlice: InitialState }) => state.appSlice.settings.data],
  (data) => data
);

export const getLastAddedSettings = createSelector(
  [(state: { appSlice: InitialState }) => state.appSlice.settings.lastAdded],
  (lastAdded) => lastAdded
);

export const getSort = createSelector(
  [(state: { appSlice: InitialState }) => state.appSlice.form.sort],
  (sort) => sort
);

export const getQuery = createSelector(
  [(state: { appSlice: InitialState }) => state.appSlice.form.query],
  (query) => query
);

export const getYear = createSelector(
  [(state: { appSlice: InitialState }) => state.appSlice.form.year],
  (year) => year
);

export const appReducer = applicationSlice.reducer;
export const appActions = applicationSlice.actions;
