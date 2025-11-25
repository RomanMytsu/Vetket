let weekOffset = 0;
async function loadData() {
  try {
    const res = await fetch(
      "https://capable-leader-adecf1b424.strapiapp.com/api/doctors?populate=schedules&populate=schedules.slots"
    );

    const json = await res.json();

    window.__DOCTORS = json.data;

    renderCalendar();
  } catch (e) {
    console.error("Fetch error:", e);
  }
}

function renderCalendar() {
  const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const root = document.getElementById("calendar");

  root.innerHTML = `
    <div class="shedule__calendar-header"></div>
    <div class="shedule__calendar-body"></div>
  `;

  const header = root.querySelector(".shedule__calendar-header");
  const body = root.querySelector(".shedule__calendar-body");

  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + weekOffset * 7);

  header.innerHTML = `
    <div class="shedule__calendar-left-empty">Терапия</div>
    
    ${DAYS.map((dayName, i) => {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);

      const num = d.getDate();
      const month = d.toLocaleString("ru-RU", { month: "short" });

      return `
        <div class="shedule__calendar-day ${
          dayName === "Сб" || dayName === "Вс" ? "weekend" : ""
        }">
          <div class="shedule__calendar-day-day">${dayName}</div>
          <small class="shedule__calendar-day-date">${num} ${month}</small>
        </div>
      `;
    }).join("")}
  `;

  window.__DOCTORS.forEach((doctor) => {
    const d = doctor;
    const schedules = d.schedules || [];

    const row = {
      Пн: "—",
      Вт: "—",
      Ср: "—",
      Чт: "—",
      Пт: "—",
      Сб: "—",
      Вс: "—",
    };

    schedules.forEach((sch) => {
      const dayKey = sch.day.trim().replace(",", "");
      const slots = sch.slots || [];

      if (slots.length > 0) {
        row[dayKey] = slots.map((s) => `${s.from}–${s.to}`).join(", ");
      }
    });

    body.innerHTML += `
      <div class="shedule__calendar-row">
        <div class="shedule__doctor-info">
          <div class="shedule__doctor-name">${d.name}</div>
          <div class="shedule__doctor-desc">${d.description}</div>
        </div>

        ${DAYS.map(
          (dayName) => `
          <div class="shedule__calendar-slot ${
            dayName === "Сб" || dayName === "Вс" ? "weekend-slot" : ""
          }">
            ${row[dayName]}
          </div>
          
        `
        ).join("")}
      </div>
    `;
  });
}

document.addEventListener("click", (e) => {
  if (e.target.closest(".calendar-prev")) {
    weekOffset--;
    renderCalendar();
  }
  if (e.target.closest(".calendar-next")) {
    weekOffset++;
    renderCalendar();
  }
});

loadData();
