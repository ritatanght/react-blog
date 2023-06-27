import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || "",
  dataset: process.env.REACT_APP_SANITY_DATASET || "",
});

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto("format").fit("max");
};
