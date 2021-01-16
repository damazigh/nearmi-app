import React, { useState } from 'react';

import {
  Divider,
  InputBase,
  Paper,
  IconButton,
  Grid,
  MenuItem,
  Chip,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LocationOn from '@material-ui/icons/LocationOn';
import { useTranslation } from 'react-i18next';
import './address.css';
import useSnackBars from '../snackbar/use-snackbar';
import AddressService from '../../service/address.service';
import Autocomplete from '../autocomplete/autocomplete';

export default function Address() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [addr, setAddr] = useState('');
  const { showSnack } = useSnackBars();
  /**
   * use navigator geolocaliation
   */
  const geolocate = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        AddressService.searchReverseLocalisation(
          pos.coords.longitude,
          pos.coords.latitude
        ).then((res) => {
          if (res.data.features && res.data.features.length > 0) {
            const feature = res.data.features[0];
            setAddr(feature.properties.label);
          } else {
            showSnack(t('feedback.unknownGeolocation'), 'warn');
          }
        });
      },
      () => {
        showSnack(t('feedback.userDeniedGeolocation'), 'error');
      }
    );
  };

  /**
   * when input trigger http call to autocomplete addresses
   * @param {*} e
   */
  const handleInput = (e) => {
    const val = e.target.value;
    setAddr(val);
    setAnchorEl(e.currentTarget);
    if (val && val.length > 5) {
      AddressService.searchLocalisation(e.target.value)
        .then((res) => {
          if (res && res.data.features) {
            setData(res.data.features);
            setOpen(true);
          }
        })
        .catch(() =>
          showSnack(t('feedback.searchAddressUnavailable', 'error'))
        );
    }
  };

  /**
   * handle popper close event (selection or dismiss event)
   * @param {*} item
   */
  const handleClose = (item) => {
    setAnchorEl(null);
    setOpen(false);
    setData([]);
    if (item && item.properties && item.properties.label) {
      setAddr(item.properties.label);
    }
  };
  /**
   * build menu item
   */
  const buildItems = () => {
    console.log(data.length);
    const result = [];
    data.forEach((item) => {
      result.push(
        <MenuItem onClick={() => handleClose(item)}>
          {item.properties.label}
        </MenuItem>
      );
    });
    return result;
  };

  /**
   * reset search field
   */
  const handleDeleteChip = () => {
    setAddr('');
    if (open) {
      setOpen(false);
      setData([]);
      setAnchorEl(null);
    }
  };
  /**
   * render function
   */
  return (
    <Grid className="root">
      <div className="flex jc-center">
        {(() => {
          if (addr) {
            return (
              <Chip label={addr} onDelete={handleDeleteChip} color="primary" />
            );
          }
        })()}
      </div>
      <Paper elevation={5} className="m-t-alt1">
        <div className="flex addr">
          <InputBase
            id="input-addr"
            className="input"
            placeholder={t('pages.main.seachAddrPlaceholder')}
            inputProps={{
              'aria-label': t('pages.main.seachAddrPlaceholder'),
            }}
            value={addr}
            onInput={handleInput}
          />
          {(() => {
            if (navigator.geolocation) {
              return (
                <IconButton
                  type="submit"
                  color="primary"
                  aria-label={t('pages.main.geoLocateBtnTitle')}
                  title={t('pages.main.geoLocateBtnTitle')}
                  onClick={geolocate}
                >
                  <LocationOn />
                </IconButton>
              );
            }
          })()}

          <Divider className="divider-h" orientation="vertical" />

          <IconButton
            type="submit"
            color="primary"
            aria-label={t('pages.main.searchBtnTitle')}
            title={t('pages.main.searchBtnTitle')}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Paper>
      <div id="popper-container"></div>
      <div>
        <Autocomplete
          open={open}
          anchorEl={anchorEl}
          container={document.querySelector('#popper-container')}
          className="root"
        >
          {buildItems()}
        </Autocomplete>
      </div>
    </Grid>
  );
}
