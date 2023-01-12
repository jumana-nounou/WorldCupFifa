import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Button,
  CardActions,
  Card,
  Grid,
  CardMedia,
  Typography,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  IconButton,
} from "@mui/material";
import countries from "./countries.json";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
function getFlag(country, data) {
  for (let i = 0; i < data.countries.length; i++) {
    if (country == data.countries[i].countryname)
      return data.countries[i].countryimg;
  }
}

function TicketCard({
  matchNumber,
  roundNumber,
  dateUtc,
  location,
  availability,
  homeTeam,
  awayTeam,
  group,
}) {
  const router = useRouter();

  const [category, setCategory] = React.useState("");
  const [quantity, setQuantity] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleChange1 = (event) => {
    setQuantity(event.target.value);
  };

  //const [date, time] = dateUtc.split("T");
  //let Time = time.substr(0, 5);
  const styles = {
    countries: {
      //  fontFamily: "Oswald",
      fontSize: 16,
      fontWeight: 700,
      fontStyle: "normal",
    },
    stadium: {
      fontFamily: "Oswald",
      fontSize: 20,
      fontWeight: 400,
      fontStyle: "normal",
    },
    buy: {
      fontFamily: "Rubik",
      fontSize: 12,
      fontWeight: 400,
      fontStyle: "normal",
    },
  };
  return (
    <div>
      <Card
        sx={{
          maxWidth: "100%",
          minWidth: "100%",
          maxHeight: "100%",
          minHeight: "100%",
        }}
      >
        <Grid container pt={2}>
          <Grid item md={8} sm={8} pl={1}>
            {location}
          </Grid>
          <Grid item md={4} sm={4} textAlign="left">
            {dateUtc}
          </Grid>

          <Grid item md={4} sm={4} pl={1} pt={1}>
            <CardMedia
              component="img"
              image={getFlag(homeTeam, countries)}
              sx={{
                alignItems: "left",
                maxWidth: "100%",
                minWidth: "100%",
                maxHeight: "100%",
                minHeight: "100%",
              }}
            />
          </Grid>
          <Grid
            item
            md={4}
            sm={4}
            sx={{
              textAlign: "center",
              pt: 1.5,
            }}
          >
            <Grid container>
              <Grid item md={12} sm={12} pb={1}>
                {/* {Time} */}
              </Grid>
              <Grid item md={12} sm={12} pt={1}>
                {group}
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} sm={4} pr={1} pt={1}>
            <CardMedia
              component="img"
              image={getFlag(awayTeam, countries)}
              sx={{
                alignItems: "left",
                maxWidth: "100%",
                minWidth: "100%",
                maxHeight: "100%",
                minHeight: "100%",
              }}
            />
          </Grid>

          <Grid item md={3} sm={3} pl={1} textAlign="center">
            <Typography sx={styles.countries}>{homeTeam}</Typography>
          </Grid>
          <Grid item md={6} sm={6} />
          <Grid item md={3} sm={3} pr={1} textAlign="center">
            <Typography sx={styles.countries}>{awayTeam}</Typography>
          </Grid>

          <Grid item md={8} sm={8} pt={1} pl={1}>
            <FormControl>
              <Select
                required
                value={category}
                onChange={handleChange}
                sx={{ maxHeight: 30, maxWidth: 180 }}
              >
                <MenuItem value={"category1"}>
                  category1: {availability.category1.price} LE
                </MenuItem>
                <MenuItem value={"category2"}>
                  category2: {availability.category2.price} LE
                </MenuItem>
                <MenuItem value={"category3"}>
                  category3: {availability.category3.price} LE
                </MenuItem>
              </Select>
              <FormHelperText> Price based on category</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item md={1} sm={1} pt={1} />
          <Grid item md={3} sm={3} pr={1} pt={1}>
            <FormControl>
              <Select
                required
                value={quantity}
                onChange={handleChange1}
                sx={{ maxHeight: 30, maxWidth: 60 }}
              >
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
              </Select>
              <FormHelperText>Quantity</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <CardActions>
          <Button
            size="small"
            color="success"
            onClick={() => {
              router.push({
                pathname: `/payments`,
                query: {
                  match: `${matchNumber}`,
                  category: category,
                  quantity: quantity,
                },
              });
              axios.patch(
                `https://shopmicroservice-wblx.vercel.app/api/pendingTicket/${matchNumber}/${category}/${quantity}`
              );
            }}
          >
            Buy <CreditScoreIcon />
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default TicketCard;
