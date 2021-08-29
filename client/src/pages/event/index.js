import React from "react";
import styled from "styled-components/macro";
import Carousel from "react-material-ui-carousel";

import { Helmet } from "react-helmet-async";
import Comparison from "./Comparison";

import { Card as MuiCard, Box, Grid, CardMedia } from "@material-ui/core";
import YourContracts from "../../components/YourContracts";
import SuggestedEvents from "../events/SuggestedEvents";

const StyledCarousel = styled(Carousel)`
  .Carousel-button-28 {
    top: 15% !important;
  }
`;

const StyledImage = styled.img`
  position: absolute;
  border-radius: 4px;
  height: 280px;
  object-fit: cover;
  object-position: 50% 20%;
  width: 100%;
`;

const data = {
  description: "Heavyweight Interim Title Bout",
  video: "https://www.youtube.com/embed/VbYU54MYfF0",
  team1: {
    image: "/static/img/tourney/Lewis.png",
    firstName: "Derrick",
    lastName: "Lewis",
  },
  team2: {
    image: "/static/img/tourney/Gane.png",
    firstName: "Cyril",
    lastName: "Gane",
  },
  stats: {
    title: [
      "Win/Loss/Draw",
      "Fight Win Streak",
      "Wins By Knockout",
      "Wins By Submission",
      "Striking Accuracy",
      "Grappling Accuracy",
    ],
    team1: ["25-8-0", 4, 20, 1, "50%", "27%"],
    team2: ["9-0-0", 9, 3, 3, "55%", "22%"],
  },
};

const data2 = {
  description: "Bantamweight Bout",
  video: "https://www.youtube.com/embed/zvSYxU3DASA",
  team1: {
    image: "/static/img/tourney/aldo.png",
    firstName: "Jose",
    lastName: "Aldo",
  },
  team2: {
    image: "/static/img/tourney/munhoz.png",
    firstName: "Pedro",
    lastName: "Munhoz",
  },
  stats: {
    title: [
      "Win/Loss/Draw",
      "Fight Win Streak",
      "Wins By Knockout",
      "Wins By Submission",
      "Striking Accuracy",
      "Grappling Accuracy",
    ],
    team1: ["30-7-0", 2, 17, 1, "45%", "57%"],
    team2: ["19-6-0", 1, 5, 8, "44%", "21%"],
  },
};

function Event() {
  return (
    <Box position="relative">
      <Helmet title="Events" />

      <StyledImage src="/static/img/tourney/ufcstadium.jpg" alt="something" />

      <StyledCarousel
        timeout={0}
        autoPlay={false}
        navButtonsAlwaysVisible
        indicators={false}
      >
        <Comparison data={data} />
        <Comparison data={data2} />
      </StyledCarousel>

      <Box paddingX="20px">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <YourContracts title="Available Contracts" />
          </Grid>
        </Grid>

        <SuggestedEvents />
      </Box>
    </Box>
  );
}

export default Event;
