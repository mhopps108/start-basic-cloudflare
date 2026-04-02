import { createFileRoute } from "@tanstack/react-router";
import { Text, Box, Grid, Modal, Image, Anchor } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import HoverVideoPlayer from "react-hover-video-player";
import ReactPlayer from "react-player";
import { videos } from "~/utils/videos";
import { Link } from "@tanstack/react-router";
import { TVideo } from "~/utils/types";

export const Route = createFileRoute("/videos/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();
  const video: TVideo | undefined = videos.find((v) => v.slug === slug);

  if (!video)
    return (
      <Text>
        Video not found
        <br />
        {slug}
      </Text>
    );

  return (
    <Box>
      <ReactPlayer
        // light={<img src="./android-chrome-192x192.png" alt="Thumbnail" />}
        src={
          video.video_src.includes("http")
            ? video.video_src
            : `${import.meta.env.VITE_ASSET_URL}/${video.video_src}`
        }
        //   playing={true}
        controls
        width="100px"
        height="auto"
        style={{
          width: "100%",
          maxWidth: '400px',
          height: "auto",
        //   aspectRatio: "4/4",

          minWidth: "auto",
          minHeight: "auto",
          borderRadius: "4px",
          overflow: "hidden",
        }}
        config={
          {
            // youtube: {
            //   color: "white"
            // },
          }
        }
      />
      <Text component={Link} to={video.slug}>
        {video.title}
      </Text>
    </Box>
  );
}
