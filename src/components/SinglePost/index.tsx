import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "./RichTextComponents";
import Loader from "../Loader";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleBlog } from "../../service/blogService";
import { urlForImage } from "../../sanity/image";
import { TiArrowBack } from "react-icons/ti";
import { BlogData } from "../../types/types";

const SinglePost = () => {
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      getSingleBlog(slug)
        .then((result) => {
          setBlog(result);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [slug]);

  if (isLoading) return <Loader />;
  if (!blog)
    return (
      <h1 className="text-center text-4xl hand-font my-4">Post Not found</h1>
    );

  const { title, mainImage, body, publishedAt } = blog;

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center border-2 p-1 mb-1 text-primary-600 rounded hover:text-secondary-100"
      >
        <TiArrowBack className="text-xl" /> Back
      </button>
      <article className="w-full md:w-11/12 bg-primary-700 rounded text-white p-4 mx-auto">
        <h1 className="text-4xl mb-2">{title}</h1>
        {mainImage && (
          <img src={urlForImage(mainImage).url()} alt={mainImage.alt} />
        )}
        <PortableText value={body} components={RichTextComponents} />
        <span className="block md:text-right text-sm text-primary-100">
          {new Date(publishedAt).toLocaleDateString("en-CA", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
      </article>
    </>
  );
};

export default SinglePost;
