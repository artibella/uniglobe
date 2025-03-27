'use client';

import type { ImageLoaderProps } from 'next/image';

const uniformImageLoader = ({ src, width }: ImageLoaderProps) => {
  const url = new URL(src);

  url.searchParams.set('width', width.toString());

  return url.toString();
};

export default uniformImageLoader;
