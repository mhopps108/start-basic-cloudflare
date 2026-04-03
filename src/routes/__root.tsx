/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";
import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";

import {
  Image,
  AppShell,
  Burger,
  Group,
  Button,
  TextInput,
  Checkbox,
  Loader,
  Modal,
  LoadingOverlay,
  createTheme,
  DEFAULT_THEME,
  mantineHtmlProps,
  ColorSchemeScript,
  Anchor,
  Container,
  ActionIcon,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { MantineProvider } from "@mantine/core";
import { Search } from "~/components/Search";

export const theme = createTheme({
  // primaryColor: 'blue',
  // primaryShade: {
  //   light: 6,
  //   dark: 8,
  // },
  primaryColor: "blue",
  fontFamily: `Roboto, ${DEFAULT_THEME.fontFamily}`,
  defaultRadius: "md",
  headings: {
    fontFamily: "Roboto, sans-serif",
  },
  defaultGradient: {
    from: "myColor.6",
    to: "myColor.4",
    deg: 45,
  },
  // defaultGradient: {
  //   from: 'green.7',
  //   to: 'green.4',
  //   deg: 45,
  // },
  spacing: {
    xxs: "0.25rem", // 4
    xs: "0.5rem", // 8
    sm: "0.75rem", // 12
    md: "1rem", // 16
    lg: "1.5rem", // 24
    xl: "2rem", // 32
  },
  components: {
    Image: Image.extend({
      defaultProps: {
        radius: "md",
      },
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: "default",
        size: "lg",
      },
    }),
    Button: Button.extend({
      defaultProps: {
        size: "sm",
        // variant: 'light',
        variant: "gradient",
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        size: "md",
      },
    }),
    Checkbox: Checkbox.extend({
      defaultProps: {
        size: "md",
      },
    }),
    Loader: Loader.extend({
      defaultProps: {
        type: "dots",
      },
    }),
    Modal: Modal.extend({
      defaultProps: {
        size: "xl",
        overlayProps: {
          backgroundOpacity: 0.6,
          blur: 2,
        },
        transitionProps: {
          transition: "slide-up",
        },
      },
    }),
    LoadingOverlay: LoadingOverlay.extend({
      defaultProps: {
        overlayProps: {
          radius: "sm",
          blur: 2,
          zIndex: 9999,
        },
      },
    }),
  },
  // other: {
  // headerHeight: 1,
  // footerHeight: 1
  // }
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title:
          "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
    // scripts: [
    //   {
    //     src: '/customScript.js',
    //     type: 'text/javascript',
    //   },
    // ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <HeadContent />
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <AppShell
            padding="md"
            header={{ height: 60 }}
            navbar={{
              width: 225,
              breakpoint: "sm",
              collapsed: { mobile: !opened, desktop: true },
            }}
          >
            <AppShell.Header px="md">
              <Group justify="space-between" align="center" h="100%">
                <Anchor component={Link} to="/">
                  <Image
                    src="./logo.png"
                    alt="logo"
                    width={406}
                    height={368}
                    w={40}
                  />
                </Anchor>

                <Group hiddenFrom="sm">
                  <Search />
                  <Burger
                    opened={opened}
                    onClick={toggle}
                    // hiddenFrom="sm"
                    size="sm"
                  />
                </Group>
                <Group visibleFrom="sm">
                  <Anchor component={Link} to="/videos">
                    Videos
                  </Anchor>
                  <Anchor component={Link} to="/tags">
                    Tags
                  </Anchor>
                  <Search />
                </Group>
              </Group>
            </AppShell.Header>

            <AppShell.Navbar>
              <Stack p="md">
                <Anchor component={Link} to="/videos">
                  Videos
                </Anchor>
                <Anchor component={Link} to="/tags">
                  Tags
                </Anchor>
              </Stack>
            </AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>
          </AppShell>
        </MantineProvider>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
