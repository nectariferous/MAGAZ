import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTonWallet, useTonConnectModal } from '@tonconnect/ui-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';

import { addToCart, pushWallet } from '/src/redux/slice/userSlice';

import { ButtonDefault } from '/src/components/ButtonDefault';

import { Description } from '../description/Description';
import { Properties } from '../properties/Properties';
import { Sizes } from '../sizes/Sizes';
import styles from './product.module.scss';
import { Slider } from '../../Slider';

export const Product = ({ productData }) => {
	const { open } = useTonConnectModal();
	const wallet = useTonWallet();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const friendlyAddress = useTonAddress();
	const user = useSelector((state) => state.user);

	// init данные
	const [pickedSize, setPickedSize] = useState(null);
	const productInCart = useSelector((state) => state.user.cart.filter((item) => item._id === productData._id)[0]?.counter);

	useEffect(() => {
		if (friendlyAddress && !user.wallets.includes(friendlyAddress)) {
			dispatch(pushWallet(friendlyAddress));
		}
	}, [friendlyAddress, dispatch, user.wallets]);
	return (
		<>
			<Slider productData={productData} />

			<div className="wrapper">
				<div className={styles.title}>
					<h1>{productData.name}</h1>

					<p className={styles.magaz}>{productData.seller_name}</p>
				</div>
				<div className={styles.priceLine}>
					<div>
						<div className={styles.price}>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M10 0C4.4775 0 0 4.4775 0 10C0 15.5225 4.4775 20 10 20C15.5225 20 20 15.5225 20 10C20 4.4775 15.5225 0 10 0ZM6.585 5.58083H13.415C14.6692 5.58083 15.4667 6.9375 14.8358 8.03083L10.62 15.335C10.557 15.4436 10.4666 15.5338 10.3578 15.5965C10.249 15.6592 10.1256 15.6922 10 15.6922C9.87442 15.6922 9.75104 15.6592 9.64223 15.5965C9.53342 15.5338 9.44299 15.4436 9.38 15.335L5.16583 8.03083C4.53417 6.93583 5.33 5.58083 6.585 5.58083ZM10.6217 6.8275V13.1442L11.54 11.3708L13.7533 7.4075C13.7872 7.3483 13.8049 7.2812 13.8045 7.21299C13.8042 7.14478 13.7858 7.07786 13.7513 7.01902C13.7168 6.96017 13.6674 6.91147 13.6081 6.87784C13.5487 6.84421 13.4815 6.82685 13.4133 6.8275H10.6217ZM6.58333 6.82917C6.51527 6.82843 6.44821 6.84567 6.38895 6.87915C6.32968 6.91263 6.28031 6.96117 6.24581 7.01985C6.21131 7.07853 6.19292 7.14527 6.19248 7.21334C6.19205 7.28141 6.20959 7.34838 6.24333 7.4075L8.45833 11.3692L9.37667 13.1442V6.82917H6.58333Z"
									fill="#06A5FF"
								/>
							</svg>
							{productData.price} TON
						</div>

						<div
							className={styles.delInfo}
							style={{
								color: productData.deliveryFee > 0 ? '#EDA44E' : '#808080',
							}}
						>
							<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M6.87606 6.65596L7.21939 7.89796C7.54273 9.06796 7.70406 9.65329 8.17939 9.91929C8.65473 10.186 9.25806 10.0286 10.4647 9.71529L11.7447 9.38196C12.9514 9.06862 13.5547 8.91196 13.8294 8.45129C14.1041 7.98996 13.9427 7.40462 13.6187 6.23462L13.2761 4.99329C12.9527 3.82262 12.7907 3.23729 12.3161 2.97129C11.8401 2.70462 11.2367 2.86196 10.0301 3.17596L8.75006 3.50796C7.54339 3.82129 6.94006 3.97862 6.66606 4.43996C6.39139 4.90062 6.55273 5.48596 6.87606 6.65596Z"
									fill={'#EDA44E'}
								/>
								<path
									d="M2.018 4.33394C2.03557 4.27062 2.06544 4.21138 2.10591 4.15962C2.14638 4.10786 2.19666 4.06458 2.25387 4.03226C2.31108 3.99994 2.3741 3.97921 2.43933 3.97126C2.50455 3.96331 2.57071 3.9683 2.634 3.98594L3.76934 4.3006C4.07023 4.38232 4.34482 4.5406 4.56634 4.76002C4.78786 4.97944 4.94875 5.2525 5.03334 5.5526L6.46734 10.7433L6.57267 11.1079C6.99784 11.2646 7.35612 11.5629 7.58734 11.9526L7.794 11.8886L13.7073 10.3519C13.7709 10.3354 13.8371 10.3315 13.9021 10.3406C13.9672 10.3496 14.0298 10.3714 14.0865 10.4046C14.1431 10.4378 14.1927 10.4819 14.2323 10.5343C14.2719 10.5867 14.3008 10.6464 14.3173 10.7099C14.3339 10.7735 14.3377 10.8397 14.3287 10.9047C14.3197 10.9698 14.2979 11.0324 14.2647 11.0891C14.2314 11.1457 14.1874 11.1953 14.135 11.2349C14.0826 11.2745 14.0229 11.3034 13.9593 11.3199L8.068 12.8506L7.848 12.9186C7.844 13.7653 7.25934 14.5399 6.37467 14.7693C5.31467 15.0453 4.22467 14.4346 3.94067 13.4066C3.65667 12.3779 4.286 11.3206 5.346 11.0453C5.39823 11.0318 5.45093 11.0202 5.504 11.0106L4.06934 5.8186C4.03072 5.68521 3.95823 5.56409 3.85893 5.46701C3.75963 5.36993 3.6369 5.3002 3.50267 5.2646L2.36667 4.94927C2.30337 4.93177 2.24413 4.90197 2.19234 4.86158C2.14056 4.82118 2.09724 4.77098 2.06486 4.71383C2.03248 4.65669 2.01168 4.59373 2.00364 4.52855C1.9956 4.46336 2.00048 4.39723 2.018 4.33394Z"
									fill={'#EDA44E'}
								/>
							</svg>

							{user.appLanguage === 'ru' ? `Бесплатная доставка` : 'Free Delivery'}
						</div>
					</div>

					<button
						className={styles.orderNow}
						onClick={() => {
							if (productInCart > 0) {
								navigate('/orders');
								return;
							}

							dispatch(addToCart(productData));
							navigate('/orders');
						}}
					>
						Order Now
					</button>
				</div>

				<Sizes data={productData.sizes} pickedSize={pickedSize} setPickedSize={setPickedSize} />

				{productData.category !== 'nft pack' && (
					<div className={styles.productInfo}>
						<div>
							<p>{productData.sold}</p>
							<p>Items Sold</p>
						</div>
						<div>
							<p>
								{productData.deliverMin} to {productData.deliverMax}
							</p>
							<p>Weeks Arrival</p>
						</div>
					</div>
				)}

				<Description text={productData.description} />
				<Properties data={productData.properties} />

				{/* Counter для количества товаров в корзине */}
				{productInCart > 0 ? (
					<div className={styles.cartButton}>
						<p onClick={() => navigate('/orders')} className={styles.counter}>
							{user.appLanguage === 'ru' ? 'Перейти в корзину' : 'View Orders'}
						</p>
					</div>
				) : (
					<ButtonDefault
						marginTop={20}
						onClick={() => {
							wallet ? dispatch(addToCart({ ...productData, size: pickedSize })) : open();
						}}
					>
						{wallet ? 'Buy Product' : 'Connect Wallet'}
					</ButtonDefault>
				)}
			</div>
		</>
	);
};
