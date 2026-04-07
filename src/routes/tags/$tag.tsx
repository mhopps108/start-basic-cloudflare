import { Badge, Box, Group, Text, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { VideoGrid } from "~/components/VideoGrid";
import { TVideo } from "~/utils/types";
import { getVideos } from "~/utils/helper";

export const Route = createFileRoute("/tags/$tag")({
  component: RouteComponent,
});

function RouteComponent() {
  const { tag } = Route.useParams();
  const videos = getVideos();

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
    <Box>
      <Group justify="space-between">
        <Badge mt="xs" size="xl">
          {tag}
        </Badge>
        <Title order={2}>Videos</Title>
      </Group>
      <VideoGrid videos={tagVideos} />
    </Box>
  );
}
