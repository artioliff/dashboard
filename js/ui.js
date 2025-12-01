/* ===========================================================
   UI MODULE — Métricas, Tabela, Gráficos
=========================================================== */

const UI = (function () {

  function updateMetrics(metrics) {
    const { orders, approved, newCustomers, revenue } = metrics;

    setCard("cardOrders", "cardOrdersTrend", orders);
    setCard("cardApproved", "cardApprovedTrend", approved);
    setCard("cardNewCustomers", "cardNewCustomersTrend", newCustomers);

    const revenueValue =
      "R$ " + revenue.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

    document.getElementById("cardRevenue").textContent = revenueValue;
    setTrend("cardRevenueTrend", revenue);
  }

  function setCard(valueId, trendId, metric) {
    document.getElementById(valueId).textContent = metric.value;
    setTrend(trendId, metric);
  }

  function setTrend(id, metric) {
    const el = document.getElementById(id);
    const trendText = metric.trend || "0%";
    const direction = metric.direction === "down" ? "down" : "up";

    el.classList.remove("up", "down");
    el.classList.add(direction);

    const arrow = direction === "down" ? "↓" : "↑";
    el.textContent = `${arrow} ${trendText}`;
  }

  function renderAll(data, filteredCustomers) {
    updateMetrics(data.metrics);
    Table.render(filteredCustomers ?? data.customers);
    Charts.init(data);
  }

  function updateOnFilter(data, filteredCustomers) {
    updateMetrics(data.metrics);
    Table.render(filteredCustomers);
    Charts.update(data);
  }

  return {
    renderAll,
    updateOnFilter
  };

})();


/* ===========================================================
   SIDEBAR CONTROLLER — mobile open/close logic
=========================================================== */

const SidebarController = (function () {

  const toggleBtn = document.getElementById("sidebarToggle");
  const sidebar = document.querySelector(".sidebar");

  function init() {
    if (!toggleBtn || !sidebar) return;

    // botão ☰ abre/fecha
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      document.body.classList.toggle("sidebar-open");
    });

    // fecha ao clicar no overlay / fora da sidebar
    document.addEventListener("click", (e) => {
      const clickedOutside =
        !e.target.closest(".sidebar") && !e.target.closest("#sidebarToggle");

      if (document.body.classList.contains("sidebar-open") && clickedOutside) {
        document.body.classList.remove("sidebar-open");
      }
    });

    // fecha ao clicar em um item do menu
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", () => {
        document.body.classList.remove("sidebar-open");
      });
    });
  }

  return { init };

})();

/* ===========================================================
   INICIALIZAÇÃO DA SIDEBAR
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  SidebarController.init();
});