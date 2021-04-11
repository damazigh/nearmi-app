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
import { Alert } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import { reduce } from '../../../utils/utils';
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

  const dispalyAlert = () => {
    return (
      <Grid container className="flex jc-center">
        <Alert severity="warning">Aucune image enregistrée</Alert>
      </Grid>
    );
  };

  /**
   * build object photos passed to gallery component
   */
  const buildPhoto = () => {
    if (metadata && metadata.length > 0) {
      let i = 0;
      return metadata.map((m) => {
        const ratio = m.width / m.height;
        const opt = {
          src: ShopService.buildImagePath(id, m.name),
          name: m.name,
          aspectRatio: m.width / m.height,
          width: m.width,
          height: m.height,
        };
        i++;
        return opt;
      });
    }
    return [];
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
          {metadata && metadata.length ? (
            <>
              <Gallery
                direction="row"
                photos={pictures}
                onClick={openLightbox}
              />
              <ImageViewerDialog
                imgSrc={ShopService.buildImagePath(
                  id,
                  metadata[currentImage].name
                )}
                isOpen={viewerIsOpen}
                onClose={() => setViewerIsOpen(false)}
              />
            </>
          ) : (
            dispalyAlert()
          )}
        </>
      ) : (
        <Secured requiredRoles={[ROLE_PROFESSIONAL]}>
          {metadata && metadata.length > 0 ? (
            <Gallery
              direction="row"
              photos={pictures}
              renderImage={imageRenderer}
            />
          ) : (
            dispalyAlert()
          )}
        </Secured>
      )}
    </div>
  );
}
