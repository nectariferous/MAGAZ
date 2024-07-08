import styles from './productpage.module.scss';

import { Nav } from '/src/components/Nav/Nav';
import { Product } from './components/product/Product';
import { OtherProducts } from './components/otherproducts/OtherProducts';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { api_server } from '../../main';
import { useParams } from 'react-router-dom';
import useTelegramBackButton from '../../hooks/useTelegramBackButton';

function Productpage() {
	const { productId } = useParams();
	const pageRef = useRef();

    // useTelegramBackButton(() => window.history.back());

	// Хранилище для данных
	const [productData, setProductData] = useState(null);
	const [products, setProducts] = useState(null);

	const fetch = async () => {
		const data = (await axios.get(`${api_server}/api/product?id=${productId}`)).data;
		const otherProducts = (await axios.get(`${api_server}/api/get-other-products?id=${productId}`)).data;

		setProducts(otherProducts);
		setProductData(data);
	};

	useEffect(() => {
		fetch().then(() => window.scrollTo(0, 0));
	}, [productId]);

	return (
		<div ref={pageRef} className={styles.wrapper}>
			{productData && <Product productData={productData} />}
			<OtherProducts products={products} />
			<Nav />
		</div>
	);
}
export default Productpage;
