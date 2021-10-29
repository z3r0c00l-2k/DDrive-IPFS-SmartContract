import { FC } from 'react';
import { AppBar, IconButton, Toolbar, Typography, Button } from '@mui/material';
import { StorageTwoTone } from '@mui/icons-material';
import { ReactComponent as StorageBox } from '../assets/bitcoin-storage.svg';
// import Identicon from 'identicon.js';
// import box from '../assets/box.png';

type Props = { account: string };

const Navbar: FC<Props> = ({ account }) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <StorageBox width={35} height={35} />
        <Typography variant='h6' component='div' sx={{ flexGrow: 1, ml: 2 }}>
          D-Drive
        </Typography>
        <Typography variant='body1' component='div'>
          {account || '0x0'}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
