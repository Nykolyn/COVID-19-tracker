import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import { Cards, Chart, CountryPicker, Loader } from "./Components";
import { fetchData } from "./api";

const useStyles = makeStyles({
  container: {
    display: "flex",
    transition: "all 0.4s",
    opacity: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  todos: {
    position: "fixed",
    top: "10px",
    left: "10px",
  },
  appTitleWrapper: {
    display: "flex",
    alignItems: "center",
  },
  appTitle: {
    fontSize: "50px",
    fontWeight: 700,

    "@media screen and (max-width: 768px)": {
      fontSize: "20px",
    },
  },
  loader: {
    width: "calc(100vw - 100px)",
    height: "calc(100vh - 100px)",
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
    lastUpdate: "",
  });
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async (country, timeout) => {
    try {
      const fetchedData = await fetchData(country);
      setData({
        confirmed: fetchedData.confirmed,
        recovered: fetchedData.recovered,
        deaths: fetchedData.deaths,
        lastUpdate: fetchedData.lastUpdate,
      });
      // setLoading(false);
    } catch (e) {
      console.error("Error while getting data: ", e);
      // setLoading(false);
    }

    setTimeout(
      () => {
        setLoading(false);
      },
      timeout ? timeout : 2000
    );
  };

  const handleCountryChange = async ({ target: { value } }) => {
    try {
      await getData(value.toLowerCase(), 500);
      setCountry(value);
    } catch (e) {
      console.error("error while changing country", e.response);
    }
  };

  if (loading)
    return (
      <div className={classes.loader}>
        <Loader />
      </div>
    );

  return (
    <div className={classes.container}>
      <div className={classes.appTitleWrapper}>
        <Typography className={classes.appTitle}>C</Typography>
        <img
          src="https://www.palig.com/Media/Default/Coronavirus/Virus%20Icon.png"
          alt="covid-19"
        />
        <Typography className={classes.appTitle}> vid - 19</Typography>
      </div>
      <Cards {...data} />
      <CountryPicker country={country} onChange={handleCountryChange} />
      <Chart {...data} country={country} />
    </div>
  );
}
