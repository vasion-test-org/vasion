import { pxToVw } from '@/functions/functions';

import colors from './colors';

export const defaultTheme = {
  bio: {
    bg: '#3D2562',
    textColor: '#ffffff',
  },
  centered: {
    background: '#FFFFFF',
    textColor: '#1B1D21',
  },
  comparison_table: {
    bg: '#3D2562',
    text_color: '#FFFFFF',
  },
  cta: {
    cardBg: '#3D2562',
    textColor: '#ffffff',
  },
  customer_logos: {
    bg: colors.white,
    card_bg: colors.lightPurpleGrey,
  },
  customer_success: {
    bg: '#F5F4F7',
  },
  customer_success: {
    bg: '#F5F4F7',
    stat_block_bg: '#ECE9EF',
  },
  form: {
    buttonBg: '#ff5100',
    errorColor: '#BA1A1A',
    formBg: '#ffffff',
    inputBg: '#F5F4F7',
    inputBorder: '#A8ABAE',
    placeHolderColor: '#808085',
    selectPlaceHolderColor: '#1B1D21',
    textColor: '#1B1D21',
  },
  hero: {
    bg: '#F5F4F7',
    textColor: '#1B1D21',
  },
  infographic_pill: {
    bg: `#F5F4F7`,
  },
  logo_banner: {
    bg: `${colors.navyBlue}`,
  },
  logo_cube: {
    cardBg: '#3D2562',
    textColor: '#ffffff',
  },
  nav: {
    bg: '#F5F4F7',
    tab_hover: '#ece9ef',
    textColor: '#1B1D21',
  },
  side_by_side: {
    bg: '#ffffff',
    textColor: '#1B1D21',
  },
  small_quote: {
    bg: '#F5F4F7',
    textColor: '#1B1D21',
  },
  testimonial: {
    bg: '#F5F4F7',
    textColor: '#1B1D21',
  },
  two_column_list: {
    bg: `#FFFFFF`,
    textColor: `#1B1D21`,
  },
};

export const darkTheme = {
  centered: {
    bg: 'linear-gradient(180deg, #190C30 -0.27%, #3D2562 126.67%)',
    textColor: '#ffffff',
  },
  comparison_table: {
    bg: '#3D2562',
    text_color: '#FFFFFF',
  },
  cta: {
    cardBg: 'linear-gradient(180deg, #190C30 -0.27%, #3D2562 126.67%)',
    textColor: '#ffffff',
  },
  customer_logos: {
    bg: colors.lightPurpleGradient,
    card_bg: colors.white,
  },
  form: {
    errorColor: '#ffb4ab',
    formBg: 'linear-gradient(180deg, #583F99 0%, #3D2562 100%)',
    inputBg: '#584282',
    inputBorder: 'rgba(255, 255, 255, 0.30)',
    placeHolderColor: 'rgba(255, 255, 255, 0.60)',
    selectPlaceHolderColor: '#FFFFFF',
    textColor: '#c1b8d7',
  },
  hero: {
    bg: 'linear-gradient(180deg, #583F99 0%, #3D2562 100%)',
    textColor: '#ffffff',
  },
  infographic_pill: {
    bg: `#3D2562`,
    text_color: `#FFFFFF`,
  },
  logo_banner: {
    bg: `${colors.navyBlue}`,
  },
  logo_cube: {
    cardBg: '#190C30',
    textColor: '#ffffff',
  },
  side_by_side: {
    bg: '#3D2562',
    textColor: '#ffffff',
  },
  testimonial: {
    bg: 'linear-gradient(278deg, #803235 -1.77%, #190C30 32.97%, #3D2562 87.16%)',
    textColor: '#ffffff',
  },
  two_column_list: {
    bg: `#F5F4F7`,
    textColor: `#1B1D21`,
  },
};

export const lightTheme = {
  centered: {
    bg: `#F5F4F7`,
    card_bg: `#FFFFFF`,
  },
  comparison_table: {
    bg: '#F5F4F7',
    text_color: '#1B1D21',
  },
  cta: {
    cardBg: '#F5F4F7',
    textColor: '#1B1D21',
  },
  logo_banner: {
    bg: `#FFFFFF`,
  },
  logo_cube: {
    cardBg: '#F5F4F7',
    textColor: '#1B1D21',
  },
  side_by_side: {
    bg: '#E5DFF8',
    textColor: '#1B1D21',
  },
  two_coloumn_list: {
    bg: `#FFFFFF`,
  },
};

export const buttonThemes = {
  black_link: {
    border: 'unset',
    borderRadius: 'unset',
    complimentaryColor: '#1B1D21',
    hoverBgColor: 'unset',
    hoverTextColor: '#1B1D21',
    mainColor: 'unset',
    padding: '0',
    textColor: '#1B1D21',
    textDecoration: 'underline',
  },
  grey_link: {
    border: 'unset',
    borderRadius: 'unset',
    complimentaryColor: '#808085',
    hoverBgColor: 'unset',
    hoverTextColor: '#808085',
    mainColor: 'unset',
    padding: '0',
    textColor: '#808085',
    textDecoration: 'underline',
  },
  nav: {
    border: '#ff5100',
    borderRadius: '28px',
    complimentaryColor: '#ffffff',
    hoverBgColor: '#ffffff',
    hoverTextColor: '#ff5100',
    mainColor: '#ff5100',
    padding: '8px 20px',
    textColor: '#ffffff',
    textDecoration: 'unset',
  },
  orange_link: {
    border: 'unset',
    borderRadius: 'unset',
    complimentaryColor: '#CC4800',
    hoverBgColor: 'unset',
    hoverTextColor: '#CC4800',
    mainColor: 'unset',
    padding: '0',
    textColor: '#ff5100',
    textDecoration: 'underline',
  },
  primary: {
    border: '#ff5100',
    borderRadius: '28px',
    complimentaryColor: '#ffffff',
    hoverBgColor: '#ffffff',
    hoverTextColor: '#ff5100',
    mainColor: '#ff5100',
    padding: '12px 16px',
    textColor: '#ffffff',
    textDecoration: 'unset',
  },
  secondary: {
    border: '#ff5100',
    borderRadius: '28px',
    complimentaryColor: '#ff5100',
    hoverBgColor: '#ff5100',
    hoverTextColor: '#ffffff',
    mainColor: '#ffffff',
    padding: '12px 16px',
    textColor: '#ff5100',
    textDecoration: 'unset',
  },
  white_link: {
    border: 'unset',
    borderRadius: 'unset',
    complimentaryColor: '#ffffff',
    hoverBgColor: 'unset',
    hoverTextColor: '#ffffff',
    mainColor: 'unset',
    padding: '0',
    textColor: '#ffffff',
    textDecoration: 'underline',
  },
};
