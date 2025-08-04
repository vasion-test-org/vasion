'use client';

import { usePageData } from '@/context/PageDataContext';
import ServerSchemaMarkup from './ServerSchemaMarkup';

const ClientSchemaWrapper = () => {
  const { pageData } = usePageData();

  return <ServerSchemaMarkup schemaData={pageData?.code} />;
};

export default ClientSchemaWrapper;
