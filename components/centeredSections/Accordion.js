import AccordionItem from '@/components/globalComponents/AccordionItem';
import { cn } from '@/lib/cn';

/**
 * Accordion (Server Component)
 * Container for accordion items. Animation handled by AccordionItem.
 * 
 * VW Conversion Notes:
 * - Desktop: 81.5vw at 1600px = 1304px → max-w-326
 * - Tablet: 90.234vw at 1024px = 924px → ~90% width
 * - Mobile: 89.167vw at 480px = 428px → ~89% width
 * Using max-w-326 with percentage widths for responsive
 */
const Accordion = ({ accordionData }) => {
  return (
    <div
      className={cn(
        'flex flex-col',
        // Width: 1304px max on desktop, ~90% on smaller
        'w-full max-w-326',
        // Tablet/mobile: constrain to ~90% of viewport
        'tab:w-11/12 mob:w-11/12'
      )}
    >
      {accordionData?.map((accordionItem, index) => (
        <AccordionItem
          key={accordionItem._uid || `accordion-${index}`}
          accordionItem={accordionItem}
        />
      ))}
    </div>
  );
};

export default Accordion;
