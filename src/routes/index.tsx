import { Anchor, Card, Group, Scroller, Stack, Title } from "@mantine/core";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import ReactPlayer from "react-player";

import { getAllTags, getAllCategories, getVideos } from "~/utils/helper";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const videos = getVideos();
  const tags = getAllTags();
  const categories = getAllCategories();
  const navigate = useNavigate();

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Recently Added</Title>
        <Anchor component={Link} to="/videos">
          View All
        </Anchor>
      </Group>
      <Scroller controlSize="lg">
        <Group gap="sm" wrap="nowrap">
          {videos.map((v) => (
            <Card shadow="md" padding="sm" key={v.id} w={200} h="100%">
              <Card.Section>
                <ReactPlayer
                  src={
                    v.src.includes("http")
                      ? v.src
                      : `${import.meta.env.VITE_ASSET_URL}/${v.src}`
                  }
                  light={<img src={`./thumbs/${v.id}.jpeg`} alt="Thumbnail" />}
                  onClickPreview={() => navigate({ to: `/videos/${v.slug}` })}
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
                style={{ textWrap: "wrap" }}
                to={`/videos/${v.slug}`}
                lh="xs"
                mt="xs"
                lineClamp={2}
                fw={500}
              >
                {v.title}
              </Anchor>
            </Card>
          ))}
        </Group>
      </Scroller>

      <Group justify="space-between" mt="lg">
        <Title order={2}>Category</Title>
        <Anchor component={Link} to="/category">
          View All
        </Anchor>
      </Group>

      <Scroller controlSize="lg">
        <Group gap="sm" wrap="nowrap">
          {categories.map((c) => (
            <Card shadow="md" padding="sm" key={c} h="100%">
              <Anchor
                component={Link}
                to={`/category/${c}`}
                fw={500}
                tt="capitalize"
              >
                {c}
              </Anchor>
            </Card>
          ))}
        </Group>
      </Scroller>

      <Group justify="space-between" mt="lg">
        <Title order={2}>Tags</Title>
        <Anchor component={Link} to="/tags">
          View All
        </Anchor>
      </Group>

      <Scroller controlSize="lg">
        <Group gap="sm" wrap="nowrap">
          {tags.map((t) => (
            <Card shadow="md" padding="sm" key={t} h="100%">
              <Anchor
                component={Link}
                to={`/tags/${t}`}
                fw={500}
                tt="capitalize"
              >
                {t}
              </Anchor>
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
    </Stack>
  );
}
