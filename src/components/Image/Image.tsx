import { FC } from 'react';
import NextImage, { ImageProps } from 'next/image';

const Image: FC<ImageProps> = props => {
  const { src, ...rest } = props;
  return <NextImage src={src} {...rest} priority={props?.priority || Boolean(process.env.NEXT_PUBLIC_E2E_TEST)} />;
};

export default Image;
