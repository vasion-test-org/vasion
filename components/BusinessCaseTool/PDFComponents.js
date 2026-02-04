import React from 'react';

import styled from 'styled-components';
import colors from 'styles/colors';
import media from 'styles/media';
import text from 'styles/text';

export const Text = styled.p`
  ${text.bodyLg};
  color: ${(props) => (props.white ? colors.white : colors.grey800)};
  margin-bottom: 1.389vw;

  ${media.fullWidth} {
    margin: 15px;
  }
`;

export const PurpleHeader = styled.h1`
  ${text.pdfH1};
  color: ${colors.primaryPurple};
  margin-bottom: 1.736vw;

  ${media.fullWidth} {
    margin-bottom: 25px;
  }
`;

export const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 129.167vw;
  padding: 11.111vw 12.569vw 0 12.569vw;

  ${media.fullWidth} {
    width: 1440px;
    height: 1860px;
    padding: 160px 181px 0 181px;
  }
`;

export const BodyHeadline = styled.div`
  ${text.pdfBodyHeadline};
  color: ${(props) => (props.white ? colors.white : colors.grey700)};
  margin: 1.736vw 0;

  ${media.fullWidth} {
    margin: 25px 0;
  }
`;

export const TableData = styled.td`
  ${text.bodyMdBold};
  border: 0.139vw solid ${colors.grey50};
`;

export const TableRow = styled.tr`
  color: ${colors.primaryPurple};
  height: 3.431vw;

  ${media.fullWidth} {
    height: 49px;
  }

  :nth-child(1) {
    text-align: left;
    background-color: ${colors.lightPurpleGrey};
    padding-left: 2.336vw;

    ${media.fullWidth} {
      padding-left: 10px;
    }
  }

  :nth-child(n + 2) {
    text-align: center;
    background-color: ${colors.white};
  }
`;
export const TableHeader = styled.th`
  ${text.bodyMdBold};
  text-align: center;
  border: 0.139vw solid ${colors.grey50};
`;
export const TableHeaderRow = styled.tr`
  color: ${colors.white};
  height: 4.575vw;

  ${media.fullWidth} {
    height: 66px;
  }

  :nth-child(1) {
    text-align: left;
    background-color: ${colors.primaryPurple};
    padding-left: 2.336vw;

    ${media.fullWidth} {
      padding-left: 10px;
    }
  }

  :nth-child(n + 2) {
    background-color: ${colors.lightPurple};
  }
`;

export const SplitTableHeaderRow = styled.tr`
  color: ${colors.white};
  background-color: ${colors.lightPurple};
  height: 4.575vw;

  ${media.fullWidth} {
    height: 66px;
  }
`;

export const TabTableHeader = styled.th`
  ${text.bodyMdBold};
  text-align: center;
  border-right: 0.139vw solid ${colors.white};
`;

export const TabTableHeaderRow = styled.tr`
  color: ${colors.grey500};
  height: 1.806vw;

  ${media.fullWidth} {
    height: 26px;
  }

  :nth-child(1) {
    background-color: ${colors.white};
  }

  :nth-child(2) {
    background-color: ${colors.grey50};
    border-radius: 2.57vw 0 0 0;

    ${media.fullWidth} {
      border-radius: 0 11px 0 0;
    }
  }
  :nth-child(3) {
    border-radius: 0;
    background-color: ${colors.grey50};
  }
  :nth-child(4) {
    background-color: ${colors.grey50};
    border-radius: 0 2.57vw 0 0;

    ${media.fullWidth} {
      border-radius: 0 11px 0 0;
    }
  }
`;
export const TabTable = styled.table`
  width: 75vw;
  margin-bottom: 4.167vw;

  ${media.fullWidth} {
    width: 1080px;
    margin-bottom: 60px;
  }
`;
export const Strong = styled.strong`
  ${text.bodyLgBold};
`;

export const Italic = styled.p`
  font-family: Archivo;
  font-style: italic;
  font-weight: 400;
  color: ${colors.grey800};
  font-size: 1.667vw;
  line-height: 2.5vw;
  margin-bottom: 4.167vw;

  ${media.fullWidth} {
    font-size: 24px;
    line-height: 36px;
    margin-bottom: 60px;
  }
`;

export const Link = styled.a`
  ${text.bodyLg};
  color: ${colors.primaryOrange};
`;
export const StatCopy = styled.p`
  ${text.bodyMdBold};
  text-align: center;
  width: 18vw;

  ${media.fullWidth} {
    width: 259px;
  }
`;
export const Stat = styled.h1`
  color: ${colors.primaryOrange};
  font-family: Orbitron;
  font-style: normal;
  font-weight: 400;
  font-size: 2.917vw;
  line-height: 2.917vw;

  ${media.fullWidth} {
    font-size: 42px;
    line-height: 42px;
  }
`;
export const StatDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.736vw;
  width: 22.059vw;
  height: 10.458vw;

  ${media.fullWidth} {
    gap: 25px;
    width: 318px;
    height: 151px;
  }
`;
export const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.471vw;
  height: 13.889vw;

  ${media.fullWidth} {
    gap: 21px;
    height: 200px;
  }
`;
export const StatHeader = styled.div`
  ${text.bodyMdBold};
  color: ${colors.primaryPurple};
  background-color: ${colors.grey50};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.167vw;

  ${media.fullWidth} {
    height: 60px;
  }
`;
export const StatTable = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 0.139vw solid ${colors.grey50};
  width: 74.861vw;
  border-radius: 1.307vw;
  margin: 2.083vw 0;

  ${media.fullWidth} {
    width: 1078px;
    border-radius: 19px;
    margin: 30px 0;
  }
`;

export const ListItem = styled.li`
  margin-bottom: 1.389vw;

  ${media.fullWidth} {
    margin-bottom: 20px;
  }
`;
export const List = styled.ul`
  ${text.bodyLg};
  list-style-type: disc;
  color: ${colors.grey800};
  padding-left: 3.472vw;
  margin: 2.083vw 0;
  width: 70.653vw;

  ${media.fullWidth} {
    padding-left: 50px;
    margin: 30px 0;
    width: 1017px;
  }

  ::marker {
    color: ${colors.primaryPurple};
  }
`;

export const OrderedList = styled.ol`
  ${text.bodyLg};
  padding-left: 4.389vw;

  ${media.fullWidth} {
    padding-left: 63px;
  }

  ::marker {
    ${text.bodyLgBold};
    color: ${colors.primaryOrange};
  }
`;
export const BoxedText = styled.div`
  ${text.bodyLg};
  background-color: ${colors.lightPurpleGrey};
  color: ${colors.grey800};
  padding: 3.472vw;
  border-radius: 1.307vw;
  width: 74.861vw;
  margin: 2.083vw 0;

  ${media.fullWidth} {
    padding: 50px;
    border-radius: 19px;
    width: 1078px;
    margin: 30px 0;
  }
`;
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const formatNumber = (number) => {
  return numberWithCommas(Math.trunc(number));
};

export const printServerCost = (currency) => {
  if (currency === '$') {
    return 2389;
  } else if (currency === '£') {
    return 1900;
  } else if (currency == '€') {
    return 2221;
  }
};

export const currencyConverter = (usdNumber, currency) => {
  if (currency === '$') {
    return formatNumber(usdNumber);
  } else if (currency === '£') {
    return formatNumber(usdNumber * 0.8);
  } else if (currency == '€') {
    return formatNumber(usdNumber * 0.92);
  }
};
