export {};

declare global {
  interface Window {
    MktoForms2?: {
      whenReady: (callback: (form: any) => void) => void;
    };
    grecaptcha?: {
      render: (container: Element, params: Record<string, unknown>) => number;
      getResponse: (widgetId?: number) => string;
      execute: (widgetId?: number) => void;
      reset: (widgetId?: number) => void;
    };
    onRecaptchaLoaded?: () => void;
  }
}
