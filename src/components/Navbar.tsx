import { FC } from 'react';
import {
  AppBar,
  Avatar,
  Link,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { ReactComponent as StorageBox } from '../assets/bitcoin-storage.svg';

type Props = { account: string };

const Navbar: FC<Props> = ({ account }) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <StorageBox width={35} height={35} />
        <Typography variant='h6' component='div' sx={{ flexGrow: 1, ml: 2 }}>
          D-Drive
        </Typography>
        <Tooltip title={account}>
          <Link
            href={`https://etherscan.io/address/${account}`}
            target='_blank'
            color='inherit'
          >
            {`${account.substring(0, 6)}...${account.substring(38, 42)}`}
          </Link>
        </Tooltip>
        <Avatar sx={{ ml: 2 }} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
