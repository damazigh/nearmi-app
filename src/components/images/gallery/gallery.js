import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useParams } from 'react-router-dom';
import './gallery.css';
import { rangeRandom } from '../../../utils/utils';

export default function Gallery(props) {
  const { id } = useParams();
  const displayContent = () => {
    const res = [];
    let actualSize;
    let nextBeakIndex = 0;
    if (props.metadata && props.metadata.length > 0) {
      const length = props.metadata.length;
      props.metadata.forEach((m, idx) => {
        // root => will take 100 % width
        if (m.root) {
          const item = (
            <Grid item xs={12} md={12}>
              <img src={props.buildSrc(id, m.name)} />
            </Grid>
          );
          res.push(item);
        } else {
          /**
           * if break line is detected (not applicable for root image) :
           * => generate a new grid size (either 6 | 4) and store until
           * new break point is detected
           */
          if (nextBeakIndex === 0 || nextBeakIndex === idx) {
            /**
             * if there is enough image always use six columns as size
             */
            const random = length >= 6 ? rangeRandom(1, 2) : 2;
            nextBeakIndex += (random === 2 ? 2 : 3) + 1;
            actualSize = random === 2 ? 6 : 4;
          }
          // push items into result array
          const item = (
            <Grid
              item
              xs={handleLastImage(idx, length, nextBeakIndex, actualSize)}
              md={handleLastImage(idx, length, nextBeakIndex, actualSize)}
            >
              <img src={props.buildSrc(id, m.name)} />
            </Grid>
          );
          res.push(item);
        }
      });
      return res;
    }
  };

  /**
   * if processed image is the last in the array this method will update its size
   * to fit left space
   * @param {*} idx actual index in array
   * @param {*} length image array's length
   * @param {*} nextBreakPoint next index when image gallery will break line
   * @param {*} actualSize calculated size (grid column) for processing image
   */
  const handleLastImage = (idx, length, nextBreakPoint, actualSize) => {
    if (idx === length - 1 && nextBreakPoint !== length - 1) {
      return actualSize * (nextBreakPoint - (idx + 1));
    }
    // no need to update size
    return actualSize;
  };

  /**
   * render function
   */
  return (
    <div>
      <Grid container xs={12} md={8} sm={10} className="m-auto">
        {displayContent()}
      </Grid>
    </div>
  );
}
