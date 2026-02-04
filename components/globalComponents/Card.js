import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { storyblokEditable } from '@storyblok/react/rsc';
import styled from 'styled-components';

import Button from '@/components/globalComponents/Button';
import Image from '@/components/globalComponents/Image';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import media from '@/styles/media';

const Card = ({ borderradius, content, paginated }) => {
  const pathname = usePathname();
  const buttonData = content.Button?.[0];
  const isEmail = buttonData?.link_url?.email;
  const rawHref = isEmail
    ? `mailto:${buttonData?.link_url.email}`
    : buttonData?.link_url?.cached_url || '#';

  const target = buttonData?.link_url?.target;
  const rel = target === '_blank' ? 'noopener noreferrer' : undefined;

  const isExternal = rawHref.startsWith('http');
  const alreadyLocalized =
    rawHref.startsWith('/de') || rawHref.startsWith('/fr') || rawHref.startsWith('/en');

  const slugParts = pathname.split('/').filter(Boolean);
  const currentLocale = ['de', 'fr'].includes(slugParts[0]) ? slugParts[0] : null;

  const normalizedUrl =
    isEmail || isExternal || alreadyLocalized
      ? rawHref
      : `/${currentLocale ?? ''}/${rawHref}`.replace(/\/+/g, '/');

  // Check if there's a valid URL to link to
  const hasValidUrl = rawHref && rawHref !== '#' && rawHref !== '';

  const WrapperContent = (
    <>
      {content.Image && (
        <ImageWrapper>
          <Image
            borderradius={borderradius || content.image_border}
            filename={content.Image.filename}
            imageAlt={content.Image.alt}
          />
        </ImageWrapper>
      )}
      <ContentWrapper>
        {content.content.map((copy, index) => (
          <div key={`card-copy-${index}`} {...storyblokEditable(copy)}>
            <RichTextRenderer className={copy.component} document={copy.copy} />
          </div>
        ))}
        {buttonData && (
          <ButtonWrapper>
            <Button $buttonData={buttonData} />
          </ButtonWrapper>
        )}
      </ContentWrapper>
    </>
  );

  // Only wrap in Link if there's a valid URL and target is not "_blank"
  if (hasValidUrl && target !== '_blank') {
    return (
      <Link legacyBehavior passHref href={normalizedUrl}>
        <CardWrapper
          as="a"
          {...storyblokEditable(content)}
          $canhover={content?.has_hover}
          $clickable={true}
          blur={content?.blur_card}
          paginated={paginated}
        >
          {WrapperContent}
        </CardWrapper>
      </Link>
    );
  } else if (hasValidUrl && target === '_blank') {
    return (
      <CardWrapper
        blur={content?.blur_card}
        href={normalizedUrl}
        rel={rel}
        target={target}
        {...storyblokEditable(content)}
        $canhover={content?.has_hover}
        $clickable={true}
        paginated={paginated}
      >
        {WrapperContent}
      </CardWrapper>
    );
  } else {
    // No valid URL, just render the card without link wrapper
    return (
      <CardWrapper
        {...storyblokEditable(content)}
        $canhover={content?.has_hover}
        $clickable={false}
        blur={content?.blur_card}
        paginated={paginated}
      >
        {WrapperContent}
      </CardWrapper>
    );
  }
};

export default Card;

const ImageWrapper = styled.div`
  /* overflow: hidden;
  border-radius: 0.375vw; */
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
  filter: ${(props) => (props?.blur ? `blur(0.25vw)` : 'unset')};
  text-decoration: none;
  color: inherit;
  cursor: ${(props) => (props.$clickable ? 'pointer' : 'default')};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-align: left;
  height: ${(props) => (props.paginated ? 'min-content' : 'auto')};
  width: clamp(21.875vw, 100%, 25.5vw);
  padding: 0.5vw;
  gap: 1vw;
  border-radius: 1vw;
  background: ${(props) => props.theme.centered.card_bg};
  box-shadow:
    0vw 0vw 0.063vw 0vw rgba(25, 29, 30, 0.04),
    0vw 0.125vw 0.25vw 0vw rgba(25, 29, 30, 0.16);
  transition: background 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.$canhover ? 'linear-gradient(180deg, #7E5FDD 0%, #583F99 100%)' : 'unset'};
  }

  ${media.fullWidth} {
    filter: ${(props) => (props?.blur ? `blur(4px)` : 'unset')};
    gap: 16px;
    border-radius: 16px;
    width: clamp(350px, 100%, 408px);
    box-shadow:
      0px 0px 1px 0px rgba(25, 29, 30, 0.04),
      0px 2px 4px 0px rgba(25, 29, 30, 0.16);
  }

  ${media.tablet} {
    filter: ${(props) => (props?.blur ? `blur(0.391vw)` : 'unset')};
    gap: 1.563vw;
    border-radius: 1.563vw;
    width: clamp(29.102vw, 100%, 44.922vw);
    box-shadow:
      0vw 0vw 0.098vw 0vw rgba(25, 29, 30, 0.04),
      0vw 0.195vw 0.391vw 0vw rgba(25, 29, 30, 0.16);
  }

  ${media.mobile} {
    display: ${(props) => (props?.blur ? 'none' : 'flex')};
    gap: 3.333vw;
    border-radius: 3.333vw;
    width: clamp(89.167vw, 100%, 89.167vw);
    box-shadow:
      0vw 0vw 0.208vw 0vw rgba(25, 29, 30, 0.04),
      0vw 0.417vw 0.833vw 0vw rgba(25, 29, 30, 0.16);
  }
`;
