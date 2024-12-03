import Content from '@/app/components/pages/ServicesPage/components/Content';

const Loading = () => {
  return (
    <Content
      filters={{}}
      distinctValues={{ location: [], region: [] }}
      hits={[]}
      pagesCount={0}
      page={0}
      totalNumberOfResults={0}
      asLoader
    />
  );
};

export default Loading;
