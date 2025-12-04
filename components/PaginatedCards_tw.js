'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Card_tw from './globalComponents/Card_tw';
import EventCard from './globalComponents/EventCard';
import { horizontalLoop } from '@/functions/horizontalLoop';
import colors from '@/styles/colors';
import ResourceCard from './globalComponents/ResourceCard';
import ChrevronDown from '@/assets/svg/selectDownChevron.svg';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

const PaginatedCards_tw = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const pathname = usePathname();

  // Get current locale from pathname
  const getCurrentLocale = () => {
    const parts = pathname?.split('/');
    const localeCandidate = parts[1];
    const supportedLocales = ['en', 'de', 'fr'];
    return supportedLocales.includes(localeCandidate) ? localeCandidate : 'en';
  };

  const currentLocale = getCurrentLocale();

  // Get the translated navigation text for the current locale
  const getTranslatedNavigationText = (type) => {
    switch (currentLocale) {
      case 'fr':
        return type === 'previous' ? 'Précédent' : 'Suivant';
      case 'de':
        return type === 'previous' ? 'Zurück' : 'Weiter';
      default:
        return type === 'previous' ? 'Previous' : 'Next';
    }
  };

  // Get the translated search placeholder text for the current locale
  const getTranslatedSearchPlaceholder = () => {
    switch (currentLocale) {
      case 'fr':
        return 'Rechercher par titre...';
      case 'de':
        return 'Nach Titel suchen...';
      default:
        return 'Search by title...';
    }
  };

  const previousText = getTranslatedNavigationText('previous');
  const nextText = getTranslatedNavigationText('next');
  const searchPlaceholder = getTranslatedSearchPlaceholder();

  const currentIndex = useRef(0);
  const cardsLoop = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const solutionsTags = [
    'print automation',
    'serverless printing',
    'digital transformation',
    'security & compliance',
    'output automation',
    'cost management',
    'process automation',
    'paperless process',
    'sustainability',
  ];
  const productTags = [
    'capture',
    'workflow',
    'signature',
    'print',
    'content management',
    'storage',
    'reporting',
    'templates',
    'admin',
    'output automation',
    'advanced security',
    'cost management',
  ];
  const contentTypeTags = [
    'white paper',
    'customer story',
    'guide',
    'FAQ',
    'playbook',
    'solution brief',
    'video',
    'topic',
  ];
  const industryTags = ['healthcare'];
  const newsTags = ['media mentions', 'videos'];

  const filteredCards = blok.cards.filter((card) => {
    const headerContent = Array.isArray(card?.content)
      ? card.content.find((item) => item.component === 'header')
      : null;
    const cardTitle =
      headerContent?.copy?.content?.[0]?.content?.[0]?.text || '';

    const matchesSearch =
      searchQuery === '' ||
      cardTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (card.name &&
        card.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.every((filter) =>
        card.tag_list?.some((tag) => tag.toLowerCase() === filter.toLowerCase())
      );

    return matchesSearch && matchesFilters;
  });

  const availableTags = {
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
      ...availableTags.newsTypeTags,
    ]);

    const newSelectedFilters = selectedFilters.filter((filter) =>
      allAvailableTags.has(filter.toLowerCase())
    );

    if (newSelectedFilters.length !== selectedFilters.length) {
      setSelectedFilters(newSelectedFilters);
    }
  }, [filteredCards]);

  const capitalizeFirstLetter = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const countTagOccurrences = (tag) => {
    return blok.cards.filter((card) =>
      card.tag_list?.some((t) => t.toLowerCase() === tag.toLowerCase())
    ).length;
  };

  const mappedCards = [];
  for (let i = 0; i < filteredCards.length; i += 6) {
    const chunk = filteredCards.slice(i, i + 6);
    mappedCards.push(
      <div
        key={`chunk-${i / 6}`}
        className={`cardChunks relative flex min-w-full ${
          blok.card_type === 'event' ? 'flex-col flex-nowrap gap-0' : 'flex-row flex-wrap gap-[1.25vw] fullWidth:gap-5'
        }`}
      >
        {chunk.map((card, index) => {
          if (blok.card_type === 'default') {
            return (
              <Card_tw
                key={card._uid || `card-${i + index}`}
                borderradius="6"
                paginated
                content={card}
              />
            );
          } else if (blok.card_type === 'event') {
            return (
              <EventCard
                key={card._uid || `card-${i + index}`}
                even={index % 2 === 1}
                content={card}
              />
            );
          } else if (blok.card_type === 'resource') {
            return (
              <ResourceCard
                key={card._uid || `card-${i + index}`}
                paginated
                index={index}
                content={card}
                borderradius="6"
              />
            );
          }
        })}
      </div>
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
      return (
        <div
          key={`ellipsis-${i}`}
          className="px-[0.5vw] text-[#BBBEC1] select-none fullWidth:px-2 tablet:px-[0.781vw] mobile:px-[1.667vw]"
        >
          ...
        </div>
      );
    }

    return (
      <div
        className="pageNumberBlocks flex items-center justify-center w-[2.5vw] h-[1.625vw] rounded-[0.25vw] cursor-pointer fullWidth:w-10 fullWidth:h-[26px] fullWidth:rounded tablet:w-[3.906vw] tablet:h-[2.539vw] tablet:rounded-[0.391vw] mobile:w-[8.333vw] mobile:h-[5.417vw] mobile:rounded-[0.833vw]"
        key={`block-${page}`}
        id={`block-${page}`}
        onClick={() => goToPage(page)}
        style={{
          backgroundColor: currentPage === page ? colors.grey100 : 'unset',
        }}
      >
        {page + 1}
      </div>
    );
  });

  useEffect(() => {
    // Use requestIdleCallback to defer heavy animation setup and reduce scheduler pressure
    const setupAnimations = () => {
      // Clean up previous animation
      if (cardsLoop.current) {
        cardsLoop.current.kill();
        cardsLoop.current = null;
      }

      // Reset state
      currentIndex.current = 0;
      setCurrentPage(0);

      // Get new card chunks
      const cardChunks = gsap.utils.toArray('.cardChunks');
      const totalItems = cardChunks.length;

      // Initialize new animation if we have cards
      if (totalItems > 0) {
        cardsLoop.current = horizontalLoop(cardChunks, {
          paused: true,
          center: true,
        });
      }

      // Set up navigation handlers
      const nextBtn = document.querySelector('.next');
      const prevBtn = document.querySelector('.prev');

      const handleNext = () => {
        if (!cardsLoop.current || totalItems === 0) return;
        // Batch state updates to reduce scheduler overhead
        requestAnimationFrame(() => {
          cardsLoop.current.next({ duration: 0.4, ease: 'power1.inOut' });
          currentIndex.current = (currentIndex.current + 1) % totalItems;
          setCurrentPage(currentIndex.current);
        });
      };

      const handlePrev = () => {
        if (!cardsLoop.current || totalItems === 0) return;
        requestAnimationFrame(() => {
          cardsLoop.current.previous({ duration: 0.4, ease: 'power1.inOut' });
          currentIndex.current =
            (currentIndex.current - 1 + totalItems) % totalItems;
          setCurrentPage(currentIndex.current);
        });
      };

      // Add event listeners
      if (nextBtn) nextBtn.addEventListener('click', handleNext);
      if (prevBtn) prevBtn.addEventListener('click', handlePrev);

      // Cleanup function
      return () => {
        if (cardsLoop.current) {
          cardsLoop.current.kill();
          cardsLoop.current = null;
        }
        if (nextBtn) nextBtn.removeEventListener('click', handleNext);
        if (prevBtn) prevBtn.removeEventListener('click', handlePrev);
      };
    };

    // Defer animation setup to reduce initial scheduler load
    if (window.requestIdleCallback) {
      const cleanup = window.requestIdleCallback(setupAnimations);
      return () => {
        if (cleanup) window.cancelIdleCallback(cleanup);
      };
    } else {
      const timeoutId = setTimeout(setupAnimations, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [filteredCards.length]); // Only depend on the length of filtered cards

  useEffect(() => {
    const manuDropDownTL = gsap
      .timeline({ paused: true })
      .set('#solutionsOptions', { display: 'flex', height: 0 })
      .fromTo(
        '#solutionsOptions',
        { height: 0 },
        { height: 'auto', duration: 0.55, ease: 'power2.inOut' }
      );

    const platformDropDownTL = gsap
      .timeline({ paused: true })
      .set('#productOptions', { display: 'flex', height: 0 })
      .fromTo(
        '#productOptions',
        { height: 0 },
        { height: 'auto', duration: 0.55, ease: 'power2.inOut' }
      );

    const featureDropDownTL = gsap
      .timeline({ paused: true })
      .set('#contentTypesOptions', { display: 'flex', height: 0 })
      .fromTo(
        '#contentTypesOptions',
        { height: 0 },
        { height: 'auto', duration: 0.55, ease: 'power2.inOut' }
      );

    const industryDropDownTL = gsap
      .timeline({ paused: true })
      .set('#industryTypesOptions', { display: 'flex', height: 0 })
      .fromTo(
        '#industryTypesOptions',
        { height: 0 },
        { height: 'auto', duration: 0.55, ease: 'power2.inOut' }
      );

    const newsTypeDropDownTL = gsap
      .timeline({ paused: true })
      .set('#newsTypeTagsOptions', { display: 'flex', height: 0 })
      .fromTo(
        '#newsTypeTagsOptions',
        { height: 0 },
        { height: 'auto', duration: 0.55, ease: 'power2.inOut' }
      );

    const handleManuDrop = () => {
      const solutionsDrop = document.querySelector('#solutionsDrop');
      if (manuDropDownTL.paused() || manuDropDownTL.reversed()) {
        platformDropDownTL.reverse();
        featureDropDownTL.reverse();
        industryDropDownTL.reverse();
        newsTypeDropDownTL.reverse();
        manuDropDownTL.play();
        solutionsDrop?.classList.add('active');
      } else {
        manuDropDownTL.reverse();
        solutionsDrop?.classList.remove('active');
      }
    };

    const handlePlatformDrop = () => {
      const productDrop = document.querySelector('#productDrop');
      if (platformDropDownTL.paused() || platformDropDownTL.reversed()) {
        manuDropDownTL.reverse();
        featureDropDownTL.reverse();
        industryDropDownTL.reverse();
        newsTypeDropDownTL.reverse();
        platformDropDownTL.play();
        productDrop?.classList.add('active');
      } else {
        platformDropDownTL.reverse();
        productDrop?.classList.remove('active');
      }
    };

    const handleFeatureDrop = () => {
      const contentTypesDrop = document.querySelector('#contentTypesDrop');
      if (featureDropDownTL.paused() || featureDropDownTL.reversed()) {
        manuDropDownTL.reverse();
        platformDropDownTL.reverse();
        industryDropDownTL.reverse();
        newsTypeDropDownTL.reverse();
        featureDropDownTL.play();
        contentTypesDrop?.classList.add('active');
      } else {
        featureDropDownTL.reverse();
        contentTypesDrop?.classList.remove('active');
      }
    };

    const handleIndustryDrop = () => {
      const industryTypesDrop = document.querySelector('#industryTypesDrop');
      if (industryDropDownTL.paused() || industryDropDownTL.reversed()) {
        manuDropDownTL.reverse();
        platformDropDownTL.reverse();
        featureDropDownTL.reverse();
        newsTypeDropDownTL.reverse();
        industryDropDownTL.play();
        industryTypesDrop?.classList.add('active');
      } else {
        industryDropDownTL.reverse();
        industryTypesDrop?.classList.remove('active');
      }
    };

    const handleNewsTypeDrop = () => {
      const newsTypeTagsDrop = document.querySelector('#newsTypeTagsDrop');
      if (newsTypeDropDownTL.paused() || newsTypeDropDownTL.reversed()) {
        manuDropDownTL.reverse();
        platformDropDownTL.reverse();
        featureDropDownTL.reverse();
        industryDropDownTL.reverse();
        newsTypeDropDownTL.play();
        newsTypeTagsDrop?.classList.add('active');
      } else {
        newsTypeDropDownTL.reverse();
        newsTypeTagsDrop?.classList.remove('active');
      }
    };

    // Add click event listeners
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

    // Add click event listener to document to close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      const dropdowns = [
        '#solutionsDrop',
        '#productDrop',
        '#contentTypesDrop',
        '#industryTypesDrop',
        '#newsTypeTagsDrop',
      ];

      if (!dropdowns.some((selector) => event.target.closest(selector))) {
        manuDropDownTL.reverse();
        platformDropDownTL.reverse();
        featureDropDownTL.reverse();
        industryDropDownTL.reverse();
        newsTypeDropDownTL.reverse();

        // Remove active class from all dropdowns
        dropdowns.forEach((selector) => {
          document.querySelector(selector)?.classList.remove('active');
        });
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
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
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Calculate padding
  const spacing = blok.section_spacing;
  const offset = blok.offset_spacing;

  const getPaddingClasses = () => {
    if (spacing && spacing !== 'default') {
      return '';
    }
    if (offset === 'top') {
      return 'pt-[3.75vw] pb-0 px-0 fullWidth:pt-[60px] fullWidth:pb-0 tablet:pt-[5.859vw] tablet:pb-0 mobile:pt-[12.5vw] mobile:pb-0';
    }
    if (offset === 'bottom') {
      return 'pt-0 pb-[3.75vw] px-0 fullWidth:pt-0 fullWidth:pb-[60px] tablet:pt-0 tablet:pb-[5.859vw] mobile:pt-0 mobile:pb-[12.5vw]';
    }
    return 'py-[3.75vw] px-0 fullWidth:py-[60px] tablet:py-[5.859vw] mobile:py-[12.5vw]';
  };

  const getPaddingStyle = () => {
    if (spacing && spacing !== 'default') {
      if (offset === 'top') {
        return { paddingTop: `${spacing}px`, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 };
      }
      if (offset === 'bottom') {
        return { paddingTop: 0, paddingBottom: `${spacing}px`, paddingLeft: 0, paddingRight: 0 };
      }
      return { paddingTop: `${spacing}px`, paddingBottom: `${spacing}px`, paddingLeft: 0, paddingRight: 0 };
    }
    return {};
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full ${getPaddingClasses()}`}
      style={getPaddingStyle()}
    >
      <style>{`
        @media (min-width: 1601px) {
          [data-paginated-wrapper] {
            ${spacing && spacing !== 'default'
              ? offset === 'top'
                ? `padding: ${spacing}px 0 0 !important;`
                : offset === 'bottom'
                  ? `padding: 0 0 ${spacing}px !important;`
                  : `padding: ${spacing}px 0 !important;`
              : ''}
          }
        }
        @media (min-width: 481px) and (max-width: 1024px) {
          [data-paginated-wrapper] {
            ${spacing && spacing !== 'default'
              ? offset === 'top'
                ? `padding: ${spacing}px 0 0 !important;`
                : offset === 'bottom'
                  ? `padding: 0 0 ${spacing}px !important;`
                  : `padding: ${spacing}px 0 !important;`
              : ''}
          }
        }
        @media (max-width: 480px) {
          [data-paginated-wrapper] {
            ${spacing && spacing !== 'default'
              ? offset === 'top'
                ? `padding: ${spacing}px 0 0 !important;`
                : offset === 'bottom'
                  ? `padding: 0 0 ${spacing}px !important;`
                  : `padding: ${spacing}px 0 !important;`
              : ''}
          }
        }
      `}</style>
      <div data-paginated-wrapper className="flex flex-col items-center justify-center w-full">
        {blok.filters && (
          <div className="flex flex-col justify-start w-[81.5vw] mb-[3.125vw] gap-[0.5vw] relative fullWidth:w-[1304px] fullWidth:mb-[50px] fullWidth:gap-2 tablet:w-[90.188vw] tablet:mb-[4.883vw] tablet:gap-[0.781vw] mobile:mb-[10.417vw]">
            <div className="flex flex-row gap-[0.5vw] fullWidth:gap-2">
              {availableTags.solutions.size > 0 && (
                <div
                  id="solutionsDrop"
                  className="font-['Archivo'] text-[0.972vw] leading-[1.25vw] fullWidth:text-[14px] fullWidth:leading-[18px] tablet:text-[1.367vw] tablet:leading-[1.758vw] mobile:text-[3.271vw] mobile:leading-[4.206vw] w-[13.125vw] rounded-[0.5vw] cursor-pointer relative flex flex-col items-start justify-center bg-white border border-[#EBECEC] h-fit p-[0.5vw_0.75vw] text-[#808085] transition-all duration-200 ease-in-out hover:border-[#7E5FDD] fullWidth:w-[210px] fullWidth:gap-2 fullWidth:p-2 tablet:w-[20.508vw] tablet:gap-[0.781vw] tablet:p-[0.781vw_1.172vw] tablet:rounded-[0.781vw] mobile:w-[43.75vw] mobile:gap-[1.667vw] mobile:p-[1.667vw_2.5vw] mobile:rounded-[1.667vw]"
                >
                  <div className="w-full flex flex-row items-center justify-between">
                    Solutions{' '}
                    <ChrevronDown className="chevron w-[1.25vw] h-[1.25vw] -rotate-90 transition-all duration-200 ease-in-out fullWidth:w-5 fullWidth:h-5 tablet:w-[4.167vw] tablet:h-[4.167vw] mobile:w-[4.167vw] mobile:h-[4.167vw]" />
                  </div>
                  <div
                    id="solutionsOptions"
                    className="relative hidden flex-col bg-white overflow-hidden w-max min-w-full z-[10] h-0 rounded-[0.375vw] border border-[#EBECEC] gap-[0.5vw] fullWidth:rounded-[8px] fullWidth:gap-2 tablet:rounded-[0.781vw] tablet:gap-[0.781vw] mobile:rounded-[1.869vw] mobile:gap-[1.667vw]"
                  >
                    {[...availableTags.solutions].map((tag) => (
                      <div
                        key={tag}
                        className={`font-['Archivo'] text-[0.972vw] leading-[1.25vw] fullWidth:text-[14px] fullWidth:leading-[18px] tablet:text-[1.367vw] tablet:leading-[1.758vw] mobile:text-[3.271vw] mobile:leading-[4.206vw] flex items-center w-fit h-[1.625vw] p-[0.25vw] rounded-[0.375vw] gap-[0.5vw] fullWidth:h-[26px] fullWidth:p-1 fullWidth:gap-2 fullWidth:rounded-[6px] tablet:h-[2.539vw] tablet:p-[0.391vw] tablet:gap-[0.781vw] tablet:rounded-[0.586vw] mobile:h-[5.417vw] mobile:p-[1.5vw] mobile:gap-[1.667vw] mobile:rounded-[1.25vw] cursor-pointer hover:bg-[#F5F4F7] hover:border hover:border-[#7E5FDD] ${
                          selectedFilters.includes(tag)
                            ? 'border border-[#7E5FDD] text-[#7E5FDD]'
                            : 'border border-[#CFD2D4] text-[#1B1D21]'
                        }`}
                        onClick={() => {
                          if (selectedFilters.includes(tag)) {
                            setSelectedFilters(
                              selectedFilters.filter((f) => f !== tag)
                            );
                          } else {
                            setSelectedFilters([...selectedFilters, tag]);
                          }
                        }}
                      >
                        <img
                          src="/images/addCircle.webp"
                          alt=""
                          className="h-[0.75vw] w-[0.75vw] cursor-pointer fullWidth:h-3 fullWidth:w-3 tablet:h-[1.172vw] tablet:w-[1.172vw] mobile:h-[2.5vw] mobile:w-[2.5vw]"
                        />{' '}
                        {capitalizeFirstLetter(tag)}{' '}
                        <div className="font-['Archivo'] font-semibold text-[0.694vw] leading-[0.833vw] fullWidth:text-[11px] fullWidth:leading-[13px] tablet:text-[0.977vw] tablet:leading-[1.172vw] mobile:text-[2.336vw] mobile:leading-[2.804vw] text-[#7E5FDD] bg-[#F5F4F7] flex items-center justify-center w-[1.25vw] h-[1.25vw] rounded-full fullWidth:w-5 fullWidth:h-5">
                          {countTagOccurrences(tag)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {availableTags.products.size > 0 && (
                <div
                  id="productDrop"
                  className="font-['Archivo'] text-[0.972vw] leading-[1.25vw] fullWidth:text-[14px] fullWidth:leading-[18px] tablet:text-[1.367vw] tablet:leading-[1.758vw] mobile:text-[3.271vw] mobile:leading-[4.206vw] w-[13.125vw] rounded-[0.5vw] cursor-pointer relative flex flex-col items-start justify-center bg-white border border-[#EBECEC] h-fit p-[0.5vw_0.75vw] text-[#808085] transition-all duration-200 ease-in-out hover:border-[#7E5FDD] fullWidth:w-[210px] fullWidth:gap-2 fullWidth:p-2 tablet:w-[20.508vw] tablet:gap-[0.781vw] tablet:p-[0.781vw_1.172vw] tablet:rounded-[0.781vw] mobile:w-[43.75vw] mobile:gap-[1.667vw] mobile:p-[1.667vw_2.5vw] mobile:rounded-[1.667vw]"
                >
                  <div className="w-full flex flex-row items-center justify-between">
                    Product
                    <ChrevronDown className="chevron w-[1.25vw] h-[1.25vw] -rotate-90 transition-all duration-200 ease-in-out fullWidth:w-5 fullWidth:h-5 tablet:w-[4.167vw] tablet:h-[4.167vw] mobile:w-[4.167vw] mobile:h-[4.167vw]" />
                  </div>
                  <div
                    id="productOptions"
                    className="relative hidden flex-col bg-white overflow-hidden w-max min-w-full z-[10] h-0 rounded-[0.375vw] border border-[#EBECEC] gap-[0.5vw] fullWidth:rounded-[8px] fullWidth:gap-2 tablet:rounded-[0.781vw] tablet:gap-[0.781vw] mobile:rounded-[1.869vw] mobile:gap-[1.667vw]"
                  >
                    {[...availableTags.products].map((tag) => (
                      <div
                        key={tag}
                        className={`font-['Archivo'] text-[0.972vw] leading-[1.25vw] fullWidth:text-[14px] fullWidth:leading-[18px] tablet:text-[1.367vw] tablet:leading-[1.758vw] mobile:text-[3.271vw] mobile:leading-[4.206vw] flex items-center w-fit h-[1.625vw] p-[0.25vw] rounded-[0.375vw] gap-[0.5vw] fullWidth:h-[26px] fullWidth:p-1 fullWidth:gap-2 fullWidth:rounded-[6px] tablet:h-[2.539vw] tablet:p-[0.391vw] tablet:gap-[0.781vw] tablet:rounded-[0.586vw] mobile:h-[5.417vw] mobile:p-[1.5vw] mobile:gap-[1.667vw] mobile:rounded-[1.25vw] cursor-pointer hover:bg-[#F5F4F7] hover:border hover:border-[#7E5FDD] ${
                          selectedFilters.includes(tag)
                            ? 'border border-[#7E5FDD] text-[#7E5FDD]'
                            : 'border border-[#CFD2D4] text-[#1B1D21]'
                        }`}
                        onClick={() => {
                          if (selectedFilters.includes(tag)) {
                            setSelectedFilters(
                              selectedFilters.filter((f) => f !== tag)
                            );
                          } else {
                            setSelectedFilters([...selectedFilters, tag]);
                          }
                        }}
                      >
                        <img
                          src="/images/addCircle.webp"
                          alt=""
                          className="h-[0.75vw] w-[0.75vw] cursor-pointer fullWidth:h-3 fullWidth:w-3 tablet:h-[1.172vw] tablet:w-[1.172vw] mobile:h-[2.5vw] mobile:w-[2.5vw]"
                        />{' '}
                        {capitalizeFirstLetter(tag)}{' '}
                        <div className="font-['Archivo'] font-semibold text-[0.694vw] leading-[0.833vw] fullWidth:text-[11px] fullWidth:leading-[13px] tablet:text-[0.977vw] tablet:leading-[1.172vw] mobile:text-[2.336vw] mobile:leading-[2.804vw] text-[#7E5FDD] bg-[#F5F4F7] flex items-center justify-center w-[1.25vw] h-[1.25vw] rounded-full fullWidth:w-5 fullWidth:h-5">
                          {countTagOccurrences(tag)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {availableTags.contentTypes.size > 0 && (
                <div
                  id="contentTypesDrop"
                  className="font-['Archivo'] text-[0.972vw] leading-[1.25vw] fullWidth:text-[14px] fullWidth:leading-[18px] tablet:text-[1.367vw] tablet:leading-[1.758vw] mobile:text-[3.271vw] mobile:leading-[4.206vw] w-[13.125vw] rounded-[0.5vw] cursor-pointer relative flex flex-col items-start justify-center bg-white border border-[#EBECEC] h-fit p-[0.5vw_0.75vw] text-[#808085] transition-all duration-200 ease-in-out hover:border-[#7E5FDD] fullWidth:w-[210px] fullWidth:gap-2 fullWidth:p-2 tablet:w-[20.508vw] tablet:gap-[0.781vw] tablet:p-[0.781vw_1.172vw] tablet:rounded-[0.781vw] mobile:w-[43.75vw] mobile:gap-[1.667vw] mobile:p-[1.667vw_2.5vw] mobile:rounded-[1.667vw]"
                >
                  <div className="w-full flex flex-row items-center justify-between">
                    Content Types
                    <ChrevronDown className="chevron w-[1.25vw] h-[1.25vw] -rotate-90 transition-all duration-200 ease-in-out fullWidth:w-5 fullWidth:h-5 tablet:w-[4.167vw] tablet:h-[4.167vw] mobile:w-[4.167vw] mobile:h-[4.167vw]" />
                  </div>
                  <div
                    id="contentTypesOptions"
                    className="relative hidden flex-col bg-white overflow-hidden w-max min-w-full z-[10] h-0 rounded-[0.375vw] border border-[#EBECEC] gap-[0.5vw] fullWidth:rounded-[8px] fullWidth:gap-2 tablet:rounded-[0.781vw] tablet:gap-[0.781vw] mobile:rounded-[1.869vw] mobile:gap-[1.667vw]"
                  >
                    {[...availableTags.contentTypes].map((tag) => (
                      <div
                        key={tag}
                        className={`font-['Archivo'] text-[0.972vw] leading-[1.25vw] fullWidth:text-[14px] fullWidth:leading-[18px] tablet:text-[1.367vw] tablet:leading-[1.758vw] mobile:text-[3.271vw] mobile:leading-[4.206vw] flex items-center w-fit h-[1.625vw] p-[0.25vw] rounded-[0.375vw] gap-[0.5vw] fullWidth:h-[26px] fullWidth:p-1 fullWidth:gap-2 fullWidth:rounded-[6px] tablet:h-[2.539vw] tablet:p-[0.391vw] tablet:gap-[0.781vw] tablet:rounded-[0.586vw] mobile:h-[5.417vw] mobile:p-[1.5vw] mobile:gap-[1.667vw] mobile:rounded-[1.25vw] cursor-pointer hover:bg-[#F5F4F7] hover:border hover:border-[#7E5FDD] ${
                          selectedFilters.includes(tag)
                            ? 'border border-[#7E5FDD] text-[#7E5FDD]'
                            : 'border border-[#CFD2D4] text-[#1B1D21]'
                        }`}
                        onClick={() => {
                          if (selectedFilters.includes(tag)) {
                            setSelectedFilters(
                              selectedFilters.filter((f) => f !== tag)
                            );
                          } else {
                            setSelectedFilters([...selectedFilters, tag]);
                          }
                        }}
                      >
                        <img
                          src="/images/addCircle.webp"
                          alt=""
                          className="h-[0.75vw] w-[0.75vw] cursor-pointer fullWidth:h-3 fullWidth:w-3 tablet:h-[1.172vw] tablet:w-[1.172vw] mobile:h-[2.5vw] mobile:w-[2.5vw]"
                        />{' '}
                        {capitalizeFirstLetter(tag)}{' '}
                        <div className="font-['Archivo'] font-semibold text-[0.694vw] leading-[0.833vw] fullWidth:text-[11px] fullWidth:leading-[13px] tablet:text-[0.977vw] tablet:leading-[1.172vw] mobile:text-[2.336vw] mobile:leading-[2.804vw] text-[#7E5FDD] bg-[#F5F4F7] flex items-center justify-center w-[1.25vw] h-[1.25vw] rounded-full fullWidth:w-5 fullWidth:h-5">
                          {countTagOccurrences(tag)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {availableTags.industryType.size > 0 && (
                <div
                  id="industryTypesDrop"
                  className="font-['Archivo'] text-[0.972vw] leading-[1.25vw] fullWidth:text-[14px] fullWidth:leading-[18px] tablet:text-[1.367vw] tablet:leading-[1.758vw] mobile:text-[3.271vw] mobile:leading-[4.206vw] w-[13.125vw] rounded-[0.5vw] cursor-pointer relative flex flex-col items-start justify-center bg-white border border-[#EBECEC] h-fit p-[0.5vw_0.75vw] text-[#808085] transition-all duration-200 ease-in-out hover:border-[#7E5FDD] fullWidth:w-[210px] fullWidth:gap-2 fullWidth:p-2 tablet:w-[20.508vw] tablet:gap-[0.781vw] tablet:p-[0.781vw_1.172vw] tablet:rounded-[0.781vw] mobile:w-[43.75vw] mobile:gap-[1.667vw] mobile:p-[1.667vw_2.5vw] mobile:rounded-[1.667vw]"
                >
                  <div className="w-full flex flex-row items-center justify-between">
                    Industry Type <ChrevronDown className="chevron w-[1.25vw] h-[1.25vw] -rotate-90 transition-all duration-200 ease-in-out fullWidth:w-5 fullWidth:h-5 tablet:w-[4.167vw] tablet:h-[4.167vw] mobile:w-[4.167vw] mobile:h-[4.167vw]" />
                  </div>
                  <div
                    id="industryTypesOptions"
                    className="relative hidden flex-col bg-white overflow-hidden w-max min-w-full z-[10] h-0 rounded-[0.375vw] border border-[#EBECEC] gap-[0.5vw] fullWidth:rounded-[8px] fullWidth:gap-2 tablet:rounded-[0.781vw] tablet:gap-[0.781vw] mobile:rounded-[1.869vw] mobile:gap-[1.667vw]"
                  >
                    {[...availableTags.industryType].map((tag) => (
                      <div
                        key={tag}
                        className={`font-['Archivo'] text-[0.972vw] leading-[1.25vw] fullWidth:text-[14px] fullWidth:leading-[18px] tablet:text-[1.367vw] tablet:leading-[1.758vw] mobile:text-[3.271vw] mobile:leading-[4.206vw] flex items-center w-fit h-[1.625vw] p-[0.25vw] rounded-[0.375vw] gap-[0.5vw] fullWidth:h-[26px] fullWidth:p-1 fullWidth:gap-2 fullWidth:rounded-[6px] tablet:h-[2.539vw] tablet:p-[0.391vw] tablet:gap-[0.781vw] tablet:rounded-[0.586vw] mobile:h-[5.417vw] mobile:p-[1.5vw] mobile:gap-[1.667vw] mobile:rounded-[1.25vw] cursor-pointer hover:bg-[#F5F4F7] hover:border hover:border-[#7E5FDD] ${
                          selectedFilters.includes(tag)
                            ? 'border border-[#7E5FDD] text-[#7E5FDD]'
                            : 'border border-[#CFD2D4] text-[#1B1D21]'
                        }`}
                        onClick={() => {
                          if (selectedFilters.includes(tag)) {
                            setSelectedFilters(
                              selectedFilters.filter((f) => f !== tag)
                            );
                          } else {
                            setSelectedFilters([...selectedFilters, tag]);
                          }
                        }}
                      >
                        <img
                          src="/images/addCircle.webp"
                          alt=""
                          className="h-[0.75vw] w-[0.75vw] cursor-pointer fullWidth:h-3 fullWidth:w-3 tablet:h-[1.172vw] tablet:w-[1.172vw] mobile:h-[2.5vw] mobile:w-[2.5vw]"
                        />{' '}
                        {capitalizeFirstLetter(tag)}{' '}
                        <div className="font-['Archivo'] font-semibold text-[0.694vw] leading-[0.833vw] fullWidth:text-[11px] fullWidth:leading-[13px] tablet:text-[0.977vw] tablet:leading-[1.172vw] mobile:text-[2.336vw] mobile:leading-[2.804vw] text-[#7E5FDD] bg-[#F5F4F7] flex items-center justify-center w-[1.25vw] h-[1.25vw] rounded-full fullWidth:w-5 fullWidth:h-5">
                          {countTagOccurrences(tag)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {availableTags.newsTypeTags.size > 0 && (
                <div
                  id="newsTypeTagsDrop"
                  className="font-['Archivo'] text-[0.972vw] leading-[1.25vw] fullWidth:text-[14px] fullWidth:leading-[18px] tablet:text-[1.367vw] tablet:leading-[1.758vw] mobile:text-[3.271vw] mobile:leading-[4.206vw] w-[13.125vw] rounded-[0.5vw] cursor-pointer relative flex flex-col items-start justify-center bg-white border border-[#EBECEC] h-fit p-[0.5vw_0.75vw] text-[#808085] transition-all duration-200 ease-in-out hover:border-[#7E5FDD] fullWidth:w-[210px] fullWidth:gap-2 fullWidth:p-2 tablet:w-[20.508vw] tablet:gap-[0.781vw] tablet:p-[0.781vw_1.172vw] tablet:rounded-[0.781vw] mobile:w-[43.75vw] mobile:gap-[1.667vw] mobile:p-[1.667vw_2.5vw] mobile:rounded-[1.667vw]"
                >
                  <div className="w-full flex flex-row items-center justify-between">
                    News Type <ChrevronDown className="chevron w-[1.25vw] h-[1.25vw] -rotate-90 transition-all duration-200 ease-in-out fullWidth:w-5 fullWidth:h-5 tablet:w-[4.167vw] tablet:h-[4.167vw] mobile:w-[4.167vw] mobile:h-[4.167vw]" />
                  </div>
                  <div
                    id="newsTypeTagsOptions"
                    className="relative hidden flex-col bg-white overflow-hidden w-max min-w-full z-[10] h-0 rounded-[0.375vw] border border-[#EBECEC] gap-[0.5vw] fullWidth:rounded-[8px] fullWidth:gap-2 tablet:rounded-[0.781vw] tablet:gap-[0.781vw] mobile:rounded-[1.869vw] mobile:gap-[1.667vw]"
                  >
                    {[...availableTags.newsTypeTags].map((tag) => (
                      <div
                        key={tag}
                        className={`font-['Archivo'] text-[0.972vw] leading-[1.25vw] fullWidth:text-[14px] fullWidth:leading-[18px] tablet:text-[1.367vw] tablet:leading-[1.758vw] mobile:text-[3.271vw] mobile:leading-[4.206vw] flex items-center w-fit h-[1.625vw] p-[0.25vw] rounded-[0.375vw] gap-[0.5vw] fullWidth:h-[26px] fullWidth:p-1 fullWidth:gap-2 fullWidth:rounded-[6px] tablet:h-[2.539vw] tablet:p-[0.391vw] tablet:gap-[0.781vw] tablet:rounded-[0.586vw] mobile:h-[5.417vw] mobile:p-[1.5vw] mobile:gap-[1.667vw] mobile:rounded-[1.25vw] cursor-pointer hover:bg-[#F5F4F7] hover:border hover:border-[#7E5FDD] ${
                          selectedFilters.includes(tag)
                            ? 'border border-[#7E5FDD] text-[#7E5FDD]'
                            : 'border border-[#CFD2D4] text-[#1B1D21]'
                        }`}
                        onClick={() => {
                          if (selectedFilters.includes(tag)) {
                            setSelectedFilters(
                              selectedFilters.filter((f) => f !== tag)
                            );
                          } else {
                            setSelectedFilters([...selectedFilters, tag]);
                          }
                        }}
                      >
                        <img
                          src="/images/addCircle.webp"
                          alt=""
                          className="h-[0.75vw] w-[0.75vw] cursor-pointer fullWidth:h-3 fullWidth:w-3 tablet:h-[1.172vw] tablet:w-[1.172vw] mobile:h-[2.5vw] mobile:w-[2.5vw]"
                        />{' '}
                        {capitalizeFirstLetter(tag)}{' '}
                        <div className="font-['Archivo'] font-semibold text-[0.694vw] leading-[0.833vw] fullWidth:text-[11px] fullWidth:leading-[13px] tablet:text-[0.977vw] tablet:leading-[1.172vw] mobile:text-[2.336vw] mobile:leading-[2.804vw] text-[#7E5FDD] bg-[#F5F4F7] flex items-center justify-center w-[1.25vw] h-[1.25vw] rounded-full fullWidth:w-5 fullWidth:h-5">
                          {countTagOccurrences(tag)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="font-['Archivo'] text-[0.972vw] leading-[1.25vw] fullWidth:text-[14px] fullWidth:leading-[18px] tablet:text-[1.367vw] tablet:leading-[1.758vw] mobile:text-[3.271vw] mobile:leading-[4.206vw] w-[13.125vw] rounded-[0.5vw] cursor-pointer absolute right-0 top-0 flex flex-col items-start justify-center bg-white border border-[#EBECEC] h-fit p-[0.5vw_0.75vw] text-[#808085] mb-[1.25vw] hover:border-[#7E5FDD] fullWidth:w-[210px] fullWidth:gap-2 fullWidth:p-2 fullWidth:mb-5 tablet:w-[20.508vw] tablet:gap-[0.781vw] tablet:p-[0.781vw_1.172vw] tablet:rounded-[0.781vw] tablet:mb-[1.953vw] mobile:relative mobile:w-full mobile:gap-[1.667vw] mobile:p-[1.667vw_2.5vw] mobile:rounded-[1.667vw]">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full border-none outline-none bg-transparent font-['Archivo'] text-[0.972vw] leading-[1.25vw] fullWidth:text-[14px] fullWidth:leading-[18px] tablet:text-[1.367vw] tablet:leading-[1.758vw] mobile:text-[3.271vw] mobile:leading-[4.206vw] text-[#1B1D21] w-[15vw] fullWidth:w-[240px] tablet:w-[20vw] mobile:w-[70vw] placeholder:text-[#808085]"
              />
            </div>

            <div className="flex flex-row gap-[0.5vw] flex-wrap fullWidth:gap-2">
              {selectedFilters.map((filter) => (
                <div
                  key={filter}
                  className="cursor-pointer font-['Archivo'] text-[0.972vw] leading-[1.25vw] fullWidth:text-[14px] fullWidth:leading-[18px] tablet:text-[1.367vw] tablet:leading-[1.758vw] mobile:text-[3.271vw] mobile:leading-[4.206vw] flex items-center w-auto h-[1.625vw] p-[0.25vw] border-2 border-[#7E5FDD] text-[#7E5FDD] rounded-[0.375vw] gap-[0.5vw] bg-[#F5F4F7] fullWidth:h-[26px] fullWidth:p-1 fullWidth:gap-2 fullWidth:rounded-[6px] tablet:h-[2.539vw] tablet:p-[0.391vw] tablet:gap-[0.781vw] tablet:rounded-[0.586vw] mobile:h-[5.417vw] mobile:p-[1.5vw] mobile:gap-[1.667vw] mobile:rounded-[1.25vw]"
                  onClick={() =>
                    setSelectedFilters(
                      selectedFilters.filter((f) => f !== filter)
                    )
                  }
                >
                  <img
                    src="/images/minusCircle.webp"
                    alt=""
                    className="h-[0.75vw] w-[0.75vw] cursor-pointer fullWidth:h-3 fullWidth:w-3 tablet:h-[1.172vw] tablet:w-[1.172vw] mobile:h-[2.5vw] mobile:w-[2.5vw]"
                  />{' '}
                  {capitalizeFirstLetter(filter)}{' '}
                  <div className="font-['Archivo'] font-semibold text-[0.694vw] leading-[0.833vw] fullWidth:text-[11px] fullWidth:leading-[13px] tablet:text-[0.977vw] tablet:leading-[1.172vw] mobile:text-[2.336vw] mobile:leading-[2.804vw] text-[#7E5FDD] bg-[#F5F4F7] flex items-center justify-center w-[1.25vw] h-[1.25vw] rounded-full fullWidth:w-5 fullWidth:h-5">
                    {countTagOccurrences(filter)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {blok.card_type === 'event' && (
          <div className="flex flex-row bg-[#F5F4F7] w-[81.5vw] p-[1.5vw_1vw] rounded-[1vw_1vw_0_0] gap-[37.938vw] fullWidth:w-[1304px] fullWidth:p-[24px_16px] fullWidth:rounded-[16px_16px_0_0] fullWidth:gap-[607px] tablet:w-[92.188vw] tablet:p-[2.344vw_1.563vw] tablet:rounded-[1.563vw_1.563vw_0_0] tablet:gap-[59.277vw] mobile:w-[89.167vw] mobile:p-[5vw_3.333vw] mobile:rounded-[3.333vw_3.333vw_0_0] mobile:gap-[126.458vw]">
            <div className="font-['Archivo_Bold'] text-[1.367vw] leading-[1.758vw] fullWidth:text-[14px] fullWidth:leading-[18px] tablet:text-[1.367vw] tablet:leading-[1.758vw] mobile:text-[3.271vw] mobile:leading-[4.206vw] font-bold">
              Events
            </div>
            <div className="font-['Archivo_Bold'] text-[1.367vw] leading-[1.758vw] fullWidth:text-[14px] fullWidth:leading-[18px] tablet:text-[1.367vw] tablet:leading-[1.758vw] mobile:text-[3.271vw] mobile:leading-[4.206vw] font-bold">
              Details
            </div>
          </div>
        )}

        <div
          className={`flex flex-row overflow-hidden gap-[0.625vw] w-[81.5vw] fullWidth:gap-[10px] fullWidth:w-[1304px] tablet:gap-[0.977vw] tablet:w-[92.188vw] mobile:gap-[2.083vw] mobile:w-[89.167vw] ${
            blok.card_type === 'event'
              ? 'p-0'
              : 'p-[0.313vw] fullWidth:p-[5px] tablet:p-[0.488vw] mobile:p-[1.042vw]'
          }`}
        >
          {filteredCards.length > 0 ? (
            mappedCards
          ) : (
            <div className="font-['Archivo'] text-[1.25vw] leading-[1.5vw] fullWidth:text-[20px] fullWidth:leading-[24px] tablet:text-[1.953vw] tablet:leading-[2.344vw] mobile:text-[4.673vw] mobile:leading-[5.607vw] text-[#808085] text-center w-full py-[3vw] fullWidth:py-[48px] tablet:py-[4.688vw] mobile:py-[10vw]">
              No results found. Try adjusting your search or filters.
            </div>
          )}
        </div>

        {filteredCards.length > 0 && (
          <div className="font-['Archivo'] text-[0.972vw] leading-[1.25vw] fullWidth:text-[14px] fullWidth:leading-[18px] tablet:text-[1.367vw] tablet:leading-[1.758vw] mobile:text-[3.271vw] mobile:leading-[4.206vw] flex flex-row items-center border border-[#EBECEC] rounded-[0.75vw] mt-[2vw] fullWidth:rounded-[12px] fullWidth:mt-[32px] tablet:rounded-[1.172vw] tablet:mt-[3.125vw] mobile:rounded-[2.5vw] mobile:mt-[6.667vw] [&>:last-child]:border-r-0">
            <div className="prev p-[0.75vw_1vw] cursor-pointer fullWidth:p-[12px_16px] tablet:p-[1.172vw_1.563vw] mobile:p-[2.5vw_3.333vw]">
              {previousText}
            </div>
            {mappedPages}
            <div className="next p-[0.75vw_1vw] cursor-pointer fullWidth:p-[12px_16px] tablet:p-[1.172vw_1.563vw] mobile:p-[2.5vw_3.333vw]">
              {nextText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginatedCards_tw;

