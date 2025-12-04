import { storyblokInit, apiPlugin } from '@storyblok/react/rsc';
import ResourceCta from '@/components/ResourceCta';
import ResourceCards from '@/components/ResourceCards';
import ResourceCards_tw from '@/components/ResourceCards_tw';
import ResourceArticle from '@/components/ResourceArticle';
import Page from '@/components/Page';
import Grid from '@/components/centeredSections/Grid';
import Grid_tw from '@/components/centeredSections/Grid_tw';
import Cards from '@/components/centeredSections/Cards';
import Cards_tw from '@/components/centeredSections/Cards_tw';
import Stats from '@/components/centeredSections/Stats';
import Stats_tw from '@/components/centeredSections/Stats_tw';
import Accordion from '@/components/centeredSections/Accordion';
import Accordion_tw from '@/components/centeredSections/Accordion_tw';
import StackedCards from '@/components/centeredSections/StackedCards';
import StackedCards_tw from '@/components/centeredSections/StackedCards_tw';
import CenteredSection from '@/components/CenteredSection';
import CenteredSection_tw from '@/components/CenteredSection_tw';
import LogoCube from '@/components/LogoCube';
import SideBySide from '@/components/SideBySide';
import CTA from '@/components/CTA';
import ResourceInlineQuote from '@/components/ResourceInlineQuote';
import ResourceAuthor from '@/components/ResourceAuthor';
import ComparisonSelect from '@/components/ComparisonSelect';
import Hero from '@/components/Hero';
import Hero_tw from '@/components/Hero_tw';
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
import PaginatedCards_tw from '@/components/PaginatedCards_tw';
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
import BlogCards_tw from '@/components/BlogCards_tw';
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
import LaunchGrid from '@/components/LaunchGrid';
import LaunchGrid_tw from '@/components/LaunchGrid_tw';
import LogoBanner from '@/components/LogoBanner';
import ReviewBadgeCta from '@/components/ReviewBadgeCta';
import Embed from '@/components/Embed';
import ResourcesLongForm from '@/components/copyComponents/ResourcesLongForm';
import AnchorNavigator from '@/components/globalComponents/AnchorNavigator';
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
    embed: Embed,
    spotify_embed: SpotifyEmbed,
    // config: Config,
    //
    resource_cta: ResourceCta,
    resource_article: ResourceArticle,
    customer_logo_section: CustomerLogos,
    resource_cards: ResourceCards,
    resource_cards_tw: ResourceCards_tw,
    customer_logo_section: CustomerLogos,
    blog_cards: BlogCards,
    blog_cards_tw: BlogCards_tw,
    resources_longform: ResourcesLongForm,
    // nav: Nav,
    // nav: MobileNav,
    grid: Grid,
    grid_tw: Grid_tw,
    cards: Cards,
    cards_tw: Cards_tw,
    stats: Stats,
    stats_tw: Stats_tw,
    accordion: Accordion,
    accordion_tw: Accordion_tw,
    stacked_cards: StackedCards,
    stacked_cards_tw: StackedCards_tw,
    author: Bio,
    modal_cards: ModalCards,
    centered_section: CenteredSection,
    centered_section_tw: CenteredSection_tw,
    customer_success: CustomerSuccess,
    comparison_select: ComparisonSelect,
    logo_cube: LogoCube,
    side_by_side: SideBySide,
    blog_info: BlogInfo,
    long_form_text: LongFormText,
    launch_grid: LaunchGrid,
    launch_grid_tw: LaunchGrid_tw,
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
    hero_tw: Hero_tw,
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
    paginated_cards_tw: PaginatedCards_tw,
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
    anchor_navigator: AnchorNavigator,
  },
});
