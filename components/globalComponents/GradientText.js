import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const AnimatedGradientText = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  max-width: fit-content;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 1.25rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  transition: box-shadow 0.5s ease-out;
  overflow: hidden;
  cursor: pointer;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: 300% 100%;
  animation: ${gradientAnimation} linear infinite;
  border-radius: inherit;
  z-index: 0;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: inherit;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    background-color: #060010;
    z-index: -1;
  }
`;

const TextContent = styled.div`
  display: inline-block;
  position: relative;
  z-index: 2;
  background-size: 300% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: ${gradientAnimation} linear infinite;
`;

export default function GradientText({
  children,
  className = '',
  colors = ["#803235", "#3D2562", "#7E5FDD", "#FF5100"],
  animationSpeed = 8,
  showBorder = false,
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <AnimatedGradientText className={className}>
      {showBorder && <GradientOverlay style={gradientStyle} />}
      <TextContent style={gradientStyle}>{children}</TextContent>
    </AnimatedGradientText>
  );
}
