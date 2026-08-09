import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import tailwindcss from '@tailwindcss/vite'
import { SitemapStream } from 'sitemap'
import { defineConfig, loadEnv } from 'vitepress'
import llmstxt, { copyOrDownloadAsMarkdownButtons } from 'vitepress-plugin-llms'
import { LLM_AGENTS_DETAILS } from './llmGuide.js'
import { generateSidebar } from './sidebar/sidebar.js'

const links = []

const env = loadEnv('', process.cwd())

const gTag = env.VITE_GTAG

export default defineConfig({
  title: 'DolarApi.com',
  description: 'API para obtener la cotización del dólar en Argentina',
  lang: 'es-AR',

  outDir: '../dist/static/docs',
  base: '/docs/',
  srcExclude: ['**/operations/parts/*.md'],

  markdown: {
    config(md) {
      md.use(copyOrDownloadAsMarkdownButtons)
    },
  },

  themeConfig: {
    logo: '/assets/logo.webp',
    nav: [
      { component: 'OALocaleSelect' },
      { text: 'Sponsors', link: '/sponsors/' },
      {
        text: 'Región',
        items: [
          { text: 'Argentina', link: '/argentina' },
          { text: 'Chile', link: '/chile/' },
          { text: 'Venezuela', link: '/venezuela/' },
          { text: 'Uruguay', link: '/uruguay/' },
          { text: 'México', link: '/mexico/' },
          { text: 'Bolivia', link: '/bolivia/' },
          { text: 'Brasil', link: '/brasil/' },
          { text: 'Colombia', link: '/colombia/' },
        ],
      },
    ],
    sidebar: {
      '/argentina/': generateSidebar('ar'),
      '/chile/': generateSidebar('cl'),
      '/venezuela/': generateSidebar('ve'),
      '/uruguay/': generateSidebar('uy'),
      '/mexico/': generateSidebar('mx'),
      '/bolivia/': generateSidebar('bo'),
      '/brasil/': generateSidebar('br'),
      '/colombia/': generateSidebar('co'),
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/enzonotario/esjs-dolar-api' },
    ],
    footer: {
      message:
        'Liberado bajo la <a href="https://github.com/enzonotario/esjs-dolar-api/blob/main/LICENSE">Licencia MIT</a>.',
      copyright: '<a href="/docs/legal">Aviso Legal</a>',
    },
    search: {
      provider: 'algolia',
      options: {
        appId: '3X8ZZEA2NO',
        apiKey: '3973396ebc578f45eecb42959162e3b6',
        indexName: 'dolarapi',
      },
    },
  },

  head: [
    // Google Analytics
    [
      'script',
      { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${gTag}` },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gTag}');`,
    ],

    // Google Fonts
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    ],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
        rel: 'stylesheet',
      },
    ],

    // Favicon
    ['link', { rel: 'icon', href: '/docs/favicon.ico' }],
  ],

  /**
   * Sitemap generation
   */
  cleanUrls: false,
  transformHtml: (_, id, { pageData }) => {
    if (!/[\\/]404\.html$/.test(id)) {
      links.push({
        /* conatins index.md? */
        url: pageData.relativePath.endsWith('index.md')
          ? '/'
          : `${pageData.relativePath.replace(
            /((^|\/)index)?\.md$/,
            '$2',
          )}.html`,
        lastmod: pageData.lastUpdated,
      })
    }
  },
  buildEnd: async ({ outDir }) => {
    const sitemap = new SitemapStream({
      hostname: 'https://dolarapi.com/docs/',
    })
    const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
    sitemap.pipe(writeStream)
    links.forEach(link => sitemap.write(link))
    sitemap.end()
    await new Promise(resolve => writeStream.on('finish', resolve))
  },

  vite: {
    plugins: [
      tailwindcss(),
      vueI18n({
        ssr: true,
      }),
      llmstxt({
        domain: 'https://dolarapi.com',
        title: 'DolarApi.com — Docs para agentes',
        description: 'API de cotizaciones de dólar y monedas en LatAm. Preferí siempre el OpenAPI de la región.',
        ignoreFiles: [
          'sponsors.md',
          'legal.md',
          '**/operations/parts/*',
        ],
        excludeIndexPage: false,
        customLLMsTxtTemplate: `# {title}

{description}

{details}

## Table of Contents

{toc}
`,
        customTemplateVariables: {
          details: LLM_AGENTS_DETAILS,
        },
        experimental: {
          depth: 2,
        },
      }),
    ],
  },

  transformPageData(pageData) {
    const pageTitle = pageData.params?.pageTitle

    if (pageTitle) {
      pageData.title = pageTitle
      pageData.frontmatter ??= {}
      pageData.frontmatter.title = pageTitle
    }
  },
})
