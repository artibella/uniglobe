import type { AssetParamValueItem } from '@uniformdev/canvas';
import type { Asset } from '@uniformdev/assets';
import '../types/Type.d';

export type MediaType =
  | string
  | Types.CloudinaryImage
  | { path?: string }
  | Types.UniformOldImage
  | AssetParamValueItem
  | AssetParamValueItem[]
  | Asset;

export const getMediaUrl = (media?: MediaType) => {
  const mediaUrl: string | undefined = (() => {
    // If it is string image url
    if (typeof media === 'string') return media;
    // If it is asset library image
    if (isMediaAsset(media)) return media?.fields?.url?.value;
    // If it is asset library images
    if (isMediaAssets(media)) return media?.[0]?.fields?.url?.value;
    // If cloudinary images selector
    if (isCloudinaryImages(media)) return media?.[0]?.url;
    // If it cloudinary image selector
    if (isCloudinaryImage(media)) return media?.path;
    // If it is old asset library image
    if (isMediaOldAsset(media)) return media?.url;
    return undefined;
  })();

  if (!mediaUrl || mediaUrl === 'unresolved') return '';

  if (typeof mediaUrl === 'string' && mediaUrl.startsWith('//')) return mediaUrl.replace('//', 'https://');

  return mediaUrl;
};

export const isMediaAsset = (media?: MediaType): media is AssetParamValueItem =>
  Boolean(media && typeof media !== 'string' && 'fields' in media);

export const isMediaAssets = (media?: MediaType): media is AssetParamValueItem[] =>
  Boolean(media && typeof media !== 'string' && Array.isArray(media) && media.length && 'fields' in media[0]);

export const isCloudinaryImages = (media?: MediaType): media is Types.CloudinaryImage =>
  Boolean(media && typeof media !== 'string' && Array.isArray(media) && media.length && 'url' in media[0]);

export const isCloudinaryImage = (media?: MediaType): media is { path?: string } =>
  Boolean(media && typeof media !== 'string' && 'path' in media);

export const isMediaOldAsset = (media?: MediaType): media is Types.UniformOldImage =>
  Boolean(media && typeof media !== 'string' && 'url' in media);

export const camelize = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
    .replace(/\s+/g, '');
};

export const fromCamelCaseText = (text?: string) => {
  const result = text?.replace(/([A-Z])/g, ' $1') || '';
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const formatProjectMapLink = (projectMapLink?: Types.ProjectMapLink) => {
  if (!projectMapLink) return projectMapLink;
  const { dynamicInputValues = {}, path } = projectMapLink || {};
  return Object.keys(dynamicInputValues || {}).reduce(
    (acc, key) => acc?.replace(`:${key}`, dynamicInputValues[key]),
    path
  );
};
