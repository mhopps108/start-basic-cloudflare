import {
  AppShellNavbar,
  Box,
  Button,
  Container,
  SimpleGrid,
  Text,
  Title
} from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
import { VideoGrid } from "~/components/VideoGrid";
import { TVideo } from "~/utils/types";
import { videos } from "~/utils/videos";
import { getAllTags } from "~/utils/helper";

export const Route = createFileRoute("/tags/$tag")({
  component: RouteComponent,
});

function RouteComponent() {
  const { tag } = Route.useParams();
  const tags = getAllTags();

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
        <SimpleGrid cols={{ base: 1}} p='sm'>
          <Title order={4}>Tags</Title>
          {tags.map((tag) => (
            <Button
              // size="lg"
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
        <Title order={1} tt="capitalize">
          {tag} Videos
        </Title>
        <VideoGrid videos={tagVideos} />
      </Box>
    </>
  );
}
