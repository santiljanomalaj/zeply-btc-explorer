import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from '@mui/material/styles';

import Copyright from './Copyright';

import FullLogo from 'assets/images/Full-Logo-Black.svg';

library.add(fab);

const Footer = () => {
  const theme = useTheme();
  return (
    <>
      <Grid
        className="footer"
        container
        spacing={2}
        display="flex"
        justifyContent="space-around"
      >
        <Grid item lg={3} xs={12}>
          <Grid container direction="column" alignContent="center">
            <Grid item marginTop="30px">
              <Link to="/">
                <img
                  src={FullLogo}
                  className="img-logo-full"
                  height="45"
                  alt="Drape Fit Inc."
                />
              </Link>
            </Grid>
            <Grid item>
              <Typography className="footer-do-best">WE DO BEST FIT</Typography>
            </Grid>
            <Grid item>
              <Link className="footer-usa">United States</Link>
            </Grid>
            <Grid item>
              <Typography className="footer-follow-us">Follow Us : </Typography>
            </Grid>
            <Grid item>
              <Link
                to="https://www.facebook.com/drapefitinc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  className="footer-social-icon"
                  icon={['fab', 'facebook']}
                />
              </Link>
              <Link
                to="https://twitter.com/drapefitinc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  className="footer-social-icon"
                  icon={['fab', 'twitter']}
                />
              </Link>
              <Link
                to="https://www.instagram.com/drapefitinc/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  className="footer-social-icon"
                  icon={['fab', 'instagram']}
                />
              </Link>
              <Link
                to="https://www.pinterest.com/drapefitinc/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  className="footer-social-icon"
                  icon={['fab', 'pinterest']}
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={9} xs={12}>
          <Grid
            container
            justifyContent="space-around"
            sx={{ [theme.breakpoints.down('lg')]: { direction: 'column' } }}
          >
            <Grid item lg={2} xs={12}>
              <Grid
                container
                rowSpacing={1.2}
                direction="column"
                sx={{
                  [theme.breakpoints.down('lg')]: {
                    marginLeft: '36vw',
                    maxWidth: '160px'
                  },
                  [theme.breakpoints.down('sm')]: {
                    marginLeft: '100px'
                  }
                }}
              >
                <Grid item sx={{ marginTop: '30px' }}>
                  <Link className="footer-link-title">SERVICE</Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/men">
                    Men
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Copyright />
    </>
  );
};

export default Footer;
