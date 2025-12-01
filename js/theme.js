/* THEME MODULE
   Controla Light/Dark e salva no localStorage
*/

const Theme = (function () {
  const STORAGE_KEY = "dashboard-theme";
  const link = document.getElementById("themeStylesheet");

  function applyTheme(theme) {
    if (theme !== "dark" && theme !== "light") {
      theme = "dark";
    }

    const href =
      theme === "dark" ? "css/dashboard-dark.css" : "css/dashboard-light.css";

    if (link) {
      link.setAttribute("href", href);
    }

    localStorage.setItem(STORAGE_KEY, theme);
  }

  function init() {
    const buttons = document.querySelectorAll(".theme-btn");
    let saved = localStorage.getItem(STORAGE_KEY) || "dark";

    applyTheme(saved);

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const theme = btn.dataset.theme || "light";
        applyTheme(theme);
      });
    });
  }

  return {
    init,
    setTheme: applyTheme
  };
})();