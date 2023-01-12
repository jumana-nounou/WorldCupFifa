import TicketCard from "./TicketCard";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from "@material-ui/core/";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));
function Tickets({ tickets }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {tickets.map((ticket) => (
          <Grid item md={3} sm={6}>
            <TicketCard key={ticket.matchNumber} {...ticket} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Tickets;
