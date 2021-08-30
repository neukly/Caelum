import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Card as MuiCard,
  CardContent,
  Box,
  Grid,
  Hidden,
  Typography as MuiTypography,
  CardMedia,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import FightStats from "./FightStats";

const StyledPerson = styled.img`
	transform ${(props) => (props.reverse ? "scaleX(-1)" : "")};
  height: 300px;
  transition: all 0.8s;
  z-index: 5;
  opacity: ${(props) => (props.isVisible ? "100%" : "0%")};
`;

const StyledCardMedia = styled(CardMedia)`
  border: 0;
`;

const Card = styled(MuiCard)(spacing);

const Typography = styled(MuiTypography)(spacing);

// maybe add type checking later for this giant obj and rest of app
function Event({ data }) {
  const [isVisible, setIsVisible] = useState(false);
  const isXSScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <>
      <Box position="relative" overflow="hidden" mb={20} height="280px">
        <Hidden xsDown>
          {/* TODO cant use left/right percentages for larger screens */}
          <Box position="absolute" top="50px" left="10%">
            <StyledPerson
              isVisible={isVisible}
              src={data.team1.image}
              alt={data.team1.lastName}
            />
          </Box>
          <Box position="absolute" top="50px" right="10%">
            <StyledPerson
              reverse
              isVisible={isVisible}
              src={data.team2.image}
              alt={data.team2.lastName}
            />
          </Box>
        </Hidden>
      </Box>

      <Box position="absolute" top={250} left="50%">
        {/* TODO this title does not scale with longer names */}
        <Box position="relative" left="-50%" minWidth="500px">
          <Card>
            <CardContent>
              <Grid
                container
                justify="space-between"
                alignItems={isXSScreen ? "center" : "flex-end"}
                direction={isXSScreen ? "column" : "row"}
              >
                <Grid item xs={2}>
                  <Hidden xsDown>
                    <Typography variant="body1" align="center">
                      {data.team1.firstName}
                    </Typography>
                    <Typography variant="h4" align="center">
                      {data.team1.lastName}
                    </Typography>
                  </Hidden>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="center">
                    August 7th, 9:00PM
                  </Typography>
                  <Typography variant="h3" align="center">
                    UFC 265
                  </Typography>
                  <Typography variant="body2" align="center" noWrap>
                    {data.description}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Hidden xsDown>
                    <Typography variant="body1" align="center">
                      {data.team2.firstName}
                    </Typography>
                    <Typography variant="h4" align="center">
                      {data.team2.lastName}
                    </Typography>
                  </Hidden>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box paddingX="20px" paddingY="10px">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} lg={5}>
            <FightStats
              stats={data.stats}
              team1={data.team1.lastName}
              team2={data.team2.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={7}>
            <Hidden xsDown>
              <Card>
                <StyledCardMedia
                  component="iframe"
                  height="335"
                  image={data.video}
                  title="Contemplative Reptile"
                ></StyledCardMedia>
              </Card>
            </Hidden>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Event;
