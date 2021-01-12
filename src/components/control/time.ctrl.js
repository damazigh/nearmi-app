import React from 'react';
import TextFieldControl from './text-field.ctrl';
export default function TimeControl(props) {
  return (
    <TextFieldControl
      type="time"
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, // 5 min
      }}
      {...props}
    />
  );
}
