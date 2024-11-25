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
  Loader,
  Skeleton,
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
  backgroundColor,
  theme,
  color,
  titleOrder = 3,
  asLoader
}: {
  service?: Service;
  backgroundColor?: StyleProp<DefaultMantineColor>;
  theme?: Theme;
  color: string;
  titleOrder?: TitleOrder;
  asLoader?: boolean;
}) => {
  const tFilters = useTranslations('filters_component');
  const [hover, { close, open }] = useDisclosure(false);

  if (asLoader) {
    return (
      <Card h={'100%'} bg={backgroundColor} color={color} className={style['card']}>
        <CardSection m="sm">
          <Group align="center" justify="center">
            <Loader color={color} />
          </Group>
        </CardSection>
        <CardSection c={color}>
          <Skeleton h="3rem" />
        </CardSection>
      </Card>
    );
  }

  if (!service || !theme) {
    return <NotFound />;
  }

  const fields = Object.keys(getActionFilters([theme]))
    //@ts-ignore
    .filter(f => !!service[f])
    .map(field => tFilters(`filter-${field}-label`));

  return (
    <Card
      h={'100%'}
      bg={backgroundColor}
      color={color}
      onMouseEnter={open}
      onMouseLeave={close}
      className={style['card']}>
      <CardSection>
        <Image src={getLogoImage({ service, theme })} alt={service.name} height={100} />
      </CardSection>
      <Flex style={{ alignContent: 'space-around' }} direction={'column'} align={'stretch'}>
        <Stack pt={'md'} justify="space-between" h={'100%'}>
          <Stack>
            <Grid>
              <GridCol span={{ base: 12 }} ta={'right'} pt={'sm'}>
                <Group gap={'xs'}>
                  <Tags
                    tags={[...(service?.tags || []), ...fields]}
                    color={color}
                    basekey={`${theme}-${service.name}`}
                  />
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
