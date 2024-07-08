import { ButtonDefault } from '../components/ButtonDefault';
import { Nav } from '../components/Nav/Nav';
import {useSelector} from 'react-redux'

import { Link } from 'react-router-dom';


const text = {
	en: {
		title: "Yeah, i know",
		phrase: "We still working on it..."
	},
	ru: {
		title: "Да-да, мы знаем",
		phrase: "Мы еще работаем над этим разделом..."
	}
}

export const S = () => {
	const user = useSelector(state => state.user);	

	return (
		<div style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column',
			width: '100vw',
			height: '100vh',
		}}>
			<div>
				<img src={'https://i.ibb.co/YtW140P/Image.png'} alt="not found" /> 
			</div>

			<h1 style={{marginTop: 24, fontSize: 20, lineHeight: '25px' }}>{text[user.appLanguage].title}</h1>
			<p style={{marginTop: 4, fontSize: 17, lineHeight: '22px', color: 'rgba(112, 117, 121, 1)'}}>{text[user.appLanguage].phrase}</p>
			<Link to='/'><ButtonDefault style={{position: 'relative'}} >Home Page</ButtonDefault></Link>
			<Nav />
		</div>
	);
};
