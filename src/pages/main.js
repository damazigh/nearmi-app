import React, { useState } from 'react';

import {
  Divider,
  InputBase,
  Paper,
  IconButton,
  Grid,
  Fade,
  MenuItem,
  Menu,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LocationOn from '@material-ui/icons/LocationOn';
import './main.css';
import { useTranslation } from 'react-i18next';
import AddressService from '../service/address.service';

export default function Main() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  /**
   * use navigator geolocaliation
   */
  const geolocate = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log('success !');
        console.log(pos);
      },
      (err) => {
        console.log('error !');
        console.log(err);
      }
    );
  };

  /**
   * when input trigger http call to autocomplete addresses
   * @param {*} e
   */
  const handleInput = (e) => {
    const val = e.target.value;
    setAnchorEl(e.currentTarget);
    if (val && val.length > 5) {
      AddressService.searchLocalisation(e.target.value).then((res) => {
        if (res && res.data.features) {
          setData(res.data.features);
          setOpen(true);
          console.log(data);
        }
      });
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    setData([]);
  };
  const buildItems = () => {
    console.log(data.length);
    const result = [];
    data.forEach((item) => {
      result.push(
        <MenuItem onClick={handleClose}>{item.properties.label}</MenuItem>
      );
    });
    return result;
  };
  return (
    <Grid xs={12}>
      <Paper elevation={5} className="root">
        <div className="flex addr">
          <InputBase
            id="input-addr"
            className="input"
            placeholder={t('pages.main.seachAddrPlaceholder')}
            inputProps={{
              'aria-label': t('pages.main.seachAddrPlaceholder'),
            }}
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
      <div>
        <Menu
          id="menu-addr"
          className="addr-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {buildItems()}
        </Menu>
      </div>
    </Grid>
  );
}
