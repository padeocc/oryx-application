import { search } from '@/algolia/search';
import { IResult } from '@/algolia/types';
import { fetchLandingPage } from '@/cms/utils';
import { Theme } from '@/config';
import type { MetadataRoute } from 'next';

type ThemePage = {
  theme: Theme;
  actionPage: string;
  landingPage: LandingPageData | null;
};

type LandingPageData = { path: string; apiId: string };

const regularPages: string[] = ['/fr/contact', '/fr/legal'];

const themePages: Array<ThemePage> = [
  {
    theme: 'foods',
    actionPage: '/fr/actions/foods',
    landingPage: { path: '/fr/alimentation', apiId: 'landing-page-alimentation' }
  },
  {
    theme: 'goods',
    actionPage: '/fr/actions/goods',
    landingPage: { path: '/fr/mes-achats', apiId: 'landing-page-bien' }
  },
  {
    theme: 'transports',
    actionPage: '/fr/actions/transports',
    landingPage: { path: '/fr/transport-responsable', apiId: 'landing-page-transport' }
  },
  {
    theme: 'events',
    actionPage: '/fr/actions/events',
    landingPage: null
  },
  {
    theme: 'services',
    actionPage: '/fr/actions/services',
    landingPage: null
  },
  {
    theme: 'accommodations',
    actionPage: '/fr/actions/accomodations',
    landingPage: { path: '/fr/logement', apiId: 'landing-page-batiment' }
  }
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process?.env?.NEXT_PUBLIC_AUTH_APPINFO_WEBSITEDOMAIN || '';

  const pages: MetadataRoute.Sitemap = [
    {
      url,
      changeFrequency: 'monthly',
      priority: 1
    }
  ];

  for (const page of regularPages) {
    pages.push({
      url: url + page,
      priority: 0.4,
      changeFrequency: 'yearly'
    });
  }

  for (const theme of themePages) {
    if (theme.landingPage) {
      await fetchLandingPage(theme.landingPage.apiId)
        .then(data => {
          pages.push({
            url: url + theme.landingPage!.path,
            changeFrequency: 'monthly',
            priority: 0.8,
            lastModified: data.lastModified
          });
        })
        .catch((e) => {
          console.error(`Error fetching landing page ${theme.landingPage?.apiId}:`, e);
        });
    }

    pages.push({
      url: url + theme.actionPage,
      changeFrequency: 'monthly',
      priority: 0.5,
    });

    const services = await search({
      query: '',
      limit: 900,
      filters: {
        theme: [theme.theme],
      },
      page: 0,
    });

    /*@ts-ignore*/
    const hits = services.results[0].hits;

    for (const hit of hits) {
      pages.push({
        url: url + '/fr/service/' + theme.theme + '/' + hit.id, 
        changeFrequency: 'yearly',
        priority: 1,
        lastModified: hit.updatedAt
      })
    }
  }

  return pages;
}
