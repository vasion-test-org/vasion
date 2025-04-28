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

const contentTypeTags = ['white paper', 'customer stories', 'guide', 'FAQs', 'playbooks', 'ebooks'];

const ResourceCard = ({ content, paginated, index, borderradius }) => {
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

  const imagePool = index % 2 === 0 ? evenImages : oddImages;
  const randomImage = imagePool[Math.floor(Math.random() * imagePool.length)];

  const contentTypeTag = content.tag_list?.find(tag => 
    contentTypeTags.includes(tag.toLowerCase())
  );

  return (
    <CardWrapper paginated={paginated}>
      <ImageWrapper>
        <Image
          imageAlt={content.Image?.alt || 'Random Resource Image'}
          filename={randomImage}
          borderradius={borderradius || content.image_border}
        />
      </ImageWrapper>

      <ContentWrapper>
        {contentTypeTag && <Eyebrow>{contentTypeTag}</Eyebrow>}
        <Header>{content.name}</Header>
        {/* {content.Button[0] && (
          <ButtonWrapper>
            <Button $buttonData={content.Button[0]} />
          </ButtonWrapper>
        )} */}
        <Link href={`/${content.full_slug}`}>Read Now</Link>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default ResourceCard;

const Link = styled.a`
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
