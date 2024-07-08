export const Toggler = ({ func, backgroundColor, flag }) => {
	return (
		<div
			onClick={func}
			style={{
				width: 51,
				height: 31,
				backgroundColor: flag ? backgroundColor : 'rgba(239, 239, 244, 1)',
				borderRadius: 100,
				overflow: 'hidden',
				transition: '.1s ease-in-out',
			}}
		>
			<div
				style={{
					width: 27,
					height: 27,
					borderRadius: 100,
					backgroundColor: '#fff',
					position: 'relative',
					top: 2,
					left: flag ? 22 : 2,
					boxShadow: '-5px 5px 10px 3px rgba(0,0,0,.05)',
					transition: '.1s ease-in-out',
				}}
			></div>
		</div>
	);
};
