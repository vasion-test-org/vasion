"use client";

import React from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "@/components/globalComponents/Image";
import styled from "styled-components";
import media from "@/styles/media";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import LogoCube from "@/components/LogoCube";
import { usePathname } from "next/navigation";
import Button from "../globalComponents/Button";

const ComponentRenderer = ({ blok }) => {
  if (!blok) return null;
  console.log(blok);

  const pathname = usePathname();
  const isFrench = pathname.startsWith("/fr");
  const isGerman = pathname.startsWith("/de");
  const isEnglish = !isFrench && !isGerman; // Defaults to English if no locale is found

  // Handle `personalized_page` and extract `personalized_section`
  if (blok.component === "personalized_page" && Array.isArray(blok.personalized_section)) {
    return (
      <SectionWrapper {...storyblokEditable(blok)}>
        {blok.personalized_section.map((section) => (
          <ComponentRenderer key={section._uid} blok={section} />
        ))}
      </SectionWrapper>
    );
  }

  // Handle `personalized_section` based on URL locale instead of `blok.preview`
  if (blok.component === "personalized_section") {
    let contentBlocks = [];

    if (isEnglish && blok.english_blocks.length > 0) {
      contentBlocks = blok.english_blocks;
    } 
    if (isFrench && blok.french_blocks.length > 0) {
      contentBlocks = blok.french_blocks;
    } 
    if (isGerman && blok.german_blocks.length > 0) {
      contentBlocks = blok.german_blocks;
    }

    return (
      <SectionWrapper {...storyblokEditable(blok)}>
        {contentBlocks.map((block) => (
          <ComponentRenderer key={block._uid} blok={block} />
        ))}
      </SectionWrapper>
    );
  }

  // Handle individual components
  switch (blok.component) {
    case "assets":
      return (
        <ImageWrapper {...storyblokEditable(blok)}>
          <Image images={blok.media} borderradius={blok.border_radius} />
        </ImageWrapper>
      );
    case "copy_block":
      return (
        <CopyDiv>
          {blok?.copy_block_sections?.map((copy, index) => (
            <BlockWrapper key={index} {...storyblokEditable(copy)}>
              <RichTextRenderer document={copy?.copy} />
            </BlockWrapper>
          ))}
        </CopyDiv>
      );
    case "logo_cube":
      return <LogoCube blok={blok} />;
    case "global_link":
      return <Button $buttonData={blok}/>
    default:
      return <BlockWrapper {...storyblokEditable(blok)}>Unknown Component</BlockWrapper>;
  }
};

const ImageWrapper = styled.div`
  width: 32vw;

  ${media.fullWidth} {
    width: 512px;
  }
  
  ${media.tablet} {
  
  }
  
  ${media.mobile} {
  
  }
`
const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2vw;
  padding: 2vw;

  ${media.fullWidth} {
    gap: 24px;
    padding: 24px;
  }

  ${media.tablet} {
    gap: 16px;
    padding: 16px;
  }

  ${media.mobile} {
    gap: 12px;
    padding: 12px;
  }
`;

const CopyDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 38.25vw;
  gap: 1vw;

  ${media.fullWidth} {
    width: 612px;
    gap: 16px;
  }

  ${media.tablet} {
    width: 41.016vw;
    gap: 1.563vw;
  }
  
  ${media.mobile} {
    width: 89.167vw;
    gap: 3.333vw;
  }
`;

const BlockWrapper = styled.div``;

export default ComponentRenderer;
