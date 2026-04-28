import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              replaceAttrValues: {
                black: 'currentColor',
                '#000': 'currentColor',
              },
            },
          },
        ],
        as: '*.js',
      },
    },
  },
}

export default nextConfig
