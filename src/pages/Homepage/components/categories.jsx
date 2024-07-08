import styles from '../homepage.module.scss';

// images
import macMini from '../../../assets/images/mac mini.png';
import coins from '../../../assets/images/coin mini.png';
import pods from '../../../assets/images/pods.png';
import phones from '../../../assets/images/iphones.png';
import sneak from '../../../assets/images/sneakers.png';

const mockData = [
	{
		img: macMini,
		text: 'macbooks',
	},
	{
		img: coins,
		text: 'dropcoins',
	},
	{
		img: pods,
		text: 'headphones',
	},
	{
		img: phones,
		text: 'iphones',
	},
	{
		img: sneak,
		text: 'sneakers',
	},
];

export default function CategoriesHomepage() {
	return (
		<div className={styles.categories}>
			{mockData.map((cat) => {
				return (
					<div key={cat.text} className={styles.catItems}>
						<div className={styles.catImageBlock}>
							<img src={cat.img} alt="" />
						</div>
						<p className={styles.catText}>{cat.text}</p>
					</div>
				);
			})}
		</div>
	);
}
