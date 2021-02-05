import React, { useEffect, useState } from 'react';
import Secured from '../../security/secured.wrapper';
import { ROLE_PROFESSIONAL } from '../../utils/roles.constants';
import { useSelector, useDispatch } from 'react-redux';
import AnchorDrawer from '../../components/drawer/anchor.drawer';
import { toolbarMenuIconDisplay } from '../../redux/action/account.action';
import { shouldDisplaytoolbarMenuIcon } from '../../redux/selector/account.selector';

export default function DetailShop() {
  const [detail, setDetail] = useState(null);
  const dispatch = useDispatch();
  const menuIconDisplayed = useSelector(shouldDisplaytoolbarMenuIcon);

  useEffect(() => {
    if (!menuIconDisplayed) {
      dispatch(toolbarMenuIconDisplay(true));
    }
  }, []);
  const buildTabItem = () => {
    // construire la liste des catégorie
  };
  const build = (txt, id) => {
    return { text: txt, id: id };
  };
  return (
    <>
      <Secured requiredRoles={[ROLE_PROFESSIONAL]}></Secured>
      <AnchorDrawer
        direction="bottom"
        items={[
          build('Catégorie 1', 'id1'),
          build('Catégorie 2', 'id2'),
          build('Catégorie 3', 'id3'),
          build('Catégorie 4', 'id4'),
        ]}
      />
    </>
  );
}
