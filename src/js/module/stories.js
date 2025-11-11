import Swiper from "swiper/bundle";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const swiper = new Swiper(".swiper-stories", {
  loop: true,
  modules: [Navigation],
  observer: true,
  observeParents: true,
  spaceBetween: 5,
  grabCursor: true,
  navigation: {
    nextEl: ".stories__btn-next",
    prevEl: ".stories__btn-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesOffsetBefore: 40,
      slidesOffsetAfter: 40,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 30,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
    },
    1920: {
      slidesPerView: 4,
      spaceBetween: 40,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
    },
  },
});
