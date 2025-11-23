document
  .querySelector(".review-modal__form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
      specialist_name: form.querySelector('[name="specialist_name"]').value,
      review_text: form.querySelector('[name="review_text"]').value.trim(),
      user_name: form.querySelector('[name="user_name"]').value.trim(),
      user_email: form.querySelector('[name="user_email"]').value.trim(),
      privacy_consent: form.querySelector('[name="privacy_consent"]').checked,
    };

    try {
      const res = await fetch(
        "https://capable-leader-adecf1b424.strapiapp.com/api/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: data,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Ошибка отправки");
      }

      console.log("Отзыв отправлен!");
      form.reset();
    } catch (err) {
      console.error(err);
    }
  });

async function loadReviews() {
  try {
    const res = await fetch(
      "https://capable-leader-adecf1b424.strapiapp.com/api/reviews?sort=createdAt:desc"
    );

    if (!res.ok) throw new Error("Ошибка загрузки");

    const json = await res.json();
    return json.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

function formatDateYMD(dateString) {
  const date = new Date(dateString);

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  return `${y}-${m}-${d}`;
}

loadReviews().then((reviews) => {
  const container = document.querySelector(".reviews__list");

  container.innerHTML = reviews
    .map((item) => {
      return `
        <li class="reviews__item">
          <p class="reviews__item-name">${item.user_name}</p>
          <p class="reviews__item-text">${item.review_text}</p>
          <div class="reviews__item-time-wrapper">
          <p class="reviews__item-time">${formatDateYMD(item.createdAt)}</p>
          <button data-name="${item.user_name}" data-text="${
        item.review_text
      }" class="reviews__item-btn">
               Читать полностью
            <svg width="19" height="10">
             <use href="img/sprite.svg#arrow-contac"></use>
             </svg>
          </button>
          </div>
          
        </li>
      `;
    })
    .join("");
});
