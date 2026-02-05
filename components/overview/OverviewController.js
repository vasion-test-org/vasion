'use client';
import React from 'react';

import { storyblokEditable } from '@storyblok/react';

import SmallQuote from '../SmallQuote';
import OverviewCombined from './variations/OverviewCombined';
import OverviewStats from './variations/OverviewStats';

const OverviewController = ({ blok }) => {
  // console.log("Block Content", blok);
  const component = blok.component_type;

  switch (component) {
    case 'combined':
      const quoteData = blok?.small_quote?.length > 0 ? blok.small_quote[0] : null;
      const combinedStatsData = blok?.stats?.length > 0 ? blok.stats[0] : null;

      const link = {
        link_text: blok.link_text,
        link_url: blok.link_url,
      };
      return (
        <OverviewCombined
          {...storyblokEditable(blok)}
          blok={{
            link: link,
            quote: quoteData,
            section_spacing: blok.section_spacing,
            spacing_offset: blok.spacing_offset,
            stats: combinedStatsData,
          }}
        />
      );

    case 'small_quote':
      return <SmallQuote blok={blok?.small_quote[0]} />;

    case 'stats':
      const statsData = blok?.stats?.length > 0 ? blok.stats[0] : null;
      return <OverviewStats blok={statsData} />;

    default:
      return null;
  }
};

export default OverviewController;
