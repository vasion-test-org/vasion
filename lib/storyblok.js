import { storyblokInit, apiPlugin } from '@storyblok/react/rsc';
import ResourceCta from '@/components/ResourceCta';
import ResourceCards from '@/components/ResourceCards';
import ResourceArticle from '@/components/ResourceArticle';
import Page from '@/components/Page';
import Grid from '@/components/centeredSections/Grid';
import Stats from '@/components/centeredSections/Stats';
import Accordion from '@/components/centeredSections/Accordion';
import CenteredSection from '@/components/CenteredSection';
import LogoCube from '@/components/LogoCube';
import SideBySide from '@/components/SideBySide';
import CTA from '@/components/CTA';
import ResourceInlineQuote from '@/components/ResourceInlineQuote';
import ResourceAuthor from '@/components/ResourceAuthor';
import ComparisonSelect from '@/components/ComparisonSelect';
import Hero from '@/components/Hero';
import ModalCards from '@/components/ModalCards';
import ComponentRenderer from '@/components/renderers/ComponentRenderer';
import Testimonial from '@/components/Testimonial';
import LongFormText from '@/components/copyComponents/LongFormText';
import BlogInfo from '@/components/copyComponents/BlogInfo';
import Form from '@/components/Form';
import Icon from '@/components/globalComponents/Icon';
import Image from '@/components/globalComponents/Image';
import SmallQuote from '@/components/SmallQuote';
import TwoColumnList from '@/components/TwoColumnList';
import EmbeddedPDF from '@/components/EmbeddedPDF';
import NumberBlock from '@/components/NumberBlock';
import ComparisonTable from '@/components/ComparisonTable';
import CustomerSuccess from '@/components/CustomerSuccess';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import ReviewUsCta from '@/components/ReviewUsCta';
import PaginatedCards from '@/components/PaginatedCards';
import VideoCarousel from '@/components/VideoCarousel';
import PressTimeline from '@/components/PressTimeline';
import FeaturedCard from '@/components/FeaturedCard';
import MasonryGrid from '@/components/MasonryGrid';
import IntegrationsGrid from '@/components/IntegrationsGrid';
import G2Banner from '@/components/G2Banner';
import G2Reviews from '@/components/G2Reviews';
import ImageCarousel from '@/components/ImageCarousel';
import WorkableEmbed from '@/components/WorkableEmbed';
import G2Badges from '@/components/centeredSections/Badges';
import Demo from '@/components/Demo';
import OverviewController from '@/components/overview/OverviewController';
import UnderConstruction from '@/components/UnderConstruction';
import BlogCards from '@/components/BlogCards';
import BusinessCaseForms from '@/components/BusinessCaseTool/BusinessCaseForms';
import LightboxButton from '@/components/LightboxButton';
import Bio from '@/components/globalComponents/Bio';
import FigmaEmbed from '@/components/FigmaEmbed';
import IconCards from '@/components/IconCards';
import CustomerLogos from '@/components/CustomerLogos';
import SupportedPrinters from '@/components/SupportedPrinters';
import AnchorLink from '@/components/globalComponents/AnchorLink';
import TestForm from '@/components/TestForm';
import InfographicPill from '@/components/InfographicPill';
import InfographicSideBySide from '@/components/InfographicSideBySide';
import ThankYouComponent from '@/components/ThankYouComponent';
import AnchorNavigator from '@/components/globalComponents/AnchorNavigator';
import LaunchGrid from '@/components/LaunchGrid';
import LogoBanner from '@/components/LogoBanner';
import ReviewBadgeCta from '@/components/ReviewBadgeCta';
import Embed from '@/components/Embed';
import ResourcesLongForm from '@/components/copyComponents/ResourcesLongForm';
import SpotifyEmbed from '@/components/SpotifyEmbed';

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: 'us',
  },
  components: {
    page: Page,
    thank_you_component: ThankYouComponent,
    infographic_side_by_side: InfographicSideBySide,
    supported_printers: SupportedPrinters,
    business_case_tool: BusinessCaseForms,
    anchor_link: AnchorLink,
    anchor_navigator: AnchorNavigator,
    embed: Embed,
    spotify_embed: SpotifyEmbed,
    // config: Config,
    resource_cta: ResourceCta,
    resource_article: ResourceArticle,
    customer_logo_section: CustomerLogos,
    resource_cards: ResourceCards,
    blog_cards: BlogCards,
    resources_longform: ResourcesLongForm,
    // nav: Nav,
    // nav: MobileNav,
    grid: Grid,
    stats: Stats,
    accordion: Accordion,
    author: Bio,
    modal_cards: ModalCards,
    centered_section: CenteredSection,
    customer_success: CustomerSuccess,
    comparison_select: ComparisonSelect,
    logo_cube: LogoCube,
    side_by_side: SideBySide,
    blog_info: BlogInfo,
    long_form_text: LongFormText,
    launch_grid: LaunchGrid,
    logo_banner: LogoBanner,
    small_quote: SmallQuote,
    workable_embed: WorkableEmbed,
    two_column_list: TwoColumnList,
    press_timeline: PressTimeline,
    icon: Icon,
    icon_cards: IconCards,
    infographic_pill: InfographicPill,
    resource_inline_quote: ResourceInlineQuote,
    resource_author: ResourceAuthor,
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
    figma_embed: FigmaEmbed,
    review_us_cta: ReviewUsCta,
    video_carousel: VideoCarousel,
    masonry_grid: MasonryGrid,
    image_carousel: ImageCarousel,
    // footer: Footer,
    form: Form,
    test_form: TestForm,
    under_construction: UnderConstruction,
    paginated_cards: PaginatedCards,
    light_box_button: LightboxButton,
    number_block: NumberBlock,
    reviews_carousel: ReviewsCarousel,
    embedded_pdf: EmbeddedPDF,
    comparison_table: ComparisonTable,
    testimonial: Testimonial,
    testimonial_carousel: TestimonialCarousel,
    personalized_page: ComponentRenderer,
    personalized_section: ComponentRenderer,
    component_renderer: ComponentRenderer,
    review_badge_cta: ReviewBadgeCta,
  },
});
