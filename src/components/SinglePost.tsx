import { PortableText } from "@portabletext/react";
import { urlForImage } from "../sanity/image";
import { RichTextComponents } from "./RichTextComponents";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogData } from "../types/types";
import { getSingleBlog } from "../service/blogService";
//import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";

const SinglePost = () => {
  const [blog, setBlog] = useState<BlogData | null>(null);
  const { slug } = useParams();

  // const { isLoading } = useQuery({
  //   queryKey: ["blog", slug],
  //   queryFn: () => {
  //     if (slug) {
  //       getSingleBlog(slug).then((result) => setBlog(result));
  //     }
  //   },
  // });
  useEffect(() => {
    if (slug) {
      getSingleBlog(slug).then((result) => setBlog(result));
    }
  }, [slug]);

  if (!blog) return <Loader />;

  const { title, mainImage, body } = blog;

  return (
    <>
      <article className="w-full md:w-11/12 bg-primary-600 rounded text-white p-4 mx-auto">
        <h1 className="text-4xl mb-2">{title}</h1>
        {mainImage && (
          <img src={urlForImage(mainImage).url()} alt={mainImage.alt} />
        )}
        <PortableText value={body} components={RichTextComponents} />
      </article>
      <section>
        <h2>Related</h2>
        <div className="fire"></div>
      </section>
    </>
  );
};

export default SinglePost;
