import type { AppProps } from 'next/app';

import '../assets/globals.css';

function BrochureFront({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default BrochureFront;
