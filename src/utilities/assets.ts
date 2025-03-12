import type { AssetParamValueItem } from '@uniformdev/canvas';
import { ASSETS_SOURCE_UNIFORM } from '@uniformdev/canvas';
import { getMediaUrl, isMediaAsset } from './index';
import type { MediaType } from './index';

type FocalPoint =
  | {
      x: number;
      y: number;
    }
  | 'auto'
  | 'center';

export type FitOption = 'scale-down' | 'contain' | 'cover';

export const FIT_OPTIONS = {
  SCALE_DOWN: 'scale-down' as FitOption,
  CONTAIN: 'contain' as FitOption,
  COVER: 'cover' as FitOption,
} as const;

/**
 * Checks if an asset is hosted by Uniform
 * @param asset The asset to check
 * @returns True if the asset is hosted by Uniform, false otherwise
 */
export const isAssetLibraryAsset = (asset?: AssetParamValueItem): asset is AssetParamValueItem => {
  return Boolean(asset && asset._source === ASSETS_SOURCE_UNIFORM);
};

/**
 * Get a resized asset URL with optional parameters
 * @param media The media asset
 * @param width Optional width (must be between 1 and 4096)
 * @param height Optional height (must be between 1 and 4096)
 * @param fit Fit option (defaults to scale-down)
 * @param focalPoint Optional focal point for cropping
 * @returns The resized asset URL or undefined
 */
export const getResizedAssetUrl = (
  media?: MediaType,
  width?: number,
  height?: number,
  fit?: FitOption,
  focalPoint?: FocalPoint
) => {
  if (!isMediaAsset(media)) return getMediaUrl(media);

  // Access fields.url.value from the media object
  const url = media.fields?.url?.value;
  if (!url) return getMediaUrl(media);

  // Check if the asset is hosted by Uniform
  if (!isAssetLibraryAsset(media)) {
    return url; // Return the URL as-is for non-Uniform assets
  }

  // Validate width and height are within acceptable range if provided
  const validatedWidth = width !== undefined ? validateDimension(width) : undefined;
  const validatedHeight = height !== undefined ? validateDimension(height) : undefined;

  const mediaFocalPoint = focalPoint || getAssetFocalPoint(media);

  // Create URLSearchParams object for building the query string
  const searchParams = new URLSearchParams();

  // Only add parameters if they're valid
  if (validatedWidth !== undefined) {
    searchParams.append('width', validatedWidth.toString());
  }

  if (validatedHeight !== undefined) {
    searchParams.append('height', validatedHeight.toString());
  }

  // Add fit parameter if provided
  if (fit) {
    searchParams.append('fit', fit);
  }

  // Add focal point if available
  const focalPointValue = getFocalPointValue(mediaFocalPoint);
  if (fit === FIT_OPTIONS.COVER && focalPointValue) {
    searchParams.append('focal', focalPointValue);
  }

  // Convert params to string and check if we have any params
  const queryString = searchParams.toString();
  const urlWithParams = queryString ? `${url}?${queryString}` : url;
  console.log('🗜️ Resized image url', urlWithParams);
  return urlWithParams;
};

/**
 * Get the value for the focal point parameter
 * @param focalPoint The focal point
 * @returns The focal point value for the URL parameter
 */
const getFocalPointValue = (focalPoint?: FocalPoint): string | undefined => {
  if (!focalPoint) return undefined;

  // Handle string options
  if (focalPoint === 'auto' || focalPoint === 'center') {
    return focalPoint;
  }

  // Handle coordinate object
  if (typeof focalPoint === 'object' && 'x' in focalPoint && 'y' in focalPoint) {
    return `${focalPoint.x}x${focalPoint.y}`;
  }

  return undefined;
};

/**
 * Validates a dimension is within the acceptable range (1 < n < 4096)
 * @param dimension The dimension to validate
 * @returns The valid dimension or undefined if invalid
 */
const validateDimension = (dimension: number): number | undefined => {
  if (dimension <= 1 || dimension >= 4096) {
    console.warn(`Dimension ${dimension} is outside the valid range (1 < n < 4096)`);
    return undefined;
  }
  return dimension;
};

export const getAssetFocalPoint = (media?: MediaType): FocalPoint | undefined => {
  if (!isMediaAsset(media)) return undefined;
  const defaultFocalPoint: FocalPoint = 'center';
  const focalPoint = media?.fields?.focalPoint?.value || defaultFocalPoint;
  console.log('focal point of media', media, focalPoint);
  return focalPoint;
};

export const getFitQueryParam = (fit?: FitOption) => {
  if (!fit) return '';
  return `fit=${fit}`;
};

export const getFocalPointQueryParam = (focalPoint?: FocalPoint) => {
  if (!focalPoint) return '';

  // Handle string options
  if (focalPoint === 'auto' || focalPoint === 'center') {
    return `focal=${focalPoint}`;
  }

  // Handle coordinate object
  if (typeof focalPoint === 'object' && 'x' in focalPoint && 'y' in focalPoint) {
    return `focal=${focalPoint.x}x${focalPoint.y}`;
  }

  return '';
};
