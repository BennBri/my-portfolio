// --- MENU NAVBAR --- //
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const icon = toggle.querySelector("i");
  const menu = document.querySelector(".navbar-list");
  const links = document.querySelectorAll(".navbar-link");

  // Apri/chiudi menu al clic sull'icona hamburger
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("active");

    // Cambia icona ☰ ↔ ❌
    if (isOpen) {
      icon.classList.replace("ri-menu-line", "ri-close-line");
    } else {
      icon.classList.replace("ri-close-line", "ri-menu-line");
    }
  });

  // Chiudi menu e evidenzia voce cliccata
  links.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      icon.classList.replace("ri-close-line", "ri-menu-line");
      links.forEach(l => l.classList.remove("active"));
      //link.classList.add("active");
    });
  });
});


// --- EFFETTO FADE-IN DELLE SEZIONI --- //
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach(section => observer.observe(section));
});
