import { useContext } from 'react';

import { SnackBarContext } from './snackbar-provider';

const useSnackBars = () => useContext(SnackBarContext);

export default useSnackBars;
