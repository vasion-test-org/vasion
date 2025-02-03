import { render, MARK_STYLED, MARK_BOLD, NODE_HEADING, NODE_PARAGRAPH } from 'storyblok-rich-text-react-renderer';
import React from 'react';
import styled from 'styled-components';
import media from '@/styles/media';
import Header from '@/components/copyComponents/Header';
import BodyCopy from '@/components/copyComponents/BodyCopy'; 
import Eyebrow from '@/components/copyComponents/Eyebrow';

const RichTextRenderer = ({ document, centered }) => {
  console.log(document)
  const customMarkResolvers = {
    [MARK_STYLED]: (children, { class: className }) => {
      if (['eyebrow', 'tag', 'tagLight'].includes(className)) {
        return <Eyebrow className={className}>{children}</Eyebrow>;
      }
      return <BodyCopy className={className}>{children}</BodyCopy>;
    },
    [MARK_BOLD]: (children) => <strong>{children}</strong>,
  };

  const customNodeResolvers = {
    [NODE_HEADING]: (children, { level }) => {
      return <Header as={`h${level}`}>{children}</Header>;
    },
    [NODE_PARAGRAPH]: (children, node) => {
      const className =
        node?.content?.[0]?.marks?.find((mark) => mark.type === 'styled')?.attrs?.class || '';
        if (['eyebrow', 'tag', 'tagLight'].includes(className)) {
          return <Eyebrow className={className}>{children}</Eyebrow>;
        }
      return <BodyCopy className={className}>{children}</BodyCopy>;
    },
  };

  return <div>{render(document, { markResolvers: customMarkResolvers, nodeResolvers: customNodeResolvers })}</div>;
};

export default RichTextRenderer;


