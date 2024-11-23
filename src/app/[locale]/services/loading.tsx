import Content from '@/app/components/pages/ServicesPage/components/Content';

const Loading = () => {
  return (
    <Content
      filters={{
        query: undefined,
        sortBy: undefined,
        limit: undefined,
        start: undefined,
        theme: undefined,
        tags: undefined,
        codes: undefined,
        region: undefined,
        location: undefined,
        organic: undefined,
        local: undefined,
        season: undefined,
        shortcircuit: undefined,
        wastereducer: undefined,
        foodwastereducer: undefined,
        cookmore: undefined,
        used: undefined,
        rent: undefined,
        mutualise: undefined,
        repair: undefined,
        ecobuilt: undefined,
        lowtech: undefined,
        recycled: undefined,
        reused: undefined,
        diy: undefined,
        comparer: undefined,
        relocating: undefined
      }}
      distinctValues={{ location: [], region: [], theme: [] }}
      hits={[]}
      pagesCount={0}
      page={0}
      totalNumberOfResults={0}
      asLoader
    />
  );
};

export default Loading;
