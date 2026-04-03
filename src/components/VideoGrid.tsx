import { SimpleGrid } from "@mantine/core";
import { TVideo } from "~/utils/types";
import { Video } from "./Video";

export function VideoGrid({ videos }: { videos: TVideo[] }) {
  return (
    <SimpleGrid
      verticalSpacing="xl"
      cols={{ base: 2, xs: 3, sm: 3, md: 4, lg: 5 }}
      styles={{}}
    >
      {videos.map((video) => (
        <Video key={video.id} video={video} />
      ))}
    </SimpleGrid>
  );
}
