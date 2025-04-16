import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function SalesChart({ salesRep }) {
  const [showLegend, setShowLegend] = useState(true);

  const dealStats = {
    "Closed Won": salesRep.deals
      .filter((deal) => deal.status === "Closed Won")
      .reduce((sum, deal) => sum + deal.value, 0),
    "In Progress": salesRep.deals
      .filter((deal) => deal.status === "In Progress")
      .reduce((sum, deal) => sum + deal.value, 0),
    "Closed Lost": salesRep.deals
      .filter((deal) => deal.status === "Closed Lost")
      .reduce((sum, deal) => sum + deal.value, 0),
  };

  const data = {
    labels: Object.keys(dealStats),
    datasets: [
      {
        data: Object.values(dealStats),
        backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: showLegend,
        position: "bottom",
        labels: {
          color: "#334155", // Dark text
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `$${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="text-center mb-2">
        <button
          onClick={() => setShowLegend(!showLegend)}
          className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {showLegend ? "Hide Legend" : "Show Legend"}
        </button>
      </div>
      <Pie data={data} options={options} />
    </div>
  );
}
