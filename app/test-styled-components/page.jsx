'use client';

import React from 'react';
import styled from 'styled-components';
import media from '@/styles/media';
import colors from '@/styles/colors';

/**
 * Styled Components Test Page
 * 
 * This page uses styled-components to render multiple components.
 * Test this page with GTmetrix to get baseline performance metrics.
 */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background: ${colors.backgroundSecondary || '#f7fafc'};
`;

const Section = styled.section`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 3rem;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: ${colors.text || '#1a202c'};
`;

const Subheading = styled.p`
  text-align: center;
  font-size: 1.125rem;
  color: ${colors.textSecondary || '#4a5568'};
  margin-bottom: 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: ${colors.background || '#ffffff'};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${colors.text || '#1a202c'};
`;

const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${colors.textSecondary || '#4a5568'};
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(180deg, #7E5FDD 0%, #583F99 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;
  width: fit-content;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(180deg, #7E5FDD 0%, #583F99 100%);
  border-radius: 50%;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${colors.text || '#1a202c'};
`;

const FeatureText = styled.p`
  font-size: 0.875rem;
  color: ${colors.textSecondary || '#4a5568'};
  line-height: 1.5;
`;

const StatsSection = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 3rem 0;
  background: white;
  border-radius: 1rem;
  margin-top: 3rem;

  ${media.mobile} {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(180deg, #7E5FDD 0%, #583F99 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: ${colors.textSecondary || '#4a5568'};
  font-weight: 500;
`;

export default function StyledComponentsTestPage() {
  return (
    <Container>
      <Section>
        <Heading>Styled Components Test Page</Heading>
        <Subheading>
          This page uses styled-components for all styling. Test with GTmetrix to measure performance.
        </Subheading>

        <Grid>
          {Array.from({ length: 9 }).map((_, i) => (
            <Card key={i}>
              <CardTitle>Card {i + 1}</CardTitle>
              <CardDescription>
                This is a test card component styled with styled-components. It includes
                hover effects, responsive design, and theme integration. This content is
                repeated multiple times to create a substantial page for performance testing.
              </CardDescription>
              <Button>Learn More</Button>
            </Card>
          ))}
        </Grid>

        <FeatureGrid>
          {Array.from({ length: 6 }).map((_, i) => (
            <FeatureCard key={i}>
              <FeatureIcon>{i + 1}</FeatureIcon>
              <FeatureTitle>Feature {i + 1}</FeatureTitle>
              <FeatureText>
                This feature card demonstrates styled-components with icons, titles, and descriptions.
                Multiple instances help create a realistic page size for performance testing.
              </FeatureText>
            </FeatureCard>
          ))}
        </FeatureGrid>

        <StatsSection>
          <StatItem>
            <StatNumber>1.02</StatNumber>
            <StatLabel>MB Bundle</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>417</StatNumber>
            <StatLabel>KB First Load</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>95</StatNumber>
            <StatLabel>Performance Score</StatLabel>
          </StatItem>
        </StatsSection>
      </Section>
    </Container>
  );
}

