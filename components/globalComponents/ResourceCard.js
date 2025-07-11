import React from 'react';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import styled from 'styled-components';
import Image from '@/components/globalComponents/Image';
import Button from '@/components/globalComponents/Button';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from '@/styles/media';
import { getClick } from '@/functions/navigation';
import colors from '@/styles/colors';
import text from '@/styles/text';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

const resourceImages = {
  topic: '/images/resources/Pillar-Piece.webp',
  faq: '/images/resources/FAQ.webp',
  caseStudy1: '/images/resources/Case-Study-Generic-1.webp',
  caseStudy2: '/images/resources/Case-Study-Generic-2.webp',
  caseStudy3: '/images/resources/Case-Study-Generic.webp',
  whitePaper1: '/images/resources/White-Paper-1.webp',
  whitePaper2: '/images/resources/White-Paper.webp',
  whitePaperMedium: '/images/resources/White-Paper-Medium.webp',
  video1: '/images/resources/Video-1.webp',
  video2: '/images/resources/Video.webp',
  solutionBrief: '/images/resources/Solution-Brief.webp',
  playbook1: '/images/resources/Playbook-1.webp',
  playbook2: '/images/resources/Playbook-2.webp',
  playbook3: '/images/resources/Playbook.webp',
  infographic1: '/images/resources/Infographic-1.webp',
  infographic2: '/images/resources/Infographic.webp',
  infographicMedium: '/images/resources/Infographic-Medium.webp',
  guide1: '/images/resources/Guide-1.webp',
  guide2: '/images/resources/Guide.webp',
};

const contentTypeTags = [
  'white paper',
  'customer story',
  'guide',
  'faq',
  'playbook',
  'solution brief',
  'video',
  'topic',
  'infographic',
];

// Translation mapping for content type tags
const getTranslatedTag = (tag, locale) => {
  const tagTranslations = {
    'white paper': {
      de: 'Whitepaper',
      fr: 'Livre blanc',
    },
    'customer story': {
      de: 'Kundenbericht',
      fr: 'Témoignage client',
    },
    guide: {
      de: 'Leitfaden',
      fr: 'Guide',
    },
    faq: {
      de: 'FAQ',
      fr: 'FAQ',
    },
    playbook: {
      de: 'Playbook',
      fr: 'Guide pratique',
    },
    'solution brief': {
      de: 'Lösungsübersicht',
      fr: 'Aperçu de solution',
    },
    video: {
      de: 'Video',
      fr: 'Vidéo',
    },
    topic: {
      de: 'Thema',
      fr: 'Sujet',
    },
    infographic: {
      de: 'Infografik',
      fr: 'Infographie',
    },
  };

  return tagTranslations[tag.toLowerCase()]?.[locale] || tag;
};

const getRandomImageForType = (type) => {
  const typeImages = {
    'white paper': [
      resourceImages.whitePaper1,
      resourceImages.whitePaper2,
      resourceImages.whitePaperMedium,
    ],
    guide: [resourceImages.guide1, resourceImages.guide2],
    faq: [resourceImages.faq],
    playbook: [
      resourceImages.playbook1,
      resourceImages.playbook2,
      resourceImages.playbook3,
    ],
    'solution brief': [resourceImages.solutionBrief],
    video: [resourceImages.video1, resourceImages.video2],
    topic: [resourceImages.topic],
    infographic: [
      resourceImages.infographic1,
      resourceImages.infographic2,
      resourceImages.infographicMedium,
    ],
    'customer story': [
      resourceImages.caseStudy1,
      resourceImages.caseStudy2,
      resourceImages.caseStudy3,
    ],
  };

  const images = typeImages[type.toLowerCase()] || [];
  return (
    images[Math.floor(Math.random() * images.length)] || resourceImages.topic
  );
};

