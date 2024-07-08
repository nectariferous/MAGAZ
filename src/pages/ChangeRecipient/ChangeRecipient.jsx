import { useEffect, useState } from 'react';
import { Nav } from '../../components/Nav/Nav';
import styles from './changerecipient.module.scss';
import { Input } from '../../components/Inputs/Input';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonDefault } from '../../components/ButtonDefault';
import { useNavigate, useParams } from 'react-router-dom';
import { changeMyAddress, changeMyRecipient, removeSavedAddress, removeSavedRecipient } from '../../redux/slice/userSlice';

export const ChangeRecipient = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const user = useSelector(state => state.user)
	const appLanguage = user.appLanguage;
	const { recipientId } = useParams();
	const myRecipient = user.savedRecipients.filter((r) => r.id === parseInt(recipientId))[0];

	const [name, setName] = useState('');
	const [fio, setFio] = useState('');
	const [phone, setPhone] = useState('');


	useEffect(() => {
		if (!myRecipient) {
			navigate('/create-new-address')
		} 
		if (myRecipient) {
			setName(myRecipient.name)
			setFio(myRecipient.fio)
			setPhone(myRecipient.phone)
		}
	}, [user])

	return (
		<div className={styles.wrapper} style={{ minHeight: window.innerHeight }}>
			<div className="text-13">{appLanguage === 'ru' ? 'Изменить адрес' : 'Change my address'}</div>

			<Input prop={{ place: 'Recipient title', value: name, setValue: setName }} />
			<Input prop={{ place: 'Joshua Alex Caminski', value: fio, setValue: setFio }} />
			<Input prop={{ place: 'Phone', value: phone, setValue: setPhone }} />

			<button className={styles.deleteButton} onClick={() => {
				dispatch(removeSavedRecipient(recipientId))
				navigate(-1)
			}}>
				<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M8.75194 0.562014H9.24918C9.36991 0.561998 9.4631 0.561986 9.54684 0.566235C11.0311 0.641551 12.2527 1.69698 12.5788 3.09972H16.2867C16.7837 3.09972 17.1867 3.50267 17.1867 3.99972C17.1867 4.49678 16.7837 4.89972 16.2867 4.89972H1.71445C1.2174 4.89972 0.814453 4.49678 0.814453 3.99972C0.814453 3.50267 1.2174 3.09972 1.71445 3.09972H5.42233C5.7484 1.69698 6.96998 0.641551 8.45428 0.566235C8.53802 0.561986 8.63122 0.561998 8.75194 0.562014ZM7.33789 3.09972H10.6632C10.4181 2.67891 9.97205 2.39013 9.45562 2.36392C9.4238 2.36231 9.38047 2.36202 9.22655 2.36202H8.77457C8.62065 2.36202 8.57733 2.36231 8.5455 2.36392C8.02907 2.39013 7.58302 2.67891 7.33789 3.09972ZM2.72872 6.67472C3.22227 6.6158 3.67014 6.96815 3.72905 7.4617L4.61892 14.9167C4.74112 15.9405 4.82434 16.6232 4.95145 17.1298C5.07233 17.6115 5.20673 17.8175 5.35802 17.9518C5.50931 18.0861 5.72978 18.1951 6.22246 18.2581C6.74049 18.3242 7.42831 18.326 8.45931 18.326H9.54181C10.5728 18.326 11.2606 18.3242 11.7787 18.2581C12.2713 18.1951 12.4918 18.0861 12.6431 17.9518C12.7944 17.8175 12.9288 17.6115 13.0497 17.1298C13.1768 16.6232 13.26 15.9405 13.3822 14.9167L14.2721 7.4617C14.331 6.96815 14.7788 6.6158 15.2724 6.67472C15.766 6.73363 16.1183 7.18149 16.0594 7.67504L15.1627 15.1875C15.0492 16.1386 14.9539 16.9366 14.7956 17.5678C14.6278 18.2365 14.3639 18.8311 13.8381 19.2979C13.3122 19.7647 12.6905 19.9562 12.0067 20.0436C11.3612 20.126 10.5576 20.126 9.59966 20.126H8.40146C7.44356 20.126 6.63991 20.126 5.9944 20.0436C5.31059 19.9562 4.68888 19.7647 4.16304 19.2979C3.6372 18.8311 3.37335 18.2365 3.20557 17.5678C3.04719 16.9366 2.95196 16.1386 2.83846 15.1875L1.94174 7.67504C1.88282 7.18149 2.23517 6.73363 2.72872 6.67472Z"
						fill="#E53935"
					/>
				</svg>
				{appLanguage === 'en' ? 'Delete address' : 'Удалить адрес'}
			</button>
			<ButtonDefault
				onClick={() => {
					const newRecipient = {
						id: myRecipient.id,
						name,
						fio,
						phone
					};
					if (!validate(newRecipient)) {
						console.log('data not valid')
						return;
					}
					dispatch(changeMyRecipient(newRecipient))
					navigate(-1)
				}}
			>
				{appLanguage === 'ru' ? 'Сохранить получателя' : 'Save recipient'}
			</ButtonDefault>
			<Nav />
		</div>
	);
};

function validate(data) {
	if (data.name.length < 1) {
		return false;
	}

	if (data.fio.length < 3) {
		return false;
	}

	if (data.phone < 2) {
		return false;
	}

	return true;
}
