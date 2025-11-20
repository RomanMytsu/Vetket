import Swiper from "swiper";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector(".btn-open-gallery");
  const modal = document.getElementById("galleryModal");
  const closeBtn = modal.querySelector(".gallery-modal__close");

  if (!openBtn || !modal) return;

  openBtn.addEventListener("click", () => {
    modal.classList.add("is-open");
    document.body.classList.add("no-scroll");

    if (!modal.dataset.swipersInited) {
      initGallerySwipers();
      modal.dataset.swipersInited = "true";
    }
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  }

  function initGallerySwipers() {
    const thumbsSwiper = new Swiper(".thumbsSwiper", {
      spaceBetween: 16,
      slidesPerView: 10,
      freeMode: true,
      watchSlidesProgress: true,
      breakpoints: {
        375: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: { slidesPerView: 4 },
        1440: { slidesPerView: 10 },
      },
    });

    const mainSwiper = new Swiper(".mainSwiper", {
      spaceBetween: 0,
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: ".gallery-modal__button-next",
        prevEl: ".gallery-modal__button-prev",
      },
      thumbs: {
        swiper: thumbsSwiper,
      },
    });
  }
});