const ResourceCard = ({ content, paginated, index, borderradius }) => {
  const pathname = usePathname();

  // Get current locale from pathname
  const getCurrentLocale = () => {
    const parts = pathname?.split('/');
    const localeCandidate = parts[1];
    const supportedLocales = ['en', 'de', 'fr'];
    return supportedLocales.includes(localeCandidate) ? localeCandidate : 'en';
  };

  const currentLocale = getCurrentLocale();

  // Get the translated name for the current locale
  const getTranslatedName = () => {
    if (currentLocale === 'en') {
      return content.name; // Use original name for English
    }

    if (content.translated_slugs) {
      const translation = content.translated_slugs.find(
        (slug) => slug.lang === currentLocale
      );
      return translation?.name || content.name; // Fallback to original name if translation not found
    }

    return content.name; // Fallback to original name
  };

  // Get the translated button text for the current locale
  const getTranslatedButtonText = () => {
    switch (currentLocale) {
      case 'fr':
        return 'Lire maintenant';
      case 'de':
        return 'Jetzt lesen';
      default:
        return 'Read Now';
    }
  };

  const displayName = getTranslatedName();
  const buttonText = getTranslatedButtonText();

  const oddImages = [
    '/images/RandomResource1.webp',
    '/images/RandomResource2.webp',
    '/images/RandomResource3.webp',
  ];
  const evenImages = [
    '/images/RandomResource4.webp',
    '/images/RandomResource5.webp',
    '/images/RandomResource6.webp',
  ];

  const contentTypeTag = content.tag_list?.find((tag) =>
    contentTypeTags.includes(tag.toLowerCase())
  );

  const translatedTag = contentTypeTag
    ? getTranslatedTag(contentTypeTag, currentLocale)
    : null;

  const imageToUse = contentTypeTag
    ? getRandomImageForType(contentTypeTag)
    : (index % 2 === 0 ? evenImages : oddImages)[Math.floor(Math.random() * 3)];

  // Build the URL with proper locale routing
  const buildUrl = () => {
    const rawUrl = content.full_slug || '';
    const isExternal =
      rawUrl.startsWith('http://') || rawUrl.startsWith('https://');

    if (isExternal) {
      return rawUrl;
    }

    const supportedLocales = ['en', 'fr', 'de'];
    const rawPathParts = rawUrl.split('/').filter(Boolean);
    const alreadyHasLocale = supportedLocales.includes(rawPathParts[0]);

    const normalizedUrl = `/${
      alreadyHasLocale ? '' : currentLocale === 'en' ? '' : currentLocale
    }/${rawUrl}`.replace(/\/+/g, '/');
    return normalizedUrl;
  };

  const cardUrl = buildUrl();

  return (
    <StyledNextLink href={cardUrl} passHref>
      <CardWrapper paginated={paginated}>
        <ImageWrapper>
          <Image
            imageAlt={content.Image?.alt || 'Resource Image'}
            filename={content?.content?.page_thumbnail?.filename || imageToUse}
            borderradius={borderradius || content.image_border}
          />
        </ImageWrapper>

        <ContentWrapper>
          {translatedTag && <Eyebrow>{translatedTag}</Eyebrow>}
          <Header>{displayName}</Header>
          {/* {content.Button[0] && (
            <ButtonWrapper>
              <Button $buttonData={content.Button[0]} />
            </ButtonWrapper>
          )} */}
          <Link>{buttonText}</Link>
        </ContentWrapper>
      </CardWrapper>
    </StyledNextLink>
  );
};

export default ResourceCard;

const StyledNextLink = styled(NextLink)`
  text-decoration: none;
  color: inherit;
  display: block;
  width: clamp(21.875vw, 100%, 25.5vw);

  ${media.fullWidth} {
    width: clamp(350px, 100%, 408px);
  }

  ${media.tablet} {
    width: clamp(29.102vw, 100%, 44.922vw);
  }

  ${media.mobile} {
    width: clamp(89.167vw, 100%, 89.167vw);
  }
`;

const Link = styled.span`
  ${text.bodySm};
  color: ${colors.primaryOrange};
`;
const Eyebrow = styled.div`
  ${text.tagBold};
  text-transform: uppercase;
  color: ${colors.lightPurple};
`;
const Header = styled.div`
  ${text.h5};
`;
const ImageWrapper = styled.div`
  /* overflow: hidden;
  border-radius: 0.375vw; */
  /* min-height: 14.125vw; */
`;
const ButtonWrapper = styled.div`
  margin-top: auto;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0vw 0.5vw 0.5vw 0.5vw;
  gap: 1vw;

  ${media.fullWidth} {
    padding: 0px 8px 8px 8px;
    gap: 16px;
  }

  ${media.tablet} {
    padding: 0vw 0.781vw 0.781vw 0.781vw;
    gap: 1.563vw;
  }

  ${media.mobile} {
    padding: 0vw 1.667vw 1.667vw 1.667vw;
    gap: 3.333vw;
  }
`;

const CardWrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-align: left;
  height: ${(props) => (props.paginated ? 'min-content' : 'auto')};
  width: clamp(21.875vw, 100%, 25.5vw);
  padding: 0.5vw;
  gap: 1vw;
  border-radius: 1vw;

  &:hover {
    box-shadow: 0vw 0vw 0.063vw 0vw rgba(25, 29, 30, 0.04),
      0vw 0.125vw 0.25vw 0vw rgba(25, 29, 30, 0.16);
  }

  ${media.fullWidth} {
    gap: 16px;
    border-radius: 16px;
    width: clamp(350px, 100%, 408px);

    &:hover {
      box-shadow: 0vw 0px 1px 0px rgba(25, 29, 30, 0.04),
        0px 2px 4px 0px rgba(25, 29, 30, 0.16);
    }
  }

  ${media.tablet} {
    gap: 1.563vw;
    border-radius: 1.563vw;
    width: clamp(29.102vw, 100%, 44.922vw);

    &:hover {
      box-shadow: 0px 0vw 0.098vw 0vw rgba(25, 29, 30, 0.04),
        0vw 0.195vw 0.391vw 0vw rgba(25, 29, 30, 0.16);
    }
  }

  ${media.mobile} {
    gap: 3.333vw;
    border-radius: 3.333vw;
    width: clamp(89.167vw, 100%, 89.167vw);

    &:hover {
      box-shadow: 0px 0vw 0.208vw 0vw rgba(25, 29, 30, 0.04),
        0vw 0.417vw 0.833vw 0vw rgba(25, 29, 30, 0.16);
    }
  }
`;
