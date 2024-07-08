import React from 'react';
import styles from './properties.module.scss';

type PropsType = {
	data: { [key: string]: string }[];
};

export const Properties: React.FC<PropsType> = ({ data }) => {
	return (
		<div className={styles.wrapper}>
			{data.map((propertyData: any, index: number) => {
				return (
					<div key={index}>
						<p>{Object.values(propertyData)}</p>
						<p>{Object.keys(propertyData)}</p>
					</div>
				);
			})}
		</div>
	);
};
