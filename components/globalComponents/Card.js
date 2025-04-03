import React from "react";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import styled from "styled-components";
import Image from "@/components/globalComponents/Image";
import Button from "@/components/globalComponents/Button";
import { storyblokEditable } from "@storyblok/react/rsc";
import media from "@/styles/media";
import { getClick } from "@/functions/navigation";
// import colors from 'styles/colors';
// import text from 'styles/text';

const Card = ({ content, paginated }) => {
  // console.log(content.Button[0]?.link_url.cached_url)
  const handleClick = getClick(content.Button[0]?.link_url.cached_url);

  return (
    <CardWrapper
      {...storyblokEditable(content)}
      paginated={paginated}
      onClick={handleClick}
    >
      {content.Image && (
        <ImageWrapper>
          <Image
            imageAlt={content.Image.alt}
            filename={content.Image.filename}
          />
        </ImageWrapper>
      )}
      <ContentWrapper>
        {content.content.map((copy, index) => (
          <div key={`card-copy-${index}`} {...storyblokEditable(copy)}>
            <RichTextRenderer className={copy.component} document={copy.copy} />
          </div>
        ))}
        {content.Button[0] && (
          <ButtonWrapper>
            <Button $buttonData={content.Button[0]} />
          </ButtonWrapper>
        )}
      </ContentWrapper>
    </CardWrapper>
  );
};

export default Card;

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
  height: ${(props) => (props.paginated ? "min-content" : "auto")};
  width: clamp(21.875vw, 100%, 25.5vw);
  padding: 0.5vw;
  gap: 1vw;
  border-radius: 1vw;
  box-shadow:
    0vw 0vw 0.063vw 0vw rgba(25, 29, 30, 0.04),
    0vw 0.125vw 0.25vw 0vw rgba(25, 29, 30, 0.16);

  ${media.fullWidth} {
    gap: 16px;
    border-radius: 16px;
    width: clamp(350px, 100%, 408px);
    box-shadow:
      0px 0px 1px 0px rgba(25, 29, 30, 0.04),
      0px 2px 4px 0px rgba(25, 29, 30, 0.16);
  }

  ${media.tablet} {
    gap: 1.563vw;
    border-radius: 1.563vw;
    width: clamp(29.102vw, 100%, 44.922vw);
    box-shadow:
      0vw 0vw 0.098vw 0vw rgba(25, 29, 30, 0.04),
      0vw 0.195vw 0.391vw 0vw rgba(25, 29, 30, 0.16);
  }

  ${media.mobile} {
    gap: 3.333vw;
    border-radius: 3.333vw;
    width: clamp(89.167vw, 100%, 89.167vw);
    box-shadow:
      0vw 0vw 0.208vw 0vw rgba(25, 29, 30, 0.04),
      0vw 0.417vw 0.833vw 0vw rgba(25, 29, 30, 0.16);
  }
`;
