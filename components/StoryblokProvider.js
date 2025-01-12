/** 1. Tag it as client component */
"use client";
import { storyblokInit, apiPlugin, RichTextSchema, } from "@storyblok/react/rsc";
// import cloneDeep from "clone-deep";

/** 2. Import your components */
import Page from "./Page";
import Teaser from "./Teaser";
import Grid from "./Grid";
import Feature from "./Feature";
import CenteredSection from "./centeredSections/CenteredSection";

// const mySchema = cloneDeep(RichTextSchema); 
/** 3. Initialize it as usual */
storyblokInit({
  accessToken: "Qf9Z8O8vNFQw8drmarBGMwtt",
  use: [apiPlugin],
  apiOptions: {
    region: "us",
  },
  // richText: {
  //   schema: mySchema,
  //   resolver: (component, blok) => {
  //     switch (component) {
  //       case "my-custom-component":
  //         return `<div class="my-component-class">${blok.text}</div>`;
  //       default:
  //         return "Resolver not defined";
  //     }
  //   },
  // },
  components: {
    teaser: Teaser,
    page: Page,
    grid: Grid,
    feature: Feature,
    centered_section: CenteredSection, 
  },
});

export default function StoryblokProvider({ children }) {
  return children;
}
