/** 1. Tag it as client component */
"use client";
import { storyblokInit, apiPlugin, RichTextSchema, } from "@storyblok/react/rsc";
// import cloneDeep from "clone-deep";

/** 2. Import your components */
import Page from "./Page";
import Grid from "./Grid";
import CenteredSection from "./CenteredSection";
import LogoCube from "./LogoCube";
import SideBySide from "./SideBySide";
import PillCta from "./PillCta";
import Hero from "./Hero";
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
    page: Page,
    grid: Grid,
    centered_section: CenteredSection, 
    logo_cube: LogoCube,
    side_by_side: SideBySide,
    pill_cta: PillCta,
    hero: Hero
  },
});

export default function StoryblokProvider({ children }) {
  return children;
}
