import styles from './cat.module.scss';

export const CategoryCard = ({ categoryData, setPickedCategory }) => {
	return (
		<div onClick={() => setPickedCategory(categoryData.name)} className={styles.catCard}>
			<div className={`${styles.imgBlock} ${!categoryData.image && 'category-preloader'}`}>
				{categoryData.image && <img src={categoryData.image} alt="" />}
			</div>
			<p className={`${styles.name} ${!categoryData.image && 'category-preloader-text'}`}>{categoryData.name}</p>
		</div>
	);
};
