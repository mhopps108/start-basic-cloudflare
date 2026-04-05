import {
  AppShellNavbar,
  Badge,
  Box,
  Button,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
import { VideoGrid } from "~/components/VideoGrid";
import { TVideo } from "~/utils/types";
import { getAllCategories, getAllTags, getAllVideos } from "~/utils/helper";

export const Route = createFileRoute("/category/$category")({
  component: RouteComponent,
});

function RouteComponent() {
  const { category } = Route.useParams();
  const categories = getAllCategories();
  const videos = getAllVideos();

  const catVideos: TVideo[] | undefined = videos?.filter((v) => {
    return v.category === category;
  });

  console.log({ catVideos });

  if (!catVideos)
    return (
      <Text>
        No videos found for tag:
        <br />
        {category}
      </Text>
    );

  return (
    <>
      <AppShellNavbar>
        <SimpleGrid cols={{ base: 1 }} p="md">
          <Title order={4}>Tags</Title>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant="default"
              component={Link}
              to={`/category/${cat}`}
              tt="capitalize"
            >
              {cat}
            </Button>
          ))}
        </SimpleGrid>
      </AppShellNavbar>
      <Box>
        <Title order={2} tt="capitalize">
          Tagged Videos
        </Title>
        <Badge mt="xs" size="xl">
          {category}
        </Badge>
        <VideoGrid videos={catVideos} />
      </Box>
    </>
  );
}
