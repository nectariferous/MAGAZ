import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slice/userSlice";
import { Loader } from "./components/Loader";
import { api_server } from "./main";
import { initProductsList } from "./redux/slice/productsSlice";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import useTelegramBackButton from "./hooks/useTelegramBackButton";

function CustomProvider({ children }) {
    const dispatch = useDispatch();
    const { tgWebAppStartParam } = useParams();
    const [loading, setLoading] = useState(true);
    const [userLoaded, setUserLoaded] = useState(false);

    useTelegramBackButton(() => window.history.back())

    useEffect(() => {
        const body = {
            ...window.Telegram.WebApp.initDataUnsafe.user,
            webAppLaunched: true,
            referer: tgWebAppStartParam ? tgWebAppStartParam : 0,
        };

        if (tgWebAppStartParam) {
            localStorage.setItem("p34", 10);
        } else {
            localStorage.setItem("p34", 34);
        }

        axios.post(`https://magaz.tonwinners.com/api/user`, body).then((res) => {
            if (res.data !== "no user") {
                dispatch(setUser(res.data));
                setUserLoaded(true);
            }
        });
    }, [dispatch]);

    useEffect(() => {
        if (userLoaded) {
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    }, [userLoaded]);
    return <>{loading ? <Loader /> : children}</>;
}

CustomProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CustomProvider;
