// styles
import styles from "./products.module.scss";

// utils
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

// components
import { ProductCard } from "/src/components/ProductCard/ProductCard";

export const Products = () => {
    const { ref, products } = useInfiniteScroll();

    return (
        <>
            <h2 className={styles.catalogTitle}>New from MAGAZ</h2>
            <div className={styles.catalog}>
                {products && products.map((data, index) => <ProductCard key={index} data={data} />)}
                <div ref={ref} />
            </div>
        </>
    );
};
