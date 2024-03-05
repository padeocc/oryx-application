import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  localeDetection: false
});

export const config = {
  matcher: ['/', '/(fr|en)/:path*']
};
