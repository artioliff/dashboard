/* CHARTS MODULE
   Responsável por criar e atualizar os gráficos (Chart.js)
*/

const Charts = (function () {
  let salesChart;
  let channelChart;

  const colors = {
    bars: "#4f46e5",
    channels: ["#6366f1", "#22c55e", "#f97316", "#ec4899"]
  };

  function init(data) {
    const salesCtx = document.getElementById("salesChart").getContext("2d");
    const channelCtx = document.getElementById("channelChart").getContext("2d");

    // Gráfico de barras - Vendas por dia
    salesChart = new Chart(salesCtx, {
      type: "bar",
      data: {
        labels: data.salesPerDay.labels,
        datasets: [
          {
            label: "Vendas (R$)",
            data: data.salesPerDay.values,
            borderWidth: 0,
            backgroundColor: colors.bars,
            borderRadius: 6,
            maxBarThickness: 32
          }
        ]
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                "R$ " + ctx.parsed.y.toLocaleString("pt-BR")
            }
          }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            ticks: {
              callback: (value) => "R$ " + value,
              font: { size: 11 }
            },
            grid: {
              color: "rgba(148,163,184,0.25)"
            },
            border: { display: false }
          }
        },
        layout: {
          padding: { top: 8, right: 8, bottom: 4, left: 4 }
        },
        animation: {
          duration: 700,
          easing: "easeOutCubic"
        }
      }
    });

    // Gráfico doughnut - Canais
    channelChart = new Chart(channelCtx, {
      type: "doughnut",
      data: {
        labels: data.channels.labels,
        datasets: [
          {
            data: data.channels.values,
            backgroundColor: colors.channels,
            hoverOffset: 6
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              font: { size: 11 }
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                const val = ctx.parsed;
                const perc = ((val / total) * 100).toFixed(1);
                return `${ctx.label}: ${perc}% (${val})`;
              }
            }
          }
        },
        cutout: "65%",
        animation: {
          duration: 700,
          easing: "easeOutCubic"
        }
      }
    });
  }

  function update(data) {
    if (!salesChart || !channelChart) return;

    salesChart.data.labels = data.salesPerDay.labels;
    salesChart.data.datasets[0].data = data.salesPerDay.values;
    salesChart.update();

    channelChart.data.labels = data.channels.labels;
    channelChart.data.datasets[0].data = data.channels.values;
    channelChart.update();
  }

  return {
    init,
    update
  };
})();