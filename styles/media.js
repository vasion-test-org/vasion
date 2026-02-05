export const mobile = 480;
export const tablet = 1024;
export const desktop = 1600;

const media = {
  apple: '@supports (-webkit-touch-callout: none)',
  desktop: `@media screen and (min-width: ${tablet + 1}px) and (max-width: ${desktop}px)`,
  fullWidth: `@media screen and (min-width: ${desktop + 1}px)`,
  gsap: {
    desktop: `(min-width: ${tablet + 1}px) and (max-width: ${desktop}px)`,
    fullWidth: `(min-width: ${desktop + 1}px)`,
    mobile: `(max-width: ${mobile}px)`,
    tablet: `(min-width: ${mobile + 1}px) and (max-width: ${tablet}px)`,
    tabletWide: `(min-width: ${
      mobile + 1
    }px) and (max-width: ${tablet}px) and (orientation: landscape)`,
  },
  hover: '@media (hover: hover) ',
  mobile: `@media screen and (max-width: ${mobile}px)`,
  noHover: '@media (hover: none) ',
  tablet: `@media screen and (min-width: ${mobile + 1}px) and (max-width: ${tablet}px)`,
  tabletPortrait: `@media screen and (min-width: ${
    mobile + 1
  }px) and (max-width: ${tablet}px) and (orientation: portrait)`,
  tabletWide: `@media screen and (min-width: ${
    mobile + 1
  }px) and (max-width: ${tablet}px) and (orientation: landscape)`,
};

export default media;
