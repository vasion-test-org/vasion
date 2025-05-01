'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Card from './globalComponents/Card';
import EventCard from './globalComponents/EventCard';
import { horizontalLoop } from '@/functions/horizontalLoop';
import SideArrow from '@/assets/svg/side-arrow.svg';
import colors from '@/styles/colors';
import text from '@/styles/text';
import ResourceCard from './globalComponents/ResourceCard';

const PaginatedCards = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  const currentIndex = useRef(0);
  const cardsLoop = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  /* const solutionsTags = ['print automation', 'serverless printing', 'digital transformation', 'security & compliance', 'output automation', 'cost management', 'process automation', 'paperless process', 'sustainability'];
  const productTags = ['capture', 'workflow', 'signature', 'print', 'content management', 'storage', 'reporting', 'templates', 'admin', 'output automation', 'advanced security', 'cost management'];
  const contentTypeTags = ['white paper', 'customer stories', 'guide', 'FAQs', 'playbooks', 'ebooks'];
  const industryTags = ['healthcare'];
  const newsTags = ['media mentions', 'videos'] */
console.log(blok.cards)

  const filteredCards = blok.cards.filter((card) => {
    const headerContent = Array.isArray(card?.content) 
      ? card.content.find(item => item.component === 'header')
      : null;
    const cardTitle = headerContent?.copy?.content?.[0]?.content?.[0]?.text || '';
    
    const matchesSearch = searchQuery === '' || 
      cardTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (card.name && card.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    /* const matchesFilters = selectedFilters.length === 0 || 
      selectedFilters.every((filter) =>
        card.tag_list?.some((tag) => tag.toLowerCase() === filter.toLowerCase())
      ); */
    
    return matchesSearch; // && matchesFilters;
  });

  /* const availableTags = {
    solutions: new Set(),
    products: new Set(),
    contentTypes: new Set(),
    industryType: new Set(),
    newsTypeTags: new Set(),
  };

  filteredCards.forEach((card) => {
    if (!card.tag_list) return;
    card.tag_list.forEach((tag) => {
      const lowerTag = tag.toLowerCase();
      if (solutionsTags.includes(lowerTag)) {
        availableTags.solutions.add(lowerTag);
      }
      if (productTags.includes(lowerTag)) {
        availableTags.products.add(lowerTag);
      }
      if (contentTypeTags.includes(lowerTag)) {
        availableTags.contentTypes.add(lowerTag);
      }
      if (industryTags.includes(lowerTag)) {
        availableTags.industryType.add(lowerTag);
      }
      if (newsTags.includes(lowerTag)) {
        availableTags.newsTypeTags.add(lowerTag);
      }
    });
  });

  useEffect(() => {
    const allAvailableTags = new Set([
      ...availableTags.solutions,
      ...availableTags.products,
      ...availableTags.contentTypes,
      ...availableTags.industryType,
      ...availableTags.newsTypeTags
    ]);

    const newSelectedFilters = selectedFilters.filter(filter => 
      allAvailableTags.has(filter.toLowerCase())
    );

    if (newSelectedFilters.length !== selectedFilters.length) {
      setSelectedFilters(newSelectedFilters);
    }
  }, [filteredCards]); */

  const capitalizeFirstLetter = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  /* const countTagOccurrences = (tag) => {
    return blok.cards.filter((card) =>
      card.tag_list?.some((t) => t.toLowerCase() === tag.toLowerCase())
    ).length;
  }; */
  
  const mappedCards = [];
  for (let i = 0; i < filteredCards.length; i += 6) {
    const chunk = filteredCards.slice(i, i + 6);
    mappedCards.push(
      <CardChunk
        key={`chunk-${i / 6}`}
        card_type={blok.card_type}
        className='cardChunks'
      >
        {chunk.map((card, index) => {
          if (blok.card_type === 'default') {
            return (
              <Card
                key={`card-${i + index}`}
                borderradius='6'
                paginated
                content={card}
              />
            );
          } else if (blok.card_type === 'event') {
            return (
              <EventCard
                key={`card-${i + index}`}
                even={index % 2 === 1}
                content={card}
              />
            );
          } else if (blok.card_type === 'resource') {
            return (
              <ResourceCard
                key={`card-${i + index}`}
                paginated
                index={index}
                content={card}
                borderradius='6'
              />
            );
          }
        })}
      </CardChunk>
    );
  }

  const goToPage = (index) => {
    if (!cardsLoop.current) return;
    cardsLoop.current.toIndex(index, {
      duration: 0.4,
      ease: 'power1.inOut',
    });
    currentIndex.current = index;
    setCurrentPage(index);
  };

  const getPaginatedNumbers = () => {
    const totalPages = Math.ceil(filteredCards.length / 6);
    const maxPagesToShow = 5;
    const pageList = [];

    if (totalPages <= maxPagesToShow) {
      for (let i = 0; i < totalPages; i++) {
        pageList.push(i);
      }
    } else {
      const left = Math.max(0, currentPage - 1);
      const right = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage > 1) {
        pageList.push(0);
        if (currentPage > 2) pageList.push('left-ellipsis');
      }

      for (let i = left; i <= right; i++) {
        pageList.push(i);
      }

      if (currentPage < totalPages - 2) {
        if (currentPage < totalPages - 3) pageList.push('right-ellipsis');
        pageList.push(totalPages - 1);
      }
    }

    return pageList;
  };

  const mappedPages = getPaginatedNumbers().map((page, i) => {
    if (page === 'left-ellipsis' || page === 'right-ellipsis') {
      return <Ellipsis key={`ellipsis-${i}`}>...</Ellipsis>;
    }

    return (
      <PageNumberBlock
        className='pageNumberBlocks'
        key={`block-${page}`}
        id={`block-${page}`}
        onClick={() => goToPage(page)}
        style={{
          backgroundColor: currentPage === page ? colors.grey100 : 'unset',
        }}
      >
        {page + 1}
      </PageNumberBlock>
    );
  });

  useEffect(() => {
    const cardChunks = gsap.utils.toArray(".cardChunks");
    const totalItems = cardChunks.length;

    cardsLoop.current = horizontalLoop(cardChunks, {
      paused: true,
      center: true,
    });

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    const handleNext = () => {
      const newIndex = (currentIndex.current + 1) % totalItems;
      cardsLoop.current.next({ duration: 0.4, ease: "power1.inOut" });
      currentIndex.current = newIndex;
      setCurrentPage(newIndex);
    };

    const handlePrev = () => {
      const newIndex = (currentIndex.current - 1 + totalItems) % totalItems;
      cardsLoop.current.previous({ duration: 0.4, ease: "power1.inOut" });
      currentIndex.current = newIndex;
      setCurrentPage(newIndex);
    };

    nextBtn.addEventListener("click", handleNext);
    prevBtn.addEventListener("click", handlePrev);

    return () => {
      nextBtn.removeEventListener("click", handleNext);
      prevBtn.removeEventListener("click", handlePrev);
    };
  }, []);

  useEffect(() => {
    // if (cardsLoop.current) {
    //   cardsLoop.current.kill();
    //   cardsLoop.current = null;
    // }

    /* const manuDropDownTL = gsap
      .timeline({ paused: true })
      .set('#solutionsOptions', { display: 'flex', height: 0 })
      .fromTo('#solutionsOptions', 
        { height: 0 },
        { height: 'auto', duration: 0.55, ease: 'power2.inOut' }
      );

    const platformDropDownTL = gsap
      .timeline({ paused: true })
      .set('#productOptions', { display: 'flex', height: 0 })
      .fromTo('#productOptions',
        { height: 0 },
        { height: 'auto', duration: 0.55, ease: 'power2.inOut' }
      );

    const featureDropDownTL = gsap
      .timeline({ paused: true })
      .set('#contentTypesOptions', { display: 'flex', height: 0 })
      .fromTo('#contentTypesOptions',
        { height: 0 },
        { height: 'auto', duration: 0.55, ease: 'power2.inOut' }
      );

    const industryDropDownTL = gsap
      .timeline({ paused: true })
      .set('#industryTypesOptions', { display: 'flex', height: 0 })
      .fromTo('#industryTypesOptions',
        { height: 0 },
        { height: 'auto', duration: 0.55, ease: 'power2.inOut' }
      );

    const newsTypeDropDownTL = gsap
      .timeline({ paused: true })
      .set('#newsTypeTagsOptions', { display: 'flex', height: 0 })
      .fromTo('#newsTypeTagsOptions',
        { height: 0 },
        { height: 'auto', duration: 0.55, ease: 'power2.inOut' }
      );

    const handleManuDrop = () => {
      if (manuDropDownTL.paused() || manuDropDownTL.reversed()) {
        platformDropDownTL.reverse();
        featureDropDownTL.reverse();
        industryDropDownTL.reverse();
        newsTypeDropDownTL.reverse();
        manuDropDownTL.play();
      } else {
        manuDropDownTL.reverse();
      }
    };

    const handlePlatformDrop = () => {
      if (platformDropDownTL.paused() || platformDropDownTL.reversed()) {
        manuDropDownTL.reverse();
        featureDropDownTL.reverse();
        industryDropDownTL.reverse();
        newsTypeDropDownTL.reverse();
        platformDropDownTL.play();
      } else {
        platformDropDownTL.reverse();
      }
    };

    const handleFeatureDrop = () => {
      if (featureDropDownTL.paused() || featureDropDownTL.reversed()) {
        manuDropDownTL.reverse();
        platformDropDownTL.reverse();
        industryDropDownTL.reverse();
        newsTypeDropDownTL.reverse();
        featureDropDownTL.play();
      } else {
        featureDropDownTL.reverse();
      }
    };

    const handleIndustryDrop = () => {
      if (industryDropDownTL.paused() || industryDropDownTL.reversed()) {
        manuDropDownTL.reverse();
        platformDropDownTL.reverse();
        featureDropDownTL.reverse();
        newsTypeDropDownTL.reverse();
        industryDropDownTL.play();
      } else {
        industryDropDownTL.reverse();
      }
    };

    const handleNewsTypeDrop = () => {
      if (newsTypeDropDownTL.paused() || newsTypeDropDownTL.reversed()) {
        manuDropDownTL.reverse();
        platformDropDownTL.reverse();
        featureDropDownTL.reverse();
        industryDropDownTL.reverse();
        newsTypeDropDownTL.play();
      } else {
        newsTypeDropDownTL.reverse();
      }
    };

    document
      .querySelector('#solutionsDrop')
      ?.addEventListener('click', handleManuDrop);
    document
      .querySelector('#productDrop')
      ?.addEventListener('click', handlePlatformDrop);
    document
      .querySelector('#contentTypesDrop')
      ?.addEventListener('click', handleFeatureDrop);
    document
      .querySelector('#industryTypesDrop')
      ?.addEventListener('click', handleIndustryDrop);
    document
      .querySelector('#newsTypeTagsDrop')
      ?.addEventListener('click', handleNewsTypeDrop);

    return () => {
      if (cardsLoop.current) {
        cardsLoop.current.kill();
      }
      document
        .querySelector('#solutionsDrop')
        ?.removeEventListener('click', handleManuDrop);
      document
        .querySelector('#productDrop')
        ?.removeEventListener('click', handlePlatformDrop);
      document
        .querySelector('#contentTypesDrop')
        ?.removeEventListener('click', handleFeatureDrop);
      document
        .querySelector('#industryTypesDrop')
        ?.removeEventListener('click', handleIndustryDrop);
      document
        .querySelector('#newsTypeTagsDrop')
        ?.removeEventListener('click', handleNewsTypeDrop);
    }; */
  }, [filteredCards]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
      >
        <FiltersWrapper>
          {/* <Filters>
            {availableTags.solutions.size > 0 && (
              <StyledSelect id='solutionsDrop'>
                Solutions
                <OptionsContainer id='solutionsOptions'>
                  {[...availableTags.solutions].map((tag) => (
                    <Option
                      key={tag}
                      $isSelected={selectedFilters.includes(tag)}
                      onClick={() => {
                        if (selectedFilters.includes(tag)) {
                          setSelectedFilters(selectedFilters.filter((f) => f !== tag));
                        } else {
                          setSelectedFilters([...selectedFilters, tag]);
                        }
                      }}
                    >
                      <Circle src="/images/addCircle.webp" />{" "}
                      {capitalizeFirstLetter(tag)} <TagCounter>{countTagOccurrences(tag)}</TagCounter>
                    </Option>
                  ))}
                </OptionsContainer>
              </StyledSelect>
            )}

            {availableTags.products.size > 0 && (
              <StyledSelect id='productDrop'>
                Product
                <OptionsContainer id='productOptions'>
                  {[...availableTags.products].map((tag) => (
                    <Option
                      key={tag}
                      $isSelected={selectedFilters.includes(tag)}
                      onClick={() => {
                        if (selectedFilters.includes(tag)) {
                          setSelectedFilters(selectedFilters.filter((f) => f !== tag));
                        } else {
                          setSelectedFilters([...selectedFilters, tag]);
                        }
                      }}
                    >
                      <Circle src="/images/addCircle.webp" />{" "}
                      {capitalizeFirstLetter(tag)} <TagCounter>{countTagOccurrences(tag)}</TagCounter>
                    </Option>
                  ))}
                </OptionsContainer>
              </StyledSelect>
            )}

            {availableTags.contentTypes.size > 0 && (
              <StyledSelect id='contentTypesDrop'>
                Content Types
                <OptionsContainer id='contentTypesOptions'>
                  {[...availableTags.contentTypes].map((tag) => (
                    <Option
                      key={tag}
                      $isSelected={selectedFilters.includes(tag)}
                      onClick={() => {
                        if (selectedFilters.includes(tag)) {
                          setSelectedFilters(selectedFilters.filter((f) => f !== tag));
                        } else {
                          setSelectedFilters([...selectedFilters, tag]);
                        }
                      }}
                    >
                      <Circle src="/images/addCircle.webp" />{" "}
                      {capitalizeFirstLetter(tag)} <TagCounter>{countTagOccurrences(tag)}</TagCounter>
                    </Option>
                  ))}
                </OptionsContainer>
              </StyledSelect>
            )}

            {availableTags.industryType.size > 0 && (
              <StyledSelect id='industryTypesDrop'>
                Industry Type
                <OptionsContainer id='industryTypesOptions'>
                  {[...availableTags.industryType].map((tag) => (
                    <Option
                      key={tag}
                      $isSelected={selectedFilters.includes(tag)}
                      onClick={() => {
                        if (selectedFilters.includes(tag)) {
                          setSelectedFilters(selectedFilters.filter((f) => f !== tag));
                        } else {
                          setSelectedFilters([...selectedFilters, tag]);
                        }
                      }}
                    >
                      <Circle src="/images/addCircle.webp" />{" "}
                      {capitalizeFirstLetter(tag)} <TagCounter>{countTagOccurrences(tag)}</TagCounter>
                    </Option>
                  ))}
                </OptionsContainer>
              </StyledSelect>
            )}

            {availableTags.newsTypeTags.size > 0 && (
              <StyledSelect id='newsTypeTagsDrop'>
                News Type
                <OptionsContainer id='newsTypeTagsOptions'>
                  {[...availableTags.newsTypeTags].map((tag) => (
                    <Option
                      key={tag}
                      $isSelected={selectedFilters.includes(tag)}
                      onClick={() => {
                        if (selectedFilters.includes(tag)) {
                          setSelectedFilters(selectedFilters.filter((f) => f !== tag));
                        } else {
                          setSelectedFilters([...selectedFilters, tag]);
                        }
                      }}
                    >
                      <Circle src="/images/addCircle.webp" />{" "}
                      {capitalizeFirstLetter(tag)} <TagCounter>{countTagOccurrences(tag)}</TagCounter>
                    </Option>
                  ))}
                </OptionsContainer>
              </StyledSelect>
            )}
          </Filters> */}
         {blok.filters && <SearchBar>
            <SearchInput
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBar>
}
          {/* <SelectedFilters>
            {selectedFilters.map((filter) => (
              <SelectedFilterTag key={filter} onClick={() => setSelectedFilters(selectedFilters.filter(f => f !== filter))}>
                <Circle src="/images/minusCircle.webp" />{" "}
                {capitalizeFirstLetter(filter)}
              </SelectedFilterTag>
            ))}
          </SelectedFilters> */}
        </FiltersWrapper>

        {blok.card_type === 'event' && (
          <EventHeaderContainer>
            <EventHeaders>Events</EventHeaders>
            <EventHeaders>Details</EventHeaders>
          </EventHeaderContainer>
        )}

        <CardsContainer card_type={blok.card_type}>
          {filteredCards.length > 0 ? (
            mappedCards
          ) : (
            <NoResults>
              No results found. Try adjusting your search or filters.
            </NoResults>
          )}
        </CardsContainer>

        {filteredCards.length > 0 && (
          <PaginationDiv>
            <PageNavigation className='prev'>Previous</PageNavigation>
            {mappedPages}
            <PageNavigation className='next'>Next</PageNavigation>
          </PaginationDiv>
        )}
      </Wrapper>
    </ThemeProvider>
  );
};

