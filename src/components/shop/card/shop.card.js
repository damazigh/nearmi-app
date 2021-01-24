import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

import './shop.card.css';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function ShopCard(props) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  const classes = useStyles();
  const hasDescription = () => {
    return !!props.item.description;
  };

  return (
    <Grid item xs={12} md={4} sm={4} elevation={8}>
      <div className="full-height test">
        <Card className="card-height">
          <CardActionArea>
            <CardMedia
              title="presentation image"
              image="/image-test.jpg"
              className="img-height"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.item.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.item.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions disableSpacing>
            {(() => {
              if (hasDescription()) {
                return (
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={() => setExpanded(!expanded)}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                );
              }
            })()}
          </CardActions>
          <CardContent className="no-vertical-padding">
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography paragraph>{props.item.description}</Typography>
            </Collapse>
          </CardContent>
        </Card>
      </div>
    </Grid>
  );
}
