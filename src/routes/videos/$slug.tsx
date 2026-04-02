import { createFileRoute } from "@tanstack/react-router";
import { Text, Box, Grid, Modal, Image, Anchor, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import HoverVideoPlayer from "react-hover-video-player";
import ReactPlayer from "react-player";
import { videos } from "~/utils/videos";
import { Link } from "@tanstack/react-router";
import { TVideo } from "~/utils/types";

import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";

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
      {/* <MediaController
        style={{
          width: "100%",
          aspectRatio: "16/9",
        }}
      > */}
      {/* <ReactPlayer
          slot="media"
          src="https://stream.mux.com/maVbJv2GSYNRgS02kPXOOGdJMWGU1mkA019ZUjYE7VU7k"
          controls={false}
          style={{
            width: "100%",
            height: "100%",
            "--controls": "none",
          }}
        ></ReactPlayer> */}
      <ReactPlayer
        src={
          video.video_src.includes("http")
            ? video.video_src
            : `${import.meta.env.VITE_ASSET_URL}/${video.video_src}`
        }
        //   playing={true}
        //   controls={false}
        //   width="100px"
        //   height="auto"
        style={
          {
            // width: "100%",
            // maxWidth: "400px",
            // height: "auto",
            //   aspectRatio: "4/4",
            // minWidth: "auto",
            // minHeight: "auto",
            // borderRadius: "4px",
            // overflow: "hidden",
            // "--controls": "none",
          }
        }
      />
      {/* <MediaControlBar>
          <MediaPlayButton />
          <MediaSeekBackwardButton seekOffset={10} />
          <MediaSeekForwardButton seekOffset={10} />
          <MediaTimeRange />
          <MediaTimeDisplay showDuration />
          <MediaMuteButton />
          <MediaVolumeRange />
          <MediaPlaybackRateButton />
          <MediaFullscreenButton />
        </MediaControlBar>
      </MediaController> */}

      <Stack>
        <Text>{video.title}</Text>
        <Text>{video.tags}</Text>
      </Stack>
    </Box>
  );
}
