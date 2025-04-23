'use client';
import React, { useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';

import Form from '@/components/Form';
import colors from '@/styles/colors';
import media from '@/styles/media';
import text from '@/styles/text';
import gsap from 'gsap';
import { ScreenContext } from '@/components/providers/Screen';
import { storyblokEditable } from "@storyblok/react/rsc";
import Chevron from 'assets/svg/WhiteChevron.svg';
import DemoPrint from 'assets/svg/demoprint.svg';
import AI from 'assets/svg/ai.svg';
import Tune from 'assets/svg/tune.svg';
import DemoStar from 'assets/svg/demostar.svg';
import getMedia from '@/functions/getMedia';
import RichTextRenderer from './renderers/RichTextRenderer';
import Icons from '@/components/renderers/Icons';
import ComponentRenderer from './renderers/ComponentRenderer';
import TestForm from './TestForm';

const Demo = ({ blok }) => {
  const { mobile } = useContext(ScreenContext);
  const optionRefs = useRef([]);
  const arrowRefs = useRef([]);
  const contentRefs = useRef([]);
  const iconRefs = useRef([]);
  const handlersRef = useRef([]); 
  const prevIndex = useRef(0);
  const demoExperienceRef = useRef('');
  const copycomponents = [
    "body_copy",
    "header",
    "eyebrow",
    "long_form_text",
    "copy_block",
    "overview_controller",
    "small_quote",
  ];
  // console.log(blok);

  useEffect(() => {
    const tl = gsap.timeline({});
    gsap.set(optionRefs.current[0], { height: 'auto' });
    gsap.set(arrowRefs.current[0], { rotate: 180 });
    gsap.set(contentRefs.current[0], { opacity: 1 });
    gsap.set(iconRefs.current[0], { filter: 'grayscale(90%) brightness(2)' });

    const handleClick = (index) => {
      if (prevIndex.current === index) {
        tl.to('.content', {
          duration: 0.1,
          opacity: 0,
        })
          .to('.options', {
            height: getMedia('64px', '4vw', '6.25vw', '18.953vw'),
            duration: 0.25,
          })
          .to('.arrows', {
            rotate: 0,
            duration: 0.25,
          });
      } else {
        tl.to('.content', {
          duration: 0.1,
          opacity: 0,
        })
          .to('.options', {
            height: getMedia('64px', '4vw', '6.25vw', '18.953vw'),
            duration: 0.35,
          })
          .to(
            '.icons',
            { duration: 0.1, filter: 'brightness(1) grayscale(0%)' },
            'start'
          )
          .to('.arrows', {
            rotate: 0,
            duration: 0.1,
          })
          .to(
            iconRefs.current[index],
            { duration: 0.1, filter: 'grayscale(90%) brightness(2)' },
            'start'
          )
          .to(optionRefs.current[index], {
            height: 'auto',
            duration: 0.35,
          })
          .to(
            contentRefs.current[index],
            {
              opacity: 1,
              duration: 0.25,
            },
            '-=.1'
          )
          .to(
            arrowRefs.current[index],
            {
              rotate: 180,
              duration: 0.15,
            },
            '-=.5'
          );
      }

      prevIndex.current = index;
    };

    optionRefs.current.forEach((option, index) => {
      handlersRef.current[index] = () => handleClick(index);
      if (option) {
        option.addEventListener('click', handlersRef.current[index]);
      }
    });

    return () => {
      optionRefs.current.forEach((option, index) => {
        if (option) {
          option.removeEventListener('click', handlersRef.current[index]);
        }
      });
    };
  }, []);

  useEffect(() => {
    const checkFormLoad = () => {
      const demoExperienceElement = document.querySelector(
        '#formFriendlyProductofInterest'
      );
      const tl = gsap.timeline({});

      if (demoExperienceElement) {
        const handleChange = (event) => {
          demoExperienceRef.current = event.target.value;

          if (demoExperienceRef.current === 'Vasion Print') {
            tl.to('.content', {
              duration: 0.25,
              opacity: 0,
            })
              .to('.options', {
                height: getMedia('64px', '4vw', '6.25vw', '14.953vw'),
                duration: 0.25,
              })
              .to('.arrows', {
                rotate: 0,
                duration: 0.25,
              })
              .to(
                '.icons',
                { duration: 0.15, filter: 'brightness(1) grayscale(0%)' },
                'start'
              )
              .to(
                iconRefs.current[0],
                { duration: 0.15, filter: 'grayscale(90%) brightness(2)' },
                'start'
              )
              .to(optionRefs.current[0], {
                height: 'auto',
              })
              .to(
                contentRefs.current[0],
                {
                  opacity: 1,
                  duration: 0.35,
                },
                '-=.5'
              )
              .to(
                arrowRefs.current[0],
                {
                  rotate: 180,
                  duration: 0.25,
                },
                '-=.5'
              );
          } else if (demoExperienceRef.current === 'Vasion Output') {
            tl.to('.content', {
              duration: 0.25,
              opacity: 0,
            })
              .to('.options', {
                height: getMedia('64px', '4vw', '6.25vw', '14.953vw'),
                duration: 0.25,
              })
              .to('.arrows', {
                rotate: 0,
                duration: 0.25,
              })
              .to(
                '.icons',
                { duration: 0.15, filter: 'brightness(1) grayscale(0%)' },
                'start'
              )
              .to(
                iconRefs.current[1],
                { duration: 0.15, filter: 'grayscale(90%) brightness(2)' },
                'start'
              )
              .to(optionRefs.current[1], {
                height: 'auto',
              })
              .to(
                contentRefs.current[1],
                {
                  opacity: 1,
                  duration: 0.35,
                },
                '-=.5'
              )
              .to(
                arrowRefs.current[1],
                {
                  rotate: 180,
                  duration: 0.25,
                },
                '-=.5'
              );
          } else if (demoExperienceRef.current === 'Vasion Automate') {
            tl.to('.content', {
              duration: 0.25,
              opacity: 0,
            })
              .to('.options', {
                height: getMedia('64px', '4vw', '6.25vw', '14.953vw'),
                duration: 0.25,
              })
              .to('.arrows', {
                rotate: 0,
                duration: 0.25,
              })
              .to(
                '.icons',
                { duration: 0.15, filter: 'brightness(1) grayscale(0%)' },
                'start'
              )
              .to(
                iconRefs.current[2],
                { duration: 0.15, filter: 'grayscale(90%) brightness(2)' },
                'start'
              )
              .to(optionRefs.current[2], {
                height: 'auto',
              })
              .to(
                contentRefs.current[2],
                {
                  opacity: 1,
                  duration: 0.35,
                },
                '-=.5'
              )
              .to(
                arrowRefs.current[2],
                {
                  rotate: 180,
                  duration: 0.25,
                },
                '-=.5'
              );
          } else if (
            demoExperienceRef.current === 'Vasion Automation Platform'
          ) {
            tl.to('.content', {
              duration: 0.25,
              opacity: 0,
            })
              .to('.options', {
                height: getMedia('64px', '4vw', '6.25vw', '14.953vw'),
                duration: 0.25,
              })
              .to('.arrows', {
                rotate: 0,
                duration: 0.25,
              })
              .to(
                '.icons',
                { duration: 0.15, filter: 'brightness(1) grayscale(0%)' },
                'start'
              )
              .to(
                iconRefs.current[3],
                { duration: 0.15, filter: 'grayscale(90%) brightness(2)' },
                'start'
              )
              .to(optionRefs.current[3], {
                height: 'auto',
              })
              .to(
                contentRefs.current[3],
                {
                  opacity: 1,
                  duration: 0.35,
                },
                '-=.5'
              )
              .to(
                arrowRefs.current[3],
                {
                  rotate: 180,
                  duration: 0.25,
                },
                '-=.5'
              );
          }
        };
        demoExperienceElement.addEventListener('change', handleChange);

        clearInterval(intervalId);

        return () => {
          demoExperienceElement.removeEventListener('change', handleChange);
        };
      }
    };

    const intervalId = setInterval(checkFormLoad, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const mappedBadges = blok.badges.map((badge) => (
    <Badge key={badge.filename} src={badge.filename} />
  ));

  const mappedOptions = blok.cards.map((option, index) => {
    const formattedIconString = option.icon.replace(/\s+/g, '');

    let IconComponent = Icons[formattedIconString] || null;
    // console.log(option);
    return (
      <div {...storyblokEditable(option)}>
      <OptionDiv
      
        className='options preformContent'
        ref={(el) => (optionRefs.current[index] = el)}
        key={option.header}
      >
        <OptionHeader>
          {IconComponent && (
            <OptionIconWrapper>
              {IconComponent ? <IconComponent /> : null}
            </OptionIconWrapper>
          )}
          {option.header}
          <ArrowDiv
            className='arrows'
            ref={(el) => (arrowRefs.current[index] = el)}
          >
            <OptionArrow />
          </ArrowDiv>{' '}
        </OptionHeader>
        <OptionContentContainer
          className='content'
          ref={(el) => (contentRefs.current[index] = el)}
        >
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
        <Content className='preformContent'>
          <Header>
            {blok.header}
          </Header>
          <AllOptionsContainer>{mappedOptions}</AllOptionsContainer>
          {!mobile && <BadgesContainer>{mappedBadges}</BadgesContainer>}
        </Content>

        {blok.demo_form[0].component === 'form' && (
          <FormPositionContainer id='formPos'>
            <Form blok={blok.demo_form[0]} />
          </FormPositionContainer>
        )}
         {blok.demo_form[0].component === 'test_form' && (
          <FormPositionContainer id='formPos'>
            <TestForm blok={blok.demo_form[0]} />
          </FormPositionContainer>
        )}
        {blok.demo_form[0].component === 'demo_thank_you' && (
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
      <ZoomLegalStatement>
        {blok.legal_text}
      </ZoomLegalStatement>
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
  box-shadow: 0vw 0vw 0.125vw 0vw rgba(25, 29, 30, 0.04),
    0vw 0.25vw 0.5vw 0vw rgba(25, 29, 30, 0.16);

  ${media.fullWidth} {
    border-radius: 32px;
    padding: 32px;
    width: 564px;
    box-shadow: 0px 0px 2px 0px rgba(25, 29, 30, 0.04),
      0px 4px 8px 0px rgba(25, 29, 30, 0.16);
  }

  ${media.tablet} {
    border-radius: 3.125vw;
    padding: 3.125vw;
    width: 45.313vw;
    box-shadow: 0vw 0vw 0.195vw 0vw rgba(25, 29, 30, 0.04),
      0vw 0.391vw 0.781vw 0vw rgba(25, 29, 30, 0.16);
  }

  ${media.mobile} {
    border-radius: 6.667vw;
    padding: 6.667vw;
    width: 89.167vw;
    box-shadow: 0vw 0vw 0.417vw 0vw rgba(25, 29, 30, 0.04),
      0vw 0.833vw 1.667vw 0vw rgba(25, 29, 30, 0.16);
  }
`;

const OptionIconWrapper = styled.div``;
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
  width: 5.903vw;
  height: 7.639vw;

  ${media.fullWidth} {
    width: 85px;
    height: 110px;
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
  ${text.h5};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.556vw;
  margin-bottom: 0.556vw;

  ${media.fullWidth} {
    gap: 8px;
    margin-bottom: 8px;
  }

  ${media.tablet} {
    gap: 0.781vw;
    margin-bottom: 0.781vw;
  }

  ${media.mobile} {
    ${text.bodyLgBold}
    gap: 1.869vw;
    margin-bottom: 1.869vw;
  }
`;
const OptionArrow = styled(Chevron)`
  transform: rotate(180deg);
`;
const OptionContentContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  opacity: 0;
`;
const OptionDiv = styled.div`
  cursor: pointer;
  background: url('/images/DemoCardBG.webp');
  background-position: center;
  overflow: hidden;
  background-position: 0% 2%;
  border-radius: 0.5vw;
  padding: 1.25vw 1.563vw;
  height: 4vw;

  ${media.fullWidth} {
    border-radius: 7px;
    padding: 18px 23px;
    height: 58px;
  }

  ${media.tablet} {
    border-radius: 0.781vw;
    padding: 1.953vw 2.344vw;
    height: 6.25vw;
  }

  ${media.mobile} {
    border-radius: 1.869vw;
    padding: 4.673vw 5.607vw;
    height: 19.486vw;
  }
`;

const AllOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vw;
  margin-bottom: 9.375vw;
  min-height: 28vw;

  ${media.fullWidth} {
    gap: 7px;
    margin-bottom: 135px;
    min-height: 403px;
  }

  ${media.tablet} {
    gap: 0.781vw;
    margin-bottom: 8.691vw;
    min-height: 39.355vw;
  }

  ${media.mobile} {
    gap: 1.869vw;
    margin-bottom: unset;
    min-height: 100vw;
  }
`;
const Header = styled.h3`
  ${text.h3};
  color: ${colors.white};
  margin-bottom: 1.875vw;

  ${media.fullWidth} {
    margin-bottom: 27px;
  }

  ${media.tablet} {
    margin-bottom: 2.344vw;
  }

  ${media.mobile} {
    ${text.h2};
    margin-bottom: 2.804vw;
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
    flex-direction: column;
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
  padding: 6vw 0vw 3.472vw 0vw;
  text-align: center;

  ${media.fullWidth} {
    padding: 96px 0px 50px 0px;
  }

  ${media.tablet} {
    padding: 9.375vw 0vw 3.906vw 0vw;
  }

  ${media.mobile} {
    padding: 5vw;
  }
`;

export default Demo;
