import React from "react";

import styled from "styled-components";
import media from "styles/media";
// import colors from "styles/colors";
// import text from "styles/text";

const LogosGallery = ({ logoData }) => {
  console.log(logoData)
  
  const allLogos = logoData.map((logo) => {
    if (logo?.logoLink !== null) {
      return (
        <LogoLink key={logo?.link.cached_url} href={`/${logo?.link.cached_url}`}>
          <Logo alt={logo?.logo?.alt} src={logo?.logo?.filename} />
        </LogoLink>
      );
    } else {
      return <Logo key={logo?.logo?.filename}  alt={logo?.logo?.alt}  src={logo?.logo?.filename} />;
    }
  });

  return (
    <Wrapper>

      <IconWrapper>{allLogos}</IconWrapper>
    </Wrapper>
  )
};

const LogoLink = styled.a`
  &&:hover {
    scale: 1.05;
    transition-duration: 300ms;
  }
`;
const Logo = styled.img`
  width: 24.167vw;
  height: 13.611vw;

  ${media.fullWidth} {
    width: 348px;
    height: 196px;
  }

  ${media.tablet} {
    width: 33.984vw;
    height: 19.141vw;
  }

  ${media.mobile} {
    width: 81.308vw;
    height: 45.794vw;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 81.5vw;
  gap: 2.917vw;

  ${media.fullWidth} {
    width: 1304px;
    gap: 42px;
  }

  ${media.tablet} {
    gap: 3.711vw;
    justify-content: center;
  }

  ${media.mobile} {
    gap: 3.738vw;
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
export default LogosGallery;
