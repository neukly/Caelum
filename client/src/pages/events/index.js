import React from "react";
import styled from "styled-components/macro";

import { Helmet } from "react-helmet-async";

import {
  Box,
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardMedia as MuiCardMedia,
  Divider as MuiDivider,
  Grid,
  Hidden,
  Typography as MuiTypography,
} from "@material-ui/core";
import YourContracts from "../../components/YourContracts";
import Stats from "./Stats";
import Carousel from "react-material-ui-carousel";

import { green } from "@material-ui/core/colors";
import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const TallCard = styled(Card)`
  height: 100%;
  // border-bottom: 1px solid ${(props) => props.theme.palette.grey[300]};
`;

const CardContent = styled(MuiCardContent)`
  // border-bottom: 1px solid ${(props) => props.theme.palette.grey[300]};
`;

const CardMedia = styled(MuiCardMedia)`
  height: 300px;
`;

const TitleMedia = styled(MuiCardMedia)`
  height: 370px;
`;

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

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

function Title() {
  const spacing = 4;
  const ust = 12398;
  const weeklyBets = 2532490;
  return (
    <React.Fragment>
      <Helmet title="Events" />

      <Grid container spacing={spacing}>
        <Grid item xs={12}>
          <Box mb={6}>
            <Typography variant="h4" gutterBottom display="inline">
              Featured
            </Typography>

            <Divider my={2} />

            <Carousel>
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
          </Box>
        </Grid>

        <Grid item container xs={12} sm={6} direction="column">
          <Grid item>
            <Box mb={spacing}>
              <Stats
                title="Weekly Bets Placed"
                amount={weeklyBets.toLocaleString()}
                percentageText="+26%"
                percentagecolor={green[500]}
              />
            </Box>
          </Grid>
          <Grid item>
            <Stats
              title="Total Claimable Rewards"
              amount={`${ust.toLocaleString()} UST`}
              buttonText="Claim Rewards"
              onClick={() => console.log("reward claimed")}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} sm={6}>
          <Grid item xs={12}>
            <TallCard>
              <MuiCardContent>
                <Typography variant="h4">Wallet stats</Typography>
                <Typography>amount available ust?</Typography>
                <Typography>total money locked in caelum</Typography>
                <Typography>Next closest bet result countdown 2:00</Typography>
                <Typography>
                  I'm baby hammock prism tousled, selfies fashion axe yr
                  scenester ennui shaman poutine copper mug mustache pickled.
                  Ethical banh mi waistcoat man braid, poutine squid coloring
                  book la croix sriracha helvetica chillwave raclette distillery
                  truffaut. Marfa prism williamsburg iPhone typewriter
                </Typography>
              </MuiCardContent>
            </TallCard>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <YourContracts />
        </Grid>
        <Grid item xs={12}>
          <Events />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Title;
