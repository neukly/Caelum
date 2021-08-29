import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardMedia as MuiCardMedia,
  Divider as MuiDivider,
  Grid,
  Typography as MuiTypography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)``;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.palette.text.primary};
  text-decoration: ${(props) => (props.title ? "none" : "")};
`;

const CardMedia = styled(MuiCardMedia)`
  height: 300px;
`;

function Event({ image, title, description }) {
  return (
    <Card mb={6}>
      {image ? <CardMedia image={image} title="Contemplative Reptile" /> : null}
      <CardContent>
        <Typography gutterBottom variant="h4" component="h2">
          <StyledLink title to="/events/ufc256">
            {title}
          </StyledLink>
        </Typography>

        <Typography component="p">
          {description} <StyledLink to="/events/ufc256">More..</StyledLink>
        </Typography>
      </CardContent>
    </Card>
  );
}

function Events() {
  return (
    <>
      <Typography variant="h4" gutterBottom display="inline">
        Events we think you'll like
      </Typography>

      <Divider my={2} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Event
            title="UFC 265"
            description="Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa."
            image="/static/img/tourney/ufc2.jpeg"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Event
            title="CSGO: ICE Challenge"
            description="Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris."
            image="/static/img/tourney/csgo1.jpeg"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Event
            title="EVO 2021"
            description="Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum."
            image="/static/img/tourney/evo2.png"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Events;
