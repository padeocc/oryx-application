import { getTranslations } from 'next-intl/server';

export const getNavigationItems = ({
  t
}: {
  t: any;
}): { href: string; name: string; isExternal: boolean; priority?: number }[][] => {
  const menu = [
    // [
    //   {
    //     name: t('contact_label'),
    //     href: '/contact',
    //     isExternal: false
    //   }
    // ],
    [
      {
        name: t('service_addition_label'),
        href: '/service/add',
        isExternal: false
      }
    ],
    [
      {
        name: t('donate_label'),
        href: 'https://www.helloasso.com/associations/pour-un-avenir-durable-en-occitanie/formulaires/2',
        isExternal: true
      }
    ]
  ];

  return menu;
};

export const getBurgerMenuLinks = async () => {
  const t = await getTranslations('footer');
  return [
    [
      {
        name: t('whoarewe_label'),
        href: 'https://www.padeo.fr/association/',
        isExternal: true
      },
      {
        name: t('oryx_history_label'),
        href: 'https://docs.google.com/document/d/15wl0Lv5phrtH0dxNgTxj2Fx6PkPcaRvF/edit?usp=sharing&ouid=115775379044450692924',
        isExternal: true
      },
      {
        name: t('chart_label'),
        href: 'https://1drv.ms/b/c/2b525df775df0f5d/EQd8-MszE69BvTBTJvNUgDcBtA1TxFbPRZ6wWSvORAfeLQ?e=zHccWn',
        isExternal: true
      }
    ]
  ];
};
export const getFooterLinks = async () => {
  const t = await getTranslations('footer');
  return [
    [
      {
        name: t('donate_label'),
        href: 'https://www.helloasso.com/associations/pour-un-avenir-durable-en-occitanie/formulaires/2',
        isExternal: true
      },
      {
        name: t('service_addition_label'),
        href: '/service/add'
      },
      {
        name: t('features_to_come_label'),
        isExternal: true,
        href: 'https://docs.google.com/presentation/d/1INNPnHduNqaov9PWFr3UDLfFYp8ve5e7/edit?usp=drive_link&ouid=115775379044450692924&rtpof=true&sd=true'
      },
      {
        name: t('contact_label'),
        href: '/contact'
      },
      {
        name: t('poll_label'),
        href: 'https://framaforms.org/venez-tester-wwworyxchangecom-1732871595',
        isExternal: true
      },
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/company/oryxchange/posts/',
        isExternal: true
      }
    ],
    [
      {
        name: t('whoarewe_label'),
        href: 'https://www.padeo.fr/association/',
        isExternal: true
      },
      {
        name: t('team_label'),
        href: '/team',
        isExternal: false
      },
      {
        name: t('oryx_history_label'),
        href: 'https://docs.google.com/document/d/15wl0Lv5phrtH0dxNgTxj2Fx6PkPcaRvF/edit?usp=sharing&ouid=115775379044450692924',
        isExternal: true
      },
      {
        name: t('chart_label'),
        href: 'https://1drv.ms/b/c/2b525df775df0f5d/EQd8-MszE69BvTBTJvNUgDcBtA1TxFbPRZ6wWSvORAfeLQ?e=zHccWn',
        isExternal: true
      },
      {
        name: t('legal_label'),
        href: '/legal',
        isExternal: false
      },
      {
        name: t('sourcecode_label'),
        href: 'https://github.com/padeocc/oryx-application',
        isExternal: true
      }
    ]
  ];
};
