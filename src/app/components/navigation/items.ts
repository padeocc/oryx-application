export const items: { href: string; name: string; isExternal: boolean; priority?: number }[][] = [
  [
    {
      name: 'Trouver une action',
      href: '/',
      isExternal: false,
      priority: 1
    },
    {
      name: 'Voir mes actions',
      href: '/fr/user-actions',
      isExternal: false
    },
    {
      name: 'Faire un don',
      href: 'https://www.helloasso.com/associations/pour-un-avenir-durable-en-occitanie',
      isExternal: true
    }
  ]
  // [
  //   // {
  //   //   name: 'Qui sommes-nous ?',
  //   //   href: '/fr/team',
  //   //   isExternal: false
  //   // },

  // ]
  // [
  //   {
  //     name: 'Se connecter',
  //     href: '/fr/signup',
  //     isExternal: false
  //   }
  // ]
];
