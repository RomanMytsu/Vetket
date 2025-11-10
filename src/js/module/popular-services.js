import Swiper from "swiper/bundle";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const swiper = new Swiper(".swiper", {
  loop: true,
  modules: [Navigation],
  spaceBetween: 24,
  navigation: {
    nextEl: ".popular-services__btn-next",
    prevEl: ".popular-services__btn-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});
