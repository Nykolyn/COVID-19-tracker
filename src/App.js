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
});

export default function App() {
  const classes = useStyles();
  const [data, setData] = useState({
    confirmed: {},
    recovered: {},
    deaths: {},
    lastUpdate: {},
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
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
        console.error("Error while getting data: ", e);
        setLoading(false);
      }
    }, 1110);
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
    </div>
  );
}
