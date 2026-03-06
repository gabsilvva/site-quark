const btnsTabs = document.querySelectorAll(".careers__types nav button");
const tabs = document.querySelectorAll(".careers__types section[data-tab]");

btnsTabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;

    btnsTabs.forEach((b) => b.classList.remove("active"));
    tabs.forEach((t) => t.classList.remove("active"));

    btn.classList.add("active");
    document.querySelector(`.careers__types section[data-tab="${target}"]`)?.classList.add("active");
  });
});