import { Avatar, Chip, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { navigateToAnchor } from '../../utils/utils';
import { LoadingWrapper } from '../loading/loading';

export default function ListProduct({ detail }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingWrapper loading={isLoading}>
      <Grid container>
        {detail &&
          detail.productCategories &&
          detail.productCategories.map((pc) => (
            <div>
              <Grid item xs={12} md={12} sm={12}>
                <a id={pc.name} />
                <h1 className="h1">{pc.name}</h1>
              </Grid>
              <Grid item xs={12} md={12} sm={12}>
                <p>
                  On sait depuis longtemps que travailler avec du texte lisible
                  et contenant du sens est source de distractions, et empêche de
                  se concentrer sur la mise en page elle-même. L'avantage du
                  Lorem Ipsum sur un texte générique comme 'Du texte. Du texte.
                  Du texte.' est qu'il possède une distribution de lettres plus
                  ou moins normale, et en tout cas comparable avec celle du
                  français standard. De nombreuses suites logicielles de mise en
                  page ou éditeurs de sites Web ont fait du Lorem Ipsum leur
                  faux texte par défaut, et une recherche pour 'Lorem Ipsum'
                  vous conduira vers de nombreux sites qui n'en sont encore qu'à
                  leur phase de construction. Plusieurs versions sont apparues
                  avec le temps, parfois par accident, souvent
                  intentionnellement (histoire d'y rajouter de petits clins
                  d'oeil, voire des phrases embarassantes).
                </p>
              </Grid>
            </div>
          ))}
      </Grid>
    </LoadingWrapper>
  );
}
