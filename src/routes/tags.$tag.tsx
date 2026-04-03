import { Box, Text, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { VideoGrid } from "~/components/VideoGrid";
import { TVideo } from "~/utils/types";
import { videos } from "~/utils/videos";

export const Route = createFileRoute("/tags/$tag")({
  component: RouteComponent,
});

function RouteComponent() {
  const { tag } = Route.useParams();

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
      <Title order={1} tt='capitalize'>{tag} Videos</Title>
      <VideoGrid videos={tagVideos} />
    </Box>
  );
}
