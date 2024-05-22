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
  Text,
  Title
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

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
  const t = useTranslations('common');

  if (!service) {
    return <NotFound />;
  }

  return (
    <Card h={'100%'} bg={backgroundColor} color={color}>
      {!noImage ? (
        <CardSection>
          <Image src={getLogoImage({ service })} alt={service.name} height={100} />
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
              <Text fz="sm" size="sm">
                {service.description}
              </Text>
            </Stack>
          </Link>
        </Stack>
        <CardSection c={color}>
          <Group justify="center" p="md">
            <Link href={service.url} target="_blank" style={{ color: 'inherit', textDecoration: 'none' }}>
              {service.url}
            </Link>
          </Group>
        </CardSection>
      </Flex>
    </Card>
  );
};

export default ServiceCard;
