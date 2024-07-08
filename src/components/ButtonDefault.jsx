export const ButtonDefault = ({ onClick, children, propStyles }) => {
	const style = {
		height: 50,
		width: 'calc(100% - 20px)',
		backgroundColor: 'rgba(0, 122, 255, 1)',
		borderRadius: 8,
		color: 'white',
		fontSize: 17,
		fontWeight: 600,
		position: 'fixed',
		bottom: 67,
		marginBottom: 'env(safe-area-inset-bottom)',
		left: 10,
		zIndex: 100,
		...propStyles
	};

	return (
		<button onClick={onClick} style={style}>
			{children}
		</button>
	);
};
