'use client';

import { useEffect } from 'react';
import { usePageData } from '@/context/PageDataContext';
import { validateSchemaMarkup } from '@/lib/schemaUtils';

const SchemaMarkup = () => {
  const { pageData } = usePageData();

  useEffect(() => {
    if (!pageData?.content?.code) {
      return;
    }

    // Remove any existing schema script tags
    const existingScripts = document.querySelectorAll(
      'script[data-schema-markup]'
    );
    existingScripts.forEach((script) => script.remove());

    const validatedSchema = validateSchemaMarkup(pageData.content.code);

    if (!validatedSchema) {
      return;
    }

    // Create and inject the schema script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema-markup', 'true');
    script.textContent = JSON.stringify(validatedSchema, null, 2);

    // Insert the script in the head
    document.head.appendChild(script);

    // Cleanup function to remove the script when component unmounts
    return () => {
      const scriptsToRemove = document.querySelectorAll(
        'script[data-schema-markup]'
      );
      scriptsToRemove.forEach((script) => script.remove());
    };
  }, [pageData?.content?.code]);

  return null;
};

export default SchemaMarkup;
