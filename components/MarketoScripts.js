'use client';

import Script from 'next/script';

export default function MarketoScripts() {
  return (
    <>
      {/* Marketo Munchkin */}
      <Script
        id='marketo-munchkin'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
      (function() {
        var didInit = false;
        function initMunchkin() {
          if(didInit === false) {
            didInit = true;
            Munchkin.init('338-HTA-134');
          }
        }
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//munchkin.marketo.net/munchkin.js';
        s.onreadystatechange = function() {
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
            initMunchkin();
          }
        };
        s.onload = initMunchkin;
        document.getElementsByTagName('head')[0].appendChild(s);
      })();
    `,
        }}
      />

      {/* Marketo Forms2 */}
      <Script
        id='marketo-forms'
        strategy='afterInteractive'
        src='https://info.printerlogic.com/js/forms2/js/forms2.min.js'
        onLoad={() => {
          if (typeof window !== 'undefined') {
            window.MktoForms2 = window.MktoForms2 || {};
          }
        }}
      />
    </>
  );
}
