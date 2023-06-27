import { Link } from "react-router-dom";
import { urlForImage } from "../sanity/image";

const Post = ({ post }: any) => {
  const { mainImage, body, categories, publishedAt } = post;

  return (
    <article className="p-4 bg-secondary-dark text-white mb-4 rounded">
      <Link to={`/blog/${encodeURIComponent(post.slug.current)}`}>
        <h2 className="text-4xl ">{post.title}</h2>
      </Link>
      <span className="block text-right text-sm text-primary-300 mb-2">
        {new Date(publishedAt).toLocaleDateString("zh-hk", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </span>
      {mainImage && (
        <img
          src={urlForImage(mainImage).url()}
          alt={mainImage.alt}
          className="text-center"
        />
      )}
      <p className="inline-block">{body.split("").slice(0, 80).join("")}...</p>{" "}
      <Link
        to={`/blog/${encodeURIComponent(post.slug.current)}`}
        className="block text-center transition ease-in-out duration-500 font-bold p-2 my-2 rounded bg-primary-100 text-primary-600 md:float-right hover:bg-primary-500 hover:text-primary-100"
      >
        Read More
      </Link>
      <div className="flex gap-2 items-center my-2 md:my-4">
        分類:
        {categories && (
          <ul className="flex gap-2">
            {categories.map((category: string) => (
              <li key={category}>
                <Link
                  className="text-primary-100 hover:underline"
                  to={`/blog?category=${category}`}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
};

export default Post;
