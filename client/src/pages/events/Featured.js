import React from "react";
import styled from "styled-components/macro";

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardMedia as MuiCardMedia,
  Grid,
} from "@material-ui/core";
import Carousel from "react-material-ui-carousel";

import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const TallCard = styled(Card)`
  height: 100%;
`;
const TitleMedia = styled(MuiCardMedia)`
  height: 370px;
`;

function Featured({ image, title, description }) {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={9}>
          <TitleMedia image={image} title="Title" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TallCard>
            <MuiCardContent>
              <h3>{title}</h3>
              <p>{description}</p>
            </MuiCardContent>
          </TallCard>
        </Grid>
      </Grid>
    </>
  );
}

function FeaturedCarousel() {
  return (
    <React.Fragment>
      <Carousel stopAutoPlayOnHover={false}>
        <Featured
          image="/static/img/tourney/worlds1.jpeg"
          title="New Company Logo"
          description="Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus,
                sem quam semper libero, sit amet adipiscing sem neque sed ipsum."
        />
        <Featured
          image="/static/img/tourney/preseason2.jpeg"
          title="New Company Logo"
          description="Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus,
                sem quam semper libero, sit amet adipiscing sem neque sed ipsum."
        />
        <Featured
          image="/static/img/tourney/starcraft.jpeg"
          title="New Company Logo"
          description="Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus,
                sem quam semper libero, sit amet adipiscing sem neque sed ipsum."
        />
      </Carousel>
    </React.Fragment>
  );
}

export default FeaturedCarousel;
