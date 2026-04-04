import {
  Anchor,
  Badge,
  Box,
  Card,
  Group,
  Scroller,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
import { VideoItem } from "~/components/VideoItem";
import ReactPlayer from "react-player";

import { getAllVideos } from "~/utils/helper";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const videos = getAllVideos();

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
      <Link to="/videos">Videos</Link>

      <Scroller>
        {/* <Group gap="xs" wrap="nowrap" mah={80}> */}
        <Group gap="sm" wrap="nowrap">
          {videos.map((v) => (
            <Card shadow="md" padding="sm" key={v.id} w={140} h="100%">
              <Card.Section>
                <ReactPlayer
                  src={
                    v.src.includes("http")
                      ? v.src
                      : `${import.meta.env.VITE_ASSET_URL}/${v.src}`
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
              </Card.Section>

              {/* <Box display="block" mih={40}> */}
              <Anchor
                // display="inline-block"
                component={Link}
                style={{ textWrap: "wrap" }}
                to={`/videos/${v.slug}`}
                fz="xs"
                lh="xs"
                mt="xs"
                lineClamp={2}
                fw={500}
              >
                {v.title}
              </Anchor>
              {/* </Box> */}
            </Card>
          ))}
        </Group>
      </Scroller>
      {/* 
      search
      tags lists
      recently added
      pitching
      hitting
      top picks
      shorts
      */}
    </SimpleGrid>
  );
}
