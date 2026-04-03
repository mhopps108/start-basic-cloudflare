import { Box, Anchor, Group, Badge, Stack, Paper } from "@mantine/core";
import ReactPlayer from "react-player";
import { Link } from "@tanstack/react-router";
import { TVideo } from "~/utils/types";

export function Video({ video }: { video: TVideo }) {
  return (
    // <Box bg='dark.9' bdrs='sm'>
    <Paper shadow="lg" bg='dark.8'>
      <ReactPlayer
        src={
          video.src.includes("http")
            ? video.src
            : `${import.meta.env.VITE_ASSET_URL}/${video.src}`
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
      <Stack gap="sm" p='sm' >
        <Anchor component={Link} to={`/videos/${video.slug}`} fz="sm" lh="xs" lineClamp={2}>
          {video.title}
        </Anchor>
        <Group gap="xxs" mt="auto">
          {video.tags &&
            video.tags.split(",").map((tag) => (
              <Badge variant="default" key={tag} size="xs">
                {tag}
              </Badge>
            ))}
        </Group>
      </Stack>
    </Paper>
  );
}
