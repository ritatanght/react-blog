import { Link } from "react-router-dom";
import { BlogDataPreview } from "../../types/types";
import { urlForImage } from "../../sanity/image";

interface CardProps {
  post: BlogDataPreview;
}

const PostCard: React.FunctionComponent<CardProps> = ({ post }) => {
  return (
    <article className="w-5/12 md:w-3/12 bg-primary-800 text-white p-3 rounded std-transition hover:bg-primary-400 hover:text-secondary-100">
      <Link
        to={`/blog/${post.slug.current}`}
        className="flex flex-col justify-between h-full"
      >
        <h4 className="leading-5 text-center mb-2 font-bold">{post.title}</h4>
        <img
          src={urlForImage(post.mainImage).url()}
          alt={post.mainImage.alt}
          className="rounded"
        />
      </Link>
    </article>
  );
};

export default PostCard;
