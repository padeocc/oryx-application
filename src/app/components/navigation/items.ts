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
        isExternal: false,
        priority: 1
      }
    ],
    [
      {
        name: t('contact_label'),
        href: '/contact',
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
        name: t('oryx_history_label'),
        href: 'https://1drv.ms/w/s!Al0P33X3XVIrpDooSGXVof1Hktqa?e=actXOWn',
        isExternal: true
      },
      {
        name: t('chart_label'),
        href: 'https://1drv.ms/w/s!Al0P33X3XVIrsnQ5HfkQz17U5GQO?e=flncre',
        isExternal: true
      }
    ],
    [
      {
        name: t('roadmap_label'),
        href: 'https://1drv.ms/p/s!Al0P33X3XVIrswG6TzJ6UZ-eYeJT?e=lmLt3V',
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
