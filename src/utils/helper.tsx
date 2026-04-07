import { videos } from "~/utils/videos";
import { TVideo } from "./types";

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

// export const getAllVideos = () => videos;

export const getVideos = () => {
  let tempVideos = videos;
  tempVideos.sort(function (a, b) {
    const aDate = a.date_added.split("/").reverse().join("");
    const bDate = b.date_added.split("/").reverse().join("");
    // return aDate > bDate ? 1 : aDate < bDate ? -1 : 0;
    return aDate < bDate ? 1 : aDate > bDate ? -1 : 0;
  });
  return tempVideos;
};
