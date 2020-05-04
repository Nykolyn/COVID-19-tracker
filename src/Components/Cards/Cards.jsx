import React from "react";
import cx from "classnames";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CountUp from "react-countup";
import moment from "moment";

const MOMENT_FORMAT = "MMMM Do YYYY, HH:MM:SS";

const useStyles = makeStyles({
  container: {
    margin: "50px 0",
  },
  card: {
    margin: "0 2% !important",
  },
  infected: {
    borderBottom: "10px solid rgba(0,0, 255, 0.5)",
  },
  recovered: {
    borderBottom: "10px solid rgba(0,255, 0, 0.5)",
  },
  dead: {
    borderBottom: "10px solid rgba(255,0, 0, 0.5)",
  },
});

export default function Cards({ confirmed, recovered, deaths, lastUpdate }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          xs={12}
          md={3}
          component={Card}
          className={cx(classes.card, classes.infected)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={confirmed.value}
                duration={2.5}
                separator="."
              />
            </Typography>
            <Typography color="textSecondary">
              {moment(lastUpdate).format(MOMENT_FORMAT)},{" "}
              {moment(lastUpdate).fromNow()}
            </Typography>
            <Typography variant="body2">
              Number of active cases of COVID-19
            </Typography>
          </CardContent>
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
          component={Card}
          className={cx(classes.card, classes.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={recovered.value}
                duration={2.5}
                separator="."
              />
            </Typography>
            <Typography color="textSecondary">
              {moment(lastUpdate).format(MOMENT_FORMAT)},{" "}
              {moment(lastUpdate).fromNow()}
            </Typography>
            <Typography variant="body2">
              Number of recoveries from COVID-19
            </Typography>
          </CardContent>
        </Grid>

        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(classes.card, classes.dead)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={deaths.value}
                duration={2.5}
                separator="."
              />
            </Typography>
            <Typography color="textSecondary">
              {moment(lastUpdate).format(MOMENT_FORMAT)},{" "}
              {moment(lastUpdate).fromNow()}
            </Typography>
            <Typography variant="body2">
              Number of deaths caused by COVID-19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
}
