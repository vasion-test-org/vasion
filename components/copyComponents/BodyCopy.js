'use client';
import React from 'react';

import styled from 'styled-components';
import media from '@/styles/media';
import colors from '@/styles/colors';
// import text from '@/styles/text';
const BodyCopy = ({ className, children, $featured = false }) => {
  // Recursive function to clone children and pass down className
  const cloneChildrenWithClassName = (children, parentClassName = '') => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      // Combine parent class with current class and passed className
      const combinedClassName = `${parentClassName} ${
        child.props.className || ''
      } ${className || ''}`.trim();

      // Clone the child with the combined className
      const clonedChild = React.cloneElement(child, {
        className: combinedClassName,
      });

      // If the child has children, recursively process them with the combined class
      if (child.props.children) {
        return React.cloneElement(clonedChild, {
          children: cloneChildrenWithClassName(
            child.props.children,
            combinedClassName,
          ),
        });
      }

      return clonedChild;
    });
  };

  return (
    <StyledBodyCopy className={className} $featured={$featured}>
      {cloneChildrenWithClassName(children)}
    </StyledBodyCopy>
  );
};

export default BodyCopy;

const StyledBodyCopy = styled.div`
  display: inline-block;
  font-family: 'Archivo';
  font-weight: 400;
  white-space: pre-wrap;

  /* Featured body_copy being used in CenteredSection intro content */
  ${(props) =>
    props.$featured &&
    `
    margin-bottom:0.625vw;
    background-color:${colors.lightPurpleGrey};
    padding:1.5vw;
    border-radius: 1vw;
 
    ${media.fullWidth}{
    margin-bottom:10px;
    border-radius: 16px;
    padding:24px;
    }

    ${media.tablet}{
    margin-bottom:0.977vw;
    border-radius: 1.563vw;
    padding:2.344vw;
    }

    ${media.mobile}{
    margin-bottom:2.083vw;
    border-radius: 3.333vw;
    padding:5vw;
    }

`}
  /* Apply styles to all children */
  & > * {
    font-family: inherit;
    font-weight: inherit;
    white-space: inherit;
  }

  /* Ensure spans inherit styles properly */
  span {
    display: inline;
    font-family: inherit;
    font-weight: inherit;
    white-space: inherit;
  }

  /* Handle bold text */
  .bold,
  b,
  strong {
    display: inline-block;
    white-space: pre-wrap;
    font-weight: 600;
  }

  /* Handle line breaks */
  br {
    display: block;
    content: '';
    margin: 0.5em 0;
  }

  img {
    max-width: 56.25vw;

    ${media.fullWidth} {
      max-width: 900px;
    }

    ${media.tablet} {
      max-width: 58.594vw;
    }

    ${media.mobile} {
      max-width: 82vw;
    }
  }
  a {
    span {
      color: ${colors.primaryOrange};
    }
    color: ${colors.primaryOrange};
  }
  &.eyebrow,
  & > .eyebrow {
    font-weight: 700;
    font-size: 0.875vw;
    line-height: 1.125vw;
    letter-spacing: 0.175vw;
    text-transform: uppercase;

    ${media.fullWidth} {
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 3px;
    }

    ${media.tablet} {
      font-size: 1.367vw;
      line-height: 1.758vw;
    }

    ${media.mobile} {
      font-size: 2.804vw;
      line-height: 4.206vw;
    }
  }

  &.tag,
  & > .tag {
    font-weight: 700;
    font-size: 0.953vw;
    line-height: 0.75vw;

    ${media.fullWidth} {
      font-size: 13px;
      line-height: 12px;
    }

    ${media.tablet} {
      font-size: 1.458vw;
      line-height: 1.172vw;
    }

    ${media.mobile} {
      font-size: 2.336vw;
      line-height: 2.804vw;
    }
  }

  &.tagLight,
  & > .tagLight {
    font-weight: 400;
    font-size: 0.625vw;
    line-height: 0.75vw;

    ${media.fullWidth} {
      font-size: 10px;
      line-height: 12px;
    }

    ${media.tablet} {
      font-size: 0.977vw;
      line-height: 1.172vw;
    }

    ${media.mobile} {
      font-size: 2.336vw;
      line-height: 2.804vw;
    }
  }
  &.bodySm,
  & > .bodySm {
    font-size: 0.875vw;
    line-height: 1.125vw;

    ${media.fullWidth} {
      font-size: 14px;
      line-height: 18px;
    }

    ${media.tablet} {
      font-size: 1.367vw;
      line-height: 1.758vw;
    }

    ${media.mobile} {
      font-size: 2.917vw;
      line-height: 3.75vw;
    }
  }

  &.bodyMd,
  & > .bodyMd {
    font-size: 1.111vw;
    line-height: 1.375vw;

    ${media.fullWidth} {
      font-size: 17px;
      line-height: 22px;
    }

    ${media.tablet} {
      font-size: 17px;
      line-height: 2.148vw;
    }

    ${media.mobile} {
      font-size: 3.542vw;
      line-height: 5.14vw;
    }
  }

  &.bodyLrg,
  & > .bodyLrg {
    font-size: 1.125vw;
    line-height: 1.5vw;

    ${media.fullWidth} {
      font-size: 18px;
      line-height: 24px;
    }

    ${media.tablet} {
      font-size: 1.758vw;
      line-height: 2.344vw;
    }

    ${media.mobile} {
      font-size: 3.75vw;
      line-height: 4.583vw;
    }
  }

  &.bodyXl,
  & > .bodyXl {
    font-size: 1.438vw;
    line-height: 1.875vw;

    ${media.fullWidth} {
      font-size: 23px;
      line-height: 30px;
    }

    ${media.tablet} {
      font-size: 2.246vw;
      line-height: 2.93vw;
    }

    ${media.mobile} {
      font-size: 4.206vw;
      line-height: 5.14vw;
    }
  }

  /* Default styles for all children */
  & > * {
    font-size: 1vw;
    line-height: 1.375vw;

    ${media.fullWidth} {
      font-size: 16px;
      line-height: 22px;
    }

    ${media.tablet} {
      font-size: 16px;
      line-height: 2.148vw;
    }

    ${media.mobile} {
      font-size: 3.738vw;
      line-height: 5.14vw;
    }
  }
`;
