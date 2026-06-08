import { t } from '@/i18n';

export const getNavigationItems = ({
  tr
}: {
  tr: (key: string) => string;
}): { href: string; name: string; isExternal: boolean; priority?: number }[][] => {
  const menu = [
    [
      {
        name: tr('service_addition_label'),
        href: '/service/add',
        isExternal: false
      }
    ],
    [
      {
        name: tr('donate_label'),
        href: 'https://www.helloasso.com/associations/pour-un-avenir-durable-en-occitanie/formulaires/2',
        isExternal: true
      }
    ]
  ];

  return menu;
};

export const getBurgerMenuLinks = () => {
  const tr = t('footer');
  return [
    [
      {
        name: tr('whoarewe_label'),
        href: 'https://www.padeo.fr/association/',
        isExternal: true
      },
      {
        name: tr('oryx_history_label'),
        href: 'https://docs.google.com/document/d/15wl0Lv5phrtH0dxNgTxj2Fx6PkPcaRvF/edit?usp=sharing&ouid=115775379044450692924',
        isExternal: true
      },
      {
        name: tr('chart_label'),
        href: 'https://1drv.ms/b/c/2b525df775df0f5d/EQd8-MszE69BvTBTJvNUgDcBtA1TxFbPRZ6wWSvORAfeLQ?e=zHccWn',
        isExternal: true
      }
    ]
  ];
};

export const getFooterLinks = () => {
  const tr = t('footer');
  return [
    [
      {
        name: tr('donate_label'),
        href: 'https://www.helloasso.com/associations/pour-un-avenir-durable-en-occitanie/formulaires/2',
        isExternal: true
      },
      {
        name: tr('service_addition_label'),
        href: '/service/add'
      },
      {
        name: tr('features_to_come_label'),
        isExternal: true,
        href: 'https://docs.google.com/presentation/d/1INNPnHduNqaov9PWFr3UDLfFYp8ve5e7/edit?usp=drive_link&ouid=115775379044450692924&rtpof=true&sd=true'
      },
      {
        name: tr('contact_label'),
        href: '/contact'
      },
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/company/oryxchange/posts/',
        isExternal: true
      }
    ],
    [
      {
        name: tr('whoarewe_label'),
        href: 'https://www.padeo.fr/association/',
        isExternal: true
      },
      {
        name: tr('team_label'),
        href: '/team',
        isExternal: false
      },
      {
        name: tr('oryx_history_label'),
        href: 'https://docs.google.com/document/d/15wl0Lv5phrtH0dxNgTxj2Fx6PkPcaRvF/edit?usp=sharing&ouid=115775379044450692924',
        isExternal: true
      },
      {
        name: tr('chart_label'),
        href: 'https://1drv.ms/b/c/2b525df775df0f5d/EQd8-MszE69BvTBTJvNUgDcBtA1TxFbPRZ6wWSvORAfeLQ?e=zHccWn',
        isExternal: true
      },
      {
        name: tr('legal_label'),
        href: '/legal',
        isExternal: false
      },
      {
        name: tr('sourcecode_label'),
        href: 'https://github.com/padeocc/oryx-application',
        isExternal: true
      }
    ]
  ];
};
