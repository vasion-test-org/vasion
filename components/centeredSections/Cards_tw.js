"use client";

import React from "react";

import Card from "@/components/globalComponents/Card";

const Cards_tw = ({ cardData }) => {
  return (
    <div className="flex flex-row flex-wrap items-stretch justify-center gap-[2.5vw] w-[95.125vw] fullWidth:gap-10 fullWidth:w-[1522px] tablet:gap-[2.344vw] tablet:w-[92.188vw] mobile:gap-[5vw] mobile:w-[89.167vw]">
      {cardData.map((card, index) => (
        <Card key={`card-${index}`} content={card} />
      ))}
    </div>
  );
};

export default Cards_tw;

