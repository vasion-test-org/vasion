// lib/storyblok.js
import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react/rsc";
import Page from '@/components/Page';
import Grid from '@/components/centeredSections/Grid';
import CenteredSection from '@/components/CenteredSection';
import LogoCube from '@/components/LogoCube';
import SideBySide from '@/components/SideBySide';
import CTA from '@/components/CTA';
import Hero from '@/components/Hero';
import ComponentRenderer from '@/components/renderers/ComponentRenderer';
import Testimonial from '@/components/Testimonial';

 storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: 'us',
  },
  components: {
    page: Page,
    grid: Grid,
    centered_section: CenteredSection,
    logo_cube: LogoCube,
    side_by_side: SideBySide,
    cta: CTA,
    hero: Hero,
    testimonial: Testimonial,
    personalized_page: ComponentRenderer,
    personalized_section: ComponentRenderer,
    component_renderer: ComponentRenderer,
  },
});

export { getStoryblokApi };
