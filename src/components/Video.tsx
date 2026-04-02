import { Text, Box, Grid, Modal, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import HoverVideoPlayer from "react-hover-video-player";
import ReactPlayer from "react-player";
import { videos } from "~/utils/videos";
import { VideoModal } from "./VideoModal";

export function Video({
  src,
  ratio,
  title,
  // opened,
  // onClose,
}: {
  src: string;
  ratio: string;
  title: string;
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

        <HoverVideoPlayer
          videoSrc={src}
          // focused={autoPlay}
          // focused={isVideoPlaying}
          // disableDefaultEventHandling
          // controls
          // restartOnPaused
          // unloadVideoOnPaused
          style={{
            borderRadius: '8px',
            overflow: 'hidden',
            maxWidth: '100%',
            width: '100%',
            // height: maxWidth ? `${(1 / 1.7777777777777777) * maxWidth || 100}px` : '100%',
            height: '200px',
            // transform: 'scale(1.1)',
            // transform: 'translateY(20%)'
          }}
          // hoverOverlayWrapperStyle={{
          //   backgroundColor: 'rgba(0, 0, 0, 0.7)',
          //   maxWidth: maxWidth ? `${maxWidth}px` : '100%',
          //   width: '100%',
          //   height: maxWidth ? `${(1 / 1.7777777777777777) * maxWidth || 100}px` : '100%',
          // }}
          videoStyle={{
            // overflow: 'hidden',
            // borderRadius: '8px',
            // maxWidth: maxWidth ? `${maxWidth}px` : '100%',
            // width: '100%',
            // height: maxWidth ? `${(1 / 1.7777777777777777) * maxWidth || 100}px` : '100%',
            transform: 'translateY(-10%)'
          }}
          // playbackStartDelay={50}
          // preload="auto"
          // muted={true}
          // volume={0.0}
          // disableRemotePlayback={false}
          // pausedOverlay={
          //   <Image
          //     src={getImageUrl(exercise.eid)}
          //     width={960}
          //     height={540}
          //     maw={maxWidth ? `${maxWidth}px` : '100%'}
          //     w="100%"
          //     h={maxWidth ? (1 / 1.78) * maxWidth || 100 : '100%'}
          //     // fit="cover"
          //     // fit="contain"
          //     alt={exercise.name}
          //   />
          // }
          // loadingOverlay={<LoadingOverlay visible={true} />}
        />
        <Text>{title}</Text>
        <VideoModal
          src={src}
          ratio={ratio}
          title={title}
          opened={opened}
          toggle={toggle}
        />
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
