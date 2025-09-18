import { fetchLandingPage } from '@/cms/utils';
import type { MetadataRoute } from 'next'

const CMSlandingPages: { path: string, apiId: string }[] = [
  { path: '/fr/mes-achats', apiId: 'landing-page-bien' },
  { path: '/fr/logement', apiId: 'landing-page-batiment' },
  { path: '/fr/alimentation', apiId: 'landing-page-alimentation' },
  { path: '/fr/transport-responsable', apiId: 'landing-page-transport' },
];

const actionPages: string[] = [
  '/fr/actions/transports',
  '/fr/actions/foods',
  '/fr/actions/goods',
  '/fr/actions/events',
  '/fr/actions/services',
  '/fr/contact',
  '/fr/legal',
]
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process?.env?.NEXT_PUBLIC_AUTH_APPINFO_WEBSITEDOMAIN || '';

  const pages: MetadataRoute.Sitemap = [
    {
      url,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: url + '/fr/contact',
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: url + '/fr/legal',
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  for (const actionPage of actionPages) {
    pages.push({
      url: url + actionPage,
      priority: 0.8,
      changeFrequency: 'daily'
    })
  }

  for (const page of CMSlandingPages) {
    await fetchLandingPage(page.apiId)
      .then((data) => {
        pages.push({
          url: url + page.path,
          changeFrequency: 'monthly',
          priority: 0.8,
          lastModified: data.lastModified
        })
      })
      .catch(() => {});
  }

  return pages;
}
