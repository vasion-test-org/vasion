'use client';

import React, { useState } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { useServerInsertedHTML } from 'next/navigation';
import isPropValid from '@emotion/is-prop-valid';

interface StyledComponentsRegistryProps {
  children: React.ReactNode;
}

export default function StyledComponentsRegistry({ children }: StyledComponentsRegistryProps) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') {
    return (
      <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
        {children}
      </StyleSheetManager>
    );
  }

  return (
    <StyleSheetManager
      sheet={styledComponentsStyleSheet.instance}
      shouldForwardProp={(prop) => isPropValid(prop)}
    >
      {children}
    </StyleSheetManager>
  );
}
