import { Config } from '@stencil/core'

export const config: Config = {
  namespace: 'low',
  globalStyle: 'src/global/style.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
      footer: '',
    },
    {
      type: 'www',
      serviceWorker: null,
    },
  ],
}
