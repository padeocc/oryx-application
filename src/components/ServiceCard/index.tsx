'use client';

import { getLogoImage, sortAlphabetically } from '@/components/content/utils';
import NotFound from '@/components/navigation/NotFound';
import { Theme, getActionFilters } from '@/config';
import { Service } from '@/types';
import {
  Badge,
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
import { CurrencyEur, Handshake } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Description from './components/Description';
import Links from './components/Links';
import Tags from './components/Tags';
import style from './server-card.module.css';
import ScoreBanner from '../common/ScoreBanner';

const ServiceCard = ({
  service,
  backgroundColor,
  theme,
  color,
  titleOrder = 3,
  asLoader,
  asPreview
}: {
  service?: Service;
  backgroundColor?: StyleProp<DefaultMantineColor>;
  theme?: Theme;
  color: string;
  titleOrder?: TitleOrder;
  asLoader?: boolean;
  asPreview?: boolean;
}) => {
  const tFilters = useTranslations('filters_component');
  const [hover, { close, open }] = useDisclosure(false);
  const router = useRouter();

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

  const fields = Object.keys(getActionFilters({ themes: [theme] }))
    //@ts-ignore
    .filter(f => !!service[f])
    .map(field => tFilters(`filter-${field}-label`))
    .sort(sortAlphabetically);

  const productstructure = [...(service?.productstructure || []), ...fields];

  return (
    <Card
      h={'100%'}
      bg={backgroundColor}
      color={color}
      onMouseEnter={open}
      onMouseLeave={close}
      className={style['card']}
      onClick={() => {
        router.push(`/service/${theme}/${service.code}`);
      }}>
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
                    tags={productstructure}
                    color={color}
                    basekey={`${theme}-${service.name}`}
                    firstTag={
                      (service.economic || service.ess) ? (
                        <Group gap="xs">
                          {service.economic && (
                            <Badge
                              variant="gradient"
                              gradient={{ from: 'orange', to: 'yellow', deg: 90 }}
                              radius="md"
                              style={{ textTransform: 'capitalize', border: '0px', padding: '0px' }}
                              styles={{
                                root: {
                                  textTransform: 'capitalize'
                                }
                              }}
                              pl="xs"
                              pr="xs"
                              leftSection={<CurrencyEur weight="fill" fontSize={'1.2rem'} />}>
                              {tFilters('economic-label')}
                            </Badge>
                          )}
                          {service.ess && (
                            <Badge
                              variant="gradient"
                              gradient={{ from: 'orange', to: 'yellow', deg: 90 }}
                              radius="md"
                              style={{ textTransform: 'capitalize', border: '0px', padding: '0px' }}
                              styles={{
                                root: {
                                  textTransform: 'capitalize'
                                }
                              }}
                              pl="xs"
                              pr="xs"
                              leftSection={<Handshake weight="fill" fontSize={'1.2rem'} />}>
                              ESS
                            </Badge>
                          )}
                        </Group>
                      ) : undefined
                    }
                  />
                </Group>
              </GridCol>
              <GridCol span={{ base: 12 }}>
                <Group justify="space-between">
                  <Title order={titleOrder} c={color}>
                    {service.name}
                  </Title>
                </Group>
              </GridCol>
            </Grid>
            <Description service={service} theme={theme} />
          </Stack>
        </Stack>
        {asPreview ? null : (
          <CardSection c={color}>
            <Links service={service} theme={theme} hover={hover} />
          </CardSection>
        )}
      </Flex>
    </Card>
  );
};

export default ServiceCard;
