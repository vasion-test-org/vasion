// lib/storyblok.js
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import Page from '@/components/Page';
import Grid from '@/components/centeredSections/Grid';
import CenteredSection from '@/components/CenteredSection';
import LogoCube from '@/components/LogoCube';
import SideBySide from '@/components/SideBySide';
import CTA from '@/components/CTA';
import Hero from '@/components/Hero';
import ComponentRenderer from '@/components/renderers/ComponentRenderer';
import Testimonial from '@/components/Testimonial';
import LongFormText from '@/components/copyComponents/LongFormText';
import BlogInfo from '@/components/copyComponents/BlogInfo';
import Form from '@/components/Form';

export const getStoryblokApi = storyblokInit({
  accessToken: 'Qf9Z8O8vNFQw8drmarBGMwtt',
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
    blog_info: BlogInfo,
    long_form_text: LongFormText,
    cta: CTA,
    hero: Hero,
    form: Form,
    testimonial: Testimonial,
    personalized_page: ComponentRenderer,
    personalized_section: ComponentRenderer,
    component_renderer: ComponentRenderer,
  },
});


