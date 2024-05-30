import { getTranslations } from 'next-intl/server';

export const getNavigationItems = ({
  t
}: {
  t: any;
}): { href: string; name: string; isExternal: boolean; priority?: number }[][] => {
  const menu = [
    [
      {
        name: t('actions_label'),
        href: '/finder',
        isExternal: false
      }
    ],
    [
      {
        name: t('donate_label'),
        href: 'https://www.helloasso.com/associations/pour-un-avenir-durable-en-occitanie/formulaires/1',
        isExternal: true
      }
    ]
  ];

  return menu;
};

export const getFooterLinks = async () => {
  const t = await getTranslations('footer');
  return [
    [
      {
        name: t('roadmap_label'),
        href: 'https://github.com/orgs/padeocc/projects/3/views/4',
        isExternal: true
      },
      {
        name: t('sourcecode_label'),
        href: 'https://github.com/padeocc/oryx-application',
        isExternal: true
      }
    ],
    [
      {
        name: t('whoarewe_label'),
        href: 'https://www.padeo.fr',
        isExternal: true
      }
    ]
  ];
};
