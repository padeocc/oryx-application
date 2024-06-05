import Script from 'next/script';

const GoogleAnalytics = () => {
  const googleAnalyticsId = process?.env?.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

  return googleAnalyticsId ? (
    <div className="container">
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
      <Script id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalyticsId}');
      `}
      </Script>
    </div>
  ) : (
    <span></span>
  );
};

export default GoogleAnalytics;
