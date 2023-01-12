import React, { Component, Fragment } from "react";
import { Typography } from "@mui/material";

export default function Analytics(props) {
  const { percentages } = props;
  const styles = { analytics: { fontFamily: "Helvetica Neue", color: "blue" } };

  return (
    <div>
      <Typography sx={styles.analytics}>
        The PERCENTAGE of ALL PENDING Tickets is {percentages[0]} %{" "}
      </Typography>
      <br />
      <Typography sx={styles.analytics}>
        The PERCENTAGE of ALL CANCELLED Tickets is {percentages[1]} %{" "}
      </Typography>
      <br />
      <Typography sx={styles.analytics}>
        The PERCENTAGE of ALL RESERVED Tickets is {percentages[2]} %{" "}
      </Typography>
      <br />
      <Typography sx={styles.analytics}>
        The PERCENTAGE of PENDING Tickets in CATEGORY 1 is {percentages[3]} %{" "}
      </Typography>
      <br />
      <Typography sx={styles.analytics}>
        The PERCENTAGE of CANCELLED Tickets in CATEGORY 1 is {percentages[4]} %{" "}
      </Typography>
      <br />
      <Typography sx={styles.analytics}>
        The PERCENTAGE of RESERVED Tickets in CATEGORY 1 is {percentages[5]} %{" "}
      </Typography>
      <br />
      <Typography sx={styles.analytics}>
        The PERCENTAGE of PENDING Tickets in CATEGORY 2 is {percentages[6]} %{" "}
      </Typography>
      <br />
      <Typography sx={styles.analytics}>
        The PERCENTAGE of CANCELLED Tickets in CATEGORY 2 is {percentages[7]} %{" "}
      </Typography>
      <br />
      <Typography sx={styles.analytics}>
        The PERCENTAGE of RESERVED Tickets in CATEGORY 2 is {percentages[8]} %{" "}
      </Typography>
      <br />
      <Typography sx={styles.analytics}>
        The PERCENTAGE of PENDING Tickets in CATEGORY 3 is {percentages[9]} %{" "}
      </Typography>
      <br />
      <Typography sx={styles.analytics}>
        The PERCENTAGE of CANCELLED Tickets in CATEGORY 3 is {percentages[10]} %{" "}
      </Typography>
      <br />
      <Typography sx={styles.analytics}>
        The PERCENTAGE of RESERVED Tickets in CATEGORY 3 is {percentages[11]} %{" "}
      </Typography>
      <br />
    </div>
  );
}

export async function getStaticProps({ params = {} }) {
  const response = await fetch(
    "https://analytics-microservice.vercel.app/api/analytics/percentages"
  );
  const data = await response.text();
  console.log(data);
  const percentages = JSON.parse(data);
  return {
    props: {
      percentages,
    },
  };
}
