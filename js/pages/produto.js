const btnsTabs = document.querySelectorAll(".product__tabs nav button");
const tabs = document.querySelectorAll(".product__tabs section[data-tab]");

btnsTabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    btnsTabs.forEach((b) => b.classList.remove("active"));
    tabs.forEach((t) => t.classList.remove("active"));

    btn.classList.add("active");
    document.querySelector(`.product__tabs section[data-tab="${target}"]`)?.classList.add("active");
  });
});

new Swiper(".product__top .swiper", {
  navigation: {
    prevEl: ".product__top .swiper-prev",
    nextEl: ".product__top .swiper-next",
  },
});