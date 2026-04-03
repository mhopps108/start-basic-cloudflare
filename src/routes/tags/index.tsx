import {
  Anchor,
  AppShell,
  AppShellNavbar,
  Box,
  Button,
  Container,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
import { videos } from "~/utils/videos";

export const Route = createFileRoute("/tags/")({
  component: RouteComponent,
});

function RouteComponent() {
  const allTags: string[][] | undefined = videos?.map((v) => {
    return v.tags.split(",");
  });

  const tags = [...new Set(allTags?.flat())].sort();
  console.log();

  return (
    <>
      <Box>
        <Title order={1}>Tags</Title>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} mt="md">
          {tags.map((tag) => (
            <Button
              key={tag}
              size="lg"
              variant="default"
              component={Link}
              to={`/tags/${tag}`}
              tt="capitalize"
            >
              {tag}
            </Button>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
