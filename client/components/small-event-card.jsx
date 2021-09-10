import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, Grid, Typography, Card, CardContent, CardActions } from '@material-ui/core';
import LinesEllipsis from 'react-lines-ellipsis';

const useStyles = makeStyles(theme => (
  {
    cardgrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8)
    },

    card: {
      height: '11rem',
      display: 'flex',
      flexDirection: 'column'
    },

    cardContent: {
      flexGrow: 1,
      maxHeight: '8rem'
    },

    ellipsis: {
      color: theme.palette.primary.main,
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5',
      letterSpacing: '0.00938rem'
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
          <a>
            <Button size="small" color="primary">
              View
            </Button>
          </a>
        </CardActions>
      </Card>
    </Grid>
  );
}
