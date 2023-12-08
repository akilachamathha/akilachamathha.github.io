import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Chart } from "react-google-charts";

export const options = {
  title: "Generation Mix Last 30 min",
  pieHole: 0.4,
  is3D: false,
};

export default function TestData() {
  const [records, setRecords] = useState([]);
  const [gridData, setGridData] = useState([]);
  const data = [["fuel", "perc"]].concat(gridData);

  const fletching = () => {
    axios
      .get("https://api.carbonintensity.org.uk/generation")
      .then((res) => {
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fletching();
  });

  useEffect(() => {
    if (records && records.data && records.data.generationmix) {
      setGridData(records.data.generationmix.map((v) => [v.fuel, v.perc]));
    }
  }, [records]);

  //console.log(data);

  return (
    <div>
      <button onClick={fletching}>Show Data</button>

      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}
