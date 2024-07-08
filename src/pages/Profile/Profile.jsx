import { useEffect, useState } from 'react';
import { Nav } from '../../components/Nav/Nav';
import styles from './profile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { sub, vector, recipientIcon } from '../../components/icons'

import { Link, useNavigate } from 'react-router-dom';
import { api_server } from '../../main';
import axios from 'axios';
import { pickAddress, pickRecipient } from '../../redux/slice/userSlice';

import {Avatar} from './components/Avatar/Avatar'
import {Specials} from './components/Specials/Specials'
import { TonConnectButton } from '@tonconnect/ui-react';

function Profile() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		axios.post(`${api_server}/api/get-my-orders`, { orders: user.orders }).then((res) => {
			const cart = [];
			res.data.map((a) => {
				a.cart.map((item) => (item.date = a.date));
				cart.push(...a.cart);
			});
			setOrders(cart);
		});
	}, [user.orders]);

	return (
		<div className={styles.wrapper} style={{ minHeight: window.innerHeight }}>
			<div style={{marginInline: 'auto', width: 'fit-content'}}>
				<TonConnectButton />
			</div>
			{/* <Avatar /> */}
			{/* <Specials /> */}
			<div style={{ marginTop: 10 }} className="text-13">
				{user.appLanguage === 'ru' ? 'Мои адреса' : 'My addresses'}
			</div>
			{user.savedAddresses.length > 0 ? (
				<div className={styles.myAddresses}>
					{user.savedAddresses.map((address) => {
						return (
							<div key={address.id} className={styles.address}>
								{sub()}
								<div
									className={styles.central}
									onClick={() => {
										dispatch(pickAddress(address));
										navigate('/payment');
									}}
								>
									<p className={styles.addressName}>{address.name}</p>
									<p className={styles.pick}>{user.appLanguage == 'ru' ? 'Выбрать' : 'Pick'}</p>
								</div>

								<button className={styles.changeBtn} onClick={() => navigate(`/change-my-address/${address.id}`)}>
									{user.appLanguage === 'ru' ? 'Изменить' : 'Change'}
									{vector()}
								</button>
							</div>
						);
					})}
				</div>
			) : (
				<div className={styles.noAddress}>{user.appLanguage === 'ru' ? 'Нет сохраненных адресов' : 'No saved addresses'}</div>
			)}
			<p className={styles.createNew}>
				<Link to="/create-new-address">{user.appLanguage === 'ru' ? 'Сохранить новый адрес' : 'Add new address'}</Link>
			</p>

			<div style={{ marginTop: 5 }} className="text-13">
				{user.appLanguage === 'ru' ? 'Сохранённые получатели' : 'Saved recipients'}
			</div>
			{user.savedRecipients?.length > 0 ? (
				<div className={styles.myAddresses}>
					{user.savedRecipients.map((recipient) => {
						return (
							<div key={recipient.id} className={styles.address}>
								{recipientIcon()}
								<div
									className={styles.central}
									onClick={() => {
										dispatch(pickRecipient(recipient));
										navigate('/payment');
									}}
								>
									<p className={styles.addressName}>{recipient.name}</p>
									<p className={styles.pick}>{user.appLanguage == 'ru' ? 'Выбрать' : 'Pick'}</p>
								</div>

								<button className={styles.changeBtn} onClick={() => navigate(`/change-my-recipient/${recipient.id}`)}>
									{user.appLanguage === 'ru' ? 'Изменить' : 'Change'}
									{vector()}
								</button>
							</div>
						);
					})}
				</div>
			) : (
				<div className={styles.noAddress}>{user.appLanguage === 'ru' ? 'Нет сохраненных получателей' : 'No saved recipients'}</div>
			)}
			<p className={styles.createNew}>
				<Link to="/create-new-recipient">{user.appLanguage === 'ru' ? 'Сохранить нового получателя' : 'Add new recipient'}</Link>
			</p>

			<div className={styles.orders}>
				<div className={styles.text}>{user.appLanguage === 'ru' ? 'История покупок' : 'history'}</div>

				{
					orders?.length === 0 && <div className={styles.empty}>{user.appLanguage === 'ru' ? 'У вас еще нет заказов' : "You don't have any order history yet"}</div>
				}
				

				{orders &&
					orders.map((orderItem, index) => {
						const mydate = new Date(orderItem.date);
						// prettier-ignore
						const months = user.appLanguage == 'ru' ? ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря',] : ['January','February','March','April','May','June','Jule','August','September','October','November','December',];
						const date = `${mydate.getDate()} ${months[mydate.getMonth()]} ${mydate.getFullYear()} ${
							user.appLanguage === 'ru' ? 'г.' : 'year'
						}`;
						return (
							<div key={index} className={styles.orders_item}>
								<div className={styles.orders_item_leftside}>
									<div className={styles.image}>
										<img src={orderItem.image} alt="" />
									</div>

									<div className={styles.central}>
										<p className={styles.date}>{date}</p>
										<p className={styles.name}>{orderItem.name}</p>
										<p className={styles.price}>- {(orderItem.price * orderItem.counter).toFixed(2)} TON</p>
									</div>
								</div>

								<div className={styles.cashback}>
									<p>+ {orderItem.cashback || '0'} TON</p>
									<p>{user.appLanguage === 'ru' ? 'Кэшбек' : 'Cashback'}</p>
								</div>
							</div>
						);
					})}
			</div>
			<Nav />
		</div>
	);
}

export default Profile;