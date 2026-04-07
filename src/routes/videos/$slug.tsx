import { createFileRoute } from "@tanstack/react-router";
import { Text, Group, Badge, Divider, Stack, Box, Title } from "@mantine/core";
import ReactPlayer from "react-player";
import { Link } from "@tanstack/react-router";
import { TVideo } from "~/utils/types";
import { IconArrowUpRight, IconCalendar, IconClock } from "@tabler/icons-react";
import { getVideos } from "~/utils/helper";
import { MediaControl } from "./-media-control-demo";

type SearchOptions = any;

type DetailsSearch = {
  show: SearchOptions;
};

export const Route = createFileRoute("/videos/$slug")({
  validateSearch: (search: Record<string, unknown>): DetailsSearch => {
    // validate and parse the search params into a typed state
    return {
      show: (search.show as SearchOptions) || undefined,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();
  const { show } = Route.useSearch();
  const videos = getVideos();
  const video: TVideo | undefined = videos.find((v) => v.slug === slug);

  console.log({ show });

  if (!video)
    return (
      <Text>
        Video not found
        <br />
        {slug}
      </Text>
    );

  return (
    <Stack maw={600} mx="auto" mb={100}>
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
        <Title order={1} size="h2">
          {video.title}
        </Title>

        <Group justify="space-between">
          <Badge leftSection={<IconClock size={14} />}>{video.duration}</Badge>
          <Badge leftSection={<IconCalendar size={14} />}>
            {video.date_added}
          </Badge>
        </Group>

        <Group justify="space-between" align="start" mt="lg">
          <Stack>
            <Title order={4} size="h5" ml='xs'>
              Category
            </Title>
            <Badge
              variant="light"
              component={Link}
              to={`/category/${video.category}`}
              rightSection={<IconArrowUpRight size={16} />}
            >
              {video.category}
            </Badge>
          </Stack>
          <Stack align="end">
            <Title order={4} size="h5">
              Tags
            </Title>
            <Stack align="end">
              {video.tags &&
                video.tags.split(",").map((tag) => (
                  <Badge
                    key={tag}
                    component={Link}
                    to={`/tags/${tag}`}
                    rightSection={<IconArrowUpRight size={16} />}
                  >
                    {tag}
                  </Badge>
                ))}
            </Stack>
          </Stack>
        </Group>
      </Stack>

      {show && (
        <Box>
          <Divider size="lg" mt={200} />

          <Stack mt={10}>
            <Text>{video.src}</Text>
            <Text>{video.ratio}</Text>
            <Text>{video.slug}</Text>
            <Text>{video.org_source}</Text>
          </Stack>

          <MediaControl video={video} />
        </Box>
      )}
    </Stack>
  );
}
