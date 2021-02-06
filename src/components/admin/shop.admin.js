import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import VisibilityIcon from '@material-ui/icons/Visibility';
import '../../utils/table.responsive.css';
import { useTranslation } from 'react-i18next';
import ShopService from '../../service/shop.service';
import { LoadingWrapper } from '../loading/loading';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/**
 * shops list that belongs to connected user
 */
export default function ShopAdminList(props) {
  const { t } = useTranslation();
  const [shops, setShops] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    ShopService.usersShop().then((res) => setShops(res.data));
  }, []);

  const view = (id) => {
    history.push(`/shop/${id}`);
  };

  const buildBodyItem = () => {
    const res = [];
    if (shops) {
      for (let i in shops) {
        const item = (
          <TableRow key={i}>
            <TableCell
              data-label={t('pages.profile.components.shopAdminList.regNumber')}
            >
              {shops[i].registrationNumber}
            </TableCell>
            <TableCell
              data-label={t('pages.profile.components.shopAdminList.name')}
            >
              {shops[i].name}
            </TableCell>
            <TableCell
              data-label={t('pages.profile.components.shopAdminList.created')}
            >
              {shops[i].created}
            </TableCell>
            <TableCell
              data-label={t('pages.profile.components.shopAdminList.shortDesc')}
            >
              {shops[i].shortDescription}
            </TableCell>
            <TableCell data-label={t('actions.view')}>
              <VisibilityIcon
                color="primary"
                fontSize="small"
                className="pointer icon-effect"
                onClick={(e) => view(shops[i].id)}
              />
            </TableCell>
            <TableCell data-label={t('actions.delete')}>
              <DeleteForeverIcon
                color="primary"
                fontSize="small"
                className="pointer icon-effect"
              />
            </TableCell>
          </TableRow>
        );
        res.push(item);
      }
    }
    return res;
  };

  return (
    <>
      <LoadingWrapper loading={!shops || shops.length === 0}>
        <TableContainer component="div" className="full-width">
          <Table aria-label="user's shop">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  {t('pages.profile.components.shopAdminList.regNumber')}
                </TableCell>
                <TableCell align="left">
                  {t('pages.profile.components.shopAdminList.name')}
                </TableCell>
                <TableCell align="left">
                  {t('pages.profile.components.shopAdminList.created')}
                </TableCell>
                <TableCell align="left">
                  {t('pages.profile.components.shopAdminList.shortDesc')}
                </TableCell>
                <TableCell align="left">{t('actions.view')}</TableCell>
                <TableCell align="left">{t('actions.delete')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{buildBodyItem()}</TableBody>
          </Table>
        </TableContainer>
      </LoadingWrapper>
    </>
  );
}
