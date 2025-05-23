"use client";
import React from "react";
import styled, { ThemeProvider } from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import { useAvailableThemes } from "@/context/ThemeContext";
import { storyblokEditable } from "@storyblok/react/rsc";

const ComparisonTable = ({ blok }) => {
  console.log(blok);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const imagesrc =
    blok.theme == "default" || blok.theme == "light"
      ? "/images/check_circle.webp"
      : "/images/check-circle-orange.webp";
  const tableData = blok?.table_data;
  const headers = tableData?.thead || [];
  const rows = tableData?.tbody || [];

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper
        spacing={blok.section_spacing}
        spacingOffset={blok.offset_spacing}
      >
        <TableContainer>
          <StyledTable>
            <TableHead>
              <tr>
                {headers.map((header) => (
                  <TableHeader
                    key={header._uid}
                    center={header.value !== "Solution"}
                  >
                    {header.value}
                  </TableHeader>
                ))}
              </tr>
            </TableHead>
            <tbody>
              {rows.map((row, index) => (
                <TableRow key={row._uid} bg={index % 2}>
                  {row.body.map((cell, cellIndex) => {
                    // First column is the solution name
                    if (cellIndex === 0) {
                      return (
                        <SolutionName key={`${row._uid}-${cellIndex}`}>
                          {cell.value}
                        </SolutionName>
                      );
                    }

                    return (
                      <TableCell key={`${row._uid}-${cellIndex}`} center>
                        {cell.value && cell.value.toLowerCase() === "true" && (
                          <CheckMark src={imagesrc} alt={"checkmark"} />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      </Wrapper>
    </ThemeProvider>
  );
};

export default ComparisonTable;

const TableContainer = styled.div`
  background: white;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: 0 auto;
  border-radius: 0.5vw;

  ${media.fullWidth} {
    border-radius: 8px;
  }
  ${media.tablet} {
    border-radius: 0.781vw;
  }
  ${media.mobile} {
    border-radius: 1.667vw;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  height: 3.375vw;
  background: ${(props) =>
    props.theme?.comparison_table?.bg || `${colors.primaryPurple}`};
  color: $white;
  color: ${(props) => props.theme?.comparison_table?.text_color};

  padding: 1vw !important;
  ${media.fullWidth} {
    padding: 16px !important;
  }
  ${media.tablet} {
    padding: 1.563vw !important;
  }
  ${media.mobile} {
    padding: 4.167vw !important;
    ${text.bodyMd};
  }
`;

const TableHeader = styled.th`
  padding: 1vw !important;
  text-align: ${(props) => (props.center ? "center" : "left")};
  font-weight: 600;

  ${media.fullWidth} {
    padding: 16px !important;
  }
  ${media.tablet} {
    padding: 1.563vw !important;
  }
  ${media.mobile} {
    padding: 4.167vw !important;
    text-align: left;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;
  background: ${(props) => (props.bg ? `${colors?.lightPurpleGrey}` : "unset")};
  &:hover {
    background-color: #f8f8fc;
  }
`;

const TableCell = styled.td`
  padding: 1vw !important;
  text-align: ${(props) => (props.center ? "center" : "left")};
  border-right: 0.083vw solid ${colors.grey100};
  &:last-child {
    border-right: none;
  }
  ${media.fullWidth} {
    padding: 16px !important;
    border-right: 1px solid ${colors.grey100};
  }
  ${media.tablet} {
    padding: 1.563vw !important;
    border-right: 0.098vw solid ${colors.grey100};
  }
  ${media.mobile} {
    padding: 4.167vw !important;
    border-right: 0.208vw solid ${colors.grey100};
  }
`;

const SolutionName = styled(TableCell)`
  ${text.bodyMdBold};
`;

const CheckMark = styled.img`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5vw;
  height: 1.5vw;
  border-radius: 50%;
  color: white;
  font-size: 16px;

  ${media.fullWidth} {
    width: 24px;
    height: 24px;
  }
  ${media.tablet} {
    width: 2.93vw;
    height: 2.93vw;
  }
  ${media.mobile} {
    width: 5vw;
    height: 5vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  justify-self: center;

  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  width: 81.5vw;
  padding: ${(props) => {
    if (props.spacingOffset === "top") {
      return props.spacing === "default"
        ? "3.75vw 0 0"
        : props.spacing
          ? `${props.spacing}px 0 0`
          : "3.75vw 0 0";
    }
    if (props.spacingOffset === "bottom") {
      return props.spacing === "default"
        ? "0 0 3.75vw"
        : props.spacing
          ? `0 0 ${props.spacing}px`
          : "0 0 3.75vw";
    }
    return props.spacing === "default"
      ? "3.75vw 0"
      : props.spacing
        ? `${props.spacing}px 0`
        : "3.75vw 0";
  }};

  ${media.fullWidth} {
    width: 1304px;
    padding: ${(props) => {
      if (props.spacingOffset === "top") {
        return props.spacing === "default"
          ? "60px 0 0"
          : props.spacing
            ? `${props.spacing}px 0 0`
            : "60px 0 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 0 60px"
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : "0 0 60px";
      }
      return props.spacing === "default"
        ? "60px 0"
        : props.spacing
          ? `${props.spacing}px 0`
          : "60px 0";
    }};
  }
  ${media.tablet} {
    width: 92.188vw;
    padding: ${(props) => {
      if (props.spacingOffset === "top") {
        return props.spacing === "default"
          ? "5.859vw 0 0"
          : props.spacing
            ? `${props.spacing}px 0 0`
            : "5.859vw 0 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 0 5.859vw"
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : "0 0 5.859vw";
      }
      return props.spacing === "default"
        ? "5.859vw 0"
        : props.spacing
          ? `${props.spacing}px 0`
          : "5.859vw 0";
    }};
  }
  ${media.mobile} {
    width: 92.467vw;
    padding: ${(props) => {
      if (props.spacingOffset === "top") {
        return props.spacing === "default"
          ? "12.5vw 0 0"
          : props.spacing
            ? `${props.spacing}px 0 0`
            : "12.5vw 0 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 0 12.5vw"
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : "0 0 12.5vw";
      }
      return props.spacing === "default"
        ? "12.5vw 0"
        : props.spacing
          ? `${props.spacing}px 0`
          : "12.5vw 0";
    }};
  }
`;
