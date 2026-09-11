import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uk5uq3py";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  basePath: "/studio",
  name: "OPC_Store_Studio",
  title: "OPC Store Admin Studio",

  projectId,
  dataset,

  plugins: [structureTool()],

  schema: {
    types: schema.types,
  },
});
