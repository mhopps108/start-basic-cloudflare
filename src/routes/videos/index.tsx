import { Box, Grid, SimpleGrid } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { Video } from "~/components/Video";
import { videos } from "~/utils/videos";

export const Route = createFileRoute("/videos/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SimpleGrid verticalSpacing='xl' cols={{ base: 2, xs: 3, sm: 3, md: 4, lg: 5 }} styles={{}}>
      {videos.map((video) => (
        // <Box mah={60}>
        <Video key={video.id} video={video} />
        // </Box>
      ))}
    </SimpleGrid>
  );
}