const SelectedFilterTag = styled.div`
cursor: pointer;
  ${text.bodySm};
  display: flex;
  align-items: center;
  width: auto;
  height: 1.625vw;
  padding: 0.25vw;
  border: 2px solid ${colors.lightPurple};
  color: ${colors.lightPurple};
  border-radius: 0.375vw;
  gap: 0.5vw;
  background: ${colors.lightPurpleGrey};

  ${media.fullWidth} {
    height: 26px;
    padding: 20px;
  }

  ${media.tablet} {
    height: 5.859vw;
    padding: 1.953vw;
  }

  ${media.mobile} {
    height: 12.15vw;
    padding: 4.673vw;
  }
`;

const SelectedFilters = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5vw;
  flex-wrap: wrap;

  ${media.fullWidth} {
    gap: 8px;
  }
`;

const Filters = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5vw;

  ${media.fullWidth} {
    gap: 8px;
  }
`;
const TagCounter = styled.div`
  ${text.tagBold};
  color: ${colors.lightPurple};
  background: ${colors.lightPurpleGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25vw;
  height: 1.25vw;
  border-radius: 50%;

  ${media.fullWidth} {
    width: 20px;
    height: 20px;
  }
`
const Circle = styled.img`
  height: 0.75vw;
  width: 0.75vw;
  cursor: pointer;

  ${media.fullWidth} {
    height: 12px;
    width: 12px;
  }

  ${media.tablet} {
    height: 1.172vw;
    width: 1.172vw;
  }

  ${media.mobile} {
    height: 2.5vw;
    width: 2.5vw;
  }
`;
const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 81.5vw;
  margin-bottom: 3.125vw;
  gap: 0.5vw;
  position: relative;

  ${media.fullWidth} {
    width: 1304px;
    margin-bottom: 50px;
    gap: 8px;
  }

  ${media.tablet} {
    margin-bottom: 4.883vw;
  }

  ${media.mobile} {
    margin-bottom: 10.417vw;
  }
