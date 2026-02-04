import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

import BlogCards from '@/components/BlogCards';
import BusinessCaseForms from '@/components/BusinessCaseTool/BusinessCaseForms';
import CenteredSection from '@/components/CenteredSection';
import Accordion from '@/components/centeredSections/Accordion';
import G2Badges from '@/components/centeredSections/Badges';
import G2BadgeAnimation from '@/components/centeredSections/G2BadgeAnimation';
import Grid from '@/components/centeredSections/Grid';
import Stats from '@/components/centeredSections/Stats';
import ComparisonSelect from '@/components/ComparisonSelect';
import ComparisonTable from '@/components/ComparisonTable';
import CompetitiveAnalysis from '@/components/CompetitiveAnalysis';
import BlogInfo from '@/components/copyComponents/BlogInfo';
import LongFormText from '@/components/copyComponents/LongFormText';
import ResourcesLongForm from '@/components/copyComponents/ResourcesLongForm';
import CTA from '@/components/CTA';
import CustomerLogos from '@/components/CustomerLogos';
import CustomerSuccess from '@/components/CustomerSuccess';
import Demo from '@/components/Demo';
import Embed from '@/components/Embed';
import EmbeddedPDF from '@/components/EmbeddedPDF';
import FeaturedCard from '@/components/FeaturedCard';
import FigmaEmbed from '@/components/FigmaEmbed';
import Form from '@/components/Form';
import G2Banner from '@/components/G2Banner';
import G2Reviews from '@/components/G2Reviews';
import GameEmbed from '@/components/GameEmbed';
import AnchorLink from '@/components/globalComponents/AnchorLink';
import AnchorNavigator from '@/components/globalComponents/AnchorNavigator';
import Bio from '@/components/globalComponents/Bio';
import Icon from '@/components/globalComponents/Icon';
import Image from '@/components/globalComponents/Image';
import Hero from '@/components/Hero';
import IconCards from '@/components/IconCards';
import ImageCarousel from '@/components/ImageCarousel';
import InfographicPill from '@/components/InfographicPill';
import InfographicSideBySide from '@/components/InfographicSideBySide';
import IntegrationsGrid from '@/components/IntegrationsGrid';
import LaunchGrid from '@/components/LaunchGrid';
import LightboxButton from '@/components/LightboxButton';
import LogoBanner from '@/components/LogoBanner';
import LogoCube from '@/components/LogoCube';
import MasonryGrid from '@/components/MasonryGrid';
import ModalCards from '@/components/ModalCards';
import NumberBlock from '@/components/NumberBlock';
import OverviewController from '@/components/overview/OverviewController';
import Page from '@/components/Page';
import PaginatedCards from '@/components/PaginatedCards';
import PressTimeline from '@/components/PressTimeline';
import ComponentRenderer from '@/components/renderers/ComponentRenderer';
import ResourceArticle from '@/components/ResourceArticle';
import ResourceAuthor from '@/components/ResourceAuthor';
import ResourceCards from '@/components/ResourceCards';
import ResourceCta from '@/components/ResourceCta';
import ResourceInlineQuote from '@/components/ResourceInlineQuote';
import ReviewBadgeCta from '@/components/ReviewBadgeCta';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import ReviewUsCta from '@/components/ReviewUsCta';
import SideBySide from '@/components/SideBySide';
import SmallQuote from '@/components/SmallQuote';
import SpotifyEmbed from '@/components/SpotifyEmbed';
import SupportedPrinters from '@/components/SupportedPrinters';
import TestForm from '@/components/TestForm';
import Testimonial from '@/components/Testimonial';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import ThankYouComponent from '@/components/ThankYouComponent';
import TwoColumnList from '@/components/TwoColumnList';
import UnderConstruction from '@/components/UnderConstruction';
import VideoCarousel from '@/components/VideoCarousel';
import WorkableEmbed from '@/components/WorkableEmbed';

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  apiOptions: {
    region: 'us',
  },
  components: {
    anchor_link: AnchorLink,
    anchor_navigator: AnchorNavigator,
    business_case_tool: BusinessCaseForms,
    embed: Embed,
    game_embed: GameEmbed,
    infographic_side_by_side: InfographicSideBySide,
    page: Page,
    spotify_embed: SpotifyEmbed,
    supported_printers: SupportedPrinters,
    thank_you_component: ThankYouComponent,
    // config: Config,
    blog_cards: BlogCards,
    customer_logo_section: CustomerLogos,
    resource_article: ResourceArticle,
    resource_cards: ResourceCards,
    resource_cta: ResourceCta,
    resources_longform: ResourcesLongForm,
    // nav: Nav,
    // nav: MobileNav,
    accordion: Accordion,
    author: Bio,
    blog_info: BlogInfo,
    centered_section: CenteredSection,
    comparison_select: ComparisonSelect,
    competitive_analysis: CompetitiveAnalysis,
    cta: CTA,
    customer_success: CustomerSuccess,
    demo_cards: Demo,
    featured_card: FeaturedCard,
    figma_embed: FigmaEmbed,
    g2_badge_animation: G2BadgeAnimation,
    g2_badges: G2Badges,
    g2_banner: G2Banner,
    g2_reviews: G2Reviews,
    grid: Grid,
    hero: Hero,
    icon: Icon,
    icon_cards: IconCards,
    image: Image,
    image_carousel: ImageCarousel,
    infographic_pill: InfographicPill,
    integrations_grid: IntegrationsGrid,
    launch_grid: LaunchGrid,
    logo_banner: LogoBanner,
    logo_cube: LogoCube,
    long_form_text: LongFormText,
    masonry_grid: MasonryGrid,
    modal_cards: ModalCards,
    overview: OverviewController,
    press_timeline: PressTimeline,
    resource_author: ResourceAuthor,
    resource_inline_quote: ResourceInlineQuote,
    review_us_cta: ReviewUsCta,
    side_by_side: SideBySide,
    small_quote: SmallQuote,
    stats: Stats,
    two_column_list: TwoColumnList,
    video_carousel: VideoCarousel,
    workable_embed: WorkableEmbed,
    // footer: Footer,
    comparison_table: ComparisonTable,
    component_renderer: ComponentRenderer,
    embedded_pdf: EmbeddedPDF,
    form: Form,
    light_box_button: LightboxButton,
    number_block: NumberBlock,
    paginated_cards: PaginatedCards,
    personalized_page: ComponentRenderer,
    personalized_section: ComponentRenderer,
    review_badge_cta: ReviewBadgeCta,
    reviews_carousel: ReviewsCarousel,
    test_form: TestForm,
    testimonial: Testimonial,
    testimonial_carousel: TestimonialCarousel,
    under_construction: UnderConstruction,
  },
  use: [apiPlugin],
});
