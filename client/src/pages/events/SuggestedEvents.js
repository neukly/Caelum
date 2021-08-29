import React from "react";
import styled from "styled-components/macro";

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

const CardMedia = styled(MuiCardMedia)`
  height: 300px;
`;

function Event({ image, title, description }) {
  return (
    <Card mb={6}>
      {image ? <CardMedia image={image} title="Contemplative Reptile" /> : null}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>

        <Typography component="p">{description}</Typography>
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
            title="Refactor backend templates"
            description="Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa."
            image="/static/img/tourney/ufc2.jpeg"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Event
            title="Upgrade to latest Maps API"
            description="Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris."
            image="/static/img/tourney/csgo1.webp"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Event
            title="New company logo"
            description="Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum."
            image="/static/img/tourney/evo2.png"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Events;
