declare module '*.svg' {
  const content: any;
  export default content;
}
declare module '*.jpg' {
  const content: any;
  export default content;
}
declare module '*.png' {
  const content: any;
  export default content;
}
declare module '*.gif' {
  const content: any;
  export default content;
}
declare module 'react-file-base64';
declare module 'react-stars' {
  import { Component } from 'react';
  
  export interface ReactStarsProps {
    count?: number;
    value?: number;
    size?: number;
    edit?: boolean;
    color1?: string;
    color2?: string;
    half?: boolean;
    onChange?: (newRating: number) => void;
    char?: string;
    className?: string;
  }
  
  export default class ReactStars extends Component<ReactStarsProps> {}
}
