import React from 'react';
import { useHistory } from 'react-router-dom';
import Address from '../../components/address/address';

export default function Home() {
  const history = useHistory();

  const onSearch = () => {
    history.push('/shop');
  };
  return (
    <>
      <Address onSearch={onSearch} />
    </>
  );
}
