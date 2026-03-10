import { Badge, Group } from "@mantine/core";
import { CurrencyEur, Handshake } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

type HighlightedBadgesProps = {
  isEconomic: boolean
  isEss: boolean
};

const HighligtedBadges = ({ isEconomic, isEss }: HighlightedBadgesProps) => {
  const tFilters = useTranslations('filters_component');
  if (!isEconomic && !isEss) {
    return null;
  }

  return (
    <Group
      gap="xs"
      style={{
        position: 'absolute',
        right: 5,
        top: 5,
      }}
    >
      {isEconomic ? (
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
      ) : null}
      {isEss && (
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
  );
};

export default HighligtedBadges;
