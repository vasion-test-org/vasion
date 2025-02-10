/** 1. Tag it as client component */
"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

/** 2. Import your components */
import Page from "./Page";
import Grid from "./Grid";
import CenteredSection from "./CenteredSection";
import LogoCube from "./LogoCube";
import SideBySide from "./SideBySide";
import PillCta from "./PillCta";
import Hero from "./Hero";
import ComponentRenderer from "@/components/renderers/ComponentRenderer"; // Handles all components

/** 3. Initialize Storyblok */
storyblokInit({
  accessToken: "Qf9Z8O8vNFQw8drmarBGMwtt",
  use: [apiPlugin],
  apiOptions: {
    region: "us",
  },
  components: {
    page: Page,
    grid: Grid,
    centered_section: CenteredSection,
    logo_cube: LogoCube,
    side_by_side: SideBySide,
    pill_cta: PillCta,
    hero: Hero,
    personalized_page: ComponentRenderer, // Ensures personalized pages are handled
    personalized_section: ComponentRenderer, // Ensures personalized sections work correctly
    component_renderer: ComponentRenderer, // Handles general component rendering
  },
});

export default function StoryblokProvider({ children }) {
  return children;
}
