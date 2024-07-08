import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./other.module.scss";

import { ProductCard } from "/src/components/ProductCard/ProductCard";

export const OtherProducts = ({ products }) => {
    return (
        <div className={styles.productLine}>
            <h4 className={styles.prodTitle}>Other products</h4>
            <Swiper spaceBetween={8} slidesPerView={2} className={styles.productLineSwiper}>
                {products &&
                    products.map((product, index) => (
                        <SwiperSlide key={index}>
                            <ProductCard data={product} />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};