`;
const Option = styled.div`
  ${text.bodySm};
  display: flex;
  align-items: center;
  width: fit-content;
  height: 1.625vw;
  padding: 0.25vw;
  border: 1px solid ${props => props.$isSelected ? colors.lightPurple : colors.grey100};
  border-radius: 0.375vw;
  gap: 0.5vw;
  color: ${props => props.$isSelected ? colors.lightPurple : colors.txtPrimary};

  ${media.fullWidth} {
    height: 26px;
    padding: 20px;
  }

  ${media.tablet} {
    height: 5.859vw;
    padding: 1.953vw;
  }

  ${media.mobile} {
    height: 12.15vw;
    padding: 4.673vw;
  }

  &:hover {
    cursor: pointer;
    background: ${colors.lightPurpleGrey};
    border: 1px solid ${colors.lightPurple};
  }
`;
const OptionsContainer = styled.div`
  position: relative;
  display: none;
  flex-direction: column;
  background: ${colors.white};
  overflow: hidden;
  width: max-content;
  min-width: 100%;
  z-index: 10;
  height: 0;
  border-radius: 0.375vw;
  border: ${colors.grey100};
  gap: 0.5vw;
  /* top: 2vw;
  left: 0vw; */

  ${media.fullWidth} {
    border-radius: 8px;
    // top: 58px;
  }

  ${media.tablet} {
    border-radius: 0.781vw;
    // top: 5.664vw;
  }

  ${media.mobile} {
    border-radius: 1.869vw;
    // top: 13.551vw;
  }
