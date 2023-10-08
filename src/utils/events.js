export const handlePrevClick = () => {
    const swiper = document.querySelector(".swiper-container")?.swiper;
    if (swiper) {
        swiper.slidePrev();
    }
};

export const handleNextClick = () => {
    const swiper = document.querySelector(".swiper-container")?.swiper;
    if (swiper) {
        swiper.slideNext();
    }
};