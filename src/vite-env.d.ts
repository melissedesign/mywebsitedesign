/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    'cal-inline': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'cal-link': string;
      style?: React.CSSProperties;
    };
  }
}

interface Window {
  Calendly?: {
    initPopupWidget: (options: { url: string }) => void;
  };
  Cal?: any;
}