import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Gallery from 'react-photo-gallery';
import { useParams } from 'react-router-dom';
import Secured from '../../../security/secured.wrapper';
import ShopService from '../../../service/shop.service';
import { GALLERY_VISUALIZATION_MODE } from '../../../utils/constants';
import { ROLE_PROFESSIONAL } from '../../../utils/roles.constants';
import ImageViewerDialog from '../../dialog/img-viewer.dialog';
import SelectedImage from './selected-img';
/**
 *
 * @param {*} param0
 */
export default function MyGallery({
  metadata,
  mode,
  updateSelected,
  inMemory = false,
}) {
  // current image to open
  const [currentImage, setCurrentImage] = useState(0);
  // viewer image is open
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  // shop id
  const { id } = useParams();
  // set of picture
  const [pictures, setPicture] = useState([]);
  // TODO ajouter séléctionner tout
  const [selectAll, setSelectAll] = useState(false);
  // translation hook
  const { t } = useTranslation();

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
  }, [metadata]);

  const dispalyAlert = () => {
    return (
      <Grid container className="flex jc-center">
        <Alert severity="warning">{t('feedback.noImages')}</Alert>
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
        const opt = {
          src: inMemory ? m.url : ShopService.buildImagePath(id, m.name),
          name: m.name,
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
