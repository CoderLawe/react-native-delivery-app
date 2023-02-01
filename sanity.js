import sanityClient from "@sanity/client";

import imageUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: "b7nklrlw",
  dataset: "production",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  token:
    "skiNzJyhP9ufRGibGS9VEo7yWmXmvHrPXrhgvrTbPFUty8qRGbluIOEVhkJeU6kSaG3K5ikYxm3Cc1WPhifyTBsZd1Q7RfpNGFRjCEcbX8scEsiAavVdIXeIn9xOM5caOTdOCrnFaSzqeHYDHHBUxjUVQNpaAD08DiBdOUJ6xhXyL7zpThxP", // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;
