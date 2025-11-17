async function loadVaccination() {
  const res = await fetch("http://localhost:1337/api/vaccination");
  const categories = await res.json();

  const root = document.querySelector(".cost-of-services__vaccination");
  if (!root) return;

  const renderItems = (items) =>
    items
      .map(
        ({ name, price }) => `
        <li class="cost-of-services__item">
          <p class="cost-of-services__item-name">${name}</p>
          <p class="cost-of-services__item-price">${price}</p>
        </li>
      `
      )
      .join("");

  const renderSubcategories = (subs) =>
    subs
      .map(
        ({ title, items }) => `
        <ul class="cost-of-services__list">
          ${
            title
              ? `<h4 class="cost-of-services__item-title">${title}</h4>`
              : ""
          }
          ${renderItems(items)}
        </ul>
      `
      )
      .join("");

  root.innerHTML = categories
    .map(
      ({ title, description, subcategories }) => `
        <h3 class="cost-of-services__title-price">${title}</h3>
        <p class="cost-of-services__description">${
          description ?? ""
        }</p>
        <hr class="cost-of-services__line" />
        ${renderSubcategories(subcategories)}
    `
    )
    .join("");
}

loadVaccination();

async function loadDermatology() {
  const res = await fetch("http://localhost:1337/api/dermatology");
  const categories = await res.json();

  const root = document.querySelector(".cost-of-services__dermatology");
  if (!root) return;

  const renderItems = (items) =>
    items
      .map(
        ({ name, price }) => `
        <li class="cost-of-services__item">
          <p class="cost-of-services__item-name">${name}</p>
          <p class="cost-of-services__item-price">${price}</p>
        </li>
      `
      )
      .join("");

  const renderSubcategories = (subs) =>
    subs
      .map(
        ({ items }) => `
        <ul class="cost-of-services__list">
          ${renderItems(items)}
        </ul>
      `
      )
      .join("");

  root.innerHTML = categories
    .map(
      ({ title, description, subcategories }) => `
        <h3 class="cost-of-services__title-price">${title}</h3>
        <p class="cost-of-services__description">${description ?? ""}</p>
        <hr class="cost-of-services__line" />
        ${renderSubcategories(subcategories)}
    `
    )
    .join("");
}

loadDermatology();

async function loadResuscitation() {
  const res = await fetch("http://localhost:1337/api/reanimation");
  const categories = await res.json();

  const root = document.querySelector(".cost-of-services__resuscitation");
  if (!root) return;

  const renderItems = (items) =>
    items
      .map(
        ({ name, price }) => `
        <li class="cost-of-services__item">
          <p class="cost-of-services__item-name">${name}</p>
          <p class="cost-of-services__item-price">${price}</p>
        </li>
      `
      )
      .join("");

  const renderSubcategories = (subs) =>
    subs
      .map(
        ({ items }) => `
        <ul class="cost-of-services__list">
          ${renderItems(items)}
        </ul>
      `
      )
      .join("");

  root.innerHTML = categories
    .map(
      ({ title, description, subcategories }) => `
        <h3 class="cost-of-services__title-price">${title}</h3>
        <p class="cost-of-services__description">${description ?? ""}</p>
        <hr class="cost-of-services__line" />
        ${renderSubcategories(subcategories)}
    `
    )
    .join("");
}

loadResuscitation();
