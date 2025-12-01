/* APP MODULE
   Orquestra tudo: tema, dados, filtros, UI
*/

const App = (function () {
  let originalData = null;

  async function init() {
    // Tema
    Theme.init();

    // Dados
    originalData = await API.getDashboardData();

    // Render inicial
    UI.renderAll(originalData, originalData.customers);

    // Marca como carregado (animação CSS)
    document.body.classList.add("dashboard-loaded");

    // Filtros de data
    const startInput = document.getElementById("startDate");
    const endInput = document.getElementById("endDate");

    function applyFilters() {
      const filtered = Filters.filterByDate(
        originalData.customers,
        startInput.value,
        endInput.value
      );
      UI.updateOnFilter(originalData, filtered);
    }

    startInput.addEventListener("change", applyFilters);
    endInput.addEventListener("change", applyFilters);
  }

  return {
    init
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});