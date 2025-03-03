import { pxToVw } from "@/functions/functions";
import colors from "./colors";

export const defaultTheme = {
  hero: {
    textColor: "#1B1D21",
    bg: "#F5F4F7",
  },
  logoCube: {
    textColor: "#ffffff",
    cardBg: "#3D2562",
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
    inputBg: "#584282",
    inputBorder: "#ffffff",
    buttonBg:  "#ff5100",
  }
};

export const darkTheme = {
  hero: {
    textColor: "#ffffff",
    bg: "linear-gradient(180deg, #583F99 0%, #3D2562 100%)",
  },
  logoCube: {
    textColor: "#ffffff",
    cardBg: "#3D2562",
  },
  cta: {
    textColor: "#ffffff",
    cardBg: "linear-gradient(180deg, #190C30 -0.27%, #3D2562 126.67%)",
  },
  centered: {
    textColor: "#ffffff",
    background: "#1B1D21",
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
  }
};

export const buttonThemes = {
  primary: {
    textColor: "#ffffff",
    mainColor: "#ff5100",
    complimentaryColor: "#ffffff",
    textDecoration: "unset",
    borderRadius: '28px',
    padding: '12px 16px',
    border: '#ff5100',
    hoverBgColor: "#ffffff",
    hoverTextColor: "#ff5100"
  },
  secondary: {
    textColor: "#ff5100",
    mainColor: "#ffffff",
    complimentaryColor: "#ff5100",
    textDecoration: "unset",
    borderRadius: '28px',
    padding: '12px 16px',
    border: '#ff5100',
    hoverBgColor: "#ff5100",
    hoverTextColor: "#ffffff"
  },
  orange_link: {
    textColor: "#ff5100",
    mainColor: "#ffffff",
    complimentaryColor: "#CC4800",
    textDecoration: "underline",
    borderRadius: 'unset',
    padding: '0',
    border: 'unset',
    hoverBgColor: 'unset',
     hoverTextColor: "#CC4800"
  },
  grey_link: {
    textColor: "#808085",
    mainColor: "#ffffff",
    complimentaryColor: "#808085",
    textDecoration: "underline",
    borderRadius: 'unset',
    padding: '0',
    border: 'unset',
    hoverBgColor: 'unset',
     hoverTextColor: "#808085"
  },
  black_link: {
    textColor: "#1B1D21",
    mainColor: "#ffffff",
    complimentaryColor: "#1B1D21",
    textDecoration: "underline",
    borderRadius: 'unset',
    padding: '0',
    border: 'unset',
    hoverBgColor: 'unset',
     hoverTextColor: "#1B1D21"
  },
  white_link: {
    textColor: "#ffffff",
    mainColor: "#ffffff",
    complimentaryColor: "#ffffff",
    textDecoration: "underline",
    borderRadius: 'unset',
    padding: '0',
    border: 'unset',
    hoverBgColor: 'unset',
     hoverTextColor: "#ffffff"
  },
};

