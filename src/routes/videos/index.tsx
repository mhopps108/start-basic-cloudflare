import { Button, Group, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { VideoGrid } from "~/components/VideoGrid";
import { getVideos } from "~/utils/helper";

export const Route = createFileRoute("/videos/")({
  component: RouteComponent,
});

function RouteComponent() {
  const videos = getVideos();

  return (
    <>
      <Group justify="space-between">
        <Title order={1}>Videos</Title>
        <Group>
          <Button variant="default" size="xs">
            Sort
          </Button>
          <Button variant="default" size="xs">
            Filter
          </Button>
        </Group>
      </Group>
      <VideoGrid videos={videos} />
    </>
  );
}
