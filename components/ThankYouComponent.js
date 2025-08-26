'use client';
import React, { useEffect, useState } from 'react';
import { useThankYou } from '@/context/ThankYouContext';
import styled from 'styled-components';
import colors from '@/styles/colors';
import ComponentRenderer from '@/components/renderers/ComponentRenderer';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';

const ThankYouComponent = ({ className }) => {
  const copycomponents = [
    'body_copy',
    'header',
    'eyebrow',
    'long_form_text',
    'copy_block',
  ];
  const { thankYouCopy } = useThankYou();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // We can render if we have either stored content or default content
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Wrapper className={className}>
        <Content>
          <div>Loading...</div>
        </Content>
      </Wrapper>
    );
  }

  return (
    <Wrapper className={className}>
      <Content>
        {thankYouCopy?.map((item, index) => (
          <div key={`${item.component}-${item._uid || index}`}>
            {copycomponents.includes(item.component) ? (
              <RichTextRenderer document={item.copy} blok={item} />
            ) : (
              <ComponentRenderer blok={item} />
            )}
          </div>
        ))}
      </Content>
    </Wrapper>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5vw;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${colors.primaryPurple};
  color: ${colors.white};
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
`;

export default ThankYouComponent;
