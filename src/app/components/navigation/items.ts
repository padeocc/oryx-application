import { getTranslations } from 'next-intl/server';

export const getNavigationItems = ({
  t
}: {
  t: any;
}): { href: string; name: string; isExternal: boolean; priority?: number }[][] => {
  const menu = [
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
        name: t('whoarewe_label'),
        href: 'https://www.padeo.fr',
        isExternal: true
      },
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/company/pour-un-avenir-durable-en-occitanie/',
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
        name: t('oryx_history_label'),
        href: 'https://docs.google.com/document/d/15wl0Lv5phrtH0dxNgTxj2Fx6PkPcaRvF/edit?usp=sharing&ouid=115775379044450692924',
        isExternal: true
      },
      {
        name: t('chart_label'),
        href: 'https://docs.google.com/document/d/10AFQddEf68BSCenJ6aDNBDk3R9Lac8U2',
        isExternal: true
      }
    ],
    [
      {
        name: t('legal_label'),
        href: '/legal',
        isExternal: false
      }
    ]
  ];
};
