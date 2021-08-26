import React from "react";
import styled from "styled-components/macro";

import {
  Box,
  Card as MuiCard,
  CardMedia as MuiCardMedia,
  Grid,
  Typography as MuiTypography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Typography = styled(MuiTypography)(spacing);

const Card = styled(MuiCard)(spacing);

const TallCard = styled(Card)`
  height: 100%;
  position: relative;
  transition: all 1s;
  &:hover {
    h4 {
      visibility: visible;
    }
  }
`;

const PopularCardMedia = styled(MuiCardMedia)`
  height: 150px;
  width: 100%;
  transition: all 0.5s;
  &:hover {
    filter: brightness(50%);
    transform: scale(1.2);
  }
`;

const PopularTypography = styled(Typography)`
  visibility: hidden;
  text-align: center;
  pointer-events: none;
  position: relative;
  left: -50%;
  z-index: 40;
`;

function PopularSports() {
  const popularSports = [
    {
      title: "UFC",
      img: "/static/img/popular/ufc.jpeg",
    },
    {
      title: "Soccer",
      img: "/static/img/popular/soccer.jpeg",
    },
    {
      title: "Baseball",
      img: "/static/img/popular/baseball.jpeg",
    },
    {
      title: "Rocket League",
      img: "/static/img/popular/rocketleague3.webp",
    },
    {
      title: "Football",
      img: "/static/img/popular/football.webp",
    },
  ];

  return (
    <React.Fragment>
      {popularSports.map(({ title, img }) => {
        return (
          <Grid item xs={4}>
            <TallCard>
              <Box position="absolute" left="50%" bottom="40%">
                <PopularTypography variant="h4">{title}</PopularTypography>
              </Box>
              <PopularCardMedia image={img} position="absolute" />
            </TallCard>
          </Grid>
        );
      })}
    </React.Fragment>
  );
}

export default PopularSports;
