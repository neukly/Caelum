import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import {
  Container,
  Grid,
  Button,
  Typography as MuiTypography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Typography = styled(MuiTypography)(spacing);

const Wrapper = styled.div`
  padding-top: 3.5rem;
  position: relative;
  text-align: center;
  overflow: hidden;
`;

const Content = styled.div`
  padding: ${(props) => props.theme.spacing(6)}px 0;
  line-height: 150%;
`;

const Title = styled(Typography)`
  opacity: 0.9;
  line-height: 1.4;
  font-size: 1.75rem;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};

  ${(props) => props.theme.breakpoints.up("sm")} {
    font-size: 2rem;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    font-size: 2.5rem;
  }

  span {
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

const Subtitle = styled(Typography)`
  font-size: ${(props) => props.theme.typography.h6.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  font-family: ${(props) => props.theme.typography.fontFamily};
  margin: ${(props) => props.theme.spacing(2)}px 0;
`;

function Introduction() {
  return (
    <Wrapper>
      <Container>
        <Grid container alignItems="center" justify="center" spacing={4}>
          <Grid item xs={12} sm={9} md={8} lg={7}>
            <Content>
              <Title variant="h1" gutterBottom>
                Caelum Protocol
              </Title>
              <Grid container justify="center" spacing={4}>
                <Grid item xs={12} lg={10}>
                  <Subtitle color="textSecondary">
                    Descriptions of features. 8-bit man bun vegan affogato
                    stumptown fixie four dollar toast. Pabst jianbing YOLO
                    sriracha before they sold out echo park, blue bottle poke
                    vape. Synth kombucha mlkshk, cronut chicharrones biodiesel
                    four loko fingerstache banh mi PBR&B. Photo booth neutra pok
                  </Subtitle>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/events"
              >
                Go to app
              </Button>
            </Content>
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
}

export default Introduction;
