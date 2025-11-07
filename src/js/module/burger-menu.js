const burgerBtn = document.querySelector(".header__burger-menu");
const menu = document.querySelector(".burger-menu");

if (burgerBtn && menu) {
  // Запоминаем исходное положение кнопки
  const originalParent = burgerBtn.parentElement;
  const nextSibling = burgerBtn.nextElementSibling;

  const open = () => {
    burgerBtn.classList.add("active");
    menu.appendChild(burgerBtn); // перемещаем в меню
    menu.style.display = "block";
    setTimeout(() => menu.classList.add("active"), 20);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    burgerBtn.classList.remove("active");
    menu.classList.remove("active");
    setTimeout(() => {
      // возвращаем на исходное место
      if (nextSibling && nextSibling.parentElement === originalParent) {
        originalParent.insertBefore(burgerBtn, nextSibling);
      } else {
        originalParent.appendChild(burgerBtn);
      }

      menu.style.display = "none";
      document.body.style.overflow = "";
    }, 400);
  };

  burgerBtn.addEventListener("click", () => {
    if (menu.classList.contains("active")) close();
    else open();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("active")) close();
  });

  menu.style.display = "none";
}
