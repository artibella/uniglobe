import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import {
  createUniformApiEnhancer,
  UniformComposition,
  UniformSlot,
  useUniformCurrentComposition,
  registerUniformComponent,
} from '@uniformdev/canvas-react';
import ComponentStarterKitContextProvider from '../../context/ComponentStarterKitContext';
import UniformPreviewIcon from '../UniformPreviewIcon';
import ThemeProvider from '../ThemeProvider';
import { getGapClass, getMarginBottomClass, PaddingSize } from '../../utilities/styling';
import { CHILDREN_CONTAINER_STYLES, COMMON_PADDING } from '../../hocs/withoutContainer';
import { BasePageProps } from './';
import { useSetViewportQuirk } from '../../hooks/useSetViewportQuirk';
import Head from 'next/head';
import type { Asset } from '@uniformdev/assets';
import { getMediaUrl } from '@/utilities';

const VERCEL_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';

const PageContent: FC<Pick<BasePageProps, 'preview' | 'useUniformComposition' | 'providers' | 'styles'>> = ({
  useUniformComposition,
  preview,
  providers: Providers,
  styles,
}) => {
  const { data: composition } = useUniformCurrentComposition();

  const {
    pageTitle,
    pageMetaDescription,
    pageKeywords,
    openGraphTitle,
    openGraphDescription,
    openGraphImage,
    overlayTitleToOgImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
    overlayTitleToTwitterImage,
    twitterCard,
  } = composition?.parameters || {};
  //This is workaround because spaces removes from query params and not parsing automatically.
  //Space should be encoded as %20 http://www.faqs.org/rfcs/rfc1738.html
  const ogTitle = (openGraphTitle?.value as string)?.replaceAll?.(' ', '%20');
  const twTitle = (twitterTitle?.value as string)?.replaceAll?.(' ', '%20');
  const title: string = pageTitle?.value as string;

  const openGraphImageSrc = getMediaUrl(openGraphImage?.value as Asset | undefined);
  const twitterImageSrc = getMediaUrl(twitterImage?.value as Asset | undefined);

  const renderOgImageElement = () => {
    if (overlayTitleToOgImage?.value && openGraphImageSrc) {
      return (
        <meta
          property="og:image"
          content={`${VERCEL_URL}/api/og?title=${
            ogTitle ?? title?.replaceAll?.(' ', '%20')
          }&image=${openGraphImageSrc}`}
        />
      );
    }
    if (openGraphImageSrc) return <meta property="og:image" content={openGraphImageSrc} />;
    return null;
  };

  const renderTwitterImageElement = () => {
    if (overlayTitleToTwitterImage?.value && twitterImageSrc) {
      return (
        <meta
          property="twitter:image"
          content={`${VERCEL_URL}/api/og?title=${twTitle ?? title?.replaceAll?.(' ', '%20')}&image=${twitterImageSrc}`}
        />
      );
    }
    if (twitterImageSrc) return <meta property="twitter:image" content={twitterImageSrc} />;
    return null;
  };

  const compositionHeader = composition?.slots?.pageHeader?.[0];

  const favicon = compositionHeader?.parameters?.favicon?.value as Asset | undefined;
  const faviconHref = getMediaUrl(favicon);

  const gap = composition?.slots?.pageHeader?.[0]?.parameters?.syntheticGap?.value as PaddingSize | undefined;

  const ContentProviders = ({ children }: PropsWithChildren) =>
    Providers ? <Providers styles={{ modal: styles?.modal }}>{children}</Providers> : <>{children}</>;

  return (
    <ThemeProvider>
      <ContentProviders>
        <Head>
          {/* page metadata */}
          <title>{(pageTitle?.value as string) ?? 'Uniform Component Starter Kit'}</title>
          <meta name="description" content={pageMetaDescription?.value as string} />
          <meta name="keywords" content={pageKeywords?.value as string} />
          {/* Open Graph */}
          <meta property="og:title" content={(openGraphTitle?.value as string) ?? pageTitle?.value} />
          <meta
            property="og:description"
            content={(openGraphDescription?.value as string) ?? pageMetaDescription?.value}
          />
          {renderOgImageElement()}
          {/* Twitter */}
          <meta name="twitter:title" content={(twitterTitle?.value as string) ?? pageTitle?.value} />
          <meta name="twitter:card" content={(twitterCard?.value as string) ?? 'summary'} />
          <meta
            name="twitter:description"
            content={(twitterDescription?.value as string) ?? pageMetaDescription?.value}
          />
          {renderTwitterImageElement()}

          {faviconHref && <link rel="shortcut icon" href={faviconHref} />}
        </Head>
        {/* Docs: https://docs.uniform.app/reference/packages/uniformdev-canvas-react#slot */}
        <div className={COMMON_PADDING}>
          <UniformSlot name="pageHeader" />
        </div>
        {/* useUniformComposition is always true only for global composition preview */}
        {useUniformComposition && <h1 className="flex-1 flex justify-center items-center">Page content placeholder</h1>}
        <div
          className={classNames(
            'flex flex-col flex-1',
            CHILDREN_CONTAINER_STYLES,
            COMMON_PADDING,
            getGapClass(gap),
            getMarginBottomClass(gap),
            styles?.pageContentContainer
          )}
        >
          <UniformSlot name="pageContent" />
        </div>
        <div className={COMMON_PADDING}>
          <UniformSlot name="pageFooter" />
        </div>
        {preview && <UniformPreviewIcon />}
      </ContentProviders>
    </ThemeProvider>
  );
};

const BasePage: FC<BasePageProps> = ({
  data: composition,
  useUniformComposition,
  preview,
  providers,
  styles,
  context,
}) => {
  // set viewport quirk
  useSetViewportQuirk();

  return (
    <UniformComposition
      data={composition}
      behaviorTracking="onLoad"
      contextualEditingEnhancer={createUniformApiEnhancer({ apiUrl: '/api/preview' })}
    >
      <ComponentStarterKitContextProvider {...(context || {})}>
        <PageContent
          useUniformComposition={useUniformComposition}
          preview={preview}
          providers={providers}
          styles={styles}
        />
      </ComponentStarterKitContextProvider>
    </UniformComposition>
  );
};

export default BasePage;

registerUniformComponent({
  type: 'page',
  component: PageContent,
});
