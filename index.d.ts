declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}
