import { useEffect, useState } from 'react';

export const Loader = () => {
	const [longload, setLongload] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setLongload(true);
		}, 7000);
	}, []);
	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M24.8967 0.87868C23.7252 -0.292893 21.8257 -0.292894 20.6541 0.878679L15.714 5.81881H8.78103C7.12418 5.81881 5.78103 7.16195 5.78103 8.81881V15.7517L0.87868 20.6541C-0.292893 21.8257 -0.292893 23.7252 0.87868 24.8967L5.78103 29.7991V36.7855C5.78103 38.4423 7.12418 39.7855 8.78103 39.7855H15.7674L20.7075 44.7256C21.8791 45.8972 23.7786 45.8972 24.9502 44.7256L29.8903 39.7855H36.8233C38.4801 39.7855 39.8233 38.4423 39.8233 36.7855V29.8525L44.7256 24.9502C45.8972 23.7786 45.8972 21.8791 44.7256 20.7075L39.8233 15.8052V8.81881C39.8233 7.16195 38.4801 5.81881 36.8233 5.81881H29.8369L24.8967 0.87868Z"
					fill="#F5A63C"
				>
					<animateTransform
						attributeName="transform"
						attributeType="XML"
						type="rotate"
						from="0 23 23"
						to="360 23 23"
						dur="5s" /*  */
						repeatCount="indefinite"
					/>
				</path>

				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M32.7311 14.604C33.7783 15.5038 33.8977 17.0822 32.9978 18.1294L21.0436 32.0404C20.6643 32.4819 19.9896 32.5073 19.5781 32.0958L12.7322 25.2498C11.7559 24.2735 11.7559 22.6906 12.7322 21.7143C13.7086 20.738 15.2915 20.738 16.2678 21.7143L19.3005 24.7471C19.712 25.1587 20.3867 25.1332 20.7661 24.6918L29.2057 14.8707C30.1055 13.8235 31.6839 13.7041 32.7311 14.604Z"
					fill="white"
				/>
			</svg>

			{longload && (
				<p style={{ marginTop: 20, color: 'rgba(0,0,0,.4)', textAlign: 'center' }}>
					Hmm...something wrong. <br />
					If you use just a browser, please<br />
					<a href="https://t.me/LikhonDevBot">go to telegram MiniApp</a><br />
					...or try again later
				</p>
			)}
		</div>
	);
};
