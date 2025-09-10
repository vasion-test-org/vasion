/**
 * Dynamic component loading system for better performance
 * This prevents all components from being bundled into the main vendor chunk
 */

import dynamic from 'next/dynamic';

// Core components that are always needed
export const CoreComponents = {
  Page: () => import('@/components/Page'),
  Hero: () => import('@/components/Hero'),
  CenteredSection: () => import('@/components/CenteredSection'),
  ComponentRenderer: () => import('@/components/renderers/ComponentRenderer'),
  Image: () => import('@/components/globalComponents/Image'),
  Button: () => import('@/components/globalComponents/Button'),
  Nav: () => import('@/components/globalComponents/Nav'),
  MobileNav: () => import('@/components/globalComponents/MobileNav'),
  Footer: () => import('@/components/globalComponents/Footer'),
};

// Heavy components that should be lazy loaded
export const HeavyComponents = {
  LogoCube: () => import('@/components/LogoCube'),
  SideBySide: () => import('@/components/SideBySide'),
  CTA: () => import('@/components/CTA'),
  ComparisonSelect: () => import('@/components/ComparisonSelect'),
  ModalCards: () => import('@/components/ModalCards'),
  Testimonial: () => import('@/components/Testimonial'),
  Form: () => import('@/components/Form'),
  ComparisonTable: () => import('@/components/ComparisonTable'),
  CustomerSuccess: () => import('@/components/CustomerSuccess'),
  ReviewsCarousel: () => import('@/components/ReviewsCarousel'),
  TestimonialCarousel: () => import('@/components/TestimonialCarousel'),
  ReviewUsCta: () => import('@/components/ReviewUsCta'),
  PaginatedCards: () => import('@/components/PaginatedCards'),
  VideoCarousel: () => import('@/components/VideoCarousel'),
  PressTimeline: () => import('@/components/PressTimeline'),
  FeaturedCard: () => import('@/components/FeaturedCard'),
  MasonryGrid: () => import('@/components/MasonryGrid'),
  IntegrationsGrid: () => import('@/components/IntegrationsGrid'),
  G2Banner: () => import('@/components/G2Banner'),
  G2Reviews: () => import('@/components/G2Reviews'),
  ImageCarousel: () => import('@/components/ImageCarousel'),
  WorkableEmbed: () => import('@/components/WorkableEmbed'),
  Demo: () => import('@/components/Demo'),
  OverviewController: () => import('@/components/overview/OverviewController'),
  ResourceCards: () => import('@/components/ResourceCards'),
  UnderConstruction: () => import('@/components/UnderConstruction'),
  BlogCards: () => import('@/components/BlogCards'),
  BusinessCaseForms: () =>
    import('@/components/BusinessCaseTool/BusinessCaseForms'),
  LightboxButton: () => import('@/components/LightboxButton'),
  Bio: () => import('@/components/globalComponents/Bio'),
  FigmaEmbed: () => import('@/components/FigmaEmbed'),
};

// Centered section components
export const CenteredSectionComponents = {
  Grid: () => import('@/components/centeredSections/Grid'),
  Cards: () => import('@/components/centeredSections/Cards'),
  Accordion: () => import('@/components/centeredSections/Accordion'),
  Stats: () => import('@/components/centeredSections/Stats'),
  Rotator: () => import('@/components/centeredSections/Rotator'),
  StackedCards: () => import('@/components/centeredSections/StackedCards'),
  Badges: () => import('@/components/centeredSections/Badges'),
  BadgesMobile: () => import('@/components/centeredSections/BadgesMobile'),
  LogosGallery: () => import('@/components/centeredSections/LogosGallery'),
  ReviewCtaCards: () => import('@/components/centeredSections/ReviewCtaCards'),
};

// Copy components
export const CopyComponents = {
  LongFormText: () => import('@/components/copyComponents/LongFormText'),
  BlogInfo: () => import('@/components/copyComponents/BlogInfo'),
  BodyCopy: () => import('@/components/copyComponents/BodyCopy'),
  Eyebrow: () => import('@/components/copyComponents/Eyebrow'),
  Header: () => import('@/components/copyComponents/Header'),
};

// Utility components
export const UtilityComponents = {
  Icon: () => import('@/components/globalComponents/Icon'),
  SmallQuote: () => import('@/components/SmallQuote'),
  TwoColumnList: () => import('@/components/TwoColumnList'),
  EmbeddedPDF: () => import('@/components/EmbeddedPDF'),
  NumberBlock: () => import('@/components/NumberBlock'),
  IconCards: () => import('@/components/IconCards'),
};

/**
 * Create dynamic components with loading states
 * Uses a configuration-driven approach for better maintainability
 */
export const createDynamicComponents = () => {
  const components = {};

  const componentGroups = [
    { group: CoreComponents, options: { minHeight: '100px' } },
    { group: HeavyComponents, options: { minHeight: '200px', ssr: false } },
    { group: CenteredSectionComponents, options: { minHeight: '150px' } },
    { group: CopyComponents, options: { minHeight: '50px' } },
    { group: UtilityComponents, options: { minHeight: '100px' } },
  ];

  componentGroups.forEach(({ group, options }) => {
    Object.entries(group).forEach(([name, importFn]) => {
      components[name] = dynamic(importFn, {
        loading: () => <div style={{ minHeight: options.minHeight }} />,
        ...(options.ssr === false && { ssr: false }),
      });
    });
  });

  return components;
};
