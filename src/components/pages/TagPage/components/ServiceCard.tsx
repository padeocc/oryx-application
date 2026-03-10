import { Badge, Button, Card, CardSection, Flex, Image, Text, Title } from "@mantine/core";

import { Service } from "@/types";
import { getLogoImage } from "@/components/content/utils";
import HighligtedBadges from "@/components/ServiceCard/components/HightlightedTags";
import Link from "next/link";

type Props = {
  productstructure: string;
  service: Service;
};

export const ServiceCard = ({
  productstructure,
  service,
}: Props) => {

  return (
    <Card
      h={'100%'}
      bg={"white"}
      color={"black"}
      padding="lg"
      withBorder
      // className={style['card']}
      // onClick={() => {
      //   router.push(`/service/${theme}/${service.code}`);
      // }}
    >
      <CardSection>
        <Image src={getLogoImage({ service, theme: service.theme[0] })} alt={service.name} height={150} />
      </CardSection>
      <Flex style={{ alignContent: 'space-around' }} direction={'column'} align={'stretch'}>
        <HighligtedBadges
          isEconomic={service.economic ?? false}
          isEss={service.ess ?? false}
        />

        <Flex
          mih={20}
          gap="xs"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          {service.productstructure
            .filter((ps) => ps !== productstructure)
            .map((ps) => (
            <Badge
              key={`tag-${ps}`}
              variant="outline"
              color={'black'}
              bg="white"
              size="xs"
            >
              {ps}
            </Badge>
          ))}
        </Flex>
        <Title order={2} c={"black"} mb="xs" mt="sm">
          {service.name}
        </Title>
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
        <Link
          href={`/service/${service.theme[0]}/${service.code}`}
          target="_blank"
        >
          <Button variant="filled" mt="md" fullWidth bg="green_oryx.8">
            Découvrir {service.name}
          </Button>
        </Link>
      </Flex>
    </Card>
  )
}