import { Box, Button, SimpleGrid, Title } from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllTags } from "~/utils/helper";

export const Route = createFileRoute("/tags/")({
  component: RouteComponent,
});

function RouteComponent() {
  const tags = getAllTags();

  return (
    <>
      <Box>
        <Title order={1} mt="lg">
          Tags
        </Title>
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
