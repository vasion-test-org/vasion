import { storyblokEditable } from '@storyblok/react/rsc';

import Image from '@/components/globalComponents/Image';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { cn, tw } from '@/lib/cn';

import Button from './globalComponents/Button';

/**
 * Map section_spacing to Tailwind padding (mobile-first).
 * When spacing is a number, map to closest py-* class.
 */
function getSectionPaddingClasses(spacing) {
  if (spacing === 'default' || !spacing) {
    return 'pt-5 pb-0 md:py-10 lg:py-15';
  }
  const n = Number(spacing);
  if (Number.isNaN(n)) return 'pt-5 pb-0 md:py-10 lg:py-15';
  if (n <= 40) return 'py-10';
  if (n <= 60) return 'py-15';
  if (n <= 80) return 'py-20';
  if (n <= 100) return 'py-25';
  return 'py-25';
}

/**
 * Testimonial Component (Server Component)
 * Preserves exact structure: wrapper → card → content + image.
 * Mobile-first: base = mobile, md = tablet, lg = desktop, xl = fullWidth.
 */
const Testimonial = ({ blok }) => {
  const themeKey = blok.theme || 'default';
  const isDark = themeKey === 'dark';
  const layout = blok.layout || 'row';
  const hasMedia = Boolean(blok?.media?.[0]);

  return (
    <section
      {...storyblokEditable(blok)}
      className={cn(
        getSectionPaddingClasses(blok.section_spacing),
        tw`flex w-full flex-col items-center justify-center`
      )}
      aria-label="Testimonial"
    >
      <div
        className={cn(
          tw`md:(gap-15 p-10) lg:(w-326 p-15) mx-auto flex h-auto w-236 w-full flex-col gap-10 rounded-3xl p-6`,
          layout === 'column' ? 'flex-col' : 'lg:flex-row',
          isDark ? 'bg-testimonial-dark text-white' : 'bg-purple-lightGrey text-txt-primary'
        )}
      >
        <div
          className={cn(
            'max-w-full text-left',
            hasMedia ? tw`md:(w-206) lg:(max-w-326) w-95` : 'w-full'
          )}
        >
          {blok?.eyebrow && (
            <p className={tw`font-archivo text-eyebrow md:(mb-8) mb-2.5`}>{blok.eyebrow}</p>
          )}
          {blok.quote?.map((copy) => (
            <div {...storyblokEditable(copy)} key={copy.component}>
              <RichTextRenderer document={copy.copy} />
            </div>
          ))}
          {blok?.quote_source_info && (
            <div className={tw`md:(mt-15) mt-4.5`}>
              {blok.quote_source_info.map((sourceInfo) => (
                <div
                  {...storyblokEditable(sourceInfo)}
                  key={sourceInfo._uid || sourceInfo.component}
                >
                  <RichTextRenderer document={sourceInfo?.copy} />
                </div>
              ))}
              {blok?.link?.map(($buttonData) => (
                <div
                  {...storyblokEditable($buttonData)}
                  className={tw`mt-5`}
                  key={$buttonData?.link_text}
                >
                  <Button $buttonData={$buttonData} key={$buttonData?.link_text} />
                </div>
              ))}
            </div>
          )}
        </div>
        {blok?.media?.[0] && (
          <div
            {...storyblokEditable(blok)}
            className={tw`md:(rounded-xl w-84) xl:(rounded-2xl w-96) w-107 shrink-0 grow-0 content-center overflow-hidden rounded-md`}
          >
            <Image alt="" images={blok.media[0]?.media} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
