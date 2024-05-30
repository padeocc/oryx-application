import { getLogoImage } from '@/app/components/content/utils';
import NotFound from '@/app/components/navigation/NotFound';
import { Service, getOtherFilters } from '@/app/components/pages/ActionsPage/utils';
import { Theme } from '@/config';
import {
  Card,
  CardSection,
  DefaultMantineColor,
  Flex,
  Grid,
  GridCol,
  Group,
  Image,
  Stack,
  StyleProp,
  Title,
  Tooltip
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Description from './components/Description';
import Tags from './components/Tags';

const ServiceCard = ({
  service,
  noImage = false,
  backgroundColor,
  theme,
  color
}: {
  service: Service;
  noImage?: boolean;
  backgroundColor?: StyleProp<DefaultMantineColor>;
  theme: Theme;
  color: string;
}) => {
  const tServices = useTranslations('services');
  const tFilters = useTranslations('filters_component');

  if (!service) {
    return <NotFound />;
  }

  const fields = Object.keys(getOtherFilters(theme))
    //@ts-ignore
    .filter(f => !!service[f])
    .map(field => tFilters(`filter-${field}-label`));

  return (
    <Card h={'100%'} bg={backgroundColor} color={color}>
      {!noImage ? (
        <CardSection>
          <Image src={getLogoImage({ service, theme })} alt={service.name} height={100} />
        </CardSection>
      ) : null}
      <Flex style={{ alignContent: 'space-around' }} direction={'column'} align={'stretch'}>
        <Stack pt={noImage ? '0' : 'md'} justify="space-between" h={'100%'}>
          <Stack>
            <Grid>
              <GridCol span={{ base: 12 }} ta={'right'} pt={'sm'}>
                <Group gap={'xs'}>
                  <Tags tags={[...service.tags, ...fields]} color={color} />
                </Group>
              </GridCol>

              <GridCol span={{ base: 12 }}>
                <Title order={3} c={color}>
                  {service.name}
                </Title>
              </GridCol>
            </Grid>
            <Description service={service} />
          </Stack>
        </Stack>
        <CardSection c={color}>
          <Group justify="center" p="md" fz="sm">
            <Link href={`/action/${theme}/${service.code}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              {tServices('details-label')}
            </Link>
            <Tooltip label={service.url} color="var(--mantine-color-dark-outline)">
              <Link href={service.url} target="_blank" style={{ color: 'inherit', textDecoration: 'none' }}>
                {tServices('access-label')}
              </Link>
            </Tooltip>
          </Group>
        </CardSection>
      </Flex>
    </Card>
  );
};

export default ServiceCard;
