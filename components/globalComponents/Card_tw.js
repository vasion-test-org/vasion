import React from 'react';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Image from '@/components/globalComponents/Image';
import Button from '@/components/globalComponents/Button';
import { storyblokEditable } from '@storyblok/react/rsc';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAvailableThemes } from '@/context/ThemeContext';

const Card_tw = ({ content, paginated, borderradius }) => {
  const pathname = usePathname();
  const themes = useAvailableThemes();
  const selectedTheme = themes.default;
  const cardBg = selectedTheme?.centered?.card_bg || selectedTheme?.centered?.background || '#FFFFFF';
  
  const buttonData = content.Button?.[0];
  const isEmail = buttonData?.link_url?.email;
  const rawHref = isEmail
    ? `mailto:${buttonData?.link_url.email}`
    : buttonData?.link_url?.cached_url || '#';

  const target = buttonData?.link_url?.target;
  const rel = target === '_blank' ? 'noopener noreferrer' : undefined;

  const isExternal = rawHref.startsWith('http');
  const alreadyLocalized =
    rawHref.startsWith('/de') ||
    rawHref.startsWith('/fr') ||
    rawHref.startsWith('/en');

  const slugParts = pathname.split('/').filter(Boolean);
  const currentLocale = ['de', 'fr'].includes(slugParts[0])
    ? slugParts[0]
    : null;

  const normalizedUrl =
    isEmail || isExternal || alreadyLocalized
      ? rawHref
      : `/${currentLocale ?? ''}/${rawHref}`.replace(/\/+/g, '/');

  // Check if there's a valid URL to link to
  const hasValidUrl = rawHref && rawHref !== '#' && rawHref !== '';

  // Get base card classes
  const getCardClasses = () => {
    const base = 'no-underline text-inherit flex flex-col overflow-hidden text-left p-[0.5vw] gap-[1vw] rounded-[1vw] transition-colors duration-300 ease-[ease] fullWidth:gap-4 fullWidth:rounded-[16px] tablet:gap-[1.563vw] tablet:rounded-[1.563vw] mobile:gap-[3.333vw] mobile:rounded-[3.333vw]';
    
    const width = 'w-[clamp(21.875vw,100%,25.5vw)] fullWidth:w-[clamp(350px,100%,408px)] tablet:w-[clamp(29.102vw,100%,44.922vw)] mobile:w-[clamp(89.167vw,100%,89.167vw)]';
    
    const height = paginated ? 'h-min' : 'h-auto';
    
    const cursor = hasValidUrl ? 'cursor-pointer' : 'cursor-default';
    
    const blur = content?.blur_card 
      ? 'blur-[0.25vw] fullWidth:blur-[4px] tablet:blur-[0.391vw] mobile:hidden' 
      : '';
    
    return `${base} ${width} ${height} ${cursor} ${blur}`.trim();
  };

  // Get hover background style
  const getHoverStyle = () => {
    if (content?.has_hover && hasValidUrl) {
      return {
        background: 'linear-gradient(180deg, #7E5FDD 0%, #583F99 100%)',
      };
    }
    return {};
  };

  // Get box shadow - using style tag for responsive values
  const cardId = `card-${content._uid || Math.random().toString(36).substr(2, 9)}`;

  const WrapperContent = (
    <>
      {content.Image && (
        <div>
          <Image
            imageAlt={content.Image.alt}
            filename={content.Image.filename}
            borderradius={borderradius || content.image_border}
          />
        </div>
      )}
      <div className="flex flex-col h-full pt-0 pr-[0.5vw] pb-[0.5vw] pl-[0.5vw] gap-[1vw] fullWidth:pt-0 fullWidth:pr-2 fullWidth:pb-2 fullWidth:pl-2 fullWidth:gap-4 tablet:pt-0 tablet:pr-[0.781vw] tablet:pb-[0.781vw] tablet:pl-[0.781vw] tablet:gap-[1.563vw] mobile:pt-0 mobile:pr-[1.667vw] mobile:pb-[1.667vw] mobile:pl-[1.667vw] mobile:gap-[3.333vw]">
        {content.content.map((copy, index) => (
          <div key={copy._uid || `card-copy-${index}`} {...storyblokEditable(copy)}>
            <RichTextRenderer className={copy.component} document={copy.copy} />
          </div>
        ))}
        {buttonData && (
          <div className="mt-auto">
            <Button $buttonData={buttonData} />
          </div>
        )}
      </div>
    </>
  );

  const cardStyle = {
    background: cardBg,
  };

  // Box shadow styles with responsive breakpoints
  const boxShadowStyle = {
    boxShadow: '0vw 0vw 0.063vw 0vw rgba(25, 29, 30, 0.04), 0vw 0.125vw 0.25vw 0vw rgba(25, 29, 30, 0.16)',
  };

  const CardElement = ({ children, ...props }) => {
    return (
      <>
        <style>{`
          [data-card-id="${cardId}"] {
            box-shadow: 0vw 0vw 0.063vw 0vw rgba(25, 29, 30, 0.04), 0vw 0.125vw 0.25vw 0vw rgba(25, 29, 30, 0.16);
          }
          @media (min-width: 1601px) {
            [data-card-id="${cardId}"] {
              box-shadow: 0px 0px 1px 0px rgba(25, 29, 30, 0.04), 0px 2px 4px 0px rgba(25, 29, 30, 0.16);
            }
          }
          @media (min-width: 481px) and (max-width: 1024px) {
            [data-card-id="${cardId}"] {
              box-shadow: 0vw 0vw 0.098vw 0vw rgba(25, 29, 30, 0.04), 0vw 0.195vw 0.391vw 0vw rgba(25, 29, 30, 0.16);
            }
          }
          @media (max-width: 480px) {
            [data-card-id="${cardId}"] {
              box-shadow: 0vw 0vw 0.208vw 0vw rgba(25, 29, 30, 0.04), 0vw 0.417vw 0.833vw 0vw rgba(25, 29, 30, 0.16);
            }
          }
        `}</style>
        {children}
      </>
    );
  };

  // Only wrap in Link if there's a valid URL and target is not "_blank"
  if (hasValidUrl && target !== '_blank') {
    return (
      <CardElement>
        <Link href={normalizedUrl} passHref legacyBehavior>
          <a
            data-card-id={cardId}
            className={`${getCardClasses()} ${content?.has_hover && hasValidUrl ? 'hover:bg-gradient-to-b hover:from-[#7E5FDD] hover:to-[#583F99]' : ''}`}
            style={cardStyle}
            {...storyblokEditable(content)}
          >
            {WrapperContent}
          </a>
        </Link>
      </CardElement>
    );
  } else if (hasValidUrl && target === '_blank') {
    return (
      <CardElement>
        <a
          data-card-id={cardId}
          href={normalizedUrl}
          target={target}
          rel={rel}
          className={`${getCardClasses()} ${content?.has_hover && hasValidUrl ? 'hover:bg-gradient-to-b hover:from-[#7E5FDD] hover:to-[#583F99]' : ''}`}
          style={cardStyle}
          {...storyblokEditable(content)}
        >
          {WrapperContent}
        </a>
      </CardElement>
    );
  } else {
    // No valid URL, just render the card without link wrapper
    return (
      <CardElement>
        <div
          data-card-id={cardId}
          className={getCardClasses()}
          style={cardStyle}
          {...storyblokEditable(content)}
        >
          {WrapperContent}
        </div>
      </CardElement>
    );
  }
};

export default Card_tw;

