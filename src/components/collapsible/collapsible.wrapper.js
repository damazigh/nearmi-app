import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function CollapsibleWrapper({ id, summary, children }) {
  return (
    <Accordion className="full-width">
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id={id}>
        <Typography variant="h5" component="h4">
          {summary}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

export function ControlledCollapsibleWrapper({
  id,
  summary,
  children,
  expanded,
  onChange,
}) {
  return (
    <Accordion expanded={expanded} className="full-width" onChange={onChange()}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id={id}>
        <Typography variant="h5" component="h4">
          {summary}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
