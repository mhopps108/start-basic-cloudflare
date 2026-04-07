import { Box, Button, SimpleGrid, Title } from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllCategories } from "../../utils/helper";

export const Route = createFileRoute("/category/")({
  component: RouteComponent,
});

function RouteComponent() {
  const categories = getAllCategories();
  console.log(categories);

  return (
    <>
      <Box>
        <Title order={1}>Categories</Title>
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} mt="md">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="lg"
              variant="default"
              component={Link}
              to={`/category/${cat}`}
              tt="capitalize"
            >
              {cat}
            </Button>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}
