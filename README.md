# CSV Visualization Example

This is an example project that demonstrates how to visualize a CSV file that
contains mappings of metadata to colors using Vertex's APIs and SDKs.

## Local development

1. Copy `.env.local.template` to `.env.local` and set `VERTEX_CLIENT_ID`,
   `VERTEX_CLIENT_SECRET` and `SCENE_ID`. Use the [Platform Console
   UI](https://console.vertexvis.com/) to generate your application credentials
   and the [Platform Dev Dashboard](https://dashboard.developer.vertexvis.com/)
   to find your scene ID.
1. Install dependencies, `yarn install`
1. Run `yarn dev` to start the local development server
1. Browse to http://localhost:3000
1. Click _Open CSV_ and select the `./csv/demo.csv` file.

### Project organization

```text
public/       // Static assets
src/
  components/ // Components used in pages
  lib/        // Shared libraries and utilities
  pages/      // Pages served by NextJS
    api/      // API endpoints served by NextJS
```

### Deployment

A few options for deployment,

- [Vercel](https://nextjs.org/docs/deployment)
- [Netlify](https://www.netlify.com/blog/2020/11/30/how-to-deploy-next.js-sites-to-netlify/)
- [AWS CDK](https://github.com/serverless-nextjs/serverless-next.js#readme)
