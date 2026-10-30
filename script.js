/* ==========================================================================
   Portfolio Justin Linh – script.js
   Enthält bewusst nur das Nötigste:
   1. Mobiles Menü
   2. Aktiven Menüpunkt beim Scrollen markieren
   3. Dezentes Einblenden der Inhalte
   4. Jahreszahl im Footer
   ========================================================================== */

"use strict";

/* --------------------------------------------------------------------------
   1. Mobiles Menü
   -------------------------------------------------------------------------- */
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector("#main-nav");

/**
 * Öffnet oder schliesst das mobile Menü und hält
 * die ARIA-Attribute aktuell (wichtig für Screenreader).
 * @param {boolean} open - true = Menü öffnen
 */
function setMenuOpen(open) {
  mainNav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Menü schliessen" : "Menü öffnen");
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

// Menü schliessen, sobald ein Link angeklickt wird
mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

// Menü mit der Escape-Taste schliessen
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

// Wird das Fenster gross (Desktop-Ansicht), Menüzustand zurücksetzen
window.matchMedia("(min-width: 900px)").addEventListener("change", (event) => {
  if (event.matches) {
    setMenuOpen(false);
  }
});


/* --------------------------------------------------------------------------
   2. Aktiven Menüpunkt beim Scrollen markieren
   IntersectionObserver ist effizienter als ein scroll-Event.
   -------------------------------------------------------------------------- */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", isCurrent);
      });
    });
  },
  {
    // Eine Sektion gilt als "aktiv", wenn sie im mittleren Bereich des Bildschirms liegt
    rootMargin: "-40% 0px -55% 0px",
  }
);

sections.forEach((section) => sectionObserver.observe(section));


/* --------------------------------------------------------------------------
   3. Dezentes Einblenden der Inhalte
   Elemente mit der Klasse .reveal werden einmalig eingeblendet.
   -------------------------------------------------------------------------- */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // nur einmal animieren
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  // Fallback für sehr alte Browser: alles sofort anzeigen
  revealElements.forEach((element) => element.classList.add("is-visible"));
}


/* --------------------------------------------------------------------------
   4. Jahreszahl im Footer automatisch aktualisieren
   -------------------------------------------------------------------------- */
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}