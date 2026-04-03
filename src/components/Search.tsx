import Fuse from "fuse.js";
import { ActionIcon } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import {
  Spotlight,
  SpotlightActionData,
  SpotlightFilterFunction,
  SpotlightActionGroupData,
  spotlight,
} from "@mantine/spotlight";
import { getAllVideos, getAllTags } from "~/utils/helper";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";

const fuzzySearchFilter: SpotlightFilterFunction = (query, searchActions) => {
  if (!query.trim()) {
    return searchActions;
  }

  const flatActions = searchActions.reduce<any[]>((acc, item) => {
    if ("actions" in item) {
      return [
        ...acc,
        ...item.actions.map((action) => ({ ...action, group: item.group })),
      ];
    }
    return [...acc, item];
  }, []);

  const fuse = new Fuse(flatActions, {
    keys: ["label", "description"],
    threshold: 0.3,
    minMatchCharLength: 1,
  });

  const results = fuse.search(query).map((result) => result.item);

  const groups: Record<string, any> = {};
  const result: any[] = [];

  results.forEach((action) => {
    if (action.group) {
      if (!groups[action.group]) {
        groups[action.group] = {
          pushed: false,
          data: { group: action.group, actions: [] },
        };
      }
      groups[action.group].data.actions.push(action);
      if (!groups[action.group].pushed) {
        groups[action.group].pushed = true;
        result.push(groups[action.group].data);
      }
    } else {
      result.push(action);
    }
  });

  return result;
};

const createActionTitles = (navigate: any) => {
  const videos = getAllVideos();
  return videos.map((v) => {
    return {
      id: v.id,
      label: v.title,
      description: v.tags,
      onClick: () =>
        navigate({ to: `/videos/$slug`, params: { slug: v.slug } }),
    };
  });
};

const createActionTags = (navigate: any) => {
  const tags = getAllTags();
  return tags.map((t) => {
    return {
      id: t,
      label: t,
    };
  });
};

export function Search() {
  const navigate = useNavigate();
  console.log("render: search");

  const actions: (SpotlightActionGroupData | SpotlightActionData)[] = useMemo(
    () => [
      {
        group: "Titles",
        actions: createActionTitles(navigate),
      },

      {
        group: "Tags",
        actions: createActionTags(navigate),
      },
    ],
    [navigate],
  );

  return (
    <>
      <ActionIcon variant="subtle" onClick={spotlight.open}>
        <IconSearch />
      </ActionIcon>
      <Spotlight
        actions={actions}
        filter={fuzzySearchFilter}
        nothingFound="Nothing found..."
        highlightQuery
        limit={7}
        searchProps={{
          leftSection: <IconSearch size={20} />,
          placeholder: "Search...",
        }}
      />
    </>
  );
}
