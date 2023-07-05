import { type AppType } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

import { api } from '~/utils/api';

const MyApp: AppType = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Blog</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Head>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  </>
);

export default api.withTRPC(MyApp);
