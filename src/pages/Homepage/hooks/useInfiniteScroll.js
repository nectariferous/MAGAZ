// dependencies
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// utils
import xApi from '/src/axios';

export default () => {
    const [products, setProducts] = useState(null);
    const { ref, inView } = useInView();

    const fetchProducts = async (params) => {
        try {
            const response = await xApi("/products/homepage", { params });

            setProducts([...(products || []), ...response.data]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // prettier-ignore
        const params = products?.length ? { limit: products?.length } : {};

        inView && fetchProducts(params);
    }, [inView]);

    return { ref, products }
}