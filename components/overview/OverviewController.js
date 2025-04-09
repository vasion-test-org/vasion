"use client";
import React from "react";
import SmallQuote from "../SmallQuote";
import OverviewStats from "./variations/OverviewStats";
import OverviewCombined from "./variations/OverviewCombined";
import { storyblokEditable } from "@storyblok/react";

const OverviewController = ({ blok }) => {
  // console.log("Block Content", blok);
  const component = blok.component_type;

  switch (component) {
    case "small_quote":
      return <SmallQuote blok={blok?.small_quote[0]} />;

    case "stats":
      const statsData = blok?.stats?.length > 0 ? blok.stats[0] : null;
      return <OverviewStats blok={statsData} />;

    case "combined":
      const quoteData =
        blok?.small_quote?.length > 0 ? blok.small_quote[0] : null;
      const combinedStatsData = blok?.stats?.length > 0 ? blok.stats[0] : null;

      const link = {
        link_text: blok.link_text,
        link_url: blok.link_url,
      };
      return (
        <OverviewCombined
          {...storyblokEditable(blok)}
          blok={{
            quote: quoteData,
            stats: combinedStatsData,
            link: link,
            spacing_offset: blok.spacing_offset,
            section_spacing: blok.section_spacing,
          }}
        />
      );

    default:
      return null;
  }
};

export default OverviewController;
