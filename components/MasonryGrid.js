'use client';
import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import media from '@/styles/media';
import text from '@/styles/text';
import RichTextRenderer from './renderers/RichTextRenderer';
import Form from './Form';

const MasonryGrid = ({ blok }) => {
  const [columns, setColumns] = useState([]);
  const [numColumns, setNumColumns] = useState(3); // Default to 3 columns
  console.log(blok);
  useEffect(() => {
    if (blok?.gallery?.length) {
      // Determine number of columns based on screen size
      const determineColumns = () => {
        if (window.innerWidth <= 768) return 1; // Mobile: 1 column
        if (window.innerWidth <= 1024) return 2; // Tablet: 2 columns
        return 3; // Desktop: 3 columns
      };

      const currentNumColumns = determineColumns();
      setNumColumns(currentNumColumns);

      // Distribute images across columns for masonry effect
      const tempColumns = Array.from({ length: currentNumColumns }, () => []);

      blok.gallery.forEach((image, index) => {
        const columnIndex = index % currentNumColumns;
        tempColumns[columnIndex].push(image);
      });

      setColumns(tempColumns);
    }
  }, [blok.gallery]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (blok?.gallery?.length) {
        const determineColumns = () => {
          if (window.innerWidth <= 768) return 1;
          if (window.innerWidth <= 1024) return 2;
          return 3;
        };

        const currentNumColumns = determineColumns();
        setNumColumns(currentNumColumns);

        const tempColumns = Array.from({ length: currentNumColumns }, () => []);

        blok.gallery.forEach((image, index) => {
          const columnIndex = index % currentNumColumns;
          tempColumns[columnIndex].push(image);
        });

        setColumns(tempColumns);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [blok.gallery]);

  const renderImage = (image, imageIndex, columnIndex) => {
    // Handle the logo_with_link component structure
    const logo = image?.logo;
    const link = image?.link;

    const rawUrl = link?.cached_url || link?.url;
    const isExternal =
      rawUrl?.startsWith('http://') || rawUrl?.startsWith('https://');
    const href = isExternal ? rawUrl : `/${rawUrl}`.replace(/\/+/g, '/');

    if (rawUrl) {
      return (
        <ImageLink
          key={`${columnIndex}-${imageIndex}`}
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          <Image
            src={logo?.filename}
            alt={logo?.alt}
            loading='lazy'
            $clickable={true}
          />
        </ImageLink>
      );
    } else {
      return (
        <Image
          key={`${columnIndex}-${imageIndex}`}
          src={logo?.filename}
          alt={logo?.alt}
          loading='lazy'
          $clickable={false}
        />
      );
    }
  };

  const renderColumns = () => {
    return columns.map((column, columnIndex) => (
      <Column key={columnIndex}>
        {column.map((image, imageIndex) =>
          renderImage(image, imageIndex, columnIndex)
        )}
      </Column>
    ));
  };

  return (
    <Wrapper>
      <Header $center={blok.centered_header}>
        <RichTextRenderer document={blok.header} />
      </Header>
      {blok?.body_copy && (
        <Body>
          <RichTextRenderer document={blok.body_copy} />
        </Body>
      )}
      <Gallery $numColumns={numColumns}>{renderColumns()}</Gallery>
      {/* {blok?.form && <Form blok={blok.form[0]} />} */}
      {/* TODO: @Bubba */}
    </Wrapper>
  );
};

export default MasonryGrid;

const ImageLink = styled.a`
  text-decoration: none;
  display: block;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.556vw;
  display: block;
  margin-bottom: 2vw;
  cursor: ${(props) => (props.$clickable ? 'pointer' : 'default')};

  ${media.fullWidth} {
    border-radius: 8px;
    margin-bottom: 32px;
  }

  ${media.tablet} {
    border-radius: 0.781vw;
    margin-bottom: 2.344vw;
  }

  ${media.mobile} {
    width: 89.167vw;
    border-radius: 1.869vw;
    margin-bottom: 4.167vw;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;

  ${media.mobile} {
    align-items: center;
  }
`;

const Gallery = styled.div`
  display: flex;
  gap: 2vw;
  width: 80.888vw;
  height: auto;
  padding-top: 1.389vw;

  ${media.fullWidth} {
    gap: 32px;
    width: 1171px;
    padding-top: 20px;
  }

  ${media.tablet} {
    width: 93.188vw;
    gap: 2.344vw;
    padding-top: 1.953vw;
  }

  ${media.mobile} {
    width: 99.766vw;
    gap: 4.167vw;
    padding-top: 4.167vw;
    flex-direction: column;
  }
`;

const Body = styled.div`
  ${text.bodyMd}
  width: 63.333vw;
  padding-bottom: 1.375vw;
  ${media.fullWidth} {
    padding-bottom: 20px;
    width: 912px;
  }

  ${media.tablet} {
    width: 80.469vw;
    padding-bottom: 1.563vw;
  }

  ${media.mobile} {
    width: 87.85vw;
    padding-bottom: 2.804vw;
  }
`;

const Header = styled.div`
  align-self: center;

  ${media.mobile} {
    align-self: center;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.5vw;
  padding: 3.75vw 0;
  ${media.fullWidth} {
    gap: 24px;
    padding: 60px 0;
  }

  ${media.tablet} {
    gap: 2.344vw;
    padding: 5.859vw 0;
  }

  ${media.mobile} {
    gap: 5vw;
    padding: 12.5vw 0;
  }
`;
