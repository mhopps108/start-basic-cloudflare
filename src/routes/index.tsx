import { Grid, SimpleGrid } from "@mantine/core";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

export const Route = createFileRoute("/")({
  loader: () => getData(),
  component: Home,
});

const getData = createServerFn().handler(() => {
  return {
    message: `Running in ${navigator.userAgent}`,
    myVar: env.MY_VAR,
    // assetURL: env.VITE_ASSET_URL,
  };
});

function Home() {
  // const data = Route.useLoaderData();
  // const [opened, { toggle }] = useDisclosure();

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
      <Link to="/videos">Videos</Link>
      <Link to="/videos">Videos</Link>
    </SimpleGrid>
    // <AppShell
    //   padding="md"
    //   header={{ height: 60 }}
    //   navbar={{
    //     width: 300,
    //     breakpoint: "sm",
    //     collapsed: { mobile: !opened },
    //   }}
    // >
    //   <AppShell.Header>
    //     <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

    //     <div>Logo</div>
    //   </AppShell.Header>

    //   <AppShell.Navbar>Navbar</AppShell.Navbar>

    //   <AppShell.Main>
    //     <Grid>
    //       <Link to="/videos">Videos</Link>
    //     </Grid>
    //   </AppShell.Main>
    // </AppShell>
  );
}
