import { Grid, Button } from "@mui/material";
import * as React from "react";
import Tickets from "../components/Tickets";
import Image from "next/image";
import { useRouter } from "next/router";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";

function Home(props) {
  const { tickets } = props;
  const router = useRouter();

  if (!router.isFallback && !tickets && !matchNumber) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      <Grid container>
        <Grid item md={2} sm={2} />
        <Grid
          item
          md={8}
          sm={8}
          sx={{ justifyContent: "center", textAlign: "center" }}
        >
          <Image
            src="/fifa.png"
            alt="site logo"
            width="200"
            height="100"
            alignItems="center"
          />
        </Grid>
        <Grid item md={2} sm={2}>
          <Button
            sx={{ textTransform: "none", textDecorationColor: "white" }}
            size="large"
            onClick={() => {
              router.push({
                pathname: `/analytics`,
              });
            }}
          >
            <AnalyticsRoundedIcon color="#FFFFFFF" />
            Analytics
          </Button>
        </Grid>

        <Grid md={1} sm={1} />

        <Grid md={10} sm={10} fullWidth padding={3}>
          <Tickets tickets={tickets} />
        </Grid>

        <Grid md={1} sm={1} />
      </Grid>
    </div>
  );
}

export async function getStaticProps({ params = {} }) {
  const response = await fetch(
    "https://shopmicroservice-wblx.vercel.app/api/allTickets"
  );
  const data = await response.text();
  const tickets = JSON.parse(data);
  console.log("gggggggggggggg", tickets);
  return {
    props: {
      tickets,
    },
  };
}

export default Home;
