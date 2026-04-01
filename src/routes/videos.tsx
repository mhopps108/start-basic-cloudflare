import { Grid, SimpleGrid } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { VideoModal } from "~/components/VideoModal";

import { videos } from "~/utils/videos";

// function fetchVideos() {

// }

export const Route = createFileRoute("/videos")({
  // loader: () => fetchVideos(),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SimpleGrid cols={{ base: 2, xs: 3, sm: 3, md: 4, lg: 5 }}>
      {videos.map((video) => (
        <VideoModal
          key={video.id}
          // src={video.video_src}
          src={
            video.video_src.includes("http")
              ? video.video_src
              : `${import.meta.env.VITE_ASSET_URL}/${video.video_src}`
          }
          ratio={video.video_ratio}
          title={video.title}
        />
      ))}
      {/* <VideoModal
        src={`${import.meta.env.VITE_ASSET_URL}/think.mp4`}
        ratio="9/16"
        title="Thinking Box"
      />

      <VideoModal
        src="https://www.youtube.com/watch?v=iuvoRWnSv7E"
        ratio="16/9"
        title="How to Pitch a Baseball | Baseball Pitching | by Howcast"
      /> */}
    </SimpleGrid>
  );
}
