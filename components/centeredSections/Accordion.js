import AccordionItem from '@/components/globalComponents/AccordionItem';

/**
 * Accordion (Server Component)
 * Container for accordion items. Animation handled by AccordionItem.
 */
const Accordion = ({ accordionData }) => {
  // Generate unique ID for scoped styles
  const componentId = `accordion-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <>
      <style>{`
        .${componentId} {
          display: flex;
          flex-direction: column;
          width: 81.5vw;
          max-width: 81.5rem; /* 1304px */
        }
        @media (min-width: 1601px) {
          .${componentId} {
            width: 81.5rem; /* 1304px fixed */
          }
        }
        @media (max-width: 1024px) {
          .${componentId} {
            width: 90.234vw;
          }
        }
        @media (max-width: 480px) {
          .${componentId} {
            width: 89.167vw;
          }
        }
      `}</style>
      <div className={componentId}>
        {accordionData?.map((accordionItem, index) => (
          <AccordionItem
            key={accordionItem._uid || `accordion-${index}`}
            accordionItem={accordionItem}
          />
        ))}
      </div>
    </>
  );
};

export default Accordion;
