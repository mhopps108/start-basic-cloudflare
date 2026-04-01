import { Grid, SimpleGrid } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { VideoModal } from "~/components/VideoModal";

export const Route = createFileRoute("/videos")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SimpleGrid cols={{ base: 2, xs: 3, sm: 3, md: 4, lg: 5 }}>
      <VideoModal
        src={`${import.meta.env.VITE_ASSET_URL}/think.mp4`}
        ratio="9/16"
        title="Thinking Box"
      />

      <VideoModal
        src="https://www.youtube.com/watch?v=LXb3EKWsInQ"
        ratio="16/9"
        title="Testing Video"
      />
    </SimpleGrid>
  );
}
