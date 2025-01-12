export const mobile = 480;
export const tablet = 1024;
export const desktop = 1600;

const media = {
  apple: "@supports (-webkit-touch-callout: none)",
  mobile: `@media screen and (max-width: ${mobile}px)`,
  tablet: `@media screen and (min-width: ${
    mobile + 1
  }px) and (max-width: ${tablet}px)`,
  tabletWide: `@media screen and (min-width: ${
    mobile + 1
  }px) and (max-width: ${tablet}px) and (orientation: landscape)`,
  desktop: `@media screen and (min-width: ${
    tablet + 1
  }px) and (max-width: ${desktop}px)`,
  fullWidth: `@media screen and (min-width: ${desktop + 1}px)`,
  hover: "@media (hover: hover) ",
  noHover: "@media (hover: none) ",
  tabletPortrait: `@media screen and (min-width: ${
    mobile + 1
  }px) and (max-width: ${tablet}px) and (orientation: portrait)`,
  gsap: {
    mobile: `(max-width: ${mobile}px)`,
    tablet: `(min-width: ${mobile + 1}px) and (max-width: ${tablet}px)`,
    tabletWide: `(min-width: ${
      mobile + 1
    }px) and (max-width: ${tablet}px) and (orientation: landscape)`,
    desktop: `(min-width: ${tablet + 1}px) and (max-width: ${desktop}px)`,
    fullWidth: `(min-width: ${desktop + 1}px)`,
  },
};

export default media;