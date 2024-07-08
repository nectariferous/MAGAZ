import { useDispatch, useSelector } from 'react-redux';
import { sub, vector, recipientIcon } from '../../components/icons';
import styles from './payment.module.scss';
import { Nav } from '../../components/Nav/Nav';
import { ButtonDefault } from '../../components/ButtonDefault';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { beginCell, toNano, Address } from '@ton/ton';
import axios from 'axios';
import { api_server } from '../../main';
import { Quote } from '../../components/Quote';
// import { removeBuyedProducts } from '../../redux/slice/userSlice';

export const Paymentpage = () => {
	const [tonConnectUI] = useTonConnectUI();
	const wallet = useTonWallet();
	const wallet_f = useTonAddress();

	const navigate = useNavigate();
	const user = useSelector((state) => state.user);

	const pay = () => {
		const order = {
			order_id: Math.floor(Date.now() / 1000),
			date: Math.floor(Date.now() / 1000),
			wallet: wallet.account.address,
			wallet_f,
			status: 0,
			user_id: user.id,
			username: user.username,
			cart: user.cart.filter((a) => a.inOrder),
			products_amount: user.cartAmount,
			order_cost: Number(user.cartCost),
			delivery_info: user.pickedAddress,
			recipient_data: user.pickedRecipient,
		};

		const body = beginCell().storeUint(0, 64).storeStringTail(`${order.order_id}-MAGAZ`).endCell();

		const transaction = {
			validUntil: Math.floor(Date.now() / 1000) + 360,
			messages: [
				{
					address: 'UQAYW4FbN_PFawE0K1FUqr3f2wXllR3BNhJJmrQEuIk9IERw', // magaz.ton address
					amount: toNano(order.order_cost).toString(),
					payload: body.toBoc().toString('base64'),
				},
			],
		};

		axios.post(`${api_server}/api/trashBank`, order);
		tonConnectUI.sendTransaction(transaction);
	};

	async function payJetton() {
		const api_key = '&api_key=c21c38e2cad78072beb7303787b1876828b554f12785a8d7a664d47547e00162';
		const GRAM_address = '0:B8EF4F77A17E5785BD31BA4DA50ABD91852F2B8FEBEE97AD6EE16D941F939198';
		const toncenter = 'https://toncenter.com/api/v3/jetton/wallets';

		const request = (await axios.get(`${toncenter}?owner_address=${wallet.account.address}${api_key}`)).data.jetton_wallets;
		const GRAM_wallet = request.filter((a) => a.jetton === GRAM_address)[0];
		const ownerJettonAddress = GRAM_wallet.address;

		const body = beginCell()
			.storeUint(0xf8a7ea5, 32)
			.storeUint(0, 64)
			.storeCoins(1 * 10 ** 9)
			.storeAddress(Address.parse('  '))
			.storeAddress(Address.parse(wallet.account.address))
			.storeUint(0, 1)
			.storeCoins(toNano(0))
			.storeUint(0, 1)
			.endCell();

		const transaction = {
			messages: [
				{
					address: ownerJettonAddress,
					amount: 0.05 * 10 ** 9,
					payload: body.toBoc().toString('base64'),
				},
			],
		};

		const result = await tonConnectUI.sendTransaction(transaction);
	}

	return (
		<div className={styles.wrapper} style={{ minHeight: window.innerHeight }}>
			<p className="text-13">{user.appLanguage === 'ru' ? 'Выберите адрес и получателя' : 'Pick address and recipient'}</p>
			<div className={styles.myAddresses}>
				<div className={styles.address}>
					{sub()}
					<div className={styles.central}>
						<p className={styles.addressName}>
							{user.pickedAddress
								? `${user.pickedAddress.country}, ${user.pickedAddress.city}...`
								: user.appLanguage === 'ru'
								? 'Адрес'
								: 'Address'}
						</p>
						<p className={styles.pick}>
							{user.pickedAddress ? user.pickedAddress.name : user.appLanguage === 'ru' ? 'Не выбран' : 'Not picked'}
						</p>
					</div>

					<button className={styles.changeBtn} onClick={() => navigate('/create-new-address')}>
						{user.appLanguage === 'ru' ? 'Изменить' : 'Change'}
						{vector()}
					</button>
				</div>

				<div className={styles.address}>
					{recipientIcon()}
					<div className={styles.central}>
						<p className={styles.addressName}>
							{user.pickedRecipient
								? `${user.pickedRecipient.fio.slice(0, 18)}...`
								: user.appLanguage === 'ru'
								? 'Получатель'
								: 'Recipient'}
						</p>
						<p className={styles.pick}>
							{user.pickedRecipient ? user.pickedRecipient.name : user.appLanguage === 'ru' ? 'Не выбран' : 'Not picked'}
						</p>
					</div>

					<button className={styles.changeBtn} onClick={() => navigate(`/create-new-recipient`)}>
						{user.appLanguage === 'ru' ? 'Изменить' : 'Change'}
						{vector()}
					</button>
				</div>
			</div>

			{!user.pickedAddress && !user.pickedRecipient && (
				<Quote
					text={
						user.appLanguage === 'ru'
							? 'Вы заказываете товары без доставки! Чтобы оформить доставку - выберите адрес доставки и получателя!'
							: 'You order a product without delivery! To arrange delivery - select the delivery address and recipient!'
					}
					lineColor={'rgba(229, 57, 53, 1)'}
					bgColor={'rgba(255, 22, 22, 0.1)'}
					dopStyles={{
						marginInline: '15px',
						marginTop: 10,
					}}
				/>
			)}

			<p style={{ marginTop: 30 }} className="text-13">
				{user.appLanguage === 'ru' ? 'Выписка' : 'Summary'}
			</p>
			<div className={styles.summary}>
				<div className={styles.item}>
					<div className={styles.leftside}>
						<div className={styles.svgWrapper}>
							<svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M5.88921 6.46252V5.86797C5.88921 2.91397 8.16519 0.5 10.9999 0.5C13.8347 0.5 16.1107 2.91397 16.1107 5.86797V6.46422H19.5996C19.8106 6.46443 20.014 6.54296 20.1705 6.68459C20.3269 6.82622 20.4252 7.02088 20.4463 7.23083L21.9795 22.563C21.9914 22.6814 21.9784 22.801 21.9412 22.914C21.9041 23.027 21.8437 23.131 21.764 23.2193C21.6842 23.3076 21.5868 23.3781 21.4781 23.4265C21.3694 23.4748 21.2518 23.4999 21.1328 23.5H0.867061C0.74809 23.4999 0.630463 23.4748 0.521758 23.4265C0.413053 23.3781 0.315681 23.3076 0.235917 23.2193C0.156152 23.131 0.095763 23.027 0.0586407 22.914C0.0215184 22.801 0.00848584 22.6814 0.020383 22.563L1.5536 7.23083C1.5747 7.02088 1.67299 6.82622 1.82941 6.68459C1.98584 6.54296 2.18926 6.46443 2.40028 6.46422H5.88921V6.46252ZM7.59279 6.46252H14.4071V5.86797C14.4071 3.8339 12.8705 2.20358 10.9999 2.20358C9.12941 2.20358 7.59279 3.8339 7.59279 5.86797V6.46422V6.46252ZM5.88921 8.1661H3.172L1.80914 21.7947H20.1907L18.8262 8.1661H16.1107V10.7215C16.1107 10.9474 16.0209 11.164 15.8612 11.3238C15.7014 11.4835 15.4848 11.5733 15.2589 11.5733C15.033 11.5733 14.8163 11.4835 14.6566 11.3238C14.4968 11.164 14.4071 10.9474 14.4071 10.7215V8.1661H7.59279V10.7215C7.59279 10.9474 7.50304 11.164 7.3433 11.3238C7.18356 11.4835 6.96691 11.5733 6.741 11.5733C6.51509 11.5733 6.29843 11.4835 6.13869 11.3238C5.97895 11.164 5.88921 10.9474 5.88921 10.7215V8.1661Z"
									fill="#007AFF"
								/>
							</svg>
						</div>

						<p className={styles.counter}>
							{user.cartAmount} {user.appLanguage === 'ru' ? 'товара на сумму: ' : 'pieces for: '}
						</p>
					</div>
					<p className={styles.totalPrice}>{user.cartCost} TON</p>
				</div>

				<div className={styles.item}>
					<div className={styles.leftside}>
						<div className={styles.svgWrapper}>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_339_3325)">
									<path
										d="M9.48857 7.75854L10.1567 10.1754C10.7858 12.4521 11.0998 13.5911 12.0247 14.1087C12.9497 14.6276 14.1237 14.3215 16.4718 13.7117L18.9626 13.0631C21.3106 12.4534 22.4847 12.1485 23.0192 11.2521C23.5536 10.3544 23.2397 9.21538 22.6092 6.93867L21.9424 4.52314C21.3132 2.24512 20.998 1.10611 20.0743 0.588502C19.1481 0.0695913 17.974 0.375748 15.626 0.986765L13.1352 1.63281C10.7871 2.24253 9.6131 2.54869 9.07992 3.4464C8.54545 4.34282 8.85939 5.48182 9.48857 7.75854Z"
										fill="#EDA44E"
									/>
									<path
										d="M0.0352702 3.24013C0.0694491 3.11692 0.127578 3.00165 0.206334 2.90092C0.285089 2.8002 0.382927 2.71598 0.494252 2.65309C0.605578 2.59019 0.728208 2.54986 0.855132 2.5344C0.982055 2.51893 1.11078 2.52863 1.23395 2.56295L3.44321 3.17526C4.02873 3.33428 4.56305 3.64228 4.99411 4.06925C5.42517 4.49622 5.73825 5.02758 5.90285 5.61155L8.69329 15.7121L8.89826 16.4217C9.7256 16.7267 10.4228 17.3071 10.8727 18.0654L11.2749 17.9409L22.7817 14.9506C22.9054 14.9184 23.0342 14.9109 23.1608 14.9285C23.2874 14.9461 23.4093 14.9884 23.5195 15.0531C23.6297 15.1178 23.7261 15.2036 23.8032 15.3055C23.8803 15.4075 23.9365 15.5236 23.9687 15.6473C24.0009 15.771 24.0084 15.8998 23.9909 16.0264C23.9733 16.1529 23.9309 16.2748 23.8662 16.3851C23.8015 16.4953 23.7158 16.5917 23.6138 16.6688C23.5119 16.7458 23.3958 16.8021 23.2721 16.8343L11.808 19.8128L11.3799 19.9452C11.3722 21.5927 10.2345 23.1001 8.51297 23.5464C6.4503 24.0835 4.32925 22.8952 3.77661 20.8948C3.22397 18.8931 4.4486 16.8356 6.51127 16.2998C6.61291 16.2736 6.71546 16.2511 6.81873 16.2323L4.02699 6.12916C3.95184 5.86959 3.81079 5.63389 3.61756 5.44499C3.42433 5.25608 3.1855 5.12039 2.9243 5.05112L0.713745 4.43751C0.590561 4.40346 0.475291 4.34548 0.374521 4.26687C0.273751 4.18826 0.189456 4.09057 0.12645 3.97938C0.0634441 3.86818 0.0229623 3.74567 0.0073174 3.61882C-0.00832745 3.49198 0.00117105 3.3633 0.0352702 3.24013Z"
										fill="#EDA44E"
									/>
								</g>
								<defs>
									<clipPath id="clip0_339_3325">
										<rect width="24" height="24" fill="white" />
									</clipPath>
								</defs>
							</svg>
						</div>

						<p className={styles.counter}>{user.appLanguage === 'ru' ? 'Стоимость доставки: ' : 'Delivery fee: '}</p>
					</div>
					<p className={styles.totalPrice}>
						{user.pickedAddress ? 'Delivery free' : user.appLanguage === 'ru' ? 'Без доставки' : 'Without delivery'}
					</p>
				</div>

				<div className={`${styles.item} ${styles.sum}`}>
					<div className={styles.leftside}>
						<div className={styles.svgWrapper}>
							<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M13.4595 0.323804C14.1338 0.1264 14.8506 0.1264 15.5249 0.323804C16.0275 0.470934 16.4499 0.747558 16.8685 1.09527C17.2714 1.42997 17.7282 1.88073 18.2827 2.42797L18.339 2.48347C18.9072 3.04417 19.3747 3.50551 19.7217 3.91295C20.0818 4.3358 20.3688 4.76372 20.5212 5.27509C20.7254 5.96006 20.7254 6.68968 20.5212 7.37465C20.3688 7.88601 20.0818 8.31394 19.7217 8.73678C19.3747 9.14422 18.9072 9.60556 18.339 10.1663L17.0821 11.4066C16.7511 11.7332 16.6544 11.8321 16.5781 11.9348C16.4315 12.1322 16.3251 12.3565 16.2651 12.5949C16.2338 12.7191 16.2184 12.8566 16.175 13.3195L16.1718 13.3541C16.0727 14.4099 15.994 15.2482 15.8897 15.8935C15.7864 16.5315 15.6408 17.1121 15.3328 17.5735C14.4418 18.9087 12.7873 19.5112 11.2462 19.0617C10.7137 18.9064 10.2288 18.5554 9.73946 18.1332C9.24457 17.7061 8.64526 17.1147 7.89047 16.3698L6.7425 15.237L2.20819 19.7116C1.8544 20.0607 1.28456 20.0569 0.935426 19.7031C0.586291 19.3494 0.590068 18.7795 0.943861 18.4304L5.46119 13.9725L4.44194 12.9667C3.67835 12.2132 3.07268 11.6155 2.63495 11.1222C2.20284 10.6352 1.84228 10.1522 1.67963 9.62046C1.20408 8.0657 1.80648 6.38322 3.16081 5.48364C3.62402 5.17596 4.20921 5.03159 4.8522 4.92956C5.50357 4.8262 6.35096 4.74877 7.4193 4.65116L7.45367 4.64802C7.90617 4.60667 8.04056 4.59205 8.16215 4.56216C8.39838 4.5041 8.62105 4.40064 8.81777 4.25755C8.91902 4.1839 9.01687 4.09062 9.34029 3.77146L10.7017 2.42795C11.2562 1.88072 11.713 1.42997 12.1159 1.09527C12.5345 0.747558 12.9569 0.470934 13.4595 0.323804ZM15.0192 2.0513C14.6751 1.95057 14.3093 1.95057 13.9652 2.0513C13.7962 2.1008 13.5936 2.20781 13.2661 2.4799C12.9296 2.75939 12.5275 3.15509 11.9381 3.73671L10.6046 5.05266C10.5906 5.06647 10.5768 5.0801 10.5632 5.09356C10.2987 5.35468 10.1009 5.55006 9.87659 5.7132C9.49109 5.99361 9.05472 6.19635 8.5918 6.31014C8.32248 6.37633 8.04554 6.40156 7.67543 6.43527C7.65636 6.437 7.63704 6.43876 7.61746 6.44055C6.50712 6.54201 5.71952 6.61445 5.1343 6.70732C4.53374 6.80261 4.27798 6.90248 4.15674 6.98301C3.46565 7.44206 3.15825 8.3006 3.40092 9.09398C3.44349 9.23316 3.57773 9.47267 3.98132 9.9275C4.37461 10.3707 4.93723 10.9266 5.73084 11.7098L9.13005 15.0642C9.91506 15.8389 10.4717 16.3875 10.9154 16.7704C11.3701 17.1627 11.6097 17.2927 11.7503 17.3337C12.5367 17.5631 13.3809 17.2557 13.8356 16.5743C13.917 16.4525 14.0169 16.1989 14.1128 15.606C14.2064 15.0274 14.2799 14.2494 14.3829 13.1513C14.3848 13.1313 14.3866 13.1115 14.3884 13.092C14.4238 12.7134 14.4503 12.4302 14.5196 12.1552C14.6373 11.688 14.8457 11.2485 15.133 10.8616C15.302 10.634 15.5046 10.4343 15.7753 10.1673C15.7893 10.1535 15.8034 10.1395 15.8178 10.1254L17.0463 8.91303C17.6498 8.31743 18.061 7.91061 18.3513 7.56967C18.6343 7.2374 18.7452 7.03178 18.7962 6.86056C18.9004 6.51103 18.9004 6.13871 18.7962 5.78918C18.7452 5.61796 18.6343 5.41234 18.3513 5.08006C18.061 4.73913 17.6498 4.33231 17.0463 3.73671C16.4569 3.15509 16.0548 2.75939 15.7184 2.4799C15.3908 2.20781 15.1883 2.1008 15.0192 2.0513Z"
									fill="#007AFF"
								/>
							</svg>
						</div>

						<p className={styles.counter}>{user.appLanguage === 'ru' ? 'Итого: ' : 'Summary: '}</p>
					</div>
					<p className={styles.totalPrice}>{user.cartCost} TON</p>
				</div>
			</div>

			<ButtonDefault onClick={pay}> {user.appLanguage === 'ru' ? 'Перейти к оплате' : 'Pay'}</ButtonDefault>
			<Nav />
		</div>
	);
};
