// ECOSSISTEMA
const solutions = document.querySelector(".home__ecosystem section ul");

solutions.addEventListener("click", (e) => {
  const button = e.target.closest("li button");
  if (!button) return;

  const li = button.closest("li");
  const isActive = li.classList.contains("active");

  solutions.querySelectorAll("li.active").forEach((el) => el.classList.remove("active"));

  if (!isActive) li.classList.add("active");
});

// SOLUÇÕES
new Swiper(".home__solutions .swiper", {
  loop: true,
  navigation: {
    prevEl: ".home__solutions .swiper-prev",
    nextEl: ".home__solutions .swiper-next",
  },
});