import { createSlice } from '@reduxjs/toolkit';
import { api_server } from '../../main';
import axios from 'axios';

const initialState = {
	_id: '661c17375ec5674ee7cdb1df',
	id: 628122813,
	first_name: '',
	last_name: '',
	username: '',
	language_code: 'en',
	is_premium: true,
	allows_write_to_pm: true,
	appLanguage: 'en',
	likedProducts: [],
	status: '',
	orders: [],
	wallets: [],
	isInitial: true,
	deliveryInfo: {
		name: '',
		country: '',
		state: '',
		city: '',
		street: '',
		zipcode: '',
		saveData: true,
		phoneNumber: 0,
	},
	cart: [],
	pickedAddress: null,
	needDelivery: false,
	cartCost: 0,
	cartAmount: 0,
	savedAddresses: [
		{
			id: 1,
			name: 'Home address',
			country: 'USA',
			state: 'Florida',
			city: 'Miami',
			street: 'Lenin',
			zip: 'miami 1698',
		},
		{
			id: 2,
			name: 'Mother',
			country: 'USA',
			state: 'Florida',
			city: 'Miami',
			street: 'Lenin',
			zip: 'miami 1698',
		},
		{
			id: 3,
			name: 'Garage address',
			country: 'USA',
			state: 'Florida',
			city: 'Miami',
			street: 'Lenin',
			zip: 'miami 1698',
		},
	],
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// deliveryInfoChange: (state, { payload }) => {

		// },
		pushWallet: (state, { payload }) => {
			state.wallets.push(payload);
			axios.post(`${api_server}/api/swrn`, { wallets: state.wallets, id: state.id });
		},
		changeInputValue: (state, { payload }) => {
			state.deliveryInfo[payload.input] = payload.value;
		},

		changeAppLanguage: (state, { payload }) => {
			state.appLanguage = payload;
		},
		setUser: (state, { payload }) => {
			return payload;
		},
		likeToggler: (state, { payload }) => {
			if (state.likedProducts.includes(payload)) {
				state.likedProducts = state.likedProducts.filter((a) => a !== payload);
				axios.get(`${api_server}/api/like?product_id=${payload}&user_id=${state.id}&command=${false}`);
			} else {
				state.likedProducts.push(payload);
				axios.get(`${api_server}/api/like?product_id=${payload}&user_id=${state.id}&command=${true}`);
			}
		},

		saveDataChanger: (state) => {
			axios.get(`${api_server}/api/save-data-change?id=${state.id}&flag=${!state.deliveryInfo.saveData}`);
			state.deliveryInfo.saveData = !state.deliveryInfo.saveData;
		},

		saveNewAddress: (state, { payload }) => {
			state.savedAddresses.push(payload);
			axios.post(`${api_server}/api/update-saved-addresses`, { id: state.id, savedAddresses: state.savedAddresses });
		},

		saveNewRecipient: (state, { payload }) => {
			state.savedRecipients.push(payload);
			axios.post(`${api_server}/api/update-saved-recipients`, { id: state.id, savedRecipients: state.savedRecipients });
		},

		changeMyAddress: (state, { payload }) => {
			state.savedAddresses = state.savedAddresses.filter((a) => a.id !== payload.id);
			state.savedAddresses.push(payload);
			state.pickedAddress = payload;
			axios.post(`${api_server}/api/update-saved-addresses`, { id: state.id, savedAddresses: state.savedAddresses });
			axios.post(`${api_server}/api/set-picked-address`, { id: state.id, pickedAddress: state.pickedAddress });
		},
		changeMyRecipient: (state, { payload }) => {
			state.savedRecipients = state.savedRecipients.filter((a) => a.id !== payload.id);
			state.savedRecipients.push(payload);

			state.pickedRecipient = payload;
			axios.post(`${api_server}/api/update-saved-recipients`, { id: state.id, savedRecipients: state.savedRecipients });
			axios.post(`${api_server}/api/set-picked-recipient`, { id: state.id, pickRecipient: state.pickRecipient });
		},

		pickAddress: (state, { payload }) => {
			state.pickedAddress = payload;
			axios.post(`${api_server}/api/set-picked-address`, { id: state.id, pickedAddress: state.pickedAddress });
		},

		pickRecipient: (state, { payload }) => {
			state.pickedRecipient = payload;
			axios.post(`${api_server}/api/set-picked-recipient`, { id: state.id, pickedRecipient: state.pickedRecipient });
		},

		removeSavedAddress: (state, { payload }) => {
			state.savedAddresses = state.savedAddresses.filter((a) => a.id !== Number(payload));
			if (state.pickedAddress?.id === payload || state.savedAddresses.length === 0) {
				state.pickedAddress = null;
				axios.post(`${api_server}/api/set-picked-address`, { id: state.id, pickedAddress: state.pickedAddress });
			}
			axios.post(`${api_server}/api/update-saved-addresses`, { id: state.id, savedAddresses: state.savedAddresses });
		},

		removeSavedRecipient: (state, { payload }) => {
			state.savedRecipients = state.savedRecipients.filter((r) => r.id !== Number(payload));
			if (state.pickedRecipient?.id === payload || state.savedRecipients.length === 0) {
				state.pickedRecipient = null;
				axios.post(`${api_server}/api/set-picked-recipient`, { id: state.id, pickRecipient: state.pickRecipient });
			}
			axios.post(`${api_server}/api/update-saved-recipients`, { id: state.id, savedRecipients: state.savedRecipients });
		},

		addToCart: (state, { payload }) => {
			const data = {
				_id: payload._id,
				name: payload.name,
				description: payload.description,
				image: payload.images[0],
				price: payload.price,
				counter: 0,
				inOrder: true,
				seller_wallet: payload.seller_wallet,
			};

			const findedIndex = state.cart.findIndex((item) => item._id === payload._id);
			if (findedIndex === -1) {
				data.counter = data.counter + 1;

				if (payload.size) {
					data.sizes = [];
					data.sizes.push(payload.size);
				}
				state.cart.push(data);
			} else {
				let sizes = state.cart[findedIndex].sizes;

				if (payload.size && payload.size.length > 0) {
					sizes.push(payload.size);
				}

				state.cart[findedIndex] = { ...state.cart[findedIndex], counter: state.cart[findedIndex].counter + 1, sizes };
			}
			const { total, amount } = cartTotalCounter(state.cart);
			state.cartCost = total.toFixed(2);
			state.cartAmount = amount;
			axios.post(`${api_server}/api/add-to-cart`, { id: state.id, cart: state.cart, cartCost: total.toFixed(2), cartAmount: state.cartAmount });
		},

		removeFromCart: (state, { payload }) => {
			const indexToRemove = state.cart.findIndex((item) => item._id === payload._id);
			if (indexToRemove !== -1) {
				state.cart[indexToRemove] = { ...state.cart[indexToRemove], counter: state.cart[indexToRemove].counter - 1 };
			}
			if (state.cart[indexToRemove].counter === 0) {
				state.cart = state.cart.filter((item) => item._id !== state.cart[indexToRemove]._id);
			}
			const { total, amount } = cartTotalCounter(state.cart);
			state.cartCost = total.toFixed(2);
			state.cartAmount = amount;
			axios.post(`${api_server}/api/remove-from-cart`, {
				id: state.id,
				cart: state.cart,
				cartCost: total.toFixed(2),
				cartAmount: state.cartAmount,
			});
		},

		removeFullProductFromCart: (state, { payload }) => {
			state.cart = state.cart.filter((a) => a._id !== payload._id);
			const { total, amount } = cartTotalCounter(state.cart);
			state.cartCost = total.toFixed(2);
			state.cartAmount = amount;
			axios.post(`${api_server}/api/remove-from-cart`, {
				id: state.id,
				cart: state.cart,
				cartCost: total.toFixed(2),
				cartAmount: state.cartAmount,
			});
		},

		emptyCart: (state) => {
			state.cart = [];
			state.cartCost = cartTotalCounter(state.cart);
			state.cartAmount = 0;
			axios.get(`${api_server}/api/empty-cart?user=${state.id}`);
		},

		inOrderToggler: (state, { payload }) => {
			const indexToRemove = state.cart.findIndex((item) => item._id === payload._id);
			if (indexToRemove !== -1) {
				state.cart[indexToRemove] = { ...state.cart[indexToRemove], inOrder: !state.cart[indexToRemove].inOrder };
			}
			const { total, amount } = cartTotalCounter(state.cart);
			state.cartCost = total.toFixed(2);
			state.cartAmount = amount;

			axios.post(`${api_server}/api/in-order-toggle`, {
				id: state.id,
				cart: state.cart,
				cartCost: total.toFixed(2),
				cartAmount: state.cartAmount,
			});
		},

		removeBuyedProducts: (state, { payload }) => {
			payload.map((item) => {
				state.cart = state.cart.filter((ci) => ci._id !== item._id);
			});

			const { total, amount } = cartTotalCounter(state.cart);
			state.cartCost = total.toFixed(2);
			state.cartAmount = amount;

			axios.post(`${api_server}/api/remove-from-cart`, {
				id: state.id,
				cart: state.cart,
				cartCost: total.toFixed(2),
				cartAmount: state.cartAmount,
			});

			console.log(payload);
			// state.cart = state.car
			// console.log(payload.cart)
		},
	},
});

function cartTotalCounter(cart) {
	let amount = 0;
	let total = 0;
	cart.map((p) => {
		if (p.inOrder) {
			amount = amount + p.counter;
			total = total + p.price * p.counter;
		}
	});

	return { total, amount };
}

export const {
	removeBuyedProducts,
	removeSavedRecipient,
	saveNewRecipient,
	changeMyRecipient,
	pickRecipient,
	removeSavedAddress,
	changeMyAddress,
	pickAddress,
	inOrderToggler,
	emptyCart,
	pushWallet,
	removeFromCart,
	addToCart,
	changeInputValue,
	setUser,
	likeToggler,
	saveDataChanger,
	saveNewAddress,
	removeFullProductFromCart,
} = userSlice.actions;

export default userSlice.reducer;
