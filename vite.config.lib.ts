/// <reference types="vitest" />

import {
  URL,
  fileURLToPath,
} from 'node:url'

import {
  defineConfig,
  LibraryFormats,
  UserConfigExport,
} from 'vite'

import dts from 'vite-plugin-dts'

const external = [
  '@cosmicmind/foundationjs'
]

const srcDir = './src'
const distDir = './dist'
const emptyOutDir = false
const formats: LibraryFormats[] = [ 'es' ]

export default defineConfig(({
  mode,
}) => {
  const minify = 'production' === mode

  const config: UserConfigExport = {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL(srcDir, import.meta.url)),
      },
    },
    plugins: [
      dts()
    ],
    build: {
      emptyOutDir,
      lib: {
        name: process.env.npm_package_name,
        entry: `${srcDir}/index.ts`,
        formats,
        fileName: 'lib.es',
      },
      rollupOptions: {
        external,
      },
      minify,
    },
    test: {
      include: [ '__tests__/**/*.spec.ts' ],
      benchmark: {
        include: [ '__benchmarks__/**/*.bench.ts' ],
        outputFile: `${distDir}/benchmarks.json`,
      },
      coverage: {
        provider: 'c8',
        include: [ '**/src/**' ],
        extension: [ '.ts' ],
      },
    },
  }

  return config
})