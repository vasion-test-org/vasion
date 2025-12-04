"use client";
import React from "react";

import StatItem from "@/components/globalComponents/StatItem";
import colors from "styles/colors";

const Stats_tw = ({ statsData, toggle_card_style, alignment }) => {
  return (
    <div
      className="relative flex flex-row flex-wrap items-start justify-center w-[81.5vw] gap-[3.75vw] py-[1.625vw] px-[6vw] rounded-[1.25vw] fullWidth:w-[1304px] fullWidth:gap-[60px] fullWidth:py-[26px] fullWidth:px-24 fullWidth:rounded-[20px] tablet:w-[92.188vw] tablet:gap-[5.859vw] tablet:rounded-[1.953vw] tablet:py-[2.539vw] tablet:px-[9.375vw] mobile:w-[89.167vw] mobile:gap-[8.333vw] mobile:rounded-[4.167vw] mobile:py-[5.417vw] mobile:px-[11.25vw]"
      style={{
        background: toggle_card_style ? colors.lightPurpleGrey : "unset",
      }}
    >
      {statsData.map((statItem, index) => (
        <StatItem
          key={`stat-item-${index}`}
          statItem={statItem}
          alignment={alignment}
        />
      ))}
    </div>
  );
};

export default Stats_tw;

