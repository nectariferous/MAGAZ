import { useDispatch, useSelector } from 'react-redux';
import { Nav } from '../../components/Nav/Nav';
import styles from './orders.module.scss';
import { addToCart, emptyCart, inOrderToggler, removeFromCart, removeFullProductFromCart } from '../../redux/slice/userSlice';
import { ButtonDefault } from '../../components/ButtonDefault';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import emptyLottieAnimation from '../../assets/images/Lottie/empty.json';
import { useTonConnectModal, useTonWallet } from '@tonconnect/ui-react';

export const Orderspage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const products = useSelector((state) => state.products.productsList);
	const wallet = useTonWallet();
	const { open } = useTonConnectModal();

	const lottieOptions = {
		loop: true,
		autoplay: true,
		animationData: emptyLottieAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<div
			className={`${styles.wrapper} ${user.cart?.length === 0 ? styles.wrapperEmpty : null}`}
			style={{ minHeight: user.cart.length === 0 ? window.innerHeight : 'initial' }}
		>
			{user.cart && user.cart?.length === 0 && (
				<div>
					<div className={styles.empty}>
						<Lottie className={styles.lottie} options={lottieOptions} />
						<p className={styles.emptyP}>Oops...there's nothing, pick some products and come back</p>
					</div>
					<ButtonDefault onClick={() => navigate('/')}>{user.appLanguage === 'ru' ? 'Вернуться на главную' : 'Back to home'}</ButtonDefault>
				</div>
			)}

			{user.cart && user.cart?.length > 0 && (
				<>
					<div className={styles.return} onClick={() => dispatch(emptyCart())}>
						{user.appLanguage === 'ru' ? 'Очистить корзину' : 'Delete all'}
					</div>
					{user.cart.map((item, index) => {
						return (
							<div key={index} className={`${styles.cartItem} ${!item.inOrder && styles.notInOrderCard}`}>
								<div className={styles.topside}>
									<div className={styles.imgBlock} onClick={() => navigate(`/product/${item._id}`)}>
										<img src={item.image} alt="" />
									</div>

									<div className={styles.central} onClick={() => navigate(`/product/${item._id}`)}>
										<p className={styles.title}>{item.name.split(' ').slice(0, 3).join(' ')}</p>
										<p
											className={styles.description}
											dangerouslySetInnerHTML={{ __html: item.description.split(' ').slice(0, 16).join(' ') + '...' }}
										/>
									</div>

									<div
										className={`${styles.picker} ${!item.inOrder && styles.notInOrderCheckbox}`}
										onClick={() => dispatch(inOrderToggler(item))}
									>
										{item.inOrder && (
											<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path
													d="M10.78 0.401998C11.2484 0.694709 11.3907 1.31166 11.098 1.78L5.47303 10.78C5.30222 11.0533 5.01018 11.2275 4.68855 11.248C4.36693 11.2684 4.05515 11.1327 3.85107 10.8832L0.476073 6.75823C0.126345 6.33079 0.189347 5.70077 0.616792 5.35104C1.04424 5.00131 1.67426 5.06431 2.02399 5.49176L4.51603 8.53759L9.40203 0.719998C9.69474 0.251661 10.3117 0.109288 10.78 0.401998Z"
													fill="white"
												/>
											</svg>
										)}
									</div>
								</div>

								<div className={styles.botside}>
									<div className={styles.counter}>
										{item.counter === 1 ? (
											<svg fill="rgba(255, 22, 22, 1)" onClick={() => dispatch(removeFullProductFromCart(item))} xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25">
												<path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
												<path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
											</svg>
										) : (
											<svg
												onClick={() => {
													item.counter > 1 && dispatch(removeFromCart(item));
												}}
												width="24"
												height="25"
												viewBox="0 0 24 25"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M11.9 2.40004C6.32192 2.40004 1.8 6.92196 1.8 12.5C1.8 18.0781 6.32192 22.6 11.9 22.6C17.4781 22.6 22 18.0781 22 12.5C22 6.92196 17.4781 2.40004 11.9 2.40004ZM0 12.5C0 5.92785 5.32781 0.600037 11.9 0.600037C18.4722 0.600037 23.8 5.92785 23.8 12.5C23.8 19.0722 18.4722 24.4 11.9 24.4C5.32781 24.4 0 19.0722 0 12.5ZM11.9 11.6C12.3971 11.6 12.8 11.6 12.8 11.6H16.4C16.8971 11.6 17.3 12.003 17.3 12.5C17.3 12.9971 16.8971 13.4 16.4 13.4H12.8C12.8 13.4 12.3971 13.4 11.9 13.4C11.4029 13.4 11 13.4 11 13.4H7.4C6.90294 13.4 6.5 12.9971 6.5 12.5C6.5 12.003 6.90294 11.6 7.4 11.6H11C11 11.6 11.4029 11.6 11.9 11.6Z"
													fill={item.counter === 1 ? 'rgba(162, 172, 176, 1)' : '#007AFF'}
												/>
											</svg>
										)}

										{item.counter}

										<svg
											onClick={() => {
												dispatch(addToCart(products.filter((a) => a._id === item._id)[0]));
											}}
											width="24"
											height="25"
											viewBox="0 0 24 25"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M12.1 2.40004C6.52187 2.40004 1.99995 6.92196 1.99995 12.5C1.99995 18.0781 6.52187 22.6 12.1 22.6C17.678 22.6 22.2 18.0781 22.2 12.5C22.2 6.92196 17.678 2.40004 12.1 2.40004ZM0.199951 12.5C0.199951 5.92785 5.52776 0.600037 12.1 0.600037C18.6721 0.600037 24 5.92785 24 12.5C24 19.0722 18.6721 24.4 12.1 24.4C5.52776 24.4 0.199951 19.0722 0.199951 12.5ZM12.1 7.10004C12.597 7.10004 13 7.50298 13 8.00004V11.6H16.6C17.097 11.6 17.5 12.003 17.5 12.5C17.5 12.9971 17.097 13.4 16.6 13.4H13V17C13 17.4971 12.597 17.9 12.1 17.9C11.6029 17.9 11.2 17.4971 11.2 17V13.4H7.59995C7.10289 13.4 6.69995 12.9971 6.69995 12.5C6.69995 12.003 7.10289 11.6 7.59995 11.6H11.2V8.00004C11.2 7.50298 11.6029 7.10004 12.1 7.10004Z"
												fill="#007AFF"
											/>
										</svg>
									</div>

									<div className={styles.price}>
										<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path
												d="M12 0.500031C5.373 0.500031 0 5.87303 0 12.5C0 19.127 5.373 24.5 12 24.5C18.627 24.5 24 19.127 24 12.5C24 5.87303 18.627 0.500031 12 0.500031ZM7.902 7.19703H16.098C17.603 7.19703 18.56 8.82503 17.803 10.137L12.744 18.902C12.6684 19.0324 12.5599 19.1406 12.4293 19.2159C12.2987 19.2911 12.1507 19.3307 12 19.3307C11.8493 19.3307 11.7013 19.2911 11.5707 19.2159C11.4401 19.1406 11.3316 19.0324 11.256 18.902L6.199 10.137C5.441 8.82303 6.396 7.19703 7.902 7.19703ZM12.746 8.69303V16.273L13.848 14.145L16.504 9.38903C16.5447 9.31799 16.5659 9.23747 16.5654 9.15562C16.565 9.07376 16.543 8.99347 16.5016 8.92285C16.4602 8.85223 16.4009 8.79379 16.3297 8.75344C16.2585 8.71309 16.1779 8.69225 16.096 8.69303H12.746ZM7.9 8.69503C7.81832 8.69414 7.73786 8.71484 7.66674 8.75501C7.59562 8.79519 7.53637 8.85343 7.49497 8.92385C7.45357 8.99426 7.4315 9.07436 7.43098 9.15604C7.43046 9.23772 7.45151 9.31809 7.492 9.38903L10.15 14.143L11.252 16.273V8.69503H7.9Z"
												fill="#06A5FF"
											/>
										</svg>
										<p>{item.price} TON</p>
									</div>
								</div>
							</div>
						);
					})}
				</>
			)}

			{user.cart.length !== 0 &&
				(wallet ? (

					user.cartCost > 0 ? (

					<ButtonDefault onClick={() => navigate('/payment')}>
						{user.appLanguage === 'ru' ? 'Оформить заказ: ' : 'Checkout order: '} {user.cartCost} TON
					</ButtonDefault>
					) : (
						<ButtonDefault onClick={() => navigate('/')}>
							{user.appLanguage === 'ru' ? 'Выберите товары' : 'Back to Home'}
						</ButtonDefault>
					)
				) : (
					<ButtonDefault onClick={open}>{user.appLanguage === 'ru' ? 'Подключить кошелек' : 'Connect Wallet'}</ButtonDefault>
				))}

			<Nav />
		</div>
	);
};
