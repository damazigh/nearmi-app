import React from 'react';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import TextFieldControl from '../control/text-field.ctrl';
export function Upload(props) {
  return (
    <div>
      <label htmlFor="upload">
        <input
          style={{ display: 'none' }}
          id={props.upload}
          name="upload"
          type="file"
        />

        <TextFieldControl
          className="pointer"
          label={props.label}
          name={props.name}
          className="full-width"
          InputProps={{
            endAdornment: <AddAPhotoIcon color="primary" className="pointer" />,
            readOnly: true,
          }}
        />
      </label>
    </div>
  );
}
