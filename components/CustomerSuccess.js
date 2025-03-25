import React, { useEffect, useRef, useState } from "react";
import StyledLink from "components/StyledLink";
import GoToActive from "images/GoToActive.webp";
import ArrowButtonStat from "images/arrowButtonStat.webp";
import HoveredArrow from "images/HoveredArrow.webp";
import styled from "styled-components";
import text from "styles/text";
import media from "styles/media";
import colors from "styles/colors";
import gsap from "gsap";

const FeaturedTestimonials = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredBlockIndex, setHoveredBlockIndex] = useState(null);
  const itemsRef = useRef([]);
  const timelineRef = useRef(null);

  const progressBarsRef = useRef([]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  useEffect(() => {
    if (timelineRef.current) timelineRef.current.kill();

    const items = itemsRef.current;
    gsap.set(items, { autoAlpha: 0 });
    gsap.set(items[0], { autoAlpha: 1, display: "flex" });

    const masterTimeline = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        setCurrentIndex(0);
      },
    });
    const animationConfig = {
      fadeIn: {
        autoAlpha: 1,
        duration: 1,
        ease: "power2.inOut",
      },
      fadeOut: { autoAlpha: 0, duration: 1, ease: "power2.inOut" },
      progress: { width: "100%", duration: 3, ease: "none" },
    };
    items.forEach((item, i) => {
      const slideTimeline = gsap.timeline();

      slideTimeline
        .set(progressBarsRef.current[i], { width: "0%" })
        .to(item, {
          ...animationConfig.fadeIn,
          onStart: () => setCurrentIndex(i),
        })
        .to(progressBarsRef.current[i], animationConfig.progress, "<")
        .to(item, animationConfig.fadeOut, "+=2");

      masterTimeline.add(slideTimeline, i * 4);
    });

    timelineRef.current = masterTimeline;

    return () => {
      timelineRef.current?.kill();
    };
  }, [content]);

  const featured = content?.featured?.map((item, index) => (
    <FeaturedItem
      key={index}
      href={item?.linkUrl}
      ref={(el) => (itemsRef.current[index] = el)}
      onMouseOver={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
    >
      <ImageContainer>
        <Tag>{item?.imageTag}</Tag>
        <LogoImage src={item?.image.sourceUrl} alt={item?.image?.altText} />
      </ImageContainer>
      <ContentDiv>
        <TitleAndBody>
          <Headline dangerouslySetInnerHTML={{ __html: item?.headline }} />
          <Body>{item?.body}</Body>
        </TitleAndBody>
        <AttributionDiv>
          <Name>{item?.name}</Name>
          <Company>{item?.company}</Company>
        </AttributionDiv>
      </ContentDiv>
      <GoTo className="goto-arrow" src={GoToActive} alt={"Arrow To Link"} />
    </FeaturedItem>
  ));

  const renderBlock = (item, index) => (
    <BlockItem
      key={index}
      $bgcolor={item?.backgroundColor}
      href={item?.linkUrl}
      onMouseEnter={() => setHoveredBlockIndex(index)}
      onMouseLeave={() => setHoveredBlockIndex(null)}
    >
      <StatTag>{item?.tag}</StatTag>
      <StatAndBodyDiv>
        <Stat dangerouslySetInnerHTML={{ __html: item?.stat }} />
        <BlockBody>{item?.body}</BlockBody>
      </StatAndBodyDiv>
      <LogoGoTo>
        <LogoStat src={item?.logo?.sourceUrl} alt={"company-logo"} />
        <ArrowButton
          src={hoveredBlockIndex === index ? HoveredArrow : ArrowButtonStat}
          alt={"go-to-arrow-prompt"}
        />
      </LogoGoTo>
    </BlockItem>
  );
  const progressBars = content?.featured?.map((_, index) => (
    <ProgressBar key={index} $isActive={currentIndex === index}>
      <ProgressValue
        className="pro-bar"
        ref={(el) => (progressBarsRef.current[index] = el)}
      />
    </ProgressBar>
  ));

  return (
    <Wrapper $bgcolor={content?.backgroundColor}>
      <HeaderContainer>
        <Eyebrow>{bloj?.eyebrow}</Eyebrow>
        <Header>{content?.header}</Header>
        <LinkWrapper>
          <StyledLink size={"medium"} href={content?.linkUrl}>
            {content?.linkText}
          </StyledLink>
        </LinkWrapper>
      </HeaderContainer>
      <TestimonialsContainer>
        <Featured $bgcolor={content?.featured[0]?.backgroundColor}>
          <ProgressBarsContainer>{progressBars}</ProgressBarsContainer>
          {featured}
        </Featured>
        <Blocks>
          {content?.blocks?.map((item, index) => renderBlock(item, index))}
        </Blocks>
      </TestimonialsContainer>
    </Wrapper>
  );
};

export default FeaturedTestimonials;

const ProgressBarsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: max-content;
  justify-self: flex-end;
  gap: 0.125vw;
  padding: 1.25vw;
  z-index: 20;

  ${media.fullWidth} {
    gap: 2px;
    padding: 20px;
  }

  ${media.tablet} {
    gap: 0.195vw;
    padding: 1.953vw;
  }

  ${media.mobile} {
    display: none;
  }
`;
const ProgressBar = styled.div`
  background-color: ${colors.orange100};
  overflow: hidden;
  width: ${(props) => (props.$isActive ? "1.625vw" : "0.563vw")};
  height: 0.375vw;
  border-radius: 0.25vw;
  transition: width 0.9s ease;

  ${media.fullWidth} {
    width: ${(props) => (props.$isActive ? "26px" : "9px")};
    height: 6px;
    border-radius: 4px;
  }
  ${media.tablet} {
    width: ${(props) => (props.$isActive ? "2.539vw" : "0.879vw")};
    height: 0.586vw;
    border-radius: 0.391vw;
  }
  ${media.mobile} {
    display: none;
  }
`;

const ProgressValue = styled.div`
  width: 0%;
  height: 100%;
  background-color: ${colors.orange500};
`;

const ArrowButton = styled.img`
  width: 3vw;
  height: 3vw;

  ${media.fullWidth} {
    width: 48px;
    height: 48px;
  }
  ${media.tablet} {
    width: 4.688vw;
    height: 4.688vw;
  }
  ${media.mobile} {
    width: 8vw;
    height: 8vw;
  }
`;

const LogoStat = styled.img`
  width: 9.125vw;
  height: 2.313vw;

  ${media.fullWidth} {
    width: 146px;
    height: 37px;
  }
  ${media.tablet} {
    width: 14.258vw;
    height: 3.613vw;
  }
  ${media.mobile} {
    width: 21vw;
    height: 6vw;
  }
`;

const LogoGoTo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BlockBody = styled.p`
  ${text.bodyMd};
  ${media.mobile} {
    ${text.bodySm};
  }
`;

const Stat = styled.p`
  ${text.stat};
  ${media.mobile} {
    ${text.h4};
  }
`;

const StatAndBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25vw;

  ${media.fullWidth} {
    gap: 4px;
  }
  ${media.tablet} {
    gap: 0.391vw;
  }
  ${media.mobile} {
    gap: 0.833vw;
  }
`;

const StatTag = styled.div`
  ${text.tagBold};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${colors.purpleTag};
  color: ${colors.primaryPurple};
  width: fit-content;
  padding: 0.25vw 0.5vw;
  border-radius: 1.5vw;
  margin-bottom: 0.5vw;

  ${media.fullWidth} {
    height: 22px;
    padding: 0.25vw 0.5vw;
    border-radius: 24px;
    margin-bottom: 8px;
  }
  ${media.tablet} {
    height: 2.148vw;
    padding: 0.391vw 0.781vw;
    border-radius: 2.344vw;
    margin-bottom: 0.781vw;
  }
  ${media.mobile} {
    height: 4.583vw;
    padding: 1.042vw 1.667vw;
    border-radius: 5vw;
    margin-bottom: 1.667vw;
  }
`;

const BlockItem = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) =>
    props?.$bgcolor ? `${colors?.[props.$bgcolor]}` : `unset`};
  &:hover {
    background-color: ${colors?.purpleTag};
  }
  color: ${colors?.black};
  width: 19.438vw;
  height: auto;
  padding: 1.75vw 1.5vw;
  border-radius: 0.5vw;
  flex: 1;

  ${media.fullWidth} {
    width: 311px;
    padding: 28px 24px;
    border-radius: 8px;
  }
  ${media.tablet} {
    width: 45.117vw;
    padding: 1.953vw;
    border-radius: 0.781vw;
  }
  ${media.mobile} {
    width: 43.333vw;
    height: 52.083vw;
    padding: 4.167vw;
    border-radius: 1.667vw;
  }
`;

const Blocks = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 81.5vw;
  gap: 1.25vw;

  ${media.fullWidth} {
    width: 1304px;
    gap: 20px;
  }
  ${media.tablet} {
    width: 92.188vw;
    gap: 1.953vw 1.953vw;
  }
  ${media.mobile} {
    width: 89.167vw;
    gap: 2.5vw;
  }
`;

const GoTo = styled.img`
  opacity: 0;
  width: 44px;
  height: 44px;
  align-self: flex-end;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  ${media.fullWidth} {
    width: 44px;
    height: 44px;
  }
  ${media.tablet} {
    width: 4.297vw;
    height: 4.297vw;
  }
  ${media.mobile} {
    display: none;
  }
`;

const Company = styled.p`
  ${text.bodySmBold};
  ${media.mobile} {
    ${text.tag};
  }
`;

const Name = styled.p`
  ${text.bodySm};

  ${media.mobile} {
    ${text.tag};
  }
`;

const AttributionDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25vw;
  color: ${colors.txtSubtle};

  ${media.fullWidth} {
    gap: 4px;
  }
  ${media.tablet} {
    gap: 0.391vw;
  }
  ${media.mobile} {
    gap: 0vw;
  }
