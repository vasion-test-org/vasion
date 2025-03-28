import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import Page from "@/components/Page";
import Grid from "@/components/centeredSections/Grid";
import CenteredSection from "@/components/CenteredSection";
import LogoCube from "@/components/LogoCube";
import SideBySide from "@/components/SideBySide";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import ModalCards from "@/components/ModalCards";
import ComponentRenderer from "@/components/renderers/ComponentRenderer";
import Testimonial from "@/components/Testimonial";
import LongFormText from "@/components/copyComponents/LongFormText";
import BlogInfo from "@/components/copyComponents/BlogInfo";
import Form from "@/components/Form";
import Icon from "@/components/globalComponents/Icon";
import Image from "@/components/globalComponents/Image";
import SmallQuote from "@/components/SmallQuote";
import TwoColumnList from "@/components/TwoColumnList";
import EmbeddedPDF from "@/components/EmbeddedPDF";
import NumberBlock from "@/components/NumberBlock";
import Nav from "@/components/globalComponents/Nav";
import CustomerSuccess from "@/components/CustomerSuccess";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ReviewUsCta from "@/components/ReviewUsCta";
import PaginatedCards from "@/components/PaginatedCards";
import VideoCarousel from "@/components/VideoCarousel";
import PressTimeline from "@/components/PressTimeline";
import FeaturedCard from "@/components/FeaturedCard";
import MasonryGrid from "@/components/MasonryGrid";
import IntegrationsGrid from "@/components/IntegrationsGrid";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "us",
  },
  components: {
    page: Page,
    nav: Nav,
    grid: Grid,
    modal_cards: ModalCards,
    centered_section: CenteredSection,
    customer_success: CustomerSuccess,
    logo_cube: LogoCube,
    side_by_side: SideBySide,
    blog_info: BlogInfo,
    long_form_text: LongFormText,
    small_quote: SmallQuote,
    two_column_list: TwoColumnList,
    press_timeline: PressTimeline,
    icon: Icon,
    image: Image,
    integrations_grid: IntegrationsGrid,
    cta: CTA,
    hero: Hero,
    featured_card: FeaturedCard,
    review_us_cta: ReviewUsCta,
    video_carousel: VideoCarousel,
    masonry_grid: MasonryGrid,
    form: Form,
    paginated_cards: PaginatedCards,
    number_block: NumberBlock,
    reviews_carousel: ReviewsCarousel,
    embedded_pdf: EmbeddedPDF,
    testimonial: Testimonial,
    testimonial_carousel: TestimonialCarousel,
    personalized_page: ComponentRenderer,
    personalized_section: ComponentRenderer,
    component_renderer: ComponentRenderer,
  },
});
