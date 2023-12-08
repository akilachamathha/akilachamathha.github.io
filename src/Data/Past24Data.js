import React, { useEffect, useState } from "react";
import axios from "axios";
import { todayDate } from "../Components/DateComponent";
import { Chart } from "react-google-charts";

export const options = {
  title: "Generation Mix Last 24hrs",
  pieHole: 0,
  is3D: false,
};

export default function Past24Data() {
  const fuels = [
    "biomass",
    "coal",
    "imports",
    "gas",
    "nuclear",
    "other",
    "hydro",
    "solar",
    "wind",
  ];
  const fuelPerc24 = [];
  const [dataList, setDataList] = useState([["fuel", "perc"]]);
  const [past24, setPast24] = useState([]);

  //API calling.....................
  const fetch24 = (date = todayDate) => {
    const curl =
      "https://api.carbonintensity.org.uk/generation/" + date + "/pt24h";
    axios
      .get(curl)
      .then((res) => setPast24(res.data))
      .catch((err) => console.log(err));
    //console.log(date);
  };
  useEffect(() => {
    fetch24(todayDate);
  }, []);

  //Sum of fuel perc ..........
  useEffect(() => {
    if (past24 && past24.data) {
      for (let i = 0; i < 9; i++) {
        fuelPerc24.push(
          past24.data.map(
            (values, halfHourIndex) => values.generationmix[i].perc
          )
        );
      }
    }
  }, [past24]);

  useEffect(() => {
    //Get all 30min percentages and calculate to one percentage
    if (fuelPerc24[1]) {
      const newDataList = [["fuel", "perc"]];
      for (let i = 0; i < 9; i++) {
        const totalFuelVal = fuelPerc24[i].reduce(
          (acc, current) => acc + current,
          0
        );
        newDataList.push([
          fuels[i],
          parseFloat((totalFuelVal / 49).toFixed(1)),
        ]);
      }
      setDataList(newDataList);
    }
  }, [fuelPerc24]);

  //console.log(fuelPerc24);

  return (
    <div>
      <button onClick={() => fetch24(todayDate)}>Show Data</button>

      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={dataList}
        options={options}
      />
    </div>
  );
}
