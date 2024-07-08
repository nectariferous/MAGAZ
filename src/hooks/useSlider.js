import { useEffect, useState } from "react";

export default ({ numberUploadedImages = 2, images: totalImages }) => {
    const [slide, setSlide] = useState(0);
    const [images, setImages] = useState(() => [...totalImages.slice(0, numberUploadedImages), ...getFakeData(numberUploadedImages)]);

    function getFakeData(length) {
        const dif = totalImages.length - length;

        if (!dif || dif < 0) return [];

        return Array(dif).fill(null);
    }

    useEffect(() => {
        const indexUnploadedImage = images.indexOf(null);

        if (indexUnploadedImage === -1) return;

        const isAddUnploadedImage = slide + 1 === indexUnploadedImage;

        if (isAddUnploadedImage) {
            const realItems = images.filter((image) => image);
            const fakeItems = getFakeData(realItems.length + 1);

            setImages([...realItems, totalImages[indexUnploadedImage], ...fakeItems]);
        }
    }, [slide]);

    return { setSlide, currentSlide: slide, images };
};
