const PLACEHOLDER = "https://dummyimage.com/300x300/1a1a26/777777&text=Pet+Image";

function getImgSrc(img) {
  if (!img) return PLACEHOLDER;
  if (img === "https://image-link") return PLACEHOLDER;
  return img;
}

function parseValue(v) {
  if (v === null || v === undefined) return null;
  if (typeof v === "number") return v;
  if (typeof v !== "string") return null;

  const s = v.trim().toLowerCase();
  if (s === "o/c" || s === "oc") return null;

  const kMatch = s.match(/^(\d+(\.\d+)?)k$/);
  if (kMatch) return Math.round(parseFloat(kMatch[1]) * 1000);

  const n = Number(s.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

function formatValue(v) {
  if (v === null || v === undefined) return "—";
  if (typeof v === "string") return v;
  if (typeof v !== "number") return String(v);

  if (v >= 1000) {
    const k = v / 1000;
    const nice = (Math.round(k * 10) / 10).toString();
    return nice.endsWith(".0") ? `${Math.round(k)}k` : `${nice}k`;
  }
  return v.toString();
}

/* ===== YOUR DATA ===== */
const data = {
  leaderboard: [
    {name:"Top 10 Divine Celestina", normal:13000, gold:"o/c", rainbow:"o/c", img:"https://i.postimg.cc/zbFX9yRD/10.png"},
    {name:"Top 100 Silver Emperor", normal:1200, gold:5500, rainbow:6000, img:"https://i.postimg.cc/XBN73nw9/100.png"},
    {name:"Top 250 Trophy Guardian", normal:550, gold:2300, rainbow:2500, img:"https://i.postimg.cc/5Q9N1fww/250.png"}
  ],
  permanent: [
    {name:"King Kraken", normal:500, gold:"1.75k", rainbow:"2k", img:"https://i.postimg.cc/c6TLh8SY/kraken.png"},
    {name:"Orca Dominator", normal:90, gold:250, rainbow:300, img:"https://i.postimg.cc/pykLCnHC/orca.png"},
    {name:"Chocolate Maurader", normal:50, gold:200, rainbow:200, img:"https://i.postimg.cc/1VR5Pypc/choco.png"},
    {name:"Candy God", normal:50, gold:250, rainbow:300, img:"https://i.postimg.cc/ct14ZdQm/candy.png"},
    {name:"Magmasaur", normal:50, gold:250, rainbow:300, img:"https://i.postimg.cc/Hj3kz7gX/magmasaur.png"},
    {name:"Raging Claw", normal:50, gold:250, rainbow:300, img:"https://i.postimg.cc/NLQ0RkWL/claw.png"}
  ],
  limited: [
    {name:"Frosty Snowman", normal:40, gold:80, rainbow:160, img:"https://i.postimg.cc/dLxtPPD1/snowman.png"},
    {name:"5M North Star", normal:40, gold:80, rainbow:160, img:"https://i.postimg.cc/vZQ1nGs0/star.png"},
    {name:"5M Frost Monarch", normal:1500, gold:6000, rainbow:6250, img:"https://i.postimg.cc/8swz4rSY/monarch.png"},
    {name:"Frost Spirit", normal:40, gold:80, rainbow:160, img:"https://i.postimg.cc/56cCfdX9/frost-spitirrrr.png"},
    {name:"Christmas Tree", normal:90, gold:400, rainbow:450, img:"https://i.postimg.cc/ct3tfT55/christmas-tree.png"},
    {name:"Gilded Seraphim", normal:1500, gold:6000, rainbow:6250, img:"https://i.postimg.cc/8jhr5KvM/seraphim.png"}
  ],
  mythics: [
    {name:"Sharkie", normal:2, gold:5, rainbow:10, img:"https://i.postimg.cc/mkCcYDhT/image.png"},
    {name:"Nutcracker", normal:2, gold:5, rainbow:10, img:"https://i.postimg.cc/sXztHw4H/nut.png"}
  ],
  exclusives: [
    {name:"Kairos", normal:80, gold:350, rainbow:400, img:"https://i.postimg.cc/XXnv9kTC/kairos.png"},
    {name:"Paradox", normal:140, gold:650, rainbow:750, img:"https://i.postimg.cc/RqGZdnBy/paradox.png"},
    {name:"Chronos", normal:10000, gold:"o/c", rainbow:"o/c", img:"https://i.postimg.cc/SjmKcfwQ/chronos.png"},
    {name:"Krampus", normal:2000, gold:6000, rainbow:7000, img:"https://i.postimg.cc/1fpNtCFP/krampus.png"},
    {name:"Evil Snowman", normal:100, gold:300, rainbow:350, img:"https://i.postimg.cc/y3R30nrM/90.png"},
    {name:"Snow Thief", normal:50, gold:200, rainbow:250, img:"https://i.postimg.cc/QK7KcSnv/80.png"},
    {name:"Celestial Candycane", normal:1000, gold:4000, rainbow:4200, img:"https://i.postimg.cc/bSnS1LBc/candy.png"},
    {name:"Gift Mimic", normal:50, gold:200, rainbow:250, img:"https://i.postimg.cc/8FkvxRjC/75.png"},
    {name:"Christmas Goat", normal:0, gold:"o/c", rainbow:"o/c", img:"https://image-link"}
  ]
};

const TAB_CONFIG = [
  { key: "leaderboard", label: "Leaderboard Pets", accent: ["#46d6ff","#7c4dff"] },
  { key: "permanent", label: "Permanent Secrets", accent: ["#ff4d8d","#7c4dff"] },
  { key: "limited", label: "Limited Secrets", accent: ["#54ff9b","#46d6ff"] },
  { key: "mythics", label: "Mythics", accent: ["#ffd24d","#ff4d8d"] },
  { key: "exclusives", label: "Exclusives", accent: ["#7c4dff","#46d6ff"] }
];

let currentTab = "leaderboard";

const el = (id) => document.getElementById(id);

function setAccentForTab(tabKey){
  const t = TAB_CONFIG.find(x => x.key === tabKey) || TAB_CONFIG[0];
  document.documentElement.style.setProperty("--accent", t.accent[0]);
  document.documentElement.style.setProperty("--accent2", t.accent[1]);
}

function buildTabs() {
  const tabs = el("tabs");
  tabs.innerHTML = "";

  TAB_CONFIG.forEach(t => {
    const btn = document.createElement("button");
    btn.className = "tab-btn";
    btn.textContent = t.label;
    btn.onclick = () => showTab(t.key);
    tabs.appendChild(btn);
  });

  updateActiveTabUI();
}

function updateActiveTabUI() {
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach((b, i) => {
    const key = TAB_CONFIG[i].key;
    b.classList.toggle("active", key === currentTab);
  });
}

function toast(msg){
  const t = el("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1300);
}

function copyPet(p){
  const text = `${p.name}\nNormal: ${p.normal}\nGolden: ${p.gold}\nRainbow: ${p.rainbow}`;
  navigator.clipboard.writeText(text).then(() => toast("Copied values ✅"));
}

function applySort(list, sortValue){
  if (!sortValue) return list;

  const [field, dir] = sortValue.split(":");

  const byNum = (a, b, get) => {
    const av = get(a);
    const bv = get(b);
    if (av === null && bv === null) return 0;
    if (av === null) return 1;
    if (bv === null) return -1;
    return dir === "low" ? av - bv : bv - av;
  };

  const byName = (a, b) => {
    const an = a.name.toLowerCase();
    const bn = b.name.toLowerCase();
    return dir === "az" ? an.localeCompare(bn) : bn.localeCompare(an);
  };

  const cloned = [...list];

  if (field === "name") return cloned.sort(byName);
  if (field === "normal") return cloned.sort((a,b) => byNum(a,b, x => parseValue(x.normal)));
  if (field === "gold") return cloned.sort((a,b) => byNum(a,b, x => parseValue(x.gold)));
  if (field === "rainbow") return cloned.sort((a,b) => byNum(a,b, x => parseValue(x.rainbow)));

  return cloned;
}

function getFilteredList(){
  const grid = data[currentTab];
  if (!Array.isArray(grid)) return [];

  const q = el("searchInput").value.toLowerCase().trim();
  const tradeableOnly = el("tradeableOnly").checked;
  const hasImageOnly = el("hasImageOnly").checked;

  let list = grid.filter(p => !q || p.name.toLowerCase().includes(q));

  if (tradeableOnly){
    list = list.filter(p => parseValue(p.normal) !== null);
  }

  if (hasImageOnly){
    list = list.filter(p => p.img && p.img !== "https://image-link");
  }

  list = applySort(list, el("sortSelect").value);

  return list;
}

function render() {
  const list = getFilteredList();

  // stats pills
  const total = (data[currentTab] || []).length;
  const shown = list.length;
  const tradeableCount = list.filter(p => parseValue(p.normal) !== null).length;

  el("stats").innerHTML = `
    <div class="pill">Tab: <b>${TAB_CONFIG.find(t=>t.key===currentTab)?.label || currentTab}</b></div>
    <div class="pill">Showing: <b>${shown}</b> / ${total}</div>
    <div class="pill">Tradeable: <b>${tradeableCount}</b></div>
  `;

  if (!shown){
    el("content").innerHTML = `<div style="color:#b8b8c8;padding:18px;">No pets match your filters.</div>`;
    return;
  }

  el("content").innerHTML =
    `<div class="pet-grid">` +
    list.map(p => {
      const n = parseValue(p.normal);
      const badge = (n === null) ? "o/c" : `Normal ${formatValue(n)}`;
      const imgSrc = getImgSrc(p.img);

      return `
        <div class="pet-card">
          <div class="petHead">
            <div class="petImgWrap">
              <img src="${imgSrc}" alt="${p.name}"
                   onerror="this.onerror=null;this.src='${PLACEHOLDER}';">
            </div>

            <div class="petTitle">
              <h3>${p.name}</h3>
              <div class="tagRow">
                <span class="tag">${badge}</span>
                <span class="tag">${currentTab}</span>
              </div>
            </div>
          </div>

          <div class="table">
            <div class="row"><span>Normal</span><span class="n">${formatValue(parseValue(p.normal) ?? p.normal)}</span></div>
            <div class="row"><span>Golden</span><span class="g">${formatValue(parseValue(p.gold) ?? p.gold)}</span></div>
            <div class="row"><span>Rainbow</span><span class="r">${formatValue(parseValue(p.rainbow) ?? p.rainbow)}</span></div>
          </div>

          <div class="actions">
            <button class="btn primary" onclick='copyPet(${JSON.stringify(p)})'>Copy</button>
            <a class="btn" href="https://discord.gg/johntapsim" target="_blank" rel="noopener">Suggest</a>
          </div>
        </div>
      `;
    }).join("") +
    `</div>`;
}

function showTab(tab) {
  currentTab = tab;
  setAccentForTab(tab);
  updateActiveTabUI();
  render();
}

// Reset
el("resetBtn").addEventListener("click", () => {
  el("searchInput").value = "";
  el("sortSelect").value = "";
  el("tradeableOnly").checked = false;
  el("hasImageOnly").checked = false;
  render();
});

// Controls
el("searchInput").addEventListener("input", render);
el("sortSelect").addEventListener("change", render);
el("tradeableOnly").addEventListener("change", render);
el("hasImageOnly").addEventListener("change", render);

// Last updated
el("lastUpdated").textContent = new Date().toLocaleDateString();

// Init
buildTabs();
showTab("leaderboard");
