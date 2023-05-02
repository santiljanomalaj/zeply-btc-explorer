import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider
} from '@mui/material';
import { FloatButton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

import ThemeRoutes from 'routes';
import themes from 'themes';
import NavigationScroll from 'layout/NavigationScroll';
import ZeplyLogger from 'utils/ZeplyLogger';

const App = () => {
  const [loadingFlag, setLoadingFlag] = useState(true);
  const simulateRequest = () => {
    const timeout = 100; // * 0.1s
    return new Promise((resolve) => setTimeout(() => resolve(), timeout));
  };

  const customization = useSelector((state) => state.customization);

  useEffect(() => {
    simulateRequest().then(() => {
      const bodyElm = document.querySelector('body');
      const loaderElm = document.querySelector('.loader-container');
      if (loaderElm) {
        loaderElm.remove();
        bodyElm.style.backgroundColor = 'unset';
        setLoadingFlag(!loadingFlag);
      }
    });
    ZeplyLogger('Initialize App...');
    //-- TODO
  }, [loadingFlag]);

  const arrowUP = (
    <FontAwesomeIcon icon={faChevronUp} style={{ fontWeight: '900' }} />
  );

  if (loadingFlag) {
    return null; // *
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <FloatButton.BackTop
            icon={arrowUP}
            style={{ backgroundColor: '#232f3e', zIndex: '9999' }}
          />
          <ThemeRoutes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
