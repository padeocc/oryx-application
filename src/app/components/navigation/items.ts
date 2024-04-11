export const getNavigationItems = ({
  t
}: {
  t: any;
}): { href: string; name: string; isExternal: boolean; priority?: number }[][] => {
  return [
    [
      {
        name: t('action_label'),
        href: '/actions',
        isExternal: false
      },
      {
        name: t('actions_label'),
        href: '/actions/user',
        isExternal: false
      }
    ],
    [
      {
        name: t('donate_label'),
        href: 'https://www.helloasso.com/associations/pour-un-avenir-durable-en-occitanie',
        isExternal: true
      }
    ]
  ];
};
