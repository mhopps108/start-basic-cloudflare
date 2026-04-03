import {
  Anchor,
  AppShell,
  AppShellNavbar,
  Box,
  Button,
  Container,
  SimpleGrid,
  Stack,
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
      {/* <AppShellNavbar>
        <Container>
          Other
        </Container>
      </AppShellNavbar> */}
      <Box>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }}>
          {tags.map((tag) => (
            <Button
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
