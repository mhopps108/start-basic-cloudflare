import {
  AppShellNavbar,
  Box,
  Button,
  Grid,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { Video } from "~/components/Video";
import { VideoGrid } from "~/components/VideoGrid";
import { videos } from "~/utils/videos";

export const Route = createFileRoute("/videos/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>      
      <Group justify="space-between">
        <Title order={1}>Videos</Title>
        <Group>
          <Button variant="default" size="xs">
            Sort
          </Button>
          <Button variant="default" size="xs">
            Filter
          </Button>
        </Group>
      </Group>
      <VideoGrid videos={videos} />
    </>
  );
}
