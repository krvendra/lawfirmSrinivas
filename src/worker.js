import { handlePreviewRoute } from "./previewRoutes.js";

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const route = pathname.match(/^\/preview-link\/([^/]+)\/([^/]+)$/);
    if (route) {
      return handlePreviewRoute(request, env, decodeURIComponent(route[1]), decodeURIComponent(route[2]));
    }
    return env.ASSETS.fetch(request);
  },
};
