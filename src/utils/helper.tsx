import { videos } from "~/utils/videos";

export const getAllCategories = () => {
  const cats: string[] = [...new Set(videos?.map((v) => v.category).sort())];
  return cats;
};

export const getAllTags = () => {
  const allTags: string[][] | undefined = videos?.map((v) => {
    return v.tags.split(",");
  });

  const tags = [...new Set(allTags?.flat())].sort();
  return tags;
};

export const getAllVideos = () => videos;
