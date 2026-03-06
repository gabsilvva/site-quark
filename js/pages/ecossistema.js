const btnsTabs = document.querySelectorAll(".ecosystem__solutions nav button");
const tabs = document.querySelectorAll(".ecosystem__solutions section[data-tab]");

btnsTabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    btnsTabs.forEach((b) => b.classList.remove("active"));
    tabs.forEach((t) => t.classList.remove("active"));

    btn.classList.add("active");
    document.querySelector(`.ecosystem__solutions section[data-tab="${target}"]`)?.classList.add("active");
  });
});