import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Cards, Chart, CountryPicker, Loader } from "./Components";
import { fetchData } from "./api";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  todos: {
    position: "fixed",
    top: "10px",
    left: "10px",
  },
});

export default function App() {
  const classes = useStyles();
  const [data, setData] = useState({
    confirmed: {},
    recovered: {},
    deaths: {},
    lastUpdate: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setTimeout(async () => {
      try {
        const fetchedData = await fetchData();
        console.log("fetchedData", fetchedData);
        setData({
          confirmed: fetchedData.confirmed,
          recovered: fetchedData.recovered,
          deaths: fetchedData.deaths,
          lastUpdate: fetchedData.lastUpdate,
        });
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.error("Error while getting data: ", e);
      }
    }, 0);
  };

  if (loading) return <Loader />;

  return (
    <div className={classes.container}>
      <Cards
        confirmed={data.confirmed}
        recovered={data.recovered}
        deaths={data.deaths}
        lastUpdate={data.lastUpdate}
      />
      <CountryPicker />
      <Chart />
      <div className={classes.todos}>
        <h1>Todo:</h1>
        <p>Setimeot for loader</p>
        <p>Move in the other place last modified</p>
        <p>Animate screens</p>
      </div>
    </div>
  );
}
