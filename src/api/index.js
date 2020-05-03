import axios from "axios";

const url = process.env.REACT_APP_API_ENDPOINT;

export const fetchData = async () => {
  const {
    data: { confirmed, recovered, deaths, lastUpdate },
  } = await axios.get(url);

  const modifiedData = {
    confirmed,
    recovered,
    deaths,
    lastUpdate,
  };

  return modifiedData;
};