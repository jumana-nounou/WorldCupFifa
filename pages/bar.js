import { Bar } from "react-chartjs-2";

import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
import homeStyle from "../styles/Home.module.css";
import { useEffect } from "react";

Chart.register(CategoryScale, LinearScale, BarElement);
const labels = ["PENDING", "CANCELLED", "RESERVED"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "dataset",

      data: ["43.11", "17.33", "39.56"],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
      borderWidth: 1,
    },
  ],
};

const data1 = {
  labels: labels,
  datasets: [
    {
      label: "dataset",

      data: ["49.11", "11.33", "39.56"],
      backgroundColor: [
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
      ],
      borderColor: [
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
      ],
      borderWidth: 1,
    },
  ],
};
const data2 = {
  labels: labels,
  datasets: [
    {
      label: "dataset",

      data: ["25", "40", "35"],
      backgroundColor: [
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
      ],
      borderColor: [
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
      ],
      borderWidth: 1,
    },
  ],
};

export default () => ({
  displayName: "Bar Sample with Next.js",
  render() {
    return (
      <div className={homeStyle.main}>
        <h2>Percentages Of All Tickets</h2>
        <Bar
          data={data}
          options={{
            maintainAspectRatio: true,
          }}
        />
        <h2>Percentages Of All Tickets in Category 1</h2>
        <Bar
          data={data1}
          options={{
            maintainAspectRatio: true,
          }}
        />
        <h2>Percentages Of All Tickets in Category 2</h2>
        <Bar
          data={data2}
          options={{
            maintainAspectRatio: true,
          }}
        />
        <h2>Percentages Of All Tickets in Category 3</h2>
        <Bar
          data={data1}
          options={{
            maintainAspectRatio: true,
          }}
        />
      </div>
    );
  },
});
