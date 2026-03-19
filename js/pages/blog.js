new Swiper(".blog__banner__content__cards .swiper", {
  loop: true,
  spaceBetween: 8,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  navigation: {
    prevEl: ".blog__banner__content__cards .swiper-prev",
    nextEl: ".blog__banner__content__cards .swiper-next",
  },
});