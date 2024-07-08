import React from 'react'
import styles from './avatar.module.scss'

export const Avatar: React.FC = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.cover}>

				{/* <img src="" alt="" /> */}
				SOON
				<button >Edit</button>
			</div>
			<div className={styles.avatar}>
				{/* <img src="" alt="" /> */}
				SOON
			</div>

			<h3 className={styles.username}>username</h3>
			<div className={styles.wallet_address}>Ukofeas...asfesaf <CopyIcon /></div>
		</div>
	)
}

function CopyIcon () {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" ><path d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM4 20V10h10l.002 10H4zm16-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z"></path></svg>
	)
}