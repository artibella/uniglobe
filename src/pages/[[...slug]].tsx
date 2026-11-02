import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from '@uniformdev/canvas';
import { withUniformGetServerSideProps, prependLocale } from '@uniformdev/canvas-next/route';
import { getBreadcrumbs, getRouteClient } from '../utilities/canvas/canvasClients';
export { default } from '../components/BasePage';

// Doc: https://docs.uniform.app/docs/guides/composition/url-management/routing/slug-based-routing

export const getServerSideProps = withUniformGetServerSideProps({
  requestOptions: context => ({
    state: Boolean(context.preview) ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
    //locale: context.locale ?? context.defaultLocale,
  }),
  // In contextual editing the SDK only renders the edited composition when this path equals the editor's
  // `path` exactly, otherwise static project map nodes win over dynamic ones. The editor's path carries
  // project map query strings (e.g. `utm_source=`) and ours carries `is_incontext_editing_mode`, so compare
  // without query strings.
  modifyPath: (path, context) => {
    const localizedPath = prependLocale(path, context);
    const { isUniformContextualEditing, compositionPath } = (context.previewData ?? {}) as {
      isUniformContextualEditing?: boolean;
      compositionPath?: string;
    };
    if (isUniformContextualEditing && compositionPath?.split('?')[0] === localizedPath.split('?')[0]) {
      return compositionPath;
    }
    return localizedPath;
  },
  client: getRouteClient(),
  handleComposition: async (routeResponse, _context) => {
    const { composition, errors } = routeResponse.compositionApiResponse || {};

    if (errors?.some(e => e.type === 'data' || e.type === 'binding')) {
      return { notFound: true };
    }

    const preview = Boolean(_context.preview);
    const breadcrumbs = await getBreadcrumbs({
      compositionId: composition._id,
      preview,
      dynamicTitle: composition?.parameters?.pageTitle?.value as string,
      resolvedUrl: _context.resolvedUrl,
    });

    return {
      props: { preview, data: composition || null, context: { breadcrumbs } },
    };
  },
});
