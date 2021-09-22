import React, { useContext } from 'react';
import { Button, Grid, Typography, Card, CardContent, CardActions } from '@material-ui/core';
import LinesEllipsis from 'react-lines-ellipsis';
import { UserContext } from '../app';

export default function SmallEventCard(props) {
  const contextValues = useContext(UserContext);
  const { classes } = contextValues;
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.smallcard}>
        <CardContent className={classes.smallCardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <LinesEllipsis
            className={classes.smallEllipsis}
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
