import Head from 'next/head'

import type * as types from '@/lib/types'
import * as config from '@/lib/config'
import { getSocialImageUrl } from '@/lib/get-social-image-url'

export function PageHead({
  site,
  title,
  description,
  pageId,
  image,
  url,
  isBlogPost
}: types.PageProps & {
  title?: string
  description?: string
  image?: string
  url?: string
  isBlogPost?: boolean
}) {
  const rssFeedUrl = `${config.host}/feed`

  title = title ?? site?.name
  description = description ?? site?.description

  const socialImageUrl = getSocialImageUrl(pageId) || image

  return (
    <Head>
      <meta charSet='utf-8' />
      <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover'
      />

      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#1a1a1a" key="theme-color-light"/>
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1a1a1a" key="theme-color-dark"/>

      <meta name='robots' content='index,follow' />
      <meta property='og:type' content='website' />

      {/* Google Fonts: VT323, Share Tech Mono, Space Mono */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=VT323&display=swap" rel="stylesheet" />

      {site && (
        <>
          <meta property='og:site_name' content={site.name} />
          <meta property='twitter:domain' content={site.domain} />
        </>
      )}

      {config.twitter && (
        <meta name='twitter:creator' content={`@${config.twitter}`} />
      )}

      {description && (
        <>
          <meta name='description' content={description} />
          <meta property='og:description' content={description} />
          <meta name='twitter:description' content={description} />
        </>
      )}

      {socialImageUrl ? (
        <>
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:image' content={socialImageUrl} />
          <meta property='og:image' content={socialImageUrl} />
        </>
      ) : (
        <meta name='twitter:card' content='summary' />
      )}

      {url && (
        <>
          <link rel='canonical' href={url} />
          <meta property='og:url' content={url} />
          <meta property='twitter:url' content={url} />
        </>
      )}

      <link
        rel='alternate'
        type='application/rss+xml'
        href={rssFeedUrl}
        title={site?.name}
      />

      <meta property='og:title' content={title} />
      <meta name='twitter:title' content={title} />
      <title>{title}</title>

      {/* Better SEO for the blog posts */}
      {isBlogPost && (
        <script type='application/ld+json'>
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            '@id': `${url}#BlogPosting`,
            mainEntityOfPage: url,
            url,
            headline: title,
            name: title,
            description,
            author: {
              '@type': 'Person',
              name: config.author
            },
            image: socialImageUrl
          })}
        </script>
      )}
    </Head>
  )
}
