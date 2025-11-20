document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector(".btn-open-gallery");
  const modal = document.querySelector(".modal-gallery");
  const closeBtn = modal?.querySelector(".modal-gallery__close");

  if (!openBtn || !modal) return;

  openBtn.addEventListener("click", () => {
    modal.classList.add("is-open");
  });

  closeBtn?.addEventListener("click", () => {
    modal.classList.remove("is-open");
  });

  // Закрытие по клику на фон
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("is-open");
    }
  });
});
