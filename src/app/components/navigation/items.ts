import { StateUser } from '@/state';

export const getNavigationItems = ({
  t,
  user
}: {
  t: any;
  user: StateUser | undefined;
}): { href: string; name: string; isExternal: boolean; priority?: number }[][] => {
  const menu = [
    [
      {
        name: t('action_label'),
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

  if (user?.email) {
    menu[0].push({
      name: t('actions_label'),
      href: '/actions/user',
      isExternal: false
    });
  }
  return menu;
};