`;
const StyledSelect = styled.div`
${text.bodySm};
  width: max-content;
  /* height: 2.5vw; */
  border-radius: 0.5vw;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  background: ${colors.white};
  border: 1px solid ${colors.grey100};
  height: fit-content;
  /* min-width: 17.222vw; */
  padding: 0.5vw 0.75vw;
  color: ${colors.txtSubtle};

  &:hover {
    border: 1px solid ${colors.lightPurple};
  }

  ${media.fullWidth} {
    gap: 8px;
    padding: 8px 12px;
  }

  ${media.tablet} {
    padding: 2.344vw;
    /* gap: 3.906vw; */
  }

  ${media.mobile} {
    padding: 4.673vw;
    /* gap: 4.673vw; */
  }
`;
const PageNumberBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5vw;
  height: 1.625vw;
  border-radius: 0.25vw;
  cursor: pointer;

  ${media.fullWidth} {
    width: 40px;
    height: 26px;
    border-radius: 4px;
  }

  ${media.tablet} {
    width: 3.906vw;
    height: 2.539vw;
    border-radius: 0.391vw;
  }

  ${media.mobile} {
    width: 8.333vw;
    height: 5.417vw;
    border-radius: 0.833vw;
  }
`;

const Ellipsis = styled.div`
  padding: 0 0.5vw;
  color: ${colors.grey300};
  user-select: none;

  ${media.fullWidth} {
    padding: 0 8px;
  }

  ${media.tablet} {
    padding: 0 0.781vw;
  }

  ${media.mobile} {
    padding: 0 1.667vw;
  }
`;

