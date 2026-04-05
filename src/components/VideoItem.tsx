import { Anchor, Group, Badge, Card } from "@mantine/core";
import ReactPlayer from "react-player";
import { Link } from "@tanstack/react-router";
import { TVideo } from "~/utils/types";

export function VideoItem({ video }: { video: TVideo }) {
  return (
    <Card shadow="md" padding="sm">
      <Card.Section>
        <ReactPlayer
          src={
            video.src.includes("http")
              ? video.src
              : `${import.meta.env.VITE_ASSET_URL}/${video.src}`
          }
          //   playing={true}
          light={<img src={`/thumbs/${video.id}.jpeg`} alt="Thumbnail" />}
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

      <Anchor
        component={Link}
        to={`/videos/${video.slug}`}
        fz="sm"
        lh="xs"
        mt="xs"
        lineClamp={2}
        fw={500}
      >
        {video.title}
      </Anchor>
      <Group gap="xxs" mt="xs">
        {video.tags &&
          video.tags.split(",").map((tag) => (
            <Badge variant="default" key={tag} size="xs">
              {tag}
            </Badge>
          ))}
      </Group>
    </Card>
  );
}