`;

const Body = styled.p`
  ${text.bodyLg};

  ${media.mobile} {
    ${text.bodySm}
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    ${text.tag}
  }
`;

const Headline = styled.h5`
  ${text.h5};
  color: ${colors?.lightPurple};

  ${media.mobile} {
    ${text.tagBold};
  }
`;

const TitleAndBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vw;

  ${media.fullWidth} {
    gap: 8px;
  }
  ${media.tablet} {
    gap: 0.781vw;
  }
  ${media.mobile} {
    gap: 0.899vw;
  }
`;

const Tag = styled.div`
  position: absolute;
  ${text.tagBold};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${colors.purpleTag};
  color: ${colors.primaryPurple};
  width: fit-content;
  padding: 0.25vw 0.5vw;
  top: 11px;
  left: 8px;
  border-radius: 1.5vw;
  ${media.fullWidth} {
    height: 22px;
    padding: 0.25vw 0.5vw;
    border-radius: 24px;
  }
  ${media.tablet} {
    height: 2.148vw;
    padding: 0.391vw 0.781vw;
    border-radius: 2.344vw;
  }
  ${media.mobile} {
    height: 4.583vw;
    padding: 1.042vw 1.667vw;
    border-radius: 5vw;
    top: 6px;
    left: 9px;
  }
`;
const LogoImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  width: 14vw;
  height: 14vw;
  border-radius: 1vw;
  overflow: hidden;

  ${media.fullWidth} {
    width: 224px;
    height: 224px;
    border-radius: 8px;
  }
  ${media.tablet} {
    width: 21.875vw;
    height: 21.875vw;
  }
  ${media.mobile} {
    width: 26.25vw;
    height: 26.25vw;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 58.25vw;
  gap: 1.25vw;

  ${media.fullWidth} {
    width: 932px;
    gap: 20px;
  }
  ${media.tablet} {
    width: 55.859vw;
    gap: 2.539vw;
  }
  ${media.mobile} {
    width: 56.417vw;
    gap: 1.667vw;
  }
`;

const FeaturedItem = styled.a`
  position: absolute;
  text-decoration: none;
  color: ${colors?.black};
  background-color: ${colors.white};
  align-items: center;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1.25vw;
  gap: 2vw;
  border-radius: 0.5vw;

  &:hover {
    ${GoTo} {
      opacity: 1;
    }
  }

  ${media.fullWidth} {
    width: 100%;
    height: 100%;
    padding: 20px;
    gap: 32px;
    border-radius: 8px;
  }
  ${media.tablet} {
    padding: 1.953vw;
    gap: 3.125vw;
    border-radius: 0.781vw;
  }
  ${media.mobile} {
    padding: 4.167vw 2.5vw;
    gap: 2.5vw;
    border-radius: 1.667vw;
  }
`;

const Featured = styled.div`
  position: relative;
  width: 81.5vw;
  height: 16.5vw;
  background-color: ${(props) =>
    props?.$bgcolor ? `${colors[props?.$bgcolor]}` : `unset`};
  border-radius: 0.5vw;
  ${media.fullWidth} {
    width: 1304px;
    height: 264px;
    border-radius: 8px;
  }
  ${media.tablet} {
    width: 92.188vw;
    height: 25.781vw;
    border-radius: 0.781vw;
  }
  ${media.mobile} {
    width: 89.333vw;
    height: 34.583vw;
    padding-top: 4.167vw;
    border-radius: 1.667vw;
  }
`;

const TestimonialsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vw;

  ${media.fullWidth} {
    gap: 24px;
  }
  ${media.tablet} {
    gap: 2.344vw;
  }
  ${media.mobile} {
    gap: 2.5vw;
  }
`;

const LinkWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: 40%;

  ${media.fullWidth} {
    right: 0px;
    top: 40%;
  }
  ${media.tablet} {
    left: 0px;
    right: unset;
    top: unset;
    bottom: 0px;
  }
  ${media.mobile} {
    left: 0px;
    right: unset;
    top: unset;
    bottom: 0px;
  }
`;

const Header = styled.h3`
  ${text.h3};
`;

const Eyebrow = styled.p`
  ${text.eyebrow};
`;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 81.5vw;
  gap: 0.75vw;

  ${media.fullWidth} {
    width: 1304px;
    gap: 12px;
  }
  ${media.tablet} {
    width: 92.188vw;
    height: 12.305vw;
    gap: 1.172vw;
  }
  ${media.mobile} {
    width: 83.542vw;
    height: 26.25vw;
    gap: 2.5vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props?.$bgcolor ? `${colors?.[props.$bgcolor]}` : `${colors.white}`};
  width: 100%;
  gap: 2.5vw;
  padding: 6vw 0vw;

  ${media.fullWidth} {
    gap: 40px;
    padding: 96px 0px;
    width: 99vw;
  }
  ${media.tablet} {
    gap: 3.906vw;
    padding: 5.859vw 0vw;
  }
  ${media.mobile} {
    gap: 8.333vw;
    padding: 12.5vw 0vw;
  }
`;
