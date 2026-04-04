import { SimpleGrid } from "@mantine/core";
import { TVideo } from "~/utils/types";
import { VideoItem } from "./VideoItem";

export function VideoGrid({ videos }: { videos: TVideo[] }) {
  return (
    <SimpleGrid
      verticalSpacing="xl"
      cols={{ base: 2, xs: 3, sm: 3, md: 4, lg: 5 }}
      mt="md"
    >
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </SimpleGrid>
  );
}
