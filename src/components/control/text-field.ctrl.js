import { TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * @param props :
 * <pre>
 *   <code>
 *     {
 *       "name": "input name attribute",
 *       "props": "other props passed to target textfield"
 *     }
 *   </code
 * </pre>
 */
export default function TextFieldControl(props) {
  const { control, errors } = useFormContext();
  const { name } = props;
  const hasError = () => {
    console.log(errors);
    return !!errors[name];
  };
  const errorMsg = () => {
    if (errors[name] && errors[name].type && props.messages) {
      return props.messages[errors[name].type];
    }
  };

  return (
    <Controller
      name={props.name}
      as={<TextField />}
      control={control}
      error={hasError()}
      defaultValue={props.defaultValue ? props.defaultValue : ''}
      helperText={errorMsg()}
      {...props}
      rules={props.rules}
    />
  );
}
