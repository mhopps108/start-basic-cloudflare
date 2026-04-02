import {
  Text,
  Box,
  Grid,
  Modal,
  Image,
  Anchor,
  Group,
  Badge,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import HoverVideoPlayer from "react-hover-video-player";
import ReactPlayer from "react-player";
import { videos } from "~/utils/videos";
import { VideoModal } from "./VideoModal";
import { Link } from "@tanstack/react-router";
import { TVideo } from "~/utils/types";

export function Video({
  video,
  // opened,
  // onClose,
}: {
  video: TVideo;
  // opened: boolean;
  // onClose: () => void;
}) {
  const [opened, { toggle, close }] = useDisclosure();

  // `${import.meta.env.VITE_ASSET_URL}/think.mp4`
  return (
    <>
      <Box onClick={toggle}>
        {/* <Image src="./android-chrome-192x192.png" alt="Thumbnail" /> */}
        {/* <Image src="./baseball.webp" alt="Thumbnail" /> */}

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
            height: "auto",
            aspectRatio: "4/4",
            minWidth: "auto",
            minHeight: "auto",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        />
        <Stack gap='sm' mt='xs'>
          <Anchor
            component={Link}
            to={video.slug}
            fz="sm"
            lh="xs"
            lineClamp={3}
          >
            {video.title}
          </Anchor>
          <Group gap="xxs" mt='auto'>
            {video.tags &&
              video.tags
                .split(",")
                .map((tag) => <Badge size="xs">{tag}</Badge>)}
          </Group>
        </Stack>
      </Box>
      {/* <Modal opened={opened} onClose={close} size="xl" mah="80vh">
        <Box>
          <ReactPlayer
            // light={<img src="./android-chrome-192x192.png" alt="Thumbnail" />}
            src={src}
            autoPlay={true}
            controls
            style={{
              width: "100%",
              height: "auto",
              maxHeight: '80vh',
              aspectRatio: ratio,
              // border: "1px solid red",
            }}
          />
        </Box>
      </Modal> */}
    </>
  );
}
