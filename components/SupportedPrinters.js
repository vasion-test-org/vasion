'use client';
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import media from 'styles/media';
import colors from 'styles/colors';
import text from 'styles/text';
import axios from 'axios';
import XSVG from 'assets/svg/Le-X.svg';
import DownSVG from 'assets/svg/ChevronDown.svg';
import RichTextRenderer from './renderers/RichTextRenderer';

const SupportedPrinters = ({ blok }) => {
  const [tableData, setTableData] = useState([]);
  const [searchData, setSearchData] = useState('');
  const initialData = {
    searchTerm: '',
    manuInput: '',
    platformInput: '',
    featureInput: '',
  };
  const [filteredData, setFilteredData] = useState(initialData);
  const [manuValue, setManuValue] = useState(blok.table_headers[0].copy);
  const [platformValue, setPlatformValue] = useState(
    blok.table_headers[4].copy
  );
  const [featureValue, setFeatureValue] = useState(blok.table_headers[5].copy);

  useEffect(() => {
    axios
      .get(
        'https://sheets.googleapis.com/v4/spreadsheets/1ukBB6L9pGGUfChH7BafNNExqbec75w0LBgHfMkyK1L8/values/A1:G10000?key=AIzaSyA3GpKJdlj4jxJsdHzDKxoDUr0z2lL1u8A'
      )
      .then((res) => {
        setTableData(res.data.values);
      });
  }, []);

  useEffect(() => {
    const initAlertAnimation = async () => {
      const { default: gsap } = await import('gsap');
      
      const tl = gsap.timeline({});

      const closeAlert = () => {
        tl.to('#alertBox', {
          opacity: 0,
          height: 0,
          padding: 0,
          margin: 0,
          duration: 0.75,
        }).to('#alertBox', {
          display: 'none',
        });
      };

      document.querySelector('#xsvg').addEventListener('click', closeAlert);
    };

    initAlertAnimation();
  }, []);

  useEffect(() => {
    const initDropdownAnimations = async () => {
      const { default: gsap } = await import('gsap');

      //manufacturer dropdown timeline
      const manuDropDownTL = gsap.timeline({ paused: true });
      manuDropDownTL
        .set('#manuOptions', {
          display: 'flex',
        })
        .to('#manuOptions', {
          height: 'auto',
          duration: 0.55,
        });

      //platform dropdown timeline
      const platformDropDownTL = gsap.timeline({ paused: true });
      platformDropDownTL
        .set('#platformOptions', {
          display: 'flex',
        })
        .to('#platformOptions', {
          height: 'auto',
          duration: 0.55,
        });

      //feature dropdown timeline
      const featureDropDownTL = gsap.timeline({ paused: true });
      featureDropDownTL
        .set('#featureOptions', {
          display: 'flex',
        })
        .to('#featureOptions', {
          height: 'auto',
          duration: 0.55,
        });

      const handleManuDrop = (e) => {
        manuDropDownTL.paused() || manuDropDownTL.reversed()
          ? manuDropDownTL.play()
          : manuDropDownTL.reverse();
        featureDropDownTL.reverse();
        platformDropDownTL.reverse();
      };

      const handlePlatformDrop = () => {
        platformDropDownTL.paused() || platformDropDownTL.reversed()
          ? platformDropDownTL.play()
          : platformDropDownTL.reverse();
        manuDropDownTL.reverse();
        featureDropDownTL.reverse();
      };

      const handleFeatureDrop = () => {
        featureDropDownTL.paused() || featureDropDownTL.reversed()
          ? featureDropDownTL.play()
          : featureDropDownTL.reverse();
        manuDropDownTL.reverse();
        platformDropDownTL.reverse();
      };

      document
        .querySelector('#manuDropdown')
        .addEventListener('click', handleManuDrop);
      document
        .querySelector('#platformDropdown')
        .addEventListener('click', handlePlatformDrop);
      document
        .querySelector('#featureDropdown')
        .addEventListener('click', handleFeatureDrop);
    };

    initDropdownAnimations();
  }, []);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchData(e.target.value);
  };

  const handleManufacturerChange = (e) => {
    e.preventDefault();
    setFilteredData({ ...filteredData, manuInput: e.target.innerText });
    setManuValue(e.target.innerText);
  };

  const handlePlatformChange = (e) => {
    e.preventDefault();
    setFilteredData({ ...filteredData, platformInput: e.target.innerText });
    setPlatformValue(e.target.innerText);
  };

  const handleFeatureChange = (e) => {
    e.preventDefault();
    setFilteredData({ ...filteredData, featureInput: e.target.innerText });
    setFeatureValue(e.target.innerText);
  };

  const manuList = [
    'Canon',
    'Fuji Xerox',
    'HP',
    'Konica Minolta',
    'Lexmark',
    'Ricoh',
    'Sharp',
    'Toshiba',
    'Xerox',
    'Kyocera',
    'Fujifilm',
    'Epson',
  ];

  const platformList = ['Saas', 'VA', 'Web stack'];

  const featuresList = ['CPA 1', 'CPA 2', 'Off-Network Cloud Printing'];

  const manufacturers = manuList.map((value) => (
    <Option onClick={handleManufacturerChange}>{value}</Option>
  ));

  const platformVersions = platformList.map((value) => (
    <Option onClick={handlePlatformChange}>{value}</Option>
  ));
  const features = featuresList.map((value) => (
    <Option onClick={handleFeatureChange}>{value}</Option>
  ));

  const resetFilters = () => {
    setFilteredData(initialData);
    setSearchData('');
    setManuValue(blok.table_headers[0].copy);
    setPlatformValue(blok.table_headers[4].copy);
    setFeatureValue(blok.table_headers[5].copy);
  };

  const filteredTableData = tableData.slice(1).filter((entry) => {
    const manufacturerMatch = entry[0]
      .toLowerCase()
      .includes(filteredData.manuInput.toLowerCase());
    const platformVersionMatch = entry[4]
      .toLowerCase()
      .includes(filteredData.platformInput.toLowerCase());
    const featureMatch = entry[5]
      .toLowerCase()
      .includes(filteredData.featureInput.toLowerCase());
    const searchTermMatch = entry[2]
      .toLowerCase()
      .includes(searchData.toLowerCase());

    return (
      manufacturerMatch &&
      platformVersionMatch &&
      searchTermMatch &&
      featureMatch
    );
  });

  const tableRows = filteredTableData.map((dataPoint) => {
    return (
      <TableBodyRow>
        <TableData>{dataPoint[0]}</TableData>
        <TableData>{dataPoint[1]}</TableData>
        <TableData>{dataPoint[2]}</TableData>
        <TableData>{dataPoint[3]}</TableData>
        <TableData>{dataPoint[4]}</TableData>
        <TableData>{dataPoint[5]}</TableData>
      </TableBodyRow>
    );
  });

  return (
    <Wrapper>
      <SearchDiv>
        <SearchHeader>{blok.search_header}</SearchHeader>
        <Search
          placeholder={blok.search_placeholder}
          type='text'
          onChange={handleSearchChange}
          value={searchData}
        />
      </SearchDiv>

      <FilterDiv>
        <Filters>
          <Manufacturer id='manuDropdown'>
            {manuValue}
            <DownArrow />
            <OptionsContainer id='manuOptions'>
              {manufacturers}
            </OptionsContainer>
          </Manufacturer>

          <PlatformVersion id='platformDropdown'>
            {platformValue}
            <DownArrow />
            <OptionsContainer id='platformOptions'>
              {platformVersions}
            </OptionsContainer>
          </PlatformVersion>

          <Feature id='featureDropdown'>
            {featureValue}
            <DownArrow />
            <OptionsContainer id='featureOptions'>{features}</OptionsContainer>
          </Feature>
        </Filters>
        <ClearFilter onClick={resetFilters}>
          {blok.clear_button_text}
        </ClearFilter>
      </FilterDiv>

      <AlertBox id='alertBox'>
        <X id='xsvg' />
        <AlertHeader>{blok.notice_header}</AlertHeader>
        <AlertBody>
          <RichTextRenderer document={blok.notice} />
        </AlertBody>
      </AlertBox>

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope='col'>{blok.table_headers[0].copy}</TableHead>
              <TableHead scope='col'>{blok.table_headers[1].copy}</TableHead>
              <TableHead scope='col'>{blok.table_headers[2].copy}</TableHead>
              <TableHead scope='col'>{blok.table_headers[3].copy}</TableHead>
              <TableHead scope='col'>{blok.table_headers[4].copy}</TableHead>
              <TableHead scope='col'>{blok.table_headers[5].copy}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody id='tableBody'>{tableRows}</TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

const TableContainer = styled.div`
  overflow: hidden;
  border-radius: 0.556vw 0.556vw 0 0;
  margin-bottom: 5.556vw;
  width: 79vw;

  ${media.fullWidth} {
    border-radius: 8px 8px 0 0;
    margin-bottom: 80px;
    width: 1138px;
  }

  ${media.tablet} {
    border-radius: 0.781vw 0.781vw 0 0;
    margin-bottom: 7.813vw;
    width: 92.188vw;
  }

  ${media.mobile} {
    border-radius: unset;
    margin-bottom: 9.346vw;
    width: 100%;
    height: 150.486vw;
  }
`;
const TableData = styled.td`
  ${text.bodyMd};
  display: flex;
  flex: 1;
  border: unset;
  padding: 1.389vw 0 1.389vw 1.667vw !important;

  ${media.fullWidth} {
    padding: 20px 0 20px 24px !important;
  }

  ${media.tablet} {
    padding: 1.953vw 0 1.953vw 2.344vw !important;
  }

  ${media.mobile} {
    ${text.bodySm};
    min-width: 28.374vw;
    padding: 7.477vw 2.336vw 7.477vw 2.336vw !important;
  }
`;
const TableBodyRow = styled.tr`
  display: flex;
  width: 100%;
  background-color: ${colors.white};
  color: ${colors.black};

  &:hover {
    background-color: ${colors.lightPurpleGrey};
  }

  ${media.mobile} {
    flex-direction: column;

    :nth-child(6) {
      padding: 7.477vw 2.336vw 7.477vw 2.336vw !important;
    }

    :nth-child(7) {
      padding: 1.477vw 2.336vw 7.477vw 2.336vw !important;
    }
  }
`;
const TableBody = styled.tbody`
  display: block;
  width: 100%;
  height: 27.917vw;
  overflow-y: scroll;

  ${media.fullWidth} {
    height: 402px;
  }

  ${media.tablet} {
    height: 43.945vw;
  }

  ${media.mobile} {
    display: flex;
    flex-direction: row;
    overflow-y: unset;
    overflow-x: scroll;
    width: 100vw;
    height: 155.486vw;
  }
`;
const TableRow = styled.tr`
  display: flex;
  width: 100%;

  ${media.mobile} {
    flex-direction: column;
  }
`;
const TableHead = styled.th`
  ${text.bodyMd};
  display: flex;
  flex: 1;
  color: ${colors.white};
  padding: 2.222vw 0 2.222vw 1.389vw !important;

  ${media.fullWidth} {
    padding: 32px 0 32px 20px !important;
  }

  ${media.tablet} {
    padding: 3.125vw 0 3.125vw 1.953vw !important;
  }

  ${media.mobile} {
    ${text.bodySmBold};
    padding: 7.477vw 2.336vw 7.477vw 2.336vw !important;
  }
`;
const TableHeader = styled.thead`
  display: flex; /* Change to display: flex */
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  background: ${colors.darkPurpleGradient};

  ${media.mobile} {
    width: 32.944vw;
  }
`;
const Table = styled.table`
  width: 100%;
  height: 27.917vw;

  ${media.fullWidth} {
    height: 402px;
  }

  ${media.tablet} {
    height: 51.172vw;
  }

  ${media.mobile} {
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 150.486vw;
  }
`;
const SupportLink = styled.a`
  ${text.bodyMd};
`;
const AlertBody = styled.div`
  ${text.bodyMd};
  width: 69.444vw;

  ${media.fullWidth} {
    width: 1000px;
  }

  ${media.tablet} {
    width: 78.125vw;
  }

  ${media.mobile} {
    width: 72.897vw;
  }
`;
const AlertHeader = styled.p`
  ${text.bodyLgBold};
`;
const X = styled(XSVG)`
  position: absolute;
  cursor: pointer;
  width: 0.884vw;
  height: 0.884vw;
  top: 1vw;
  left: 77.3vw;

  ${media.fullWidth} {
    width: 13px;
    height: 13px;
    top: 14px;
    left: 1113px;
  }

  ${media.tablet} {
    width: 1.27vw;
    height: 1.27vw;
    top: 1.367vw;
    left: 88.691vw;
  }

  ${media.mobile} {
    width: 3.037vw;
    height: 3.037vw;
    top: 3.271vw;
    left: 79.691vw;
  }

  &:hover {
    path {
      stroke: ${colors.primaryOrange};
    }
  }
`;
const AlertBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${colors.lightPurpleGradient};
  width: 79.444vw;
  border-radius: 0.972vw;
  gap: 1.667vw;
  padding: 2.778vw 7.222vw 2.778vw 2.778vw;
  margin-bottom: 1.667vw;

  ${media.fullWidth} {
    width: 1144px;
    border-radius: 14px;
    gap: 24px;
    padding: 40px 104px 40px 40px;
    margin-bottom: 24px;
  }

  ${media.tablet} {
    width: 92.188vw;
    border-radius: 1.367vw;
    gap: 2.344vw;
    padding: 3.906vw 10.156vw 3.906vw 3.906vw;
    margin-bottom: 2.344vw;
  }

  ${media.mobile} {
    width: 87.85vw;
    border-radius: 3.271vw;
    gap: 5.607vw;
    padding: 9.346vw 9.346vw 9.346vw 5.607vw;
    margin-bottom: 5.607vw;
  }
`;
const ClearFilter = styled.button`
  ${text.bodyMdBold};
  background-color: ${colors.primaryOrange};
  color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.917vw;
  padding: 0.694vw 2.083vw;
  border-radius: 1.944vw;
  margin-left: auto;

  ${media.fullWidth} {
    height: 42px;
    padding: 10px 30px;
    border-radius: 28px;
  }

  ${media.tablet} {
    height: 4.102vw;
    padding: 0.977vw 2.93vw;
    border-radius: 2.734vw;
  }

  ${media.mobile} {
    ${text.XSBold};
    // position: absolute;
    // top: 194vw;
    // left: 53vw;
    height: 9.346vw;
    padding: 2.336vw 4.673vw;
    border-radius: 4.673vw;
  }

  &:hover {
    background-color: ${colors.white};
    color: ${colors.primaryOrange};
    border: 0.069vw solid ${colors.primaryOrange};
  }
`;

const DownArrow = styled(DownSVG)`
  width: 0.694vw;
  height: 0.694vw;
  margin-left: auto;

  ${media.fullWidth} {
    width: 10px;
    height: 10px;
  }

  ${media.tablet} {
    width: 0.977vw;
    height: 0.977vw;
  }

  ${media.mobile} {
    width: 2.336vw;
    height: 2.336vw;
  }
`;

const Option = styled.div`
  width: 100%;
  height: 4.167vw;
  padding: 1.389vw;

  ${media.fullWidth} {
    height: 60px;
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

const OptionsContainer = styled.div`
  position: absolute;
  display: none;
  flex-direction: column;
  background-color: ${colors.lightPurpleGrey};
  overflow: hidden;
  width: max-content;
  min-width: 100%;
  z-index: 10;
  height: 0;
  border-radius: 0.556vw;
  top: 4vw;
  left: 0vw;

  ${media.fullWidth} {
    border-radius: 8px;
    top: 58px;
  }

  ${media.tablet} {
    border-radius: 0.781vw;
    top: 5.664vw;
  }

  ${media.mobile} {
    border-radius: 1.869vw;
    top: 13.551vw;
  }
`;
const Feature = styled.div`
  ${text.bodyMd};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: ${colors.lightPurpleGrey};
  border: unset;
  height: auto;
  width: auto;
  min-width: 18vw;
  border-radius: 0.972vw;
  padding: 1.667vw;
  gap: 2.778vw;

  ${media.fullWidth} {
    min-width: 259px;
    border-radius: 14px;
    padding: 24px;
    gap: 40px;
  }

  ${media.tablet} {
    min-width: 15.625vw;
    border-radius: 1.367vw;
    padding: 2.344vw;
    gap: 3.906vw;
  }

  ${media.mobile} {
    min-width: 30.841vw;
    border-radius: 1.869vw;
    padding: 4.673vw;
    gap: 4.673vw;
  }
`;
const PlatformVersion = styled.div`
  ${text.bodyMd};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: ${colors.lightPurpleGrey};
  border: unset;
  height: auto;
  width: auto;
  min-width: 15.139vw;
  border-radius: 0.972vw;
  padding: 1.667vw;
  gap: 2.778vw;

  ${media.fullWidth} {
    min-width: 218px;
    border-radius: 14px;
    padding: 24px;
    gap: 40px;
  }

  ${media.tablet} {
    min-width: 19.434vw;
    border-radius: 1.367vw;
    padding: 2.344vw;
    gap: 3.906vw;
  }

  ${media.mobile} {
    min-width: 39.953vw;
    border-radius: 1.869vw;
    padding: 4.673vw;
    gap: 4.673vw;
  }
`;
const Manufacturer = styled.div`
  ${text.bodyMd};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.lightPurpleGrey};
  border: unset;
  height: auto;
  min-width: 17.222vw;
  border-radius: 0.972vw;
  padding: 1.667vw;
  gap: 2.778vw;

  ${media.fullWidth} {
    min-width: 248px;
    border-radius: 14px;
    padding: 24px;
    gap: 40px;
  }

  ${media.tablet} {
    min-width: 20.02vw;
    border-radius: 1.367vw;
    padding: 2.344vw;
    gap: 3.906vw;
  }

  ${media.mobile} {
    min-width: 41.355vw;
    border-radius: 1.869vw;
    padding: 4.673vw;
    gap: 4.673vw;
  }
`;
const Filters = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.667vw;

  ${media.fullWidth} {
    gap: 24px;
  }

  ${media.tablet} {
    gap: 2.344vw;
  }

  ${media.mobile} {
    flex-wrap: wrap;
    gap: 2.607vw;
  }
`;
const FilterDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  padding: 2.778vw 10.278vw 1.667vw 10.278vw;

  ${media.fullWidth} {
    width: 1440px;
    padding: 40px 148px 24px 148px;
  }

  ${media.tablet} {
    padding: 3.906vw 3.453vw 2.344vw 3.453vw;
  }

  ${media.mobile} {
    flex-wrap: wrap;
    align-items: unset;
    padding: 7.009vw 7.009vw 5.607vw 6.075vw;
  }
`;
const SearchHeader = styled.h3`
  ${text.h3};
`;
const Search = styled.input`
  padding: 1.667vw 2.917vw;
  width: 30.278vw;
  height: 4.444vw;
  border-radius: 3.889vw;
  border: 0.139vw solid ${colors.primaryOrange};

  ${media.fullWidth} {
    padding: 24px 42px;
    width: 436px;
    height: 64px;
    border-radius: 56px;
    border: 2px solid ${colors.primaryOrange};
  }

  ${media.tablet} {
    padding: 2.344vw 4.102vw;
    width: 42.578vw;
    height: 6.25vw;
    border-radius: 5.469vw;
    border: 0.195vw solid ${colors.primaryOrange};
  }

  ${media.mobile} {
    padding: 4.673vw 9.813vw;
    width: 79.439vw;
    height: 12.15vw;
    border-radius: 13.084vw;
    border: 0.234vw solid ${colors.primaryOrange};
  }
`;

const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.667vw;

  ${media.fullWidth} {
    gap: 24px;
  }

  ${media.tablet} {
    gap: 2.344vw;
  }

  ${media.mobile} {
    gap: 5.607vw;
  }
`;
const IntroBody = styled.p`
  ${text.bodyMd};
  text-align: center;
  width: 63.333vw;

  ${media.fullWidth} {
    width: 912px;
  }

  ${media.tablet} {
    width: 80.469vw;
  }

  ${media.mobile} {
    width: 87.85vw;
  }
`;
const Header = styled.h2`
  ${text.h2};

  ${media.mobile} {
    ${text.h2};
  }
`;
const IntroDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.667vw;
  margin: 5.556vw 0 4.167vw 0;

  ${media.fullWidth} {
    gap: 24px;
    margin: 80px 0 60px 0;
  }

  ${media.tablet} {
    gap: 3.906vw;
    margin: 7.813vw 0 3.906vw 0;
  }

  ${media.mobile} {
    gap: 9.346vw;
    margin: 18.692vw 0 9.346vw 0;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default SupportedPrinters;
