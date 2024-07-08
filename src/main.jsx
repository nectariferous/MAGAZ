import "./global.scss";
import "swiper/css";
import "swiper/css/autoplay";

import "./styles/clashFonts.scss";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router, desktopRouter } from "./Router";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CustomProvider from "./CustomProvider";

window.Telegram.WebApp.expand();
window.Telegram.WebApp.setHeaderColor("#fff");
window.Telegram.WebApp.setBackgroundColor("#fff");
window.Telegram.WebApp.enableClosingConfirmation();
window.Telegram.WebApp.BackButton.show();

export const api_server = "https://magaz.tonwinners.com";

// if (window.Telegram.WebApp.platform !== 'unknown') {
ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <TonConnectUIProvider manifestUrl={`${api_server}/tonconnect-manifest.json`}>
            <CustomProvider>
                <RouterProvider router={window.innerWidth > 575 ? desktopRouter : router} />
            </CustomProvider>
        </TonConnectUIProvider>
    </Provider>
);
// }
