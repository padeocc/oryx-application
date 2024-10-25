'use client';

import { getLogoImage } from '@/app/components/content/utils';
import NotFound from '@/app/components/navigation/NotFound';
import { Theme, getActionFilters } from '@/config';
import { Service } from '@/types';
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
  TitleOrder
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import Description from './components/Description';
import Links from './components/Links';
import Tags from './components/Tags';
import style from './server-card.module.css';

const ServiceCard = ({
  service,
  noImage = false,
  backgroundColor,
  theme,
  color,
  titleOrder = 3
}: {
  service: Service;
  noImage?: boolean;
  backgroundColor?: StyleProp<DefaultMantineColor>;
  theme: Theme;
  color: string;
  titleOrder?: TitleOrder;
}) => {
  const tFilters = useTranslations('filters_component');
  const [hover, { close, open }] = useDisclosure(false);

  if (!service) {
    return <NotFound />;
  }

  const fields = Object.keys(getActionFilters(theme))
    //@ts-ignore
    .filter(f => !!service[f])
    .map(field => tFilters(`filter-${field}-label`));

  const domain = process.env.NEXT_PUBLIC_STRAPI_ENDPOINT;

  return (
    <Card
      h={'100%'}
      bg={backgroundColor}
      color={color}
      onMouseEnter={open}
      onMouseLeave={close}
      className={style['card']}>
      {!noImage ? (
        <CardSection>
          <Image src={getLogoImage({ service, theme, domain })} alt={service.name} height={100} />
        </CardSection>
      ) : null}
      <Flex style={{ alignContent: 'space-around' }} direction={'column'} align={'stretch'}>
        <Stack pt={noImage ? '0' : 'md'} justify="space-between" h={'100%'}>
          <Stack>
            <Grid>
              <GridCol span={{ base: 12 }} ta={'right'} pt={'sm'}>
                <Group gap={'xs'}>
                  <Tags tags={[...(service?.tags || []), ...fields]} color={color} />
                </Group>
              </GridCol>
              <GridCol span={{ base: 12 }}>
                <Title order={titleOrder} c={color}>
                  {service.name}
                </Title>
              </GridCol>
            </Grid>
            <Description service={service} theme={theme} />
          </Stack>
        </Stack>
        <CardSection c={color}>
          <Links service={service} theme={theme} hover={hover} />
        </CardSection>
      </Flex>
    </Card>
  );
};

export default ServiceCard;
