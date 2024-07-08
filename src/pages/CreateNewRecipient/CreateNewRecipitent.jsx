import { useState } from 'react';
import { Nav } from '../../components/Nav/Nav';
import styles from './create-new-rec.module.scss';
import { Input } from '../../components/Inputs/Input';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonDefault } from '../../components/ButtonDefault';
import { useNavigate } from 'react-router-dom';
import { pickRecipient, saveNewRecipient } from '../../redux/slice/userSlice';
import { vector, recipientIcon } from '../../components/icons'


export const CreateNewRecipient = () => {
	const appLanguage = useSelector((state) => state.user.appLanguage);
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [fio, setFio] = useState('');
	const [phone, setPhone] = useState('');

	return (
		<div className={styles.wrapper} style={{ minHeight: window.innerHeight }}>
			<div className="text-13">{appLanguage === 'ru' ? 'Сохраните новый адрес' : 'save new address'}</div>

			<Input prop={{ place: 'Recipient title', value: name, setValue: setName }} />
			<Input prop={{ place: 'Joshua Alex Caminski', value: fio, setValue: setFio }} />
			<Input prop={{ place: 'Phone number', value: phone, setValue: setPhone }} />


			<div style={{ marginTop: 45 }} className="text-13">
				{appLanguage === 'ru' ? 'Сохранённые получатели' : 'Saved recipients'}
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
									<p className={styles.pick}>{appLanguage == 'ru' ? 'Выбрать' : 'Pick'}</p>
								</div>

								<button className={styles.changeBtn} onClick={() => navigate(`/change-my-recipient/${recipient.id}`)}>
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
					setFio('')
					setPhone('')
					
					dispatch(
						saveNewRecipient({
							id: Date.now(),
							name,
							fio,
							phone,
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
