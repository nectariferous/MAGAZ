import meme from './meme.jpg';
function GoToMiniApp() {
	return (
		<div>
			<img src={meme} alt="" style={{ borderRadius: 20, maxWidth: 575 }} />
			<h1>
				Please open in
				<br />{' '}
				<a href="https://t.me/LikhonDevBot" style={{ textDecoration: 'underline' }}>
					telegram mini app
				</a>
			</h1>
		</div>
	);
}

export default GoToMiniApp;
