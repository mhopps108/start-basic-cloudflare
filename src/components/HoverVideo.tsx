import { Text, Box } from "@mantine/core";
import HoverVideoPlayer from "react-hover-video-player";
import { TVideo } from "~/utils/types";

export function HoverVideo({ video }: { video: TVideo }) {
  return (
    <>
      <Box>
        <HoverVideoPlayer
          videoSrc={video.video_src}
          // focused={autoPlay}
          // focused={isVideoPlaying}
          // disableDefaultEventHandling
          // controls
          // restartOnPaused
          // unloadVideoOnPaused
          style={{
            borderRadius: "8px",
            overflow: "hidden",
            maxWidth: "100%",
            width: "100%",
            // height: maxWidth ? `${(1 / 1.7777777777777777) * maxWidth || 100}px` : '100%',
            height: "200px",
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
            transform: "translateY(-10%)",
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
        <Text>{video.title}</Text>
      </Box>
    </>
  );
}
