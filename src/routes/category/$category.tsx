import { Badge, Box, Group, Text, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { VideoGrid } from "~/components/VideoGrid";
import { TVideo } from "~/utils/types";
import { getVideos } from "~/utils/helper";

export const Route = createFileRoute("/category/$category")({
  component: RouteComponent,
});

function RouteComponent() {
  const { category } = Route.useParams();
  const videos = getVideos();

  const catVideos: TVideo[] | undefined = videos?.filter((v) => {
    return v.category === category;
  });

  if (!catVideos)
    return (
      <Text>
        No videos found for category:
        <br />
        {category}
      </Text>
    );

  return (
    <Box>
      <Group justify="space-between">
        <Badge mt="xs" size="xl">
          {category}
        </Badge>
        <Title order={2} tt="capitalize">
          Videos
        </Title>
      </Group>
      <VideoGrid videos={catVideos} />
    </Box>
  );
}
