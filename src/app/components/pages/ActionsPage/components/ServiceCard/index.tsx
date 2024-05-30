import { getLogoImage } from '@/app/components/content/utils';
import NotFound from '@/app/components/navigation/NotFound';
import { Service } from '@/app/components/pages/ActionsPage/utils';
import { Theme } from '@/config';
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
  Stack,
  StyleProp,
  Title,
  Tooltip
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Description from './components/Description';

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

  if (!service) {
    return <NotFound />;
  }

  return (
    <Card h={'100%'} bg={backgroundColor} color={color}>
      {!noImage ? (
        <CardSection>
          <Image src={getLogoImage({ service, theme })} alt={service.name} height={100} />
        </CardSection>
      ) : null}
      <Flex style={{ alignContent: 'space-around' }} direction={'column'} align={'stretch'}>
        <Stack pt={noImage ? '0' : 'md'} justify="space-between" h={'100%'}>
          <Link href={`/action/${theme}/${service.code}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            <Stack>
              <Grid>
                <GridCol span={{ base: 12 }} ta={'right'} pt={'sm'}>
                  <Group gap={'xs'}>
                    {(service?.tags || [])?.map(tag => (
                      <Badge key={`tag-${tag}`} size="sm" variant="outline" color={color} bg="white">
                        {tag}
                      </Badge>
                    ))}
                  </Group>
                </GridCol>
                {/* <GridCol span={{ base: 2 }} ta={'right'} pt={'sm'}>
              <Bookmark serviceCode={service.code} />
            </GridCol> */}
                <GridCol span={{ base: 12 }}>
                  <Title order={3} c={color}>
                    {service.name}
                  </Title>
                </GridCol>
              </Grid>
              {/* <Tooltip
                label={<span style={{ width: '20em' }}>{service.description}</span>}
                color="var(--mantine-color-dark-outline)">
                <Text
                  fz="sm"
                  size="sm"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: '1.5',
                    maxHeight: 'calc(1.5em * 3)'
                  }}>
                  {service.description}
                </Text>
              </Tooltip> */}
              <Description service={service} />
            </Stack>
          </Link>
        </Stack>
        <CardSection c={color}>
          <Group justify="center" p="md">
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
