import { Fab } from '@material-ui/core';
import React from 'react';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
export function Upload(props) {
  return (
    <div>
      <label htmlFor="upload">
        <input
          style={{ display: 'none' }}
          id="upload"
          name="upload"
          type="file"
        />

        <Fab
          color="secondary"
          size="small"
          component="span"
          aria-label="add"
          variant="extended"
        >
          <AddAPhotoIcon />
          {props.buttonTitle}
        </Fab>
      </label>
    </div>
  );
}
