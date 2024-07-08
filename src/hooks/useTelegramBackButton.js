import { useEffect } from 'react';

const useTelegramBackButton = (onBackClick) => {
	useEffect(() => {
		if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton) {
			window.Telegram.WebApp.BackButton.onClick(onBackClick);

			return () => {
				window.Telegram.WebApp.BackButton.offClick(onBackClick);
			};
		}
	}, [onBackClick]);
};
export default useTelegramBackButton;
