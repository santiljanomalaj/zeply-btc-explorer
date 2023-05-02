import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

const now = new Date();
const year = now.getFullYear();

const Copyright = () => {
  return (
    <>
      <Grid className="copyright" container>
        <Grid item xs={12} md={6}>
          <Typography
            className="copyright-text"
            sx={{ textAlign: { xs: 'center', md: 'start' } }}
          >
            &copy; {`${year}`} Zeply All Rights Reserved.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            className="copyright-text"
            sx={{ textAlign: { xs: 'center', md: 'end' } }}
          >
            <Link to="/privacy-policy">Privacy Policy</Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Copyright;
