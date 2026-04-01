import { Text, Box, Grid, Modal, Image } from "@mantine/core";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import ReactPlayer from "react-player";

export const Route = createFileRoute("/")({
  loader: () => getData(),
  component: Home,
});

const getData = createServerFn().handler(() => {
  return {
    message: `Running in ${navigator.userAgent}`,
    myVar: env.MY_VAR,
    // assetURL: env.VITE_ASSET_URL,
  };
});

function VideoModal({
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
      <Modal opened={opened} onClose={close}>
        <ReactPlayer
          // light={<img src="./android-chrome-192x192.png" alt="Thumbnail" />}
          src={src}
          autoPlay={true}
          controls
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: ratio,
            // border: "1px solid red",
          }}
        />
      </Modal>
    </>
  );
}

function Home() {
  const data = Route.useLoaderData();
  const [opened, { toggle }] = useDisclosure();

  // const [videoOpened, { toggle: toggleVideo }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar>Navbar</AppShell.Navbar>

      <AppShell.Main>
        <Grid>
          {/* <Box bd="1px solid red" display="flex"> */}
          <VideoModal
            src={`${import.meta.env.VITE_ASSET_URL}/think.mp4`}
            ratio="9/16"
            title="Thinking Box"
          />

          <VideoModal
            src="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            ratio="16/9"
            title="Testing Video"
          />

          {/* <ReactPlayer
              light={<img src="./android-chrome-192x192.png" alt="Thumbnail" />}
              src={`${import.meta.env.VITE_ASSET_URL}/think.mp4`}
              controls
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "9/16",
                border: "1px solid red",
              }}
            />
          </Box> */}

          {/* <ReactPlayer
            light={<img src="./android-chrome-192x192.png" alt="Thumbnail" />}
            src="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
          /> */}
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}
