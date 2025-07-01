"use client";
import React, { useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import DemoPrint from "assets/svg/demoprint.svg";
import AI from "assets/svg/ai.svg";
import Tune from "assets/svg/tune.svg";
import DemoStar from "assets/svg/demostar.svg";

import Form from "@/components/Form";
import colors from "@/styles/colors";
import media from "@/styles/media";
import text from "@/styles/text";
import gsap from "gsap";
import { ScreenContext } from "@/components/providers/Screen";
import { storyblokEditable } from "@storyblok/react/rsc";
import Chevron from "assets/svg/WhiteChevron.svg";
import getMedia from "@/functions/getMedia";
import RichTextRenderer from "./renderers/RichTextRenderer";
import Icons from "@/components/renderers/Icons";
import ComponentRenderer from "./renderers/ComponentRenderer";
import TestForm from "./TestForm";

const Demo = ({ blok }) => {
  const { mobile } = useContext(ScreenContext);
  const optionRefs = useRef([]);
  const arrowRefs = useRef([]);
  const contentRefs = useRef([]);
  const iconRefs = useRef([]);
  const handlersRef = useRef([]);
  const prevIndex = useRef(0);
  const demoExperienceRef = useRef("");
  const copycomponents = [
    "body_copy",
    "header",
    "eyebrow",
    "long_form_text",
    "copy_block",
    "overview_controller",
    "small_quote",
  ];
  // useEffect(() => {
  //   const tl = gsap.timeline({});
  //   gsap.set(optionRefs.current[0], { height: "auto" });
  //   gsap.set(arrowRefs.current[0], { rotate: 180 });
  //   gsap.set(contentRefs.current[0], { opacity: 1 });
  //   gsap.set(iconRefs.current[0], { filter: "grayscale(90%) brightness(2)" });

  //   const handleClick = (index) => {
  //     if (prevIndex.current === index) {
  //       tl.to(".content", {
  //         duration: 0.1,
  //         opacity: 0,
  //       })
  //         .to(".options", {
  //           height: getMedia("64px", "4vw", "6.25vw", "18.953vw"),
  //           duration: 0.25,
  //         })
  //         .to(".arrows", {
  //           rotate: 0,
  //           duration: 0.25,
  //         });
  //     } else {
  //       tl.to(".content", {
  //         duration: 0.1,
  //         opacity: 0,
  //       })
  //         .to(".options", {
  //           height: getMedia("64px", "4vw", "6.25vw", "18.953vw"),
  //           duration: 0.35,
  //         })
  //         .to(
  //           ".icons",
  //           { duration: 0.1, filter: "brightness(1) grayscale(0%)" },
  //           "start",
  //         )
  //         .to(".arrows", {
  //           rotate: 0,
  //           duration: 0.1,
  //         })
  //         .to(
  //           iconRefs.current[index],
  //           { duration: 0.1, filter: "grayscale(90%) brightness(2)" },
  //           "start",
  //         )
  //         .to(optionRefs.current[index], {
  //           height: "auto",
  //           duration: 0.35,
  //         })
  //         .to(
  //           contentRefs.current[index],
  //           {
  //             opacity: 1,
  //             duration: 0.25,
  //           },
  //           "-=.1",
  //         )
  //         .to(
  //           arrowRefs.current[index],
  //           {
  //             rotate: 180,
  //             duration: 0.15,
  //           },
  //           "-=.5",
  //         );
  //     }

  //     prevIndex.current = index;
  //   };

  //   optionRefs.current.forEach((option, index) => {
  //     handlersRef.current[index] = () => handleClick(index);
  //     if (option) {
  //       option.addEventListener("click", handlersRef.current[index]);
  //     }
  //   });

  //   return () => {
  //     optionRefs.current.forEach((option, index) => {
  //       if (option) {
  //         option.removeEventListener("click", handlersRef.current[index]);
  //       }
  //     });
  //   };
  // }, []);

  // useEffect(() => {
  //   const checkFormLoad = () => {
  //     const demoExperienceElement = document.querySelector(
  //       "#formFriendlyProductofInterest",
  //     );
  //     const tl = gsap.timeline({});

  //     if (demoExperienceElement) {
  //       const handleChange = (event) => {
  //         demoExperienceRef.current = event.target.value;

  //         if (demoExperienceRef.current === "Vasion Print") {
  //           tl.to(".content", {
  //             duration: 0.25,
  //             opacity: 0,
  //           })
  //             .to(".options", {
  //               height: getMedia("64px", "4vw", "6.25vw", "14.953vw"),
  //               duration: 0.25,
  //             })
  //             .to(".arrows", {
  //               rotate: 0,
  //               duration: 0.25,
  //             })
  //             .to(
  //               ".icons",
  //               { duration: 0.15, filter: "brightness(1) grayscale(0%)" },
  //               "start",
  //             )
  //             .to(
  //               iconRefs.current[0],
  //               { duration: 0.15, filter: "grayscale(90%) brightness(2)" },
  //               "start",
  //             )
  //             .to(optionRefs.current[0], {
  //               height: "auto",
  //             })
  //             .to(
  //               contentRefs.current[0],
  //               {
  //                 opacity: 1,
  //                 duration: 0.35,
  //               },
  //               "-=.5",
  //             )
  //             .to(
  //               arrowRefs.current[0],
  //               {
  //                 rotate: 180,
  //                 duration: 0.25,
  //               },
  //               "-=.5",
  //             );
  //         } else if (demoExperienceRef.current === "Vasion Output") {
  //           tl.to(".content", {
  //             duration: 0.25,
  //             opacity: 0,
  //           })
  //             .to(".options", {
  //               height: getMedia("64px", "4vw", "6.25vw", "14.953vw"),
  //               duration: 0.25,
  //             })
  //             .to(".arrows", {
  //               rotate: 0,
  //               duration: 0.25,
  //             })
  //             .to(
  //               ".icons",
  //               { duration: 0.15, filter: "brightness(1) grayscale(0%)" },
  //               "start",
  //             )
  //             .to(
  //               iconRefs.current[1],
  //               { duration: 0.15, filter: "grayscale(90%) brightness(2)" },
  //               "start",
  //             )
  //             .to(optionRefs.current[1], {
  //               height: "auto",
  //             })
  //             .to(
  //               contentRefs.current[1],
  //               {
  //                 opacity: 1,
  //                 duration: 0.35,
  //               },
  //               "-=.5",
  //             )
  //             .to(
  //               arrowRefs.current[1],
  //               {
  //                 rotate: 180,
  //                 duration: 0.25,
  //               },
  //               "-=.5",
  //             );
  //         } else if (demoExperienceRef.current === "Vasion Automate") {
  //           tl.to(".content", {
  //             duration: 0.25,
  //             opacity: 0,
  //           })
  //             .to(".options", {
  //               height: getMedia("64px", "4vw", "6.25vw", "14.953vw"),
  //               duration: 0.25,
  //             })
  //             .to(".arrows", {
  //               rotate: 0,
  //               duration: 0.25,
  //             })
  //             .to(
  //               ".icons",
  //               { duration: 0.15, filter: "brightness(1) grayscale(0%)" },
  //               "start",
  //             )
  //             .to(
  //               iconRefs.current[2],
  //               { duration: 0.15, filter: "grayscale(90%) brightness(2)" },
  //               "start",
  //             )
  //             .to(optionRefs.current[2], {
  //               height: "auto",
  //             })
  //             .to(
  //               contentRefs.current[2],
  //               {
  //                 opacity: 1,
  //                 duration: 0.35,
  //               },
  //               "-=.5",
  //             )
  //             .to(
  //               arrowRefs.current[2],
  //               {
  //                 rotate: 180,
  //                 duration: 0.25,
  //               },
  //               "-=.5",
  //             );
  //         } else if (
  //           demoExperienceRef.current === "Vasion Automation Platform"
  //         ) {
  //           tl.to(".content", {
  //             duration: 0.25,
  //             opacity: 0,
  //           })
  //             .to(".options", {
  //               height: getMedia("64px", "4vw", "6.25vw", "14.953vw"),
  //               duration: 0.25,
  //             })
  //             .to(".arrows", {
  //               rotate: 0,
  //               duration: 0.25,
  //             })
  //             .to(
  //               ".icons",
  //               { duration: 0.15, filter: "brightness(1) grayscale(0%)" },
  //               "start",
  //             )
  //             .to(
  //               iconRefs.current[3],
  //               { duration: 0.15, filter: "grayscale(90%) brightness(2)" },
  //               "start",
  //             )
  //             .to(optionRefs.current[3], {
  //               height: "auto",
  //             })
  //             .to(
  //               contentRefs.current[3],
  //               {
  //                 opacity: 1,
  //                 duration: 0.35,
  //               },
  //               "-=.5",
  //             )
  //             .to(
  //               arrowRefs.current[3],
  //               {
  //                 rotate: 180,
  //                 duration: 0.25,
  //               },
  //               "-=.5",
  //             );
  //         }
  //       };
  //       demoExperienceElement.addEventListener("change", handleChange);

  //       clearInterval(intervalId);

  //       return () => {
  //         demoExperienceElement.removeEventListener("change", handleChange);
  //       };
  //     }
  //   };

  //   const intervalId = setInterval(checkFormLoad, 100);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  const mappedBadges = blok.badges.map((badge) => (
    <Badge key={badge.filename} src={badge.filename} />
  ));

  const mappedOptions = blok.cards.map((option, index) => {
    const formattedIconString = option.icon.replace(/\s+/g, "");

    let IconComponent = Icons[formattedIconString] || null;
    // console.log(option);
    return (
      <div {...storyblokEditable(option)}>
        <OptionDiv
          className="options preformContent"
          ref={(el) => (optionRefs.current[index] = el)}
          key={option.header}
        >
            {IconComponent && (
              <OptionIconWrapper classname="icons">
                {IconComponent && <IconComponent />}
              </OptionIconWrapper>
            )}
          <OptionContentContainer
            className="content"
            ref={(el) => (contentRefs.current[index] = el)}
            >
          <OptionHeader>
            {option.header}
          </OptionHeader>
            <OptionSubheader>{option.sub_header}</OptionSubheader>
            <div {...storyblokEditable(option)}>
              <RichTextRenderer document={option.body_copy} />
            </div>
          </OptionContentContainer>
        </OptionDiv>
      </div>
    );
  });

  return (
    <BackgroundWrapper>
      <Wrapper>
        <Content className="preformContent">
          {!mobile && <Header>{blok.header}</Header>}
          <AllOptionsContainer>{mappedOptions}</AllOptionsContainer>
          {mobile && <BadgesContainer>{mappedBadges}</BadgesContainer>}
        </Content>

        {blok.demo_form[0].component === "form" && (
          <FormPositionContainer id="formPos">
            <Form blok={blok.demo_form[0]} />
          </FormPositionContainer>
        )}
        {blok.demo_form[0].component === "test_form" && (
          <FormPositionContainer id="formPos">
            <TestForm blok={blok.demo_form[0]} />
          </FormPositionContainer>
        )}
        
        {mobile && <Header>{blok.header}</Header>}
        {blok.demo_form[0].component === "demo_thank_you" && (
          <FormThankYouContainer>
            {blok.demo_form[0]?.copy?.map((item, index) => (
              <div key={index} {...storyblokEditable(item)}>
                {copycomponents.includes(item.component) ? (
                  <RichTextRenderer document={item.copy} blok={item} />
                ) : (
                  <ComponentRenderer blok={item} />
                )}
              </div>
            ))}
          </FormThankYouContainer>
        )}
      </Wrapper>
      <ZoomLegalStatement>{blok.legal_text}</ZoomLegalStatement>
    </BackgroundWrapper>
  );
};

const FormThankYouContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.875vw;
  background: ${colors.white};
  color: ${colors.black};
  border-radius: 2vw;
  padding: 2vw;
  width: 35.25vw;
  height: 80vh;
  box-shadow:
    0vw 0vw 0.125vw 0vw rgba(25, 29, 30, 0.04),
    0vw 0.25vw 0.5vw 0vw rgba(25, 29, 30, 0.16);

  ${media.fullWidth} {
    border-radius: 32px;
    padding: 32px;
    width: 564px;
    box-shadow:
      0px 0px 2px 0px rgba(25, 29, 30, 0.04),
      0px 4px 8px 0px rgba(25, 29, 30, 0.16);
  }

  ${media.tablet} {
    border-radius: 3.125vw;
    padding: 3.125vw;
    width: 45.313vw;
    box-shadow:
      0vw 0vw 0.195vw 0vw rgba(25, 29, 30, 0.04),
      0vw 0.391vw 0.781vw 0vw rgba(25, 29, 30, 0.16);
  }

  ${media.mobile} {
    border-radius: 6.667vw;
    padding: 6.667vw;
    width: 89.167vw;
    box-shadow:
      0vw 0vw 0.417vw 0vw rgba(25, 29, 30, 0.04),
      0vw 0.833vw 1.667vw 0vw rgba(25, 29, 30, 0.16);
  }
