import AccordionItem from '@/components/globalComponents/AccordionItem';
import { cn } from '@/lib/cn';

/**
 * Accordion (Server Component)
 * Container for accordion items. Animation handled by AccordionItem.
 *
 * VW Conversion Notes (Mobile-First):
 * - Mobile: 89.167vw at 480px = 428px → w-11/12 (~89%)
 * - Tablet: 90.234vw at 1024px = 924px → same (~90%)
 * - Desktop: 81.5vw at 1600px = 1304px → max-w-326
 */
const Accordion = ({ accordionData }) => {
  return (
    <div
      className={cn(
        'flex flex-col',
        // Mobile-first: base is mobile width (~89%), desktop gets max-width
        'w-11/12 lg:w-full lg:max-w-326',
        // Center the accordion
        'mx-auto'
      )}
    >
      {accordionData?.map((accordionItem, index) => (
        <AccordionItem
          accordionItem={accordionItem}
          key={accordionItem._uid || `accordion-${index}`}
        />
      ))}
    </div>
  );
};

export default Accordion;
