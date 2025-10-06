'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { useThankYou } from '@/context/ThankYouContext';
import styled from 'styled-components';
import colors from '@/styles/colors';
import ComponentRenderer from '@/components/renderers/ComponentRenderer';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';

const ThankYouComponent = React.memo(({ className }) => {
  const copycomponents = useMemo(
    () => ['body_copy', 'header', 'eyebrow', 'long_form_text', 'copy_block'],
    []
  );

  const { thankYouCopy } = useThankYou();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use requestIdleCallback for non-critical updates to reduce scheduler pressure
    const updateLoading = () => {
      setIsLoading(false);
    };

    if (window.requestIdleCallback) {
      window.requestIdleCallback(updateLoading);
    } else {
      setTimeout(updateLoading, 0);
    }
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
          <div key={`item.component_${index}`}>
            {copycomponents.includes(item.component) ? (
              <RichTextRenderer
                document={item.copy}
                blok={item}
                responsiveTextStyles={item?.responsive_text_styles}
              />
            ) : (
              <ComponentRenderer blok={item} />
            )}
          </div>
        ))}
      </Content>
    </Wrapper>
  );
});

ThankYouComponent.displayName = 'ThankYouComponent';

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
