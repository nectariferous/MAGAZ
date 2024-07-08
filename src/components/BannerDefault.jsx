import { useEffect, useRef, useState } from 'react';


export const BannerDefault = ({ data }) => {
	const [isVisible, setIsVisible] = useState(true);
	const [opacity, setOpacity] = useState(1);
	const [maxHeight, setMaxHeight] = useState('initial');

	const ref = useRef(null)

	useEffect(() => {
		setMaxHeight(ref.current.scrollHeight)
	}, [])

	const handleClose = () => {
		setOpacity(0);
		setMaxHeight(0);
		setTimeout(() => {
			setIsVisible(false);
		}, 400);
	};

	if (!isVisible) {
		return null;
	}

	return (
		<div
			style={{
				maxHeight: data.isClosing ? maxHeight : 'initial',
				transition: '.3s',
				overflow: 'hidden',
				opacity: opacity,
			}}
		>
			<div
				ref={ref}
				style={{
					padding: 20,
					position: 'relative',
					backgroundImage: `url(${data.bgImageUrl})`,
					backgroundSize: 'cover',
					borderRadius: 20,
					marginInline: 15,

					display: 'flex',
					alignItems: 'flex-start',
					columnGap: 20,
				}}
			>
				<div>
					<h4
						style={{
							color: 'white',
							fontSize: 17,
							lineHeight: '22px',
							fontWeight: 500,
							fontFamily: 'H_neue',
						}}
					>
						{data.title}
					</h4>

					<p style={{ fontFamily: 'H_neue', color: 'white', marginTop: 2, fontSize: 15, lineHeight: '20px', opacity: 0.8 }}>{data.text}</p>
					<button
						style={{
							backgroundColor: 'white',
							borderRadius: 100,
							padding: '8px 12px',
							fontSize: 15,
							lineHeight: '20px',
							fontFamily: 'H_neue',
							marginTop: 12,
						}}
					>
						{data.btnText}
					</button>
				</div>
				{data.isClosing && (
					<div
						style={{
							width: 28,
							height: 28,
							padding: 8,
							borderRadius: 100,
							backgroundColor: 'rgba(0,0,0,.1)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							cursor: 'pointer',
						}}
						onClick={handleClose}
					>
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M1.17282 12C0.514893 12 0 11.4702 0 10.8115C0 10.4964 0.114414 10.1957 0.343257 9.98084L4.3051 5.99999L0.343257 2.0334C0.114414 1.8043 0 1.51789 0 1.20286C0 0.529821 0.514893 0.0286375 1.17282 0.0286375C1.50178 0.0286375 1.75923 0.143189 1.98807 0.357995L5.97852 4.3389L9.99761 0.343668C10.2407 0.100239 10.4982 0 10.8128 0C11.4707 0 12 0.515509 12 1.17422C12 1.50358 11.8998 1.76133 11.6423 2.01909L7.66626 5.99999L11.6281 9.96661C11.8713 10.1814 11.9856 10.482 11.9856 10.8115C11.9856 11.4702 11.4565 12 10.7842 12C10.4553 12 10.1549 11.8855 9.94034 11.6563L5.97852 7.67544L2.03097 11.6563C1.80214 11.8855 1.50178 12 1.17282 12Z"
								fill="white"
							/>
						</svg>
					</div>
				)}
			</div>
		</div>
	);
};
