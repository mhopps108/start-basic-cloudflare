import { Text, Box, Grid, Modal, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ReactPlayer from "react-player";

export function VideoModal({
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
        <Image src="./baseball.webp" alt="Thumbnail" />
        <Text>{title}</Text>
      </Box>
      <Modal opened={opened} onClose={close} size="xl" mah="80vh">
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
      </Modal>
    </>
  );
}
