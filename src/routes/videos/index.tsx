import { Box, Grid, SimpleGrid } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { Video } from "~/components/Video";
import { VideoGrid } from "~/components/VideoGrid";
import { videos } from "~/utils/videos";

export const Route = createFileRoute("/videos/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <VideoGrid videos={videos} />;
}
