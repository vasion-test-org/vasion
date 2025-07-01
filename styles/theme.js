import { pxToVw } from "@/functions/functions";
import colors from "./colors";

export const defaultTheme = {
  customer_success: {
    bg: "#F5F4F7",
  },
  customer_logos: {
    card_bg: colors.lightPurpleGrey,
    bg: colors.white,
  },
  nav: {
    textColor: "#1B1D21",
    bg: "#F5F4F7",
    tab_hover: "#ece9ef",
  },
  bio: {
    textColor: "#ffffff",
    bg: "#3D2562",
  },
  customer_success: {
    bg: "#F5F4F7",
    stat_block_bg: "#ECE9EF",
  },
  hero: {
    textColor: "#1B1D21",
    bg: "#F5F4F7",
  },
  logo_cube: {
    textColor: "#ffffff",
    cardBg: "#3D2562",
  },
  side_by_side: {
    textColor: "#1B1D21",
    bg: "#ffffff",
  },
  cta: {
    textColor: "#ffffff",
    cardBg: "#3D2562",
  },
  centered: {
    textColor: "#1B1D21",
    background: "#FFFFFF",
  },
  testimonial: {
    textColor: "#1B1D21",
    bg: "#F5F4F7",
  },
  form: {
    textColor: "#1B1D21",
    formBg: "#ffffff",
    inputBg: "#F5F4F7",
    inputBorder: "#A8ABAE",
    buttonBg: "#ff5100",
    placeHolderColor: "#808085",
    selectPlaceHolderColor: "#1B1D21",
    errorColor: "#BA1A1A",
  },
  small_quote: {
    textColor: "#1B1D21",
    bg: "#F5F4F7",
  },
  infographic_pill: {
    bg: `#F5F4F7`,
  },
  comparison_table: {
    bg: "#3D2562",
    text_color: "#FFFFFF",
  },
  two_column_list: {
    bg: `#FFFFFF`,
    textColor: `#1B1D21`,
  },
};

export const darkTheme = {
  side_by_side: {
    textColor: "#ffffff",
    bg: "#3D2562",
  },
  customer_logos: {
    card_bg: colors.white,
    bg: colors.lightPurpleGradient,
  },
  hero: {
    textColor: "#ffffff",
    bg: "linear-gradient(180deg, #583F99 0%, #3D2562 100%)",
  },
  logo_cube: {
    textColor: "#ffffff",
    cardBg: "#190C30",
  },
  cta: {
    textColor: "#ffffff",
    cardBg: "linear-gradient(180deg, #190C30 -0.27%, #3D2562 126.67%)",
  },
  centered: {
    textColor: "#ffffff",
    bg: "#3D2562",
  },
  testimonial: {
    textColor: "#ffffff",
    bg: "linear-gradient(278deg, #803235 -1.77%, #190C30 32.97%, #3D2562 87.16%)",
  },
  form: {
    textColor: "#c1b8d7",
    formBg: "linear-gradient(180deg, #583F99 0%, #3D2562 100%)",
    inputBg: "#584282",
    inputBorder: "rgba(255, 255, 255, 0.30)",
    placeHolderColor: "rgba(255, 255, 255, 0.60)",
    selectPlaceHolderColor: "#FFFFFF",
    errorColor: "#ffb4ab",
  },
  infographic_pill: {
    bg: `#3D2562`,
    text_color: `#FFFFFF`,
  },
  comparison_table: {
    bg: "#3D2562",
    text_color: "#FFFFFF",
  },
  two_column_list: {
    bg: `#F5F4F7`,
    textColor: `#1B1D21`,
  },
};

export const lightTheme = {
  side_by_side: {
    textColor: "#1B1D21",
    bg: "#E5DFF8",
  },
  cta: {
    textColor: "#1B1D21",
    cardBg: "#F5F4F7",
  },
  logo_cube: {
    textColor: "#1B1D21",
    cardBg: "#F5F4F7",
  },
  comparison_table: {
    bg: "#F5F4F7",
    text_color: "#1B1D21",
  },
  two_coloumn_list: {
    bg: `#FFFFFF`,
  },
  centered: {
    bg: `#F5F4F7`,
    card_bg: `#FFFFFF`,
  },
};

export const buttonThemes = {
  nav: {
    textColor: "#ffffff",
    mainColor: "#ff5100",
    complimentaryColor: "#ffffff",
    textDecoration: "unset",
    borderRadius: "28px",
    padding: "8px 20px",
    border: "#ff5100",
    hoverBgColor: "#ffffff",
    hoverTextColor: "#ff5100",
  },
  primary: {
    textColor: "#ffffff",
    mainColor: "#ff5100",
    complimentaryColor: "#ffffff",
    textDecoration: "unset",
    borderRadius: "28px",
    padding: "12px 16px",
    border: "#ff5100",
    hoverBgColor: "#ffffff",
    hoverTextColor: "#ff5100",
  },
  secondary: {
    textColor: "#ff5100",
    mainColor: "#ffffff",
    complimentaryColor: "#ff5100",
    textDecoration: "unset",
    borderRadius: "28px",
    padding: "12px 16px",
    border: "#ff5100",
    hoverBgColor: "#ff5100",
    hoverTextColor: "#ffffff",
  },
  orange_link: {
    textColor: "#ff5100",
    mainColor: "unset",
    complimentaryColor: "#CC4800",
    textDecoration: "underline",
    borderRadius: "unset",
    padding: "0",
    border: "unset",
    hoverBgColor: "unset",
    hoverTextColor: "#CC4800",
  },
  grey_link: {
    textColor: "#808085",
    mainColor: "unset",
    complimentaryColor: "#808085",
    textDecoration: "underline",
    borderRadius: "unset",
    padding: "0",
    border: "unset",
    hoverBgColor: "unset",
    hoverTextColor: "#808085",
  },
  black_link: {
    textColor: "#1B1D21",
    mainColor: "unset",
    complimentaryColor: "#1B1D21",
    textDecoration: "underline",
    borderRadius: "unset",
    padding: "0",
    border: "unset",
    hoverBgColor: "unset",
    hoverTextColor: "#1B1D21",
  },
  white_link: {
    textColor: "#ffffff",
    mainColor: "unset",
    complimentaryColor: "#ffffff",
    textDecoration: "underline",
    borderRadius: "unset",
    padding: "0",
    border: "unset",
    hoverBgColor: "unset",
    hoverTextColor: "#ffffff",
  },
};
