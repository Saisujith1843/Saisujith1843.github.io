// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle
const root = document.documentElement;
const label = document.getElementById("themeLabel");
function syncLabel() {
  label.textContent = root.dataset.theme === "dark" ? "Light" : "Dark";
}
syncLabel();
document.getElementById("themeToggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  syncLabel();
});

// Live Hyderabad time in the API panel
const clock = document.getElementById("clock");
function tick() {
  clock.textContent = new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false,
  });
}
tick();
setInterval(tick, 30000);

// The one big moment: the API response prints line by line
const panel = document.getElementById("panel");
const lines = panel.querySelectorAll(".ln2");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduce) {
  panel.classList.add("typing");
  lines.forEach((line, i) => setTimeout(() => line.classList.add("on"), 900 + i * 260));
}

// Projects: rendered from projects.js so you only edit that file
const list = document.getElementById("projectList");
if (list && typeof PROJECTS !== "undefined") {
  PROJECTS.forEach((p) => {
    const row = document.createElement("article");
    row.className = "proj";

    const title = document.createElement("h3");
    title.textContent = p.title;

    const body = document.createElement("div");
    const desc = document.createElement("p");
    desc.textContent = p.description;
    const stack = document.createElement("p");
    stack.className = "stack";
    stack.textContent = p.stack;
    body.append(desc, stack);

    const links = document.createElement("div");
    links.className = "proj-links";
    [["Code", p.code], ["Live demo", p.live]].forEach(([name, url]) => {
      if (!url) return;
      const a = document.createElement("a");
      a.href = url;
      a.textContent = name;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      links.append(a);
    });
    if (links.children.length) body.append(links);

    row.append(title, body);
    list.append(row);
  });
}
