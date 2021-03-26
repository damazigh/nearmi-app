import React from 'react';
import { ButtonBase, Dialog, Grow } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './dialog.css';

function transition(p) {
  return <Grow {...p} />;
}
export default function ImageViewerDialog({ isOpen, imgSrc, onClose }) {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={transition}
      keepMounted
      className="no-padding"
    >
      <div className="flex fd-column flex-end">
        <div className="w-auto fixed">
          <ButtonBase className="">
            <CloseIcon onClick={(e) => onClose()} fontSize="large" />
          </ButtonBase>
        </div>

        <img src={imgSrc} className="full-width full-height img-v-mw" />
      </div>
    </Dialog>
  );
}
