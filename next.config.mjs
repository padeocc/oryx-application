/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/fr', destination: '/', permanent: true },
      { source: '/fr/:path*', destination: '/:path*', permanent: true },
      { source: '/alimentation', destination: '/foods', permanent: true },
      { source: '/mes-achats', destination: '/goods', permanent: true },
      { source: '/logement', destination: '/accommodations', permanent: true },
      { source: '/transport-responsable', destination: '/transports', permanent: true },
      { source: '/transport-responsable-toulouse', destination: '/transports', permanent: true },
    ];
  },
};

export default nextConfig;
