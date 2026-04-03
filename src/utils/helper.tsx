import { videos } from "~/utils/videos";

export const getAllTags = () => {
  const allTags: string[][] | undefined = videos?.map((v) => {
    return v.tags.split(",");
  });

  const tags = [...new Set(allTags?.flat())].sort();
  return tags;
};
