import Head from 'next/head';
import { UniformAppProps } from '@uniformdev/context-next';
import { UniformContext } from '@uniformdev/context-react';
import type { RootComponentInstance } from '@uniformdev/canvas';
import { LazyMotion, domAnimation } from 'framer-motion';
import createUniformContext from '@/context/createUniformContext';
import '@/canvas';
import '../styles/globals.scss';

const clientContext = createUniformContext();

const App = ({
  Component,
  pageProps,
  serverUniformContext,
}: UniformAppProps<{ data: RootComponentInstance; context: unknown }>) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="version" content={process.env.NEXT_PUBLIC_APP_VERSION} />
      </Head>
      <LazyMotion features={domAnimation}>
        <UniformContext context={serverUniformContext ?? clientContext}>
          <Component {...pageProps} />
        </UniformContext>
      </LazyMotion>
    </>
  );
};

export default App;
