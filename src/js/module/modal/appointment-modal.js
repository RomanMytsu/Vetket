import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import ruLocale from "air-datepicker/locale/ru.js";

document.addEventListener("DOMContentLoaded", () => {
  const openButtons = document.querySelectorAll(".open-btn");
  const backdrop = document.querySelector(".backdrop");
  const closeBtn = document.querySelector(".modal-btn-close");

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

  openButtons.forEach((btn) => {
    btn.addEventListener("click", open);
  });

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

const dp = new AirDatepicker("#date", {
  locale: ruLocale,
  autoClose: true,
  dateFormat: "yyyy-MM-dd",
  position: "bottom center",
  maxDate: new Date(2030, 11, 31),
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".appointment-modal__form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: form.querySelector('input[name="name"]').value,
      phone: form.querySelector('input[name="phone"]').value,
      branch: form.querySelector('input[name="branch"]:checked').id,
      date: document.querySelector("#date").value,
      pet_name: form.querySelector("#pet-name").value,
      message: form.querySelector("#message").value,
      agree: form.querySelector('input[type="checkbox"]').checked,
    };

    try {
      const response = await fetch("http://localhost:1337/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        console.error(await response.json());
        alert("Ошибка при отправке");
        return;
      }

      alert("Запись успешно отправлена!");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Ошибка сети");
    }
  });
});
