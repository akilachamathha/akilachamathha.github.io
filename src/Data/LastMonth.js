import React, { useEffect, useState } from "react";
import axios from "axios";
import { lastMonthDate, todayDate } from "../Components/DateComponent";
import { Chart } from "react-google-charts";

export const options = {
  title: "Generation Mix Last 30 Days",
  pieHole: 0.4,
  is3D: false,
};

export default function LastMonthData() {
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
  const fuelPercWeek = [];
  const [dataList, setDataList] = useState([["fuel", "perc"]]);
  const [pastWeek, setPastWeek] = useState([]);

  //API calling.....................
  const fetchWeek = (dateFrom = lastMonthDate, dateTo = todayDate) => {
    const curl =
      "https://api.carbonintensity.org.uk/generation/" +
      dateFrom +
      "/" +
      dateTo;
    axios
      .get(curl)
      .then((res) => setPastWeek(res.data))
      .catch((err) => console.log(err));
    //console.log(dateFrom, dateTo);
  };

  //console.log(pastWeek);

  useEffect(() => {
    fetchWeek();
  }, []);

  //Sum of fuel perc ..........
  useEffect(() => {
    if (pastWeek && pastWeek.data) {
      for (let i = 0; i < 9; i++) {
        fuelPercWeek.push(
          pastWeek.data.map(
            (values, halfHourIndex) => values.generationmix[i].perc
          )
        );
      }
    }
  }, [pastWeek]);

  //console.log(fuelPercWeek);

  useEffect(() => {
    //Get all 30min percentages and calculate to one percentage
    if (fuelPercWeek[1]) {
      const newDataList = [["fuel", "perc"]];
      for (let i = 0; i < 9; i++) {
        const totalFuelVal = fuelPercWeek[i].reduce(
          (acc, current) => acc + current,
          0
        );
        newDataList.push([
          fuels[i],
          parseFloat((totalFuelVal / 337).toFixed(1)),
        ]);
      }
      setDataList(newDataList);
    }
  }, [fuelPercWeek]);

  return (
    <div>
      <button onClick={() => fetchWeek()}>Show Data</button>

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
