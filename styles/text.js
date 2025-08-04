import media from '@/styles/media';

const text = {
  pdfH1: `
  font-family: Archivo;
  font-size: 3.333vw;
  font-style: normal;
  font-weight: 700;
  line-height: 3.889vw; 

${media.fullWidth} {
  font-size: 48px;
  line-height: 56px; 
}
`,
  pdfH3: `
  font-family: Archivo;
  font-style: normal;
  font-weight: 700;
  font-size: 2.083vw;
  line-height: 2.5vw;

${media.fullWidth} {
  font-size: 30px;
  line-height: 36px;
}
`,
  pdfBodyHeadline: `
font-family: Archivo;
font-style: normal;
font-weight: 400;
font-size: 2.222vw;
line-height: 2.778vw;

${media.fullWidth} {
font-size: 32px;
line-height: 40px;
}
`,
  giant: `
  font-family: Archivo;
  font-style: normal;
  font-size: 6.944vw;
  font-weight: 700;
  line-height: 7.639vw;

  ${media.fullWidth} {
    font-size: 100px;
    font-weight: 700;
    line-height: 110px;
  }
  
  ${media.tablet} {
    font-size: 9.766vw;
    font-weight: 700;
    line-height: 10.742vw;
  }
  `,
  stat: `
  font-family: 'Orbitron Regular';
    font-style: normal;
    font-weight: 500;

  ${media.fullWidth} {
    font-size: 48px;
    line-height: 58px;
  }

  ${media.desktop} {
    font-size: 3.333vw;
    line-height: 4.028vw;
  }

  ${media.tablet} {
    font-size: 4.688vw;
    line-height: 5.664vw;
  }

  ${media.mobile} {
    font-size: 7.477vw;
    line-height: 9.346vw;
  }
  `,
  h1: `
 font-family: 'Archivo';
  font-style: normal;
  font-weight: 800;

  ${media.fullWidth} {
    font-size: 46px;
    line-height: 56px;
  }
  
  ${media.desktop} {
   font-size: 3.194vw;
    line-height: 3.889vw;
  }

  ${media.tablet} {
    font-size: 4.492vw;
    line-height: 5.469vw;
  }

  ${media.mobile} {
    font-size: 7.477vw;
    line-height: 9.346vw;
  }
    `,
  h2: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 700;

    ${media.fullWidth} {
      font-size: 46px;
      line-height: 56px;
    }
    
    ${media.desktop} {
     font-size: 3.194vw;
      line-height: 3.889vw;
    }

    ${media.tablet} {
      font-size: 4.492vw;
      line-height: 5.469vw;
    }

    ${media.mobile} {
      font-size: 7.477vw;
      line-height: 9.346vw;
    }
    `,
  h3: `
  font-family: 'Archivo Bold';
  font-style: normal;
  font-weight: 700;

    ${media.fullWidth} {
      font-size: 32px;
      line-height: 40px;
    }
    
    ${media.desktop} {
      font-size: 2.222vw;
      line-height: 2.778vw;
    }

    ${media.tablet} {
      font-size: 3.125vw;
      line-height: 3.906vw;
    }

    ${media.mobile} {
      font-size: 6.075vw;
      line-height: 7.477vw;
    }
    `,
  h4: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 700;

    ${media.fullWidth} {
      font-size: 26px;
      line-height: 32px;
    }
    
    ${media.desktop} {
       font-size: 1.806vw;
      line-height: 2.222vw;
    }

    ${media.tablet} {
        font-size: 2.539vw;
      line-height: 3.125vw;
    }

    ${media.mobile} {
      font-size: 4.673vw;
      line-height: 5.607vw;
    }
  `,
  h5: `
  font-family: 'Archivo';
  font-style: bold;
  font-weight: 700;

    ${media.fullWidth} {
      font-size: 20px;
      line-height: 24px;
    }
    
    ${media.desktop} {
         font-size: 1.389vw;
      line-height: 1.667vw;
    }

    ${media.tablet} {
       font-size: 1.953vw;
      line-height: 2.344vw;
    }

    ${media.mobile} {
      font-size: 4.673vw;
      line-height: 5.607vw;
    }
  `,
  m1: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 400;
  text-transform: uppercase;

    ${media.fullWidth} {
      font-size: 15px;
      line-height: 16px;
    }
    
    ${media.desktop} {
      font-size: 1.042vw;
      line-height: 1.111vw;
    }

    ${media.tablet} {
      font-size: 15px;
      line-height: 16px;
    }

    ${media.mobile} {
      font-size: 3.505vw;
      line-height: 3.738vw;
    }
    `,
  m2: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 500;
  text-transform: capitalize;

    ${media.fullWidth} {
      font-size: 18px;
      line-height: 20px;
    }
    
    ${media.desktop} {
      font-size: 1.25vw;
      line-height: 1.389vw;
    }

    ${media.tablet} {
      font-size: 1.758vw;
      line-height: 1.953vw;
    }

    ${media.mobile} {
      font-size: 4.206vw;
      line-height: 4.673vw;
    }
    `,
  m3: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 500;

    ${media.fullWidth} {
      font-size: 16px;
      line-height: 21px;
    }
    
    ${media.desktop} {
      font-size: 1.111vw;
      line-height: 1.458vw;
    }

    ${media.tablet} {
      font-size: 1.563vw;
      line-height: 2.051vw;
    }

    ${media.mobile} {
      font-size: 3.738vw;
      line-height: 4.907vw;
    }
    `,
  //body_bold will be new type
  buttonL: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;

      ${media.fullWidth} {
        font-size: 16px;
        line-height: 17px;
      }

      ${media.desktop} {
        font-size: 1.111vw;
        line-height: 1.181vw;
      }

      ${media.tablet} {
        font-size: 1.563vw;
        line-height: 1.66vw;
      }
      
      ${media.mobile} {
        font-size: 3.738vw;
        line-height: 3.972vw;
      }
    `,
  bodyXl: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 400;

    ${media.fullWidth} {
      font-size: 23px;
      line-height: 30px;
    }
    
    ${media.desktop} {
      font-size: 1.597vw;
      line-height: 2.083vw;
    }

    ${media.tablet} {
     font-size: 2.246vw;
      line-height: 2.93vw;
    }

    ${media.mobile} {
      font-size: 5.374vw;
      line-height: 7.009vw;
    }
  `,
  bodyXLBold: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 700;

    ${media.fullWidth} {
      font-size: 23px;
      line-height: 28px;
    }
    
    ${media.desktop} {
       font-size: 1.597vw;
      line-height: 1.944vw;
    }

    ${media.tablet} {
        font-size: 2.246vw;
      line-height: 2.734vw;
    }

    ${media.mobile} {
       font-size: 5.374vw;
      line-height: 6.542vw;
    }
    `,
  bodyLg: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 400;

    ${media.fullWidth} {
      font-size: 18px;
      line-height: 24px;
    }
    
    ${media.desktop} {
       font-size: 1.25vw;
      line-height: 1.667vw;
    }

    ${media.tablet} {
      font-size: 1.758vw;
      line-height: 2.344vw;
    }

    ${media.mobile} {
      font-size: 4.206vw;
      line-height: 5.14vw;
    }
    `,
  bodyLgBold: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 700;

    ${media.fullWidth} {
      font-size: 18px;
      line-height: 22px;
    }
    
    ${media.desktop} {
     font-size: 1.25vw;
      line-height: 1.528vw;
    }

    ${media.tablet} {
     font-size: 1.758vw;
      line-height: 2.148vw;
    }

    ${media.mobile} {
      font-size: 4.206vw;
      line-height: 5.14vw;
    }
    `,
  bodyMd: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 400;

    ${media.fullWidth} {
      font-size: 16px;
      line-height: 22px;
    }
    
    ${media.desktop} {
      font-size: 1.111vw;
      line-height: 1.528vw;
    }

    ${media.tablet} {
     font-size: 1.563vw;
      line-height: 2.148vw;
    }

    ${media.mobile} {
       font-size: 3.333vw;
      line-height: 5.14vw;
    }
    `,
  bodyMdBold: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 600;

    ${media.fullWidth} {
      font-size: 16px;
      line-height: 22px;
    }
    
    ${media.desktop} {
     font-size: 1vw;
      line-height: 1.375vw;
    }

    ${media.tablet} {
      font-size: 1.563vw;
      line-height: 2.148vw;
    }

    ${media.mobile} {
      font-size: 3.738vw;
      line-height: 5.14vw;
    }
    `,
  bodySm: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 400;

    ${media.fullWidth} {
      font-size: 14px !important;
      line-height: 18px !important;
    }
    
    ${media.desktop} {
     font-size: 0.972vw !important;
      line-height: 1.25vw !important;
    }

    ${media.tablet} {
       font-size: 1.367vw !important;
      line-height: 1.758vw !important;
    }

    ${media.mobile} {
      font-size: 3.271vw !important;
      line-height: 4.206vw !important;
    }
    `,
  bodySmBold: `
  font-family: 'Archivo Bold';
  font-style: normal;
  font-weight: 700;

    ${media.fullWidth} {
      font-size: 14px;
      line-height: 18px;
    }
    
    ${media.desktop} {
       font-size: 0.972vw;
      line-height: 1.25vw;
    }

    ${media.tablet} {
       font-size: 1.367vw;
      line-height: 1.758vw;
    }

    ${media.mobile} {
      font-size: 3.271vw;
      line-height: 4.206vw;
    }
    `,
  eyebrow: `
  font-family: 'Archivo';
  text-transform: uppercase;
  font-weight: 700;

      ${media.fullWidth} {
        font-size: 14px;
        line-height: 18px;
         letter-spacing: 2.8px;
      }

      ${media.desktop} {
        font-size: 0.972vw;
        line-height: 1.25vw;
       letter-spacing: 0.188vw;
      }
      
      ${media.tablet} {
        font-size: 1.367vw;
        line-height: 1.758vw;
      letter-spacing: 0.293vw;
      }
      
      ${media.mobile} {
        font-size: 2.804vw;
        line-height: 4.206vw;
        letter-spacing: 0.701vw;
      }
    `,
  tag: `
    font-family: 'Archivo';
    font-weight: 400;
   
        ${media.fullWidth} {
         font-size: 10px;
        line-height: 12px;
        }
  
        ${media.desktop} {
           font-size: 0.694vw;
        line-height: 0.833vw;
        }
        
        ${media.tablet} {
          font-size: 0.977vw;
        line-height: 1.172vw;
        }
        
        ${media.mobile} {
          font-size: 2.336vw;
        line-height: 2.804vw;
        }
      `,
  tagBold: `
      font-family: 'Archivo';
      font-weight: 600;
     
          ${media.fullWidth} {
           font-size: 11px;
          line-height: 14px;
          }
    
          ${media.desktop} {
              font-size: 0.764vw;
          line-height: 0.972vw;
          }
          
          ${media.tablet} {
            font-size: 1.074vw;
          line-height: 1.172vw;
          }
          
          ${media.mobile} {
            font-size: 2.57vw;
          line-height: 2.804vw;
          }
        `,
  subtle: `
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 400;
    font-size:  14px;
    line-height: 18px;
 ${media.fullWidth} {
    font-size:  14px;
    line-height: 18px;
          }
    
          ${media.desktop} {
             font-size:  14px;
             line-height: 18px;
          }
          
          ${media.tablet} {
            font-size:  1.367vw;
            line-height: 1.758vw;
          }
          
          ${media.mobile} {
            font-size:  2.917vw;
            line-height: 3.75vw;
          }
`,
  tagLight: `
      font-family: 'Archivo';
      font-weight: 300;
     
            ${media.fullWidth} {
         font-size: 10px;
        line-height: 12px;
        }
  
        ${media.desktop} {
           font-size: 0.694vw;
        line-height: 0.833vw;
        }
        
        ${media.tablet} {
          font-size: 0.977vw;
        line-height: 1.172vw;
        }
        
        ${media.mobile} {
          font-size: 2.336vw;
        line-height: 2.804vw;
        }
        `,
  transparentText: `
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  background-size: 100%;
  background-clip: text;
`,
  strokeText: `
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  background-size: 100%;
  background-clip: text;
  -webkit-text-stroke-width: 0.07vw;
`,
  strokeTextTransparent: `
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  background-size: 100%;
  background-clip: text;
  -webkit-text-stroke-width: 0.07vw;
`,
};
export default text;
