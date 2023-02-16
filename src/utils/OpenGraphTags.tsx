import { FC, Fragment } from "react";

const OpenGraphTags: FC = () => {
  return (
    <Fragment>
      <meta
        property="og:url"
        content="https://topshopes.com"
      />
      {/* thumbnail And title for social media */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Topshopes - Marketplace" />
      <meta
        property="og:description"
        content="Topshopes is a Marketplace for buying and selling products."
      />
      <meta property="og:image" content="/assets/images/landing/preview.jpeg" />
    </Fragment>
  );
};

export default OpenGraphTags;
