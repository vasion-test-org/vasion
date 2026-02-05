import Script from 'next/script';

import { validateSchemaMarkup } from '@/lib/schemaUtils';

const ServerSchemaMarkup = ({ schemaData }) => {
  if (!schemaData) {
    return null;
  }

  const validatedSchema = validateSchemaMarkup(schemaData);

  if (!validatedSchema) {
    return null;
  }

  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(validatedSchema, null, 2),
      }}
      id="schema-markup"
      type="application/ld+json"
    />
  );
};

export default ServerSchemaMarkup;
