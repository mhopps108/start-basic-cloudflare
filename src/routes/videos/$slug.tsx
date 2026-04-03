import { createFileRoute } from "@tanstack/react-router";
import {
  Text,
  Box,
  Grid,
  Modal,
  Image,
  Anchor,
  Stack,
  Container,
  Title,
  Group,
  Badge,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import HoverVideoPlayer from "react-hover-video-player";
import ReactPlayer from "react-player";
import { videos } from "~/utils/videos";
import { Link } from "@tanstack/react-router";
import { TVideo } from "~/utils/types";
import { IconArrowAutofitLeft, IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";

export const Route = createFileRoute("/videos/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();
  // const video: TVideo | undefined = videos.find((v) => v.slug === slug);
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
    <Stack maw={600} mx="auto">
      <ReactPlayer
        src={
          video.src.includes("http")
            ? video.src
            : `${import.meta.env.VITE_ASSET_URL}/${video.src}`
        }
        //   playing={true}
        controls={true}
        width="100%"
        height="auto"
        style={{
          // width: "100%",
          margin: "0 auto",
          aspectRatio: video.ratio || "auto",
          // maxWidth: "400px",
          maxHeight: "80vh",
          // height: "auto",
          //   aspectRatio: "4/4",
          // minWidth: "auto",
          // minHeight: "auto",
          // borderRadius: "4px",
          // overflow: "hidden",
          // "--controls": "none",
        }}
      />
      <Stack>
        <Title order={1}>{video.title}</Title>
        <Group justify="space-between">
          <Group gap="xxs" mt="auto">
            {video.tags &&
              video.tags.split(",").map((tag) => (
                <Badge
                  size="lg"
                  variant="light"
                  key={tag}
                  component={Link}
                  to={`/tags/${tag}`}
                  rightSection={<IconArrowUpRight size={16} />}
                >
                  {tag}
                </Badge>
              ))}
          </Group>
          <Badge size="lg" variant="default">
            {video.duration}
          </Badge>
        </Group>
        <Group>
          <Text c="dimmed">Date Added</Text>
          <Text>{video.date_added}</Text>
        </Group>
      </Stack>

      <Stack mt={150}>
        <Text>{video.src}</Text>
        <Text>{video.ratio}</Text>
        <Text>{video.slug}</Text>
        <Text>{video.org_source}</Text>
      </Stack>
    </Stack>
  );
}
