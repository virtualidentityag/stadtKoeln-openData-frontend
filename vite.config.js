import vituum from 'vituum'
import twig from '@vituum/vite-plugin-twig'
import mkcert from 'vite-plugin-mkcert'

export default {
  plugins: [
    mkcert(),
    vituum(),
    twig({
      namespaces: {
        partials: 'src/partials/',
        layouts: 'src/layouts/',
        pages: 'src/pages/',
      },
    }),
  ],
  experimental: {
    renderBuiltUrl(filename) {
      return `./${filename}`
    },
  },
}
