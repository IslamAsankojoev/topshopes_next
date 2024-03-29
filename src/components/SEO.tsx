import Head from 'next/head';
import { FC } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  sitename?: string;
}
const SEO: FC<SEOProps> = ({ title, description, sitename = 'Topshopes' }) => {
  return (
    <Head>
      <title>
        {title} | {sitename}
      </title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default SEO;
