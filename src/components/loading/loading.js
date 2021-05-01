import { CircularProgress, LinearProgress } from '@material-ui/core';
import React from 'react';

export function LinearLoading() {
  return <LinearProgress color="secondary" />;
}

export function LoadingWrapper(props) {
  return (
    <>
      {(() => {
        if (props.loading) {
          return (
            <div className="jc-center flex m-t-alt1 full-width">
              <CircularProgress color="secondary" />
            </div>
          );
        } else {
          return props.children;
        }
      })()}
    </>
  );
}

export function LoadingHiddenWrapper({ loading, children }) {
  return (
    <>
      {(() => {
        if (loading) {
          return (
            <div className="jc-center flex m-t-alt1 full-width">
              <CircularProgress color="secondary" />
              <div style={{ display: 'none' }}>{children}</div>
            </div>
          );
        } else {
          return children;
        }
      })()}
    </>
  );
}
