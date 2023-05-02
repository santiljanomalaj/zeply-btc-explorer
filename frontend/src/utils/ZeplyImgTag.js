import LazyLoad from 'react-lazy-load';

const ZeplyImgTag = ({ src, fallback, alt, lzheight = '100%', ...rest }) => {
  return (
    <LazyLoad height={lzheight}>
      <picture>
        <source srcSet={src} />
        <img src={fallback} alt={alt} {...rest} />
      </picture>
    </LazyLoad>
  );
};

export default ZeplyImgTag;
