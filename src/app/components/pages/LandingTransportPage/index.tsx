import { Theme, themesColors } from "@/config";
import { LandingPage } from "@/types";
import { Alert, Blockquote, Box, Image, List, ListItem, Space, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { displayContentElementFromBlocs } from "../../content/utils-ui";

type PageParams = { page: LandingPage, theme: Theme };

const LandingTransportPage = async ({ page, theme }: PageParams) => {
  const color = themesColors[theme];

  return (
    <Stack>
      <Stack p="md">{page?.content?.map(displayContentElementFromBlocs)}</Stack>
    </Stack>
  );
}

export default LandingTransportPage;
