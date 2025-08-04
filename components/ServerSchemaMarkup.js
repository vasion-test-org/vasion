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
      id='schema-markup'
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(validatedSchema, null, 2),
      }}
    />
  );
};

export default ServerSchemaMarkup;
