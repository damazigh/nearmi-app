import { Button, Paper } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useHistory } from 'react-router-dom';
import { rangeRandom } from '../../utils/utils';
import './tips.css';

export default function Tips() {
  const history = useHistory();
  const TIPS = [
    {
      name: 'Créer un magasin',
      description: 'Ajouter une nouvelle boutique à votre espace en ligne',
      link: '/shop/create',
    },
    {
      name: 'Gérer votre profil',
      description: 'Gérer vos boutique, ajouter des photos, des produits...',
      link: '/profile',
    },
    {
      name: 'pour que yacine apprenne à coder',
      description:
        "c'est pas qu'il ne sait pas coder c'est juste qu'il est pas motivé à bosser",
      link: 'www.perdu.com',
    },
  ];

  const colors = ['#C9A27E', '#CE7E78', '#7D85B1', '#64ACC8'];

  const randomColor = (idx) => {
    if (idx < colors.length) {
      return colors[idx];
    } else {
      return colors[idx % colors.length];
    }
  };

  return (
    <div style={{ marginTop: '50px', color: '#494949' }}>
      <Carousel
        className="tips"
        autoPlay={false}
        animation="slide"
        timeout={500}
      >
        {TIPS.map((tip, index) => (
          <Paper
            className="Project"
            style={{
              backgroundColor: randomColor(index),
            }}
            elevation={10}
          >
            <h2>{tip.name}</h2>
            <p>{tip.description}</p>

            <Button
              className="CheckButton"
              onClick={() => history.push(tip.link)}
            >
              Try it now!
            </Button>
          </Paper>
        ))}
      </Carousel>
    </div>
  );
}
