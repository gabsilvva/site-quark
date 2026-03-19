new Swiper(".solution__cards .swiper", {
  loop: true,
  spaceBetween: 8,
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
  navigation: {
    prevEl: ".solution__cards .swiper-prev",
    nextEl: ".solution__cards .swiper-next",
  },
});

new Swiper(".solution__cards2 .swiper", {
  spaceBetween: 8,
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
  navigation: {
    prevEl: ".solution__cards2 .swiper-prev",
    nextEl: ".solution__cards2 .swiper-next",
  },
});

const btnsTabs = document.querySelectorAll(".solution__tabs nav button");

if(btnsTabs.length) {
  const tabs = document.querySelectorAll(".solution__tabs section[data-tab]");
  
  btnsTabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
  
      btnsTabs.forEach((b) => b.classList.remove("active"));
      tabs.forEach((t) => t.classList.remove("active"));
  
      btn.classList.add("active");
      document.querySelector(`.solution__tabs section[data-tab="${target}"]`)?.classList.add("active");
    });
  });
}

const play = document.querySelector(".solution__banner2 button[data-video]");

if (play) {
  const video = document.querySelector(".solution__banner2 video");

  if (!video.paused) {
    play.classList.add("pause");
  }

  play.addEventListener("click", () => {
    video.paused
      ? (video.play(), play.classList.add("pause"))
      : (video.pause(), play.classList.remove("pause"));
  });
}