// styles
import styles from './homepage.module.scss';
import 'swiper/swiper-bundle.css';

// components
import { Nav } from '../../components/Nav/Nav';
import { Slider } from './components/slider/Slider';
import { WalletConnectionButton } from './components/walletconnectionbutton/WalletConnectionButton';
import { Products } from './components/products/Products';
import { useEffect } from 'react';

function Homepage() {
	useEffect(() => {
		window.Telegram.WebApp.BackButton.hide();
		return () => window.Telegram.WebApp.BackButton.show();
	}, []);
	return (
		<div className={styles.wrapper}>
			<Nav />
			<Slider />
			<Products />
			<WalletConnectionButton />
		</div>
	);
}
export default Homepage;
