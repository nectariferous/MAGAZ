import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	productsList: []
}

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		initProductsList: (state, { payload }) => {
			state.productsList = payload
		}
	},
});

export const {
	initProductsList
} = productsSlice.actions;

export default productsSlice.reducer;
