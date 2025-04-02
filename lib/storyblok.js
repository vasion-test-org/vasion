import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import Page from "@/components/Page";
import Grid from "@/components/centeredSections/Grid";
import CenteredSection from "@/components/CenteredSection";
import LogoCube from "@/components/LogoCube";
import SideBySide from "@/components/SideBySide";
import CTA from "@/components/CTA";
import ComparisonSelect from "@/components/ComparisonSelect";
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
import Footer from "@/components/globalComponents/Footer";
import MobileNav from "@/components/globalComponents/MobileNav";
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
import G2Banner from "@/components/G2Banner";
import G2Reviews from "@/components/G2Reviews";
import ImageCarousel from "@/components/ImageCarousel";
import WorkableEmbed from "@/components/WorkableEmbed";
import G2Badges from "@/components/centeredSections/Badges";
import Demo from "@/components/Demo";
import OverviewController from "@/components/overview/OverviewController";
import ResourceCards from "@/components/ResourceCards";
import BlogCards from "@/components/BlogCards";
import Config from "@/components/Config";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "us",
  },
  components: {
    page: Page,
    config: Config,
    resource_cards: ResourceCards,
    blog_cards: BlogCards,
    nav: Nav,
    grid: Grid,
    modal_cards: ModalCards,
    centered_section: CenteredSection,
    customer_success: CustomerSuccess,
    comparison_select: ComparisonSelect,
    logo_cube: LogoCube,
    side_by_side: SideBySide,
    blog_info: BlogInfo,
    long_form_text: LongFormText,
    small_quote: SmallQuote,
    workable_embed: WorkableEmbed,
    two_column_list: TwoColumnList,
    press_timeline: PressTimeline,
    icon: Icon,
    image: Image,
    integrations_grid: IntegrationsGrid,
    overview: OverviewController,
    cta: CTA,
    demo_cards: Demo,
    hero: Hero,
    g2_banner: G2Banner,
    g2_reviews: G2Reviews,
    g2_badges: G2Badges,
    featured_card: FeaturedCard,
    review_us_cta: ReviewUsCta,
    video_carousel: VideoCarousel,
    masonry_grid: MasonryGrid,
    image_carousel: ImageCarousel,
    footer: Footer,
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
