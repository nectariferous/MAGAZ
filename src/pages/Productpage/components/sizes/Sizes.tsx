import React from 'react';
import styles from './sizes.module.scss';

interface propsInterface {
	data: number[];
	pickedSize: number | string;
	setPickedSize: React.Dispatch<number | string>;
}

export const Sizes: React.FC<propsInterface> = ({ data, pickedSize, setPickedSize }) => {
	return (
		<div className={styles.wrapper}>
			{data &&
				data.map((size, index) => {
					return (
						<div
							key={index}
							onClick={() => setPickedSize(size)}
							className={`${styles.size} ${pickedSize === size ? styles.sizeActive : null}`}
						>
							{size}
						</div>
					);
				})}
		</div>
	);
};
