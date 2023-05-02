import { Link, Outlet } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  styled,
  useTheme,
  useMediaQuery
} from '@mui/material';

import ZeplyLogger from 'utils/ZeplyLogger';
import LinkSection from 'layout/MainLayout/Header/LinkSection';
import Footer from 'layout/MainLayout/Footer';

import FullLogo from 'assets/images/Full-Logo-Black.svg';
import SmallLogo from 'assets/images/Logo.png';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    ...theme.typography.mainContent
  })
);

const UserLayout = () => {
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));
  ZeplyLogger(matchesXS);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={1}
        sx={{
          backgroundColor: '#fffffff1'
        }}
      >
        <Toolbar
          sx={{ padding: { md: '8px 124px !important', sm: '8px 24px' } }}
        >
          <Box
            component="span"
            sx={{
              display: 'block',
              height: '50px',
              flexGrow: 1
            }}
          >
            <Link to="/">
              <img
                src={matchesXS ? SmallLogo : FullLogo}
                height="50"
                alt="Drape Fit"
              />
            </Link>
          </Box>
          <Box flexGrow={1}></Box>
          <Box sx={{ display: 'flex', alignItems: 'end' }}>
            <LinkSection />
          </Box>
        </Toolbar>
      </AppBar>
      <Main theme={theme}>
        <Outlet />
        <Footer />
      </Main>
    </Box>
  );
};

export default UserLayout;
