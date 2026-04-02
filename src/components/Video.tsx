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

        <ReactPlayer
          // light={<img src="./android-chrome-192x192.png" alt="Thumbnail" />}
          src={src}
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
          config={{
            // youtube: {
            //   color: "white"
            // },
          }}
        />

        {/* <HoverVideoPlayer
          videoSrc={src}          
          style={{
            borderRadius: '8px',
            overflow: 'hidden',
            maxWidth: '100%',
            width: '100%',          
            height: '200px',            
          }}          
          videoStyle={{            
            transform: 'translateY(-10%)'
          }}          
        /> */}
        <Text>{title}</Text>
        {/* <VideoModal
          src={src}
          ratio={ratio}
          title={title}
          opened={opened}
          toggle={toggle}
        /> */}
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
