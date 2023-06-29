import { Link } from "react-router-dom";
import { urlForImage } from "../../sanity/image";
import { PortableTextComponents } from "@portabletext/react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import getYouTubeId from "get-youtube-id";

export const RichTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="w-full h-200 m-10 mx-auto">
          <img
            className="object-contain"
            alt={value.alt || " "}
            src={urlForImage(value).url()}
          />
        </div>
      );
    },
    youtube: ({ value }) => {
      const { url } = value;
      const id = getYouTubeId(url);
      if (!id) {
        return null;
      }
      return <LiteYouTubeEmbed id={id} title="YouTube Embed" />;
    },
  },
  list: {
    bullet: ({ children }) => <ul className="ml-10 list-disc">{children}</ul>,
    number: ({ children }) => (
      <ol className="ml-10 list-decimal">{children}</ol>
    ),
  },

  block: {
    h1: ({ children }: any) => (
      <h1 className="text-5xl py-5 font-bold">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-4xl py-4 font-bold">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-3xl py-4 font-bold">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-2xl py-4 font-bold">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="bg-primary-700 p-5 my-2 rounded">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => <p className="p-3">{children}</p>,
  },

  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link
          to={value.href}
          rel={rel}
          className="underline hover:text-primary-300"
        >
          {children}
        </Link>
      );
    },
  },
};
