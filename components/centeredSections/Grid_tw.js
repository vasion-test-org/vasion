"use client";
import React from "react";

import GridItem from "@/components/globalComponents/GridItem";

const Grid_tw = ({ gridData, alignment }) => {
  return (
    <div className="flex flex-row flex-wrap items-start justify-center w-[81.5vw] gap-[2.5vw] fullWidth:w-[1304px] fullWidth:gap-10 tablet:w-[92.188vw] tablet:gap-[1.953vw] mobile:w-[89.167vw] mobile:gap-[8.333vw]">
      {gridData.map((gridItem, index) => (
        <GridItem
          key={`grid-item-${index}`}
          content={gridItem}
          alignment={alignment}
        />
      ))}
    </div>
  );
};

export default Grid_tw;

