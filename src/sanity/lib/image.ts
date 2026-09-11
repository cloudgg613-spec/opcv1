import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "./client";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

type SanityImageSource = Parameters<typeof imageBuilder.image>[0];

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder?.image(source).auto("format").fit("max");
};
