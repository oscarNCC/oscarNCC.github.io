declare module 'react-scroll' {
  import { ComponentType } from 'react';
  export interface LinkProps {
    to: string;
    smooth?: boolean;
    duration?: number;
    href?: string;
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
  }
  export const Link: ComponentType<LinkProps>;
}
