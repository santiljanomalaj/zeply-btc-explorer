import GlobalEnv from 'configs/GlobalEnv';

const ZeplyLogger = ((flag) => {
  if (flag !== true) {
    return () => {};
  }
  return console.log.bind(window.console);
})(GlobalEnv.isDebug);

export default ZeplyLogger;
