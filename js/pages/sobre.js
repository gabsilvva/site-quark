// TEAM
new Swiper(".about__team .swiper", {
  spaceBetween: 8,
  loop: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 3,
    },
  },
  navigation: {
    prevEl: ".about__team .swiper-prev",
    nextEl: ".about__team .swiper-next",
  },
});