import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";
import FightStats from "./FightStats";

import {
  Card as MuiCard,
  CardContent,
  Box,
  Grid,
  Hidden,
  Typography as MuiTypography,
  CardMedia,
} from "@material-ui/core";
import YourContracts from "../../components/YourContracts";

import { spacing } from "@material-ui/system";

const StyledImage = styled.img`
  border-radius: 4px;
  height: 300px;
  object-fit: cover;
  object-position: 50% 20%;
  width: 100%;
`;

const StyledPerson = styled.img`
  height: 300px;
  transition: all 0.5s;
  opacity: ${(props) => (props.isVisible ? "100%" : "0%")};
`;

const Card = styled(MuiCard)(spacing);

const StyledCardMedia = styled(CardMedia)`
  border: 0;
`;

const Typography = styled(MuiTypography)(spacing);

function Event() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <Box position="relative">
      <Helmet title="Events" />

      <Box position="relative" overflow="hidden" mb={18}>
        <StyledImage src="/static/img/tourney/ufcstadium.jpg" alt="something" />
        <Hidden xsDown>
          <Box position="absolute" top="50px" left="10%">
            <StyledPerson
              isVisible={isVisible}
              src="/static/img/tourney/Lewis.png"
              alt="lewis"
            />
          </Box>
          <Box position="absolute" top="50px" right="10%">
            <StyledPerson
              isVisible={isVisible}
              src="/static/img/tourney/Gane.png"
              alt="lewis"
            />
          </Box>
        </Hidden>
      </Box>

      <Box position="absolute" top={275} left="50%">
        <Box position="relative" left="-50%" width="50vw">
          <Card>
            <CardContent>
              <Grid container justify="space-between" alignItems="flex-end">
                <Grid item xs={2}>
                  <Typography variant="body1" align="center">
                    Derrick
                  </Typography>
                  <Typography variant="h4" align="center">
                    Lewis
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="center">
                    August 7th, 9:00PM
                  </Typography>
                  <Typography variant="h3" align="center">
                    UFC 265
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1" align="center">
                    Ciryl
                  </Typography>
                  <Typography variant="h4" align="center">
                    Gane
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box padding="20px">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} lg={4}>
            <FightStats />
          </Grid>
          <Grid item></Grid>
        </Grid>

        <Card my={8}>
          <StyledCardMedia
            component="iframe"
            height="400"
            image="https://www.youtube.com/embed/VbYU54MYfF0"
            title="Contemplative Reptile"
          ></StyledCardMedia>
        </Card>

        <YourContracts />
      </Box>
    </Box>
  );
}

export default Event;
