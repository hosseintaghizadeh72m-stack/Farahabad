// تقویم شمسی (هجری شمسی) سبک، بدون نیاز به اینترنت یا کتابخانه خارجی
// روی هر <input readonly> صدا زده می‌شود: jalaliPicker(input, onChange)
const JPF = new Intl.DateTimeFormat("en-u-ca-persian", { year: "numeric", month: "numeric", day: "numeric" });
const JMONTHS = ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
const JWEEK = ["ش","ی","د","س","چ","پ","ج"]; // هفته از شنبه شروع می‌شود
const fa = n => n.toLocaleString("fa-IR");

function jParts(d){
  const p = {};
  JPF.formatToParts(d).forEach(x => { if (x.type !== "literal") p[x.type] = parseInt(x.value, 10); });
  return { y: p.year, m: p.month, d: p.day };
}
function toISO(d){
  return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
}
function fromISO(s){
  const [y,m,d] = s.split("-").map(Number);
  return new Date(y, m-1, d, 12);
}
function addDays(d, n){ const x = new Date(d); x.setDate(x.getDate()+n); return x; }
function cmpYM(a, b){ return (a.y - b.y) || (a.m - b.m); }

// اولین روز یک ماه شمسی را پیدا می‌کند
function firstOfJMonth(y, m, startDate){
  let d = new Date(startDate);
  let guard = 0;
  while (guard++ < 1000){
    const p = jParts(d);
    const c = cmpYM(p, {y, m});
    if (c === 0) break;
    d = addDays(d, c < 0 ? 1 : -1);
  }
  const p = jParts(d);
  return addDays(d, -(p.d - 1));
}

function jalaliPicker(input, onChange){
  const today = new Date(); today.setHours(12,0,0,0);
  const todayISO = toISO(today);
  const start = input.dataset.iso ? fromISO(input.dataset.iso) : today;
  const sp = jParts(start);
  let view = { y: sp.y, m: sp.m };

  const pop = document.createElement("div");
  pop.className = "jcal";
  pop.hidden = true;
  input.readOnly = true;
  input.placeholder = input.placeholder || "انتخاب تاریخ";
  input.parentNode.style.position = "relative";
  input.parentNode.appendChild(pop);

  input.addEventListener("click", () => { pop.hidden = !pop.hidden; draw(); });
  document.addEventListener("click", e => { if (!input.parentNode.contains(e.target)) pop.hidden = true; });

  function draw(){
    const first = firstOfJMonth(view.y, view.m, today);
    let days = "";
    let d = new Date(first);
    while (cmpYM(jParts(d), view) === 0){
      const iso = toISO(d);
      const disabled = iso < todayISO ? "disabled" : "";
      const sel = input.dataset.iso === iso ? "sel" : "";
      days += `<button type="button" class="day ${sel}" data-iso="${iso}" ${disabled}>${fa(jParts(d).d)}</button>`;
      d = addDays(d, 1);
    }
    const blanks = "<span></span>".repeat((first.getDay()+1) % 7);
    pop.innerHTML = `
      <div class="jhead">
        <button type="button" data-nav="1">›</button>
        <strong>${JMONTHS[view.m-1]} ${fa(view.y)}</strong>
        <button type="button" data-nav="-1">‹</button>
      </div>
      <div class="jgrid">${JWEEK.map(w=>`<span class="wd">${w}</span>`).join("")}${blanks}${days}</div>`;
  }

  pop.addEventListener("click", e => {
    const nav = e.target.closest("[data-nav]");
    if (nav){
      let m = view.m + Number(nav.dataset.nav), y = view.y;
      if (m < 1){ m = 12; y--; } if (m > 12){ m = 1; y++; }
      view = { y, m }; draw(); return;
    }
    const day = e.target.closest(".day");
    if (day && !day.disabled){
      input.dataset.iso = day.dataset.iso;
      const p = jParts(fromISO(day.dataset.iso));
      input.value = `${fa(p.d)} ${JMONTHS[p.m-1]} ${fa(p.y)}`;
      pop.hidden = true;
      if (onChange) onChange();
    }
  });
}
