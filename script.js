const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const revealItems = document.querySelectorAll(".reveal");
const scrollCar = document.querySelector("[data-car]");

function syncHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function moveHeroCar() {
  const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
  const progress = Math.min(window.scrollY / max, 1);
  scrollCar.style.translate = `${progress * -120}px ${progress * 80}px`;
}

syncHeader();
moveHeroCar();
window.addEventListener("scroll", () => {
  syncHeader();
  moveHeroCar();
}, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (!event.target.matches("a")) return;
  header.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-42% 0px -52% 0px" });

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
