import { useState } from 'react';
import { Nav } from '../../components/Nav/Nav';
import styles from './create-new-address.module.scss';
import { Input } from '../../components/Inputs/Input';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonDefault } from '../../components/ButtonDefault';
import { useNavigate } from 'react-router-dom';
import { pickAddress, saveNewAddress } from '../../redux/slice/userSlice';
import { sub, vector } from '../../components/icons'
 
export const CreateNewAddress = () => {
	const appLanguage = useSelector((state) => state.user.appLanguage);
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [country, setCountry] = useState('');
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [street, setStreet] = useState('');
	const [zip, setZip] = useState('');


	return (
		<div className={styles.wrapper} style={{ minHeight: window.innerHeight }}>
			<div className="text-13">{appLanguage === 'ru' ? 'Сохраните новый адрес' : 'save new address'}</div>

			<Input prop={{ place: 'Address title', value: name, setValue: setName }} />
			<Input prop={{ place: 'Country', value: country, setValue: setCountry }} />
			<Input prop={{ place: 'State', value: state, setValue: setState }} />
			<Input prop={{ place: 'City', value: city, setValue: setCity }} />
			<Input prop={{ place: 'Street', value: street, setValue: setStreet }} />
			<Input prop={{ place: 'ZIP code or pick-up point', value: zip, setValue: setZip }} />

			<div style={{ marginTop: 45 }} className="text-13">
				{appLanguage === 'ru' ? 'Мои адреса' : 'My addresses'}
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
									<p className={styles.pick}>{appLanguage == 'ru' ? 'Выбрать' : 'Pick'}</p>
								</div>

								<button className={styles.changeBtn} onClick={() => navigate(`/change-my-address/${address.id}`)}>
									{appLanguage === 'ru' ? 'Изменить' : 'Change'}
									{vector()}
								</button>
							</div>
						);
					})}
				</div>
			) : (
				<div className={styles.noAddress}>{user.appLanguage === 'ru' ? 'Нет сохраненных адресов' : 'No saved addresses'}</div>
			)}
			<ButtonDefault
				onClick={() => {
					setName('');
					setCity('')
					setCountry('')
					setState('')
					setStreet('')
					setZip('')
					dispatch(
						saveNewAddress({
							id: Date.now(),
							name,
							country,
							state,
							city,
							street,
							zip,
						}),
					);
				}}
			>
				{appLanguage === 'ru' ? 'Сохранить адрес' : 'Save address'}
			</ButtonDefault>
			<Nav />
		</div>
	);
};
