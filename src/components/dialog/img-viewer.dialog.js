import React, { useState, useEffect } from 'react';
import { ButtonBase, Dialog, Grow } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './dialog.css';
import { LoadingWrapper } from '../loading/loading';

function transition(p) {
  return <Grow {...p} />;
}
export default function ImageViewerDialog({ isOpen, imgSrc, onClose }) {
  const [loading, setLoading] = useState(false);

  const test = () => {};
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

        <LoadingWrapper loading={loading}>
          <img
            src={imgSrc}
            onloadend={() => console.info('end loading')}
            onloadstart={() => console.info('load start')}
            className="full-width full-height img-v-mw"
          />
        </LoadingWrapper>
      </div>
    </Dialog>
  );
}
