import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NativeSelect, FormControl } from "@material-ui/core";

import { getCountries } from "../../api";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    width: "60%",
  },
});

export default function CountryPicker({ onChange, country }) {
  const classes = useStyles();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const fetchedCountries = await getCountries();
      setCountries(fetchedCountries);
    } catch (e) {
      console.error("error while fetching countries", e.response);
    }
  };

  return (
    <FormControl className={classes.formControl}>
      <NativeSelect defaultValue="" value={country} onChange={onChange}>
        <option value="global">Global</option>
        {countries.map((country, index) => (
          <option key={index} value={country.name}>
            {country.name}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
