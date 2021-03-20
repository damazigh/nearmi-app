import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListIcon from '@material-ui/icons/List';
import ImageIcon from '@material-ui/icons/Image';
import CategoryIcon from '@material-ui/icons/Category';
import Gallery from '../images/gallery/gallery';
import ShopService from '../../service/shop.service';
import { useHistory } from 'react-router-dom';

export default function DetailProWrapper(props) {
  const [value, setValue] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (!props.detail) {
      history.push('/profile');
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const displayContent = () => {
    switch (value) {
      case 0:
        return <></>;
      case 1:
        return (
          <Gallery
            metadata={props.detail.metadata}
            buildSrc={ShopService.buildImagePath}
          />
        );
    }
  };

  return (
    <>
      <Paper square className="m-t-alt2 full-width">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="icon tabs example"
        >
          <Tab icon={<ListIcon />} aria-label="phone" />
          <Tab icon={<ImageIcon />} aria-label="favorite"></Tab>
          <Tab icon={<CategoryIcon />} aria-label="person" />
        </Tabs>
      </Paper>
      <div>{displayContent()}</div>
    </>
  );
}