document.addEventListener("DOMContentLoaded", () => {
  const backdrop = document.querySelector(".backdrop-reviews-full");
  const modalName = document.querySelector(".reviews-full-modal__name");
  const modalText = document.querySelector(".reviews-full-modal__text");
  const closeBtn = document.querySelector(".modal-btn-close-review-full");

  const open = () => {
    backdrop.style.display = "flex";
    document.body.classList.add("body-lock");

    setTimeout(() => {
      backdrop.classList.add("active");
    }, 20);
  };

  const close = () => {
    backdrop.classList.remove("active");
    document.body.classList.remove("body-lock");

    setTimeout(() => {
      backdrop.style.display = "none";
    }, 400);
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".reviews__item-btn");
    if (!btn) return;

    const name = btn.dataset.name;
    const text = btn.dataset.text;

    modalName.textContent = name;
    modalText.textContent = text;

    open();
  });

  if (closeBtn) closeBtn.addEventListener("click", close);

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("active")) {
      close();
    }
  });
});
