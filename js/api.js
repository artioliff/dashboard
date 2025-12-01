/* API MODULE
   Carrega dados do dashboard a partir de dashboard.json
   Se falhar, usa fallback em memória.
*/

const API = (function () {
  const DATA_URL = "data/dashboard.json";

  const fallback = {
    metrics: {
      orders: { value: 201, trend: "+12%", direction: "up" },
      approved: { value: 36, trend: "+4%", direction: "up" },
      newCustomers: { value: 1352, trend: "+9%", direction: "up" },
      revenue: { value: 30526.23, trend: "+18%", direction: "up" }
    },
    salesPerDay: {
      labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      values: [1200, 1350, 900, 1800, 2200, 1950, 1700]
    },
    channels: {
      labels: ["Site", "Mobile", "Marketplace", "Indicação"],
      values: [45, 25, 20, 10]
    },
    customers: [
      { name: "João Silva", plan: "Pro", status: "Ativo", amount: 459.9, date: "2025-02-01" },
      { name: "Maria Souza", plan: "Starter", status: "Aguardando", amount: 129.9, date: "2025-01-30" },
      { name: "Empresa XPTO", plan: "Enterprise", status: "Ativo", amount: 2599.9, date: "2025-01-29" },
      { name: "Carlos Lima", plan: "Pro", status: "Cancelado", amount: 0, date: "2025-01-29" },
      { name: "Ana Paula", plan: "Pro", status: "Ativo", amount: 459.9, date: "2025-01-28" },
      { name: "Loja Martins", plan: "Enterprise", status: "Ativo", amount: 3999.9, date: "2025-01-28" },
      { name: "Pedro Santos", plan: "Starter", status: "Ativo", amount: 99.9, date: "2025-01-27" }
    ]
  };

  async function getDashboardData() {
    try {
      const res = await fetch(DATA_URL);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      return data;
    } catch (err) {
      console.warn("[API] Erro ao carregar dashboard.json, usando fallback:", err);
      return fallback;
    }
  }

  return {
    getDashboardData
  };
})();