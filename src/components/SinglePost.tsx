import client from "../sanity/client";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "../sanity/image";
import { RichTextComponents } from "./RichTextComponents";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogData } from "../types/types";

//export const SinglePost = async ({ params }: { params: { slug: string } }) => {
const SinglePost = () => {
  const [blog, setBlog] = useState<BlogData | null>(null);
  const { slug } = useParams();
  useEffect(() => {
    if (slug) {
      getBlog(slug).then((result) => setBlog(result));
    }
  }, [slug]);
  console.log(blog);

  if (!blog) return <>Loading</>;

  const { title, mainImage, body } = blog;

  return (
    <>
      <article className="w-11/12 bg-primary-600 rounded text-white p-4 mx-auto">
        <h1 className="text-4xl mb-2">{title}</h1>
        {mainImage && (
          <img src={urlForImage(mainImage).url()} alt={mainImage.alt} />
        )}
        <PortableText value={body} components={RichTextComponents} />
      </article>
      <section>
        <h2>Related</h2>
      </section>
    </>
  );
};

export default SinglePost;

async function getBlog(slug: string) {
  const res = await client.fetch(`*[_type=="post" && slug.current=="${slug}"]`);
  if (!res) {
    throw new Error("Failed to blog details");
  }
  return res[0];
}