const PageNavigation = styled.div`
  padding: 0.75vw 1vw;
  cursor: pointer;

  ${media.fullWidth} {
    padding: 12px 16px;
  }

  ${media.tablet} {
    padding: 1.172vw 1.563vw;
  }

  ${media.mobile} {
    padding: 2.5vw 3.333vw;
  }
`;

const PaginationDiv = styled.div`
  ${text.bodySm};
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${colors.grey100};
  border-radius: 0.75vw;
  margin-top: 2vw;

  ${media.fullWidth} {
    border-radius: 12px;
    margin-top: 32px;
  }

  ${media.tablet} {
    border-radius: 1.172vw;
    margin-top: 3.125vw;
  }

  ${media.mobile} {
    border-radius: 2.5vw;
    margin-top: 6.667vw;
  }

  :last-child {
    border-right: none;
  }
`;

const CardChunk = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${(props) =>
    props.card_type === 'event' ? 'column' : 'row'};
  flex-wrap: ${(props) => (props.card_type === 'event' ? 'nowrap' : 'wrap')};
  gap: ${(props) => (props.card_type === 'event' ? '0' : '1.25vw')};
  min-width: 100%;

  ${media.fullWidth} {
    gap: 20px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  gap: 0.625vw;
  width: 81.5vw;
  padding: ${props => props.card_type === 'event' ? '0' : '0.313vw'};

  ${media.fullWidth} {
    gap: 10px;
    width: 1304px;
  padding: ${props => props.card_type === 'event' ? '0' : '5px'};
  }

  ${media.tablet} {
    gap: 0.977vw;
    width: 92.188vw;
      padding: ${props => props.card_type === 'event' ? '0' : '0.488vw'};
  }

  ${media.mobile} {
    gap: 2.083vw;
    width: 89.167vw;
    padding: ${props => props.card_type === 'event' ? '0' : '1.042vw'};
  }
`;

const EventHeaders = styled.div`
  ${text.bodySmBold};
`;

const EventHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: ${colors.lightPurpleGrey};
  width: 81.5vw;
  padding: 1.5vw 1vw;
  border-radius: 1vw 1vw 0 0;
  gap: 37.938vw;

  ${media.fullWidth} {
    width: 1304px;
    padding: 24px 16px;
    border-radius: 16px 16px 0 0;
    gap: 607px;
  }

  ${media.tablet} {
    width: 92.188vw;
    padding: 2.344vw 1.563vw;
    border-radius: 1.563vw 1.563vw 0 0;
    gap: 59.277vw;
  }

  ${media.mobile} {
    width: 89.167vw;
    padding: 5vw 3.333vw;
    border-radius: 3.333vw 3.333vw 0 0;
    gap: 126.458vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  padding: ${(props) => {
    if (props.spacingOffset === 'top') {
      return props.spacing === 'default'
        ? '3.75vw 0 0'
        : props.spacing
        ? `${props.spacing}px 0 0`
        : '3.75vw 0 0';
    }
    if (props.spacingOffset === 'bottom') {
      return props.spacing === 'default'
        ? '0 0 3.75vw'
        : props.spacing
        ? `0 0 ${props.spacing}px`
        : '0 0 3.75vw';
    }
    return props.spacing === 'default'
      ? '3.75vw 0'
      : props.spacing
      ? `${props.spacing}px 0`
      : '3.75vw 0';
  }};

  ${media.fullWidth} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '60px 0 0'
          : props.spacing
          ? `${props.spacing}px 0 0`
          : '60px 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 60px'
          : props.spacing
          ? `0 0 ${props.spacing}px`
          : '0 0 60px';
      }
      return props.spacing === 'default'
        ? '60px 0'
        : props.spacing
        ? `${props.spacing}px 0`
        : '60px 0';
    }};
  }
  ${media.tablet} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '5.859vw 0 0'
          : props.spacing
          ? `${props.spacing}px 0 0`
          : '5.859vw 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 5.859vw'
          : props.spacing
          ? `0 0 ${props.spacing}px`
          : '0 0 5.859vw';
      }
      return props.spacing === 'default'
        ? '5.859vw 0'
        : props.spacing
        ? `${props.spacing}px 0`
        : '5.859vw 0';
    }};
  }

  ${media.mobile} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '12.5vw 0 0'
          : props.spacing
          ? `${props.spacing}px 0 0`
          : '12.5vw 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 12.5vw'
          : props.spacing
          ? `0 0 ${props.spacing}px`
          : '0 0 12.5vw';
      }
      return props.spacing === 'default'
        ? '12.5vw 0'
        : props.spacing
        ? `${props.spacing}px 0`
        : '12.5vw 0';
    }};
  }
`;

const FilterTag = styled.div`
  ${text.bodyMd};
  display: flex;
  align-items: center;
  width: auto;
  height: 1.625vw;
  padding: 0.25vw;
  border: 1px solid ${colors.grey100};
  border-radius: 0.375vw;
  gap: 0.5vw;
  background: ${colors.white};

  ${media.fullWidth} {
    height: 26px;
    padding: 20px;
  }

  ${media.tablet} {
    height: 5.859vw;
    padding: 1.953vw;
  }

  ${media.mobile} {
    height: 12.15vw;
    padding: 4.673vw;
  }

  &:hover {
    cursor: pointer;
    background-color: ${colors.white};
    color: ${colors.primaryOrange};
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${colors.grey300};
  cursor: pointer;
  font-size: 1.2em;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25vw;
  height: 1.25vw;

  ${media.fullWidth} {
    width: 20px;
    height: 20px;
  }

  ${media.tablet} {
    width: 1.953vw;
    height: 1.953vw;
  }

  ${media.mobile} {
    width: 4.167vw;
    height: 4.167vw;
  }

  &:hover {
    color: ${colors.primaryOrange};
  }
`;

const SearchBar = styled.div`
  ${text.bodySm};
  width: max-content;
  border-radius: 0.5vw;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  background: ${colors.white};
  border: 1px solid ${colors.grey100};
  height: fit-content;
  padding: 0.5vw 0.75vw;
  color: ${colors.txtSubtle};
  margin-bottom: 1.25vw;

  &:hover {
    border: 1px solid ${colors.lightPurple};
  }

  ${media.fullWidth} {
    gap: 8px;
    padding: 8px 12px;
  }

  ${media.tablet} {
    padding: 2.344vw;
  }

  ${media.mobile} {
    padding: 4.673vw;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  ${text.bodySm};
  color: ${colors.txtPrimary};
  width: 15vw;

  ${media.fullWidth} {
    width: 240px;
  }

  ${media.tablet} {
    width: 20vw;
  }

  ${media.mobile} {
    width: 70vw;
  }

  &::placeholder {
    color: ${colors.txtSubtle};
  }
`;

const NoResults = styled.div`
  ${text.h4};
  color: ${colors.txtSubtle};
  text-align: center;
  width: 100%;
  padding: 3vw 0;

  ${media.fullWidth} {
    padding: 48px 0;
  }

  ${media.tablet} {
    padding: 4.688vw 0;
  }

  ${media.mobile} {
    padding: 10vw 0;
  }
`;

export default PaginatedCards;
