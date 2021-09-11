import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, Grid, Typography, Card, CardContent, CardActions } from '@material-ui/core';
import LinesEllipsis from 'react-lines-ellipsis';

const useStyles = makeStyles(theme => (
  {
    card: {
      height: '11rem'
    },

    cardContent: {
      height: '7.25rem'
    },

    ellipsis: {
      color: theme.palette.primary.main,
      fontSize: '1rem',
      fontWeight: '400'
    }
  }
));

export default function SmallEventCard(props) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <LinesEllipsis
            className={classes.ellipsis}
            text={props.description}
            maxLine='2'
            ellipsis='...'
            trimRight
            basedOn='letters'
          />
        </CardContent>
        <CardActions>
          <Grid container>
            <Grid item>
              <a href={`#events?eventId=${props.eventId}`}>
                <Button size="small" color="primary">
                  View
                </Button>
              </a>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
