import { storyblokInit, apiPlugin } from '@storyblok/react/rsc';
import dynamic from 'next/dynamic';

// Dynamic imports for all components
const Page = dynamic(() => import('@/components/Page'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const Grid = dynamic(() => import('@/components/centeredSections/Grid'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const LogoCube = dynamic(() => import('@/components/LogoCube'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const SideBySide = dynamic(() => import('@/components/SideBySide'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const CTA = dynamic(() => import('@/components/CTA'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const ComparisonSelect = dynamic(
  () => import('@/components/ComparisonSelect'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  }
);

const Hero = dynamic(() => import('@/components/Hero'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const ModalCards = dynamic(() => import('@/components/ModalCards'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const ComponentRenderer = dynamic(
  () => import('@/components/renderers/ComponentRenderer'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  }
);

const Testimonial = dynamic(() => import('@/components/Testimonial'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const LongFormText = dynamic(
  () => import('@/components/copyComponents/LongFormText'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  }
);

const BlogInfo = dynamic(() => import('@/components/copyComponents/BlogInfo'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const Form = dynamic(() => import('@/components/Form'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const Icon = dynamic(() => import('@/components/globalComponents/Icon'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const Image = dynamic(() => import('@/components/globalComponents/Image'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const SmallQuote = dynamic(() => import('@/components/SmallQuote'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const TwoColumnList = dynamic(() => import('@/components/TwoColumnList'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const EmbeddedPDF = dynamic(() => import('@/components/EmbeddedPDF'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const NumberBlock = dynamic(() => import('@/components/NumberBlock'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const Nav = dynamic(() => import('@/components/globalComponents/Nav'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const MobileNav = dynamic(
  () => import('@/components/globalComponents/MobileNav'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  }
);

const Footer = dynamic(() => import('@/components/globalComponents/Footer'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const ComparisonTable = dynamic(() => import('@/components/ComparisonTable'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const CustomerSuccess = dynamic(() => import('@/components/CustomerSuccess'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const ReviewsCarousel = dynamic(() => import('@/components/ReviewsCarousel'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const TestimonialCarousel = dynamic(
  () => import('@/components/TestimonialCarousel'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  }
);

const ReviewUsCta = dynamic(() => import('@/components/ReviewUsCta'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const PaginatedCards = dynamic(() => import('@/components/PaginatedCards'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const VideoCarousel = dynamic(() => import('@/components/VideoCarousel'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const PressTimeline = dynamic(() => import('@/components/PressTimeline'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const FeaturedCard = dynamic(() => import('@/components/FeaturedCard'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const MasonryGrid = dynamic(() => import('@/components/MasonryGrid'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const IntegrationsGrid = dynamic(
  () => import('@/components/IntegrationsGrid'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  }
);

const G2Banner = dynamic(() => import('@/components/G2Banner'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const G2Reviews = dynamic(() => import('@/components/G2Reviews'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const ImageCarousel = dynamic(() => import('@/components/ImageCarousel'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const WorkableEmbed = dynamic(() => import('@/components/WorkableEmbed'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const G2Badges = dynamic(() => import('@/components/centeredSections/Badges'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const Demo = dynamic(() => import('@/components/Demo'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const OverviewController = dynamic(
  () => import('@/components/overview/OverviewController'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  }
);

const ResourceCards = dynamic(() => import('@/components/ResourceCards'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const UnderConstruction = dynamic(
  () => import('@/components/UnderConstruction'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  }
);

const BlogCards = dynamic(() => import('@/components/BlogCards'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const Config = dynamic(() => import('@/components/Config'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const BusinessCaseForms = dynamic(
  () => import('@/components/BusinessCaseTool/BusinessCaseForms'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  }
);

const LightboxButton = dynamic(() => import('@/components/LightboxButton'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const Bio = dynamic(() => import('@/components/globalComponents/Bio'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const FigmaEmbed = dynamic(() => import('@/components/FigmaEmbed'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const IconCards = dynamic(() => import('@/components/IconCards'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const CustomerLogos = dynamic(() => import('@/components/CustomerLogos'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const SupportedPrinters = dynamic(
  () => import('@/components/SupportedPrinters'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  }
);

const AnchorLink = dynamic(
  () => import('@/components/globalComponents/AnchorLink'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  }
);

const TestForm = dynamic(() => import('@/components/TestForm'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const InfographicPill = dynamic(() => import('@/components/InfographicPill'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const InfographicSideBySide = dynamic(
  () => import('@/components/InfographicSideBySide'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  }
);

const ThankYouComponent = dynamic(
  () => import('@/components/ThankYouComponent'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  }
);

const AnchorNavigator = dynamic(
  () => import('@/components/globalComponents/AnchorNavigator'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  }
);

const LaunchGrid = dynamic(() => import('@/components/LaunchGrid'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

const LogoBanner = dynamic(() => import('@/components/LogoBanner'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

// Dynamic import for CenteredSection
const CenteredSection = dynamic(() => import('@/components/CenteredSection'), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

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
    // config: Config,
    customer_logo_section: CustomerLogos,
    resource_cards: ResourceCards,
    customer_logo_section: CustomerLogos,
    resource_cards: ResourceCards,
    blog_cards: BlogCards,
    // nav: Nav,
    // nav: MobileNav,
    grid: Grid,
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
  },
});
