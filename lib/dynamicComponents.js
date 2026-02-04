/**
 * Dynamic component loading system for better performance
 * This prevents all components from being bundled into the main vendor chunk
 */

import dynamic from 'next/dynamic';

// Core components that are always needed
export const CoreComponents = {
  Button: () => import('@/components/globalComponents/Button'),
  CenteredSection: () => import('@/components/CenteredSection'),
  ComponentRenderer: () => import('@/components/renderers/ComponentRenderer'),
  Footer: () => import('@/components/globalComponents/Footer'),
  Hero: () => import('@/components/Hero'),
  Image: () => import('@/components/globalComponents/Image'),
  MobileNav: () => import('@/components/globalComponents/MobileNav'),
  Nav: () => import('@/components/globalComponents/Nav'),
  Page: () => import('@/components/Page'),
};

// Heavy components that should be lazy loaded
export const HeavyComponents = {
  Bio: () => import('@/components/globalComponents/Bio'),
  BlogCards: () => import('@/components/BlogCards'),
  BusinessCaseForms: () => import('@/components/BusinessCaseTool/BusinessCaseForms'),
  ComparisonSelect: () => import('@/components/ComparisonSelect'),
  ComparisonTable: () => import('@/components/ComparisonTable'),
  CTA: () => import('@/components/CTA'),
  CustomerSuccess: () => import('@/components/CustomerSuccess'),
  Demo: () => import('@/components/Demo'),
  FeaturedCard: () => import('@/components/FeaturedCard'),
  FigmaEmbed: () => import('@/components/FigmaEmbed'),
  Form: () => import('@/components/Form'),
  G2Banner: () => import('@/components/G2Banner'),
  G2Reviews: () => import('@/components/G2Reviews'),
  ImageCarousel: () => import('@/components/ImageCarousel'),
  IntegrationsGrid: () => import('@/components/IntegrationsGrid'),
  LightboxButton: () => import('@/components/LightboxButton'),
  LogoCube: () => import('@/components/LogoCube'),
  MasonryGrid: () => import('@/components/MasonryGrid'),
  ModalCards: () => import('@/components/ModalCards'),
  OverviewController: () => import('@/components/overview/OverviewController'),
  PaginatedCards: () => import('@/components/PaginatedCards'),
  PressTimeline: () => import('@/components/PressTimeline'),
  ResourceCards: () => import('@/components/ResourceCards'),
  ReviewsCarousel: () => import('@/components/ReviewsCarousel'),
  ReviewUsCta: () => import('@/components/ReviewUsCta'),
  SideBySide: () => import('@/components/SideBySide'),
  Testimonial: () => import('@/components/Testimonial'),
  TestimonialCarousel: () => import('@/components/TestimonialCarousel'),
  UnderConstruction: () => import('@/components/UnderConstruction'),
  VideoCarousel: () => import('@/components/VideoCarousel'),
  WorkableEmbed: () => import('@/components/WorkableEmbed'),
};

// Centered section components
export const CenteredSectionComponents = {
  Accordion: () => import('@/components/centeredSections/Accordion'),
  Badges: () => import('@/components/centeredSections/Badges'),
  BadgesMobile: () => import('@/components/centeredSections/BadgesMobile'),
  Cards: () => import('@/components/centeredSections/Cards'),
  Grid: () => import('@/components/centeredSections/Grid'),
  LogosGallery: () => import('@/components/centeredSections/LogosGallery'),
  ReviewCtaCards: () => import('@/components/centeredSections/ReviewCtaCards'),
  Rotator: () => import('@/components/centeredSections/Rotator'),
  StackedCards: () => import('@/components/centeredSections/StackedCards'),
  Stats: () => import('@/components/centeredSections/Stats'),
};

// Copy components
export const CopyComponents = {
  BlogInfo: () => import('@/components/copyComponents/BlogInfo'),
  BodyCopy: () => import('@/components/copyComponents/BodyCopy'),
  Eyebrow: () => import('@/components/copyComponents/Eyebrow'),
  Header: () => import('@/components/copyComponents/Header'),
  LongFormText: () => import('@/components/copyComponents/LongFormText'),
  ResourcesLongForm: () => import('@/components/copyComponents/ResourcesLongForm'),
};

// Utility components
export const UtilityComponents = {
  EmbeddedPDF: () => import('@/components/EmbeddedPDF'),
  Icon: () => import('@/components/globalComponents/Icon'),
  IconCards: () => import('@/components/IconCards'),
  NumberBlock: () => import('@/components/NumberBlock'),
  SmallQuote: () => import('@/components/SmallQuote'),
  TwoColumnList: () => import('@/components/TwoColumnList'),
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
