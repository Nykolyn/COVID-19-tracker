import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";

import { fetchDailyData } from "../../api";
import { Loader } from "..";

const useStyles = makeStyles({
  container: {
    margin: "50px 0",
  },
});

export default function Chart() {
  const classes = useStyles();
  const [dailyData, setDailyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const lineChart = dailyData && (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Infected",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  );

  const getData = async () => {
    try {
      setDailyData(await fetchDailyData());
      setLoading(false);
    } catch (e) {
      console.error("Error while getting daily data", e);
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return <div className={classes.container}>{lineChart}</div>;
}
