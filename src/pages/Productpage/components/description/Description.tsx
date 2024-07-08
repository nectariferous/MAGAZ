import React, { useEffect, useState } from 'react';
import styles from './description.module.scss';

export const Description: React.FC<{ text: string }> = ({ text }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const handleOpen = () => {
		setIsOpen(true);
	};

	useEffect(() => setIsOpen(false), [text]);

	return (
		<div className={styles.wrapper}>
			<h3>Description</h3>
			<p className={`${styles.description} ${isOpen ? styles.opened : null}`} dangerouslySetInnerHTML={{__html:text.replace(/\n/g, '<br />')}} />
			{!isOpen && (
				<div className={styles.readmore} onClick={handleOpen}>
					Read more
				</div>
			)}
		</div>
	);
};