`;

const OptionIconWrapper = styled.div`
    width: 2.375vw;
    height: 2.375vw;

    ${media.fullWidth} {
      width: 38px;
      height: 38px;
    }

    ${media.tablet} {
      width: 3.711vw;
      height: 3.711vw;
    }

    ${media.mobile} {
      width: 7.917vw;
      height: 7.917vw;
    }
`;
const OptionIcon = styled.img`
  filter: brightness(1) grayscale(0%);
`;
const ArrowDiv = styled.div`
  width: 1.25vw;
  height: 1.25vw;
  margin-left: auto;

  ${media.fullWidth} {
    width: 18px;
    height: 18px;
  }

  ${media.tablet} {
    width: 1.953vw;
    height: 1.953vw;
  }

  ${media.mobile} {
    width: 4.673vw;
    height: 4.673vw;
  }
`;
const FormPositionContainer = styled.div`
  position: relative;
`;

const Badge = styled.img`
  width: 5.625vw;
  height: 7.313vw;

  ${media.fullWidth} {
    width: 90px;
    height: 117px;
  }

  ${media.tablet} {
    width: 8.301vw;
    height: 10.742vw;
  }

  ${media.mobile} {
    width: 19.86vw;
    height: 25.701vw;
  }
`;
const BadgesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.833vw;

  ${media.fullWidth} {
    gap: 12px;
  }

  ${media.tablet} {
    gap: 1.172vw;
  }

  ${media.mobile} {
    gap: 2.804vw;
    flex-wrap: wrap;
  }
`;
const OptionBodyCopy = styled.p`
  ${text.bodySm};

  li {
  }
`;
const OptionSubheader = styled.p`
  ${text.bodySm};
  margin-bottom: 1vw;

  ${media.fullWidth} {
    margin-bottom: 14px;
  }

  ${media.tablet} {
    margin-bottom: 0.977vw;
  }

  ${media.mobile} {
    margin-bottom: 3.271vw;
  }
`;
const OptionHeader = styled.div`
  ${text.bodyLgBold};
  display: flex;
  flex-direction: row;
  align-items: start;

  ${media.mobile} {
    ${text.bodyLgBold}
  }
`;
// const OptionArrow = styled(Chevron)`
//   transform: rotate(180deg);
// `;
const OptionContentContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
`;
const OptionDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 1.25vw;
  margin-bottom: 2.25vw;
  overflow: hidden;

  ${media.fullWidth} {
    gap: 20px;
    margin-bottom: 36px;
  }

  ${media.tablet} {
    gap: 1.953vw;
    margin-bottom: 3.516vw;
  }
  
  ${media.mobile} {
    gap: 4.167vw;
    margin-bottom: 7.5vw;
  }
`;

const AllOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3vw;

  ${media.fullWidth} {
    margin-bottom: 48px;
  }

  ${media.tablet} {
    margin-bottom: 4.688vw;
  }

  ${media.mobile} {
    margin-bottom: unset;
  }
`;
const Header = styled.h3`
  ${text.h2};
  color: ${colors.white};
  margin-bottom: 1.875vw;
  text-align: left;

  ${media.fullWidth} {
    margin-bottom: 30px;
  }

  ${media.tablet} {
    margin-bottom: 2.93vw;
  }

  ${media.mobile} {
    ${text.h2};
    margin-bottom: 6.25vw;
    text-align: left;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.white};
  width: 41.667vw;

  ${media.fullWidth} {
    width: 600px;
  }

  ${media.tablet} {
    width: 43.164vw;
  }

  ${media.mobile} {
    width: 100%;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8.75vw;
  padding: 3.75vw 0;
  width: 100%;

  ${media.fullWidth} {
    gap: 126px;
    padding: 54px 0;
  }

  ${media.tablet} {
    gap: 5.859vw;
    padding: 5.859vw 3.906vw;
  }

  ${media.mobile} {
    flex-direction: column-reverse;
    gap: 9.346vw;
    padding: 9.346vw 6.075vw;
  }
`;

const BackgroundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    70deg,
    #da5e24 -65.61%,
    #190c30 50.18%,
    #3d2562 104.12%
  );
  background-position: center;
  background-size: contain;
`;

const ZoomLegalStatement = styled.p`
  ${text.bodyMd}
  color:${colors.txtSubtle};
  padding: 1.875vw 0vw 6vw 0vw;
  text-align: center;

  ${media.fullWidth} {
    padding: 30px 0px 96px 0px;
  }

  ${media.tablet} {
    padding: 9.375vw 0vw 3.906vw 0vw;
  }

  ${media.mobile} {
    padding: 5vw;
  }
`;

export default Demo;
