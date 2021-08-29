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
  transition: all 0.5s;
  border-bottom: 1px solid ${(props) => props.theme.palette.grey[300]};
  &:hover {
    h3 {
      visibility: visible;
    }
  }
`;

const PopularCardMedia = styled(MuiCardMedia)`
  height: 150px;
  width: 100%;
  transition: all 0.5s;
  filter: brightness(80%);
  &:hover {
    filter: brightness(40%) blur(1px);
    transform: scale(1.2);
  }
`;

const StyledTypography = styled(Typography)`
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
                <StyledTypography textOverflow="ellipsis" noWrap variant="h3">
                  {title}
                </StyledTypography>
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
