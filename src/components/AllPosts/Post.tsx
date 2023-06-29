import { Link } from "react-router-dom";
import { urlForImage } from "../../sanity/image";

const Post = ({ post }: any) => {
  const {
    mainImage,
    body,
    categories,
    publishedAt,
    slug: { current: postSlug },
  } = post;

  return (
    <article className="p-4 bg-primary-800 text-white mb-4 rounded">
      <Link to={`/blog/${encodeURIComponent(postSlug)}`}>
        <h2 className="text-3xl md:text-4xl">{post.title}</h2>
      </Link>
      {mainImage && (
        <img
          src={urlForImage(mainImage).url()}
          alt={mainImage.alt}
          className="text-center py-4 px-10 mx-auto"
        />
      )}
      <p className="inline-block">
        {body.split(" ").slice(0, 50).join(" ")}...
      </p>{" "}
      <div className="md:text-right">
        <Link
          to={`/blog/${encodeURIComponent(postSlug)}`}
          className="block md:inline-block ml-auto mr-0 text-center std-transition font-bold p-2 mt-2 rounded bg-primary-100 text-primary-700 hover:bg-primary-500 hover:text-white"
        >
          Read More
        </Link>
      </div>
      <div className="md:flex gap-2 items-center justify-between my-2">
        <div className="inline-block">
          Category:
          {categories && (
            <ul className="inline-flex gap-2 ml-2">
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
        <span className="block md:text-right text-sm text-primary-200">
          {new Date(publishedAt).toLocaleDateString("en-CA", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
      </div>
    </article>
  );
};

export default Post;
