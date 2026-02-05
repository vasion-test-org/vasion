export {};

declare global {
  interface Window {
    MktoForms2?: {
      whenReady: (callback: (form: any) => void) => void;
    };
  }
}
