import { FC, useContext } from 'react';
import {
  AppBar,
  Avatar,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { ReactComponent as StorageBox } from '../assets/bitcoin-storage.svg';
import { ColorModeContext } from '../App';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

type Props = { account: string };

const Navbar: FC<Props> = ({ account }) => {
  const theme = useTheme();

  const { toggleColorMode } = useContext(ColorModeContext);

  return (
    <AppBar position='static'>
      <Toolbar>
        <StorageBox width={35} height={35} />
        <Typography variant='h6' component='div' sx={{ flexGrow: 1, ml: 4 }}>
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
        <IconButton sx={{ ml: 4 }} onClick={toggleColorMode} color='inherit'>
          {theme.palette.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
