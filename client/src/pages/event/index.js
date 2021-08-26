import React from "react";
import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";

import {
  Card,
  CardContent,
  Box,
  Divider as MuiDivider,
  Grid,
  Typography as MuiTypography,
} from "@material-ui/core";
import YourContracts from "../../components/YourContracts";

import { spacing } from "@material-ui/system";

const StyledImage = styled.img`
  color: orange;
  border-radius: 4px;
  height: 300px;
  object-fit: cover;
  object-position: 50% 20%;
  width: 100%;
  margin-bottom: 80px;
`;

const Typography = styled(MuiTypography)(spacing);

function Event() {
  return (
    <Box position="relative">
      <Helmet title="Events" />

      <StyledImage src="/static/img/tourney/ufcstadium.jpg" alt="something" />
      <Box position="absolute" top={275} left="50%">
        <Box position="relative" left="-50%" width="50vw">
          <Card>
            <CardContent>
              <Grid container justify="space-between" alignItems="flex-end">
                <Grid item xs={2}>
                  <Typography variant="h4" align="center">
                    -299
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="center">
                    UFC 265
                  </Typography>
                  <Typography variant="h3" align="center">
                    Lewis vs Gane
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h4" align="center">
                    200
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box padding="20px">
        <Card>
          <CardContent>
            <Typography>cool chart</Typography>
          </CardContent>
        </Card>
        <YourContracts filterEvent="UFC 265" />
      </Box>
    </Box>
  );
}

export default Event;
