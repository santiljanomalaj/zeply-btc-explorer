import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';
import { IconMenu2 } from '@tabler/icons';

import NotificationSection from './NotificationSection';
import SearchSection from './SearchSection';

import FullLogo from 'assets/images/Full-Logo-Black.svg';

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box
          component="span"
          sx={{
            display: { xs: 'none', md: 'block' },
            flexGrow: 1
          }}
        >
          <Link to="/" className="v-align-center">
            <img src={FullLogo} height="44" alt="Drape Fit Admin" />
          </Link>
        </Box>
        {/* <ButtonBase sx={{ borderRadius: '8px', overflow: 'hidden' }}>
          <Avatar
            className="header-btn-toggle"
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .25s ease-in-out'
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase> */}
      </Box>

      {/* header search */}
      {/* <SearchSection /> */}
      <Box sx={{ flexGrow: 1 }} />
      {/* <Box sx={{ flexGrow: 1 }} /> */}

      {/* notification & profile */}
      {/* <NotificationSection /> */}
      {/* <ProfileSection /> */}
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
