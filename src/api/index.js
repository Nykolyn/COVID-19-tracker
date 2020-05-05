import axios from "axios";

const url = process.env.REACT_APP_API_ENDPOINT;

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country && country !== "global") {
    changeableUrl = `${url}/countries/${country}`;
  }
  const {
    data: { confirmed, recovered, deaths, lastUpdate },
  } = await axios.get(changeableUrl);

  const modifiedData = {
    confirmed,
    recovered,
    deaths,
    lastUpdate,
  };

  return modifiedData;
};

export const fetchDailyData = async () => {
  const { data } = await axios.get(`${url}/daily`);

  const modifiedData = data.map(({ confirmed, deaths, reportDate }) => ({
    confirmed: confirmed.total,
    deaths: deaths.total,
    date: reportDate,
  }));

  return modifiedData;
};

export const getCountries = async () => {
  const { data } = await axios.get(`${url}/countries`);

  return data.countries;
};
