import React from "react";
import styled from "styled-components";
import SmallQuote from "../SmallQuote";
import OverviewStats from "./variations/OverviewStats";
import Combined from "./variations/OverviewCombined";

const OverviewController = ({ blok }) => {
  const component = blok.component_type;

  switch (component) {
    case "small_quote":
      return <SmallQuote content={content?.overviewQuote} />;
    case "overview_stats":
      return <OverviewStats content={content?.overviewStats} />;
    case "overview_combined":
      return (
        <Combined
          content={{
            quote: content?.overviewQuote,
            stats: content?.overviewStats,
          }}
        />
      );
  }
};

export default OverviewController;
