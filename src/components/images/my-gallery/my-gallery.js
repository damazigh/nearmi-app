import React, { useState, useCallback, useEffect } from 'react';
import ShopService from '../../../service/shop.service';
import { rangeRandom } from '../../../utils/utils';
import { useParams } from 'react-router-dom';
import Gallery from 'react-photo-gallery';
import ImageViewerDialog from '../../dialog/img-viewer.dialog';
import SelectedImage from './selected-img';
import { GALLERY_VISUALIZATION_MODE } from '../../../utils/constants';
import Secured from '../../../security/secured.wrapper';
import { ROLE_PROFESSIONAL } from '../../../utils/roles.constants';

/**
 *
 * @param {*} param0
 */
export default function MyGallery({ metadata, mode, updateSelected }) {
  // current image to open
  const [currentImage, setCurrentImage] = useState(0);
  // viewer image is open
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const { id } = useParams();
  const [pictures, setPicture] = useState([]);
  // const use to define height and width of image
  const CYCLE = 9;
  const [selectAll, setSelectAll] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  useEffect(() => {
    setPicture(buildPhoto());
    return () => {
      setCurrentImage(0);
      setPicture([]);
    };
  }, []);

  /**
   * build object photos passed to gallery component
   */
  const buildPhoto = () => {
    if (metadata && metadata.length > 0) {
      let i = 0;
      return metadata.map((m) => {
        let recalculatedIdx = i;
        if (i >= 9) {
          recalculatedIdx = i % CYCLE;
        }
        let h = 1,
          w = 1;
        if (recalculatedIdx === 0) {
          h = 5;
          w = 4;
        } else if (recalculatedIdx === 1) {
          w = 1;
          h = 1;
        } else if (
          (recalculatedIdx > 1 && recalculatedIdx < 5) ||
          recalculatedIdx === 6
        ) {
          w = rangeRandom(5, 7);
          h = rangeRandom(2, 3);
        } else {
          w = rangeRandom(2, 5);
          h = 3;
        }

        const opt = {
          src: ShopService.buildImagePath(id, m.name),
          width: w,
          height: h,
          name: m.name,
        };
        i++;
        return opt;
      });
    }
    return [];
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <SelectedImage
        selected={selectAll ? true : false}
        key={key}
        margin={'2px'}
        index={index}
        photo={photo}
        left={left}
        top={top}
        updateSelected={updateSelected}
      />
    ),
    [selectAll]
  );

  return (
    <div>
      {mode === GALLERY_VISUALIZATION_MODE ? (
        <>
          <Gallery direction="row" photos={pictures} onClick={openLightbox} />
          <ImageViewerDialog
            imgSrc={ShopService.buildImagePath(id, metadata[currentImage].name)}
            isOpen={viewerIsOpen}
            onClose={() => setViewerIsOpen(false)}
          />
        </>
      ) : (
        <Secured requiredRoles={[ROLE_PROFESSIONAL]}>
          <Gallery
            direction="row"
            photos={pictures}
            renderImage={imageRenderer}
          />
        </Secured>
      )}
    </div>
  );
}
