import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	product: {},
	deliveryModalOpened: false,
};

export const appSlice = createSlice({
	name: 'appState',
	initialState,
	reducers: {
		setProduct: (state, {payload}) => payload,
		deliveryInfoModalController: (state, { payload }) => {
			state.deliveryModalOpened = payload
		},
	},
});

export const { 
	setProduct,
	deliveryInfoModalController
} = appSlice.actions;

export default appSlice.reducer;
