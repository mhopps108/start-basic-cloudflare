import { SimpleGrid } from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
      <Link to="/videos">Videos</Link>

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
