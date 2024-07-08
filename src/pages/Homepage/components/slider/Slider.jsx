// styles
import styles from './slides.module.scss';

// images
import mac from '/src/assets/images/g93.png';
import g94 from '/src/assets/images/g95.png';
import g95 from '/src/assets/images/g94.png';

// dependencies
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// custom hooks
import useSlider from '/src/hooks/useSlider';
import { useEffect, useState } from 'react';

export const Slider = () => {
	const { images, setSlide, currentSlider } = useSlider({ images: [mac, g94, g95] });
	const [i, si] = useState(false);
	useEffect(() => {
        si(true)
	}, [images]);
	return (
		<>
			<Swiper
				loop={true}
				modules={[Autoplay, Pagination]}
				pagination={{
					el: '.myDots',
					clickable: true,
					bulletClass: styles.dot,
					bulletActiveClass: styles.activeDot,
					renderBullet: (index, className) =>
						`<div class="${className} ${index === currentSlider ? styles.activeDot : ''}"></div>`,
				}}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				onSlideChange={(e) => setSlide(e.activeIndex)}
				className={styles.banner}
				spaceBetween={30}
			>
				{!i && <div className={styles.skeleton}><div className={styles.runner}></div></div>}
				{i &&
					images.map((image, index) => (
						<SwiperSlide key={index} className={styles.bannerItem}>
							{index === 1 ? (
								<a
									target="_blank"
									href="https://docs.google.com/forms/d/e/1FAIpQLSdwAbVjahSqHeCfcuky4kH1F_Qf1yqVW19pJVVOBfddXCH6jQ/viewform"
								>
									<img src={image} alt="" />
								</a>
							) : (
								<img src={image} alt="" />
							)}
						</SwiperSlide>
					))}
			</Swiper>
            {
                i ? (<div className={`myDots ${styles.dots}`} />) : (
                    <div className={styles.skeletonDots} />
                )
            }
			
		</>
	);
};
