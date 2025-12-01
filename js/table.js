/* TABLE MODULE
   Renderiza a tabela de clientes
*/

const Table = (function () {
  const tbody = document.getElementById("customersTableBody");

  function render(customers) {
    if (!tbody) return;

    tbody.innerHTML = "";

    customers.forEach((c) => {
      const tr = document.createElement("tr");

      const statusClass =
        c.status === "Ativo"
          ? "badge badge-success"
          : c.status === "Aguardando"
          ? "badge badge-warning"
          : "badge badge-danger";

      tr.innerHTML = `
        <td>${c.name}</td>
        <td>${c.plan}</td>
        <td><span class="${statusClass}">${c.status}</span></td>
        <td>R$ ${c.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
        <td>${new Date(c.date).toLocaleDateString("pt-BR")}</td>
      `;

      tbody.appendChild(tr);
    });
  }

  return {
    render
  };
})();