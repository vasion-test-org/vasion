import React from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "../globalComponents/Image";
import styled from "styled-components";
import media from "@/styles/media";
import RichTextRenderer from "./RichTextRenderer";
import LogoCube from "../LogoCube";

const ComponentRenderer = ({ blok }) => {
  if (!blok) return null;

  console.log("Rendering:", blok.component, "Preview Mode:", blok?.preview || "N/A");

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

  // Handle `personalized_section` based on preview mode
  if (blok.component === "personalized_section") {
    let contentBlocks = []; // ✅ Starts as an empty array

    if (blok.preview === "english" && blok.english_blocks.length > 0) {
      contentBlocks = blok.english_blocks;
    } 
    if (blok.preview === "french" && blok.french_blocks.length > 0) {
      contentBlocks = blok.french_blocks;
    } 
    if (blok.preview === "german" && blok.german_blocks.length > 0) {
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
        <BlockWrapper {...storyblokEditable(blok)}>
          <Image images={blok.media} borderradius={blok.border_radius} />
        </BlockWrapper>
      );
    case "copy_block":
      return (
        <CopyDiv>
          {blok?.copy_block_sections?.map((copy, index) => (
            <BlockWrapper key={index} {...storyblokEditable(copy)}>
              <RichTextRenderer document={copy.copy} />
            </BlockWrapper>
          ))}
        </CopyDiv>
      );
    case "logo_cube":
      return <LogoCube blok={blok} />;
    default:
      return <BlockWrapper {...storyblokEditable(blok)}>Unknown Component</BlockWrapper>;
  }
};

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
    width: 38.672vw;
    gap: 1.563vw;
  }
  
  ${media.mobile} {
    width: 78.333vw;
    gap: 3.333vw;
  }
`;

const BlockWrapper = styled.div``;

export default ComponentRenderer;
