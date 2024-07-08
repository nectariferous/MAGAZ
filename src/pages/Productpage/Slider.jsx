import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./productpage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { likeToggler } from "../../redux/slice/userSlice";

export const Slider = ({ productData }) => {
    const user = useSelector((state) => state.user);
    const [like, setLike] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            const s = user.likedProducts.filter((a) => a === productData._id);
            s.length === 0 ? setLike(false) : setLike(true);
        }
    }, [user, productData._id]);

    return (
        <Swiper className={styles.swiper}>
            <div
                onClick={() => dispatch(likeToggler(productData._id))}
                style={{
                    padding: "10px 10px",
                    borderRadius: 100,
                    backgroundColor: "#fff",
                    position: "absolute",
                    top: 20,
                    right: 20,
                    aspectRatio: 1,
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {like ? (
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9 1.5495C8.21349 0.848854 7.14718 0.287567 5.97653 0.083063C4.58328 -0.160328 3.04261 0.104907 1.70404 1.22922C0.812019 1.97845 0.254001 3.15719 0.0690915 4.43095C-0.117377 5.71544 0.0642054 7.16053 0.728553 8.49972C1.20918 9.46857 2.35341 10.6874 3.5424 11.8093C4.7575 12.9558 6.11042 14.0836 7.10051 14.8808C8.20127 15.767 9.79873 15.767 10.8995 14.8808C11.8896 14.0836 13.2425 12.9558 14.4576 11.8093C15.6466 10.6874 16.7908 9.46858 17.2714 8.49973C17.9358 7.16054 18.1174 5.71545 17.9309 4.43096C17.746 3.1572 17.188 1.97847 16.296 1.22923C14.9574 0.104919 13.4167 -0.160319 12.0235 0.0830688C10.8528 0.28757 9.78652 0.848855 9 1.5495Z"
                            fill="#007AFF"
                        />
                    </svg>
                ) : (
                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9 1.62916C8.21349 0.892497 7.14718 0.302352 5.97653 0.0873335C4.58328 -0.168571 3.04261 0.1103 1.70404 1.29242C0.812019 2.08017 0.254001 3.31951 0.0690915 4.65876C-0.117377 6.00929 0.0642054 7.52867 0.728553 8.93672C1.20919 9.95538 2.35341 11.2368 3.5424 12.4164C4.7575 13.6219 6.11042 14.8077 7.10051 15.6458C8.20127 16.5777 9.79873 16.5777 10.8995 15.6458C11.8896 14.8077 13.2425 13.6219 14.4576 12.4164C15.6466 11.2368 16.7908 9.9554 17.2714 8.93673C17.9358 7.52869 18.1174 6.0093 17.9309 4.65877C17.746 3.31953 17.188 2.08019 16.296 1.29243C14.9574 0.110313 13.4167 -0.168562 12.0235 0.0873397C10.8528 0.302355 9.78652 0.892497 9 1.62916ZM5.71936 1.4875C4.71199 1.30247 3.62537 1.4949 2.64637 2.35947C2.07729 2.86203 1.63167 3.74992 1.4793 4.85347C1.32849 5.94573 1.476 7.1847 2.01603 8.32925C2.37565 9.09146 3.34185 10.2121 4.54502 11.4058C5.72209 12.5735 7.04309 13.7321 8.02029 14.5593C8.5902 15.0417 9.40981 15.0417 9.97972 14.5593C10.9569 13.7321 12.2779 12.5736 13.455 11.4058C14.6582 10.2122 15.6243 9.09147 15.984 8.32927C16.524 7.18472 16.6715 5.94574 16.5207 4.85348C16.3683 3.74993 15.9227 2.86204 15.3536 2.35948C14.3746 1.49491 13.288 1.30248 12.2806 1.4875C11.2491 1.67698 10.3014 2.26565 9.6935 2.956C9.32619 3.37312 8.67382 3.37312 8.30651 2.956C7.69859 2.26565 6.75095 1.67697 5.71936 1.4875Z"
                            fill="#007AFF"
                        />
                    </svg>
                )}
            </div>
            {productData.images.map((banner, index) => {
                return (
                    <SwiperSlide key={index} className={styles.swiperSlide}>
                        {banner.split("-")[1] === "video" ? (
                            <video preload="true" autoPlay={true} loop src={banner.split("-")[0]} />
                        ) : (
                            <img src={banner} alt="banner image" />
                        )}

                        {/* Pass */}
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};
