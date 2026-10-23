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

const GMON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
// فصل: بهار ۱-۳، تابستان ۴-۶، پاییز ۷-۹، زمستان ۱۰-۱۲
function seasonOf(m){ return m<=3?"spring":m<=6?"summer":m<=9?"autumn":"winter"; }

function jalaliPicker(input, onChange, getMin){
  const today = new Date(); today.setHours(12,0,0,0);
  const todayISO = toISO(today);
  const start = input.dataset.iso ? fromISO(input.dataset.iso) : today;
  const sp = jParts(start);
  let view = { y: sp.y, m: sp.m };
  const thisY = jParts(today).y;

  const pop = document.createElement("div");
  pop.className = "jcal";
  pop.hidden = true;
  input.readOnly = true;
  input.placeholder = input.placeholder || "انتخاب تاریخ";
  input.parentNode.style.position = "relative";
  input.parentNode.appendChild(pop);

  input.addEventListener("click", e => {
    e.stopPropagation();
    pop.hidden = !pop.hidden;
    const min = getMin && getMin();
    if (!pop.hidden && !input.dataset.iso && min){ const p = jParts(fromISO(min)); view = { y: p.y, m: p.m }; }
    draw();
  });
  document.addEventListener("click", e => { if (!input.parentNode.contains(e.target)) pop.hidden = true; });

  function draw(){
    const minISO = (getMin && getMin()) || todayISO;
    const first = firstOfJMonth(view.y, view.m, today);
    let cells = "", d = new Date(first), last = first;
    while (cmpYM(jParts(d), view) === 0){
      const iso = toISO(d);
      const dis = iso < todayISO || iso < minISO ? "disabled" : "";
      const cls = ["day", input.dataset.iso === iso ? "sel" : "", iso === todayISO ? "today" : "", d.getDay() === 5 ? "fri" : ""].join(" ");
      cells += `<button type="button" class="${cls}" data-iso="${iso}" ${dis}><b>${fa(jParts(d).d)}</b><small>${d.getDate()}</small></button>`;
      last = d; d = addDays(d, 1);
    }
    const blanks = "<span></span>".repeat((first.getDay()+1) % 7);
    const g1 = GMON[first.getMonth()], g2 = GMON[last.getMonth()];
    const grange = (g1 === g2 ? g1 : g1 + " - " + g2) + " " + last.getFullYear();
    const mopts = JMONTHS.map((n,i)=>`<option value="${i+1}" ${i+1===view.m?"selected":""}>${n}</option>`).join("");
    let yopts = ""; for (let y = thisY; y <= thisY+3; y++) yopts += `<option value="${y}" ${y===view.y?"selected":""}>${y.toLocaleString("fa-IR",{useGrouping:false})}</option>`;
    pop.dataset.season = seasonOf(view.m);
    pop.innerHTML = `
      <div class="jtop">
        <button type="button" data-nav="-1">→ ماه قبل</button>
        <button type="button" data-nav="1">ماه بعد ←</button>
      </div>
      <div class="jsel"><select class="jm">${mopts}</select><select class="jy">${yopts}</select></div>
      <div class="jg">${grange}</div>
      <div class="jgrid">
        <div class="wdbar">${JWEEK.map(w=>`<span>${w}</span>`).join("")}</div>
        ${blanks}${cells}
      </div>
      <button type="button" class="jtoday" data-today="1">برو به امروز</button>`;
  }

  pop.addEventListener("change", e => {
    if (e.target.classList.contains("jm")) view.m = +e.target.value;
    if (e.target.classList.contains("jy")) view.y = +e.target.value;
    draw();
  });
  pop.addEventListener("click", e => {
    e.stopPropagation();
    if (e.target.closest("[data-today]")){ const p = jParts(today); view = { y: p.y, m: p.m }; draw(); return; }
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
      input.value = `${fa(p.d)} ${JMONTHS[p.m-1]} ${p.y.toLocaleString("fa-IR",{useGrouping:false})}`;
      pop.hidden = true;
      if (onChange) onChange();
    }
  });
}
