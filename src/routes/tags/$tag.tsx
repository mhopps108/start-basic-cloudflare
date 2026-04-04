import {
  AppShellNavbar,
  Badge,
  Box,
  Button,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
import { VideoGrid } from "~/components/VideoGrid";
import { TVideo } from "~/utils/types";
import { getAllTags, getAllVideos } from "~/utils/helper";

export const Route = createFileRoute("/tags/$tag")({
  component: RouteComponent,
});

function RouteComponent() {
  const { tag } = Route.useParams();
  const tags = getAllTags();
  const videos = getAllVideos();

  const tagVideos: TVideo[] | undefined = videos?.filter((v) => {
    const tags = v.tags.split(",");
    return tags.includes(tag);
  });

  console.log({ tagVideos });

  if (!tagVideos)
    return (
      <Text>
        No videos found for tag:
        <br />
        {tag}
      </Text>
    );

  return (
    <>
      <AppShellNavbar>
        <SimpleGrid cols={{ base: 1 }} p="md">
          <Title order={4}>Tags</Title>
          {tags.map((tag) => (
            <Button
              key={tag}
              variant="default"
              component={Link}
              to={`/tags/${tag}`}
              tt="capitalize"
            >
              {tag}
            </Button>
          ))}
        </SimpleGrid>
      </AppShellNavbar>
      <Box>
        <Title order={2} tt="capitalize">
          Tagged Videos
        </Title>
        <Badge mt="xs" size="xl">
          {tag}
        </Badge>
        <VideoGrid videos={tagVideos} />
      </Box>
    </>
  );
}
