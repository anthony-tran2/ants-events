import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Grid, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SmallEventCard from '../components/small-event-card';
import { UserContext } from '../app';

const useStyles = makeStyles(theme => (
  {
    root: {
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px'
      }
    },

    heading: {
      fontSize: '2.5rem',
      fontWeight: '300',
      marginTop: '0.35em'
    },

    cardgrid: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4)
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

export default function SearchPage() {

  const [keyword, setKeyword] = useState('');
  const [searched, setSearched] = useState(false);
  const [eventList, setEventList] = useState(null);
  const contextValues = useContext(UserContext);

  const onChange = e => {
    setKeyword(e.target.value);
  };

  const handleMouseDown = e => {
    e.preventDefault();
  };

  const search = () => {
    if (keyword === '') {
      setEventList(null);
      return setSearched(false);
    }
    fetch(`/api/search/${keyword}`, { headers: { authorization: contextValues.token } })
      .then(result => result.json())
      .then(result => {
        if (!result[0]) {
          setEventList(null);
          return setSearched(false);
        }
        setSearched(true);
        setEventList(result);
      });
  };

  const classes = useStyles();

  if (!contextValues.token) {
    window.location.hash = '#sign-in';
    return null;
  }
  return (
    <>
    <main>
        <Container maxWidth="lg">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.heading}>
          Search
        </Typography>
          <Grid container justifyContent='center'>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='off'
                type='text'
                onChange={onChange}
                fullWidth
                variant="outlined"
                color="secondary"
                id='search'
                value={keyword}
                className={classes.root}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                          aria-label="search submit"
                          onClick={search}
                          onMouseDown={handleMouseDown}
                          edge="end"
                        >
                          <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
          {eventList &&
             <Grid container spacing={4} className={classes.cardgrid}>
              {eventList.map(event => <SmallEventCard key={event.eventId} eventId={event.eventId} title={event.title} description={event.description} />)}
            </Grid>
          }
             {!searched &&
               <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className={classes.heading}>
                No results found.
              </Typography>}
        </Container>
    </main>
    </>
  );

}
