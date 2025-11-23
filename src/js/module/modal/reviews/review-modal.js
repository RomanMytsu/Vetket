document.addEventListener("DOMContentLoaded", () => {
  const openButton = document.querySelector(".reviews-btn");
  const backdrop = document.querySelector(".backdrop-reviews");
  const closeBtn = document.querySelector(".modal-btn-close-review");

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

  if (openButton) {
    openButton.addEventListener("click", open);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", close);
  }

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("active")) {
      close();
    }
  });
});

document.addEventListener("click", (e) => {
  const selects = document.querySelectorAll("[data-select]");

  selects.forEach((select) => {
    if (!select.contains(e.target)) {
      select.classList.remove("is-open");
    }
  });

  const select = e.target.closest("[data-select]");
  if (!select) return;

  const trigger = select.querySelector("[data-select-trigger]");
  const input = select.querySelector("[data-select-input]");

  if (e.target === trigger || trigger.contains(e.target)) {
    select.classList.toggle("is-open");
    return;
  }

  const option = e.target.closest("[data-select-option]");
  if (option) {
    select.querySelector(".custom-select__value").textContent =
      option.textContent;
    input.value = option.textContent;
    select.classList.remove("is-open");
  }
});
