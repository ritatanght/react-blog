import { useState, useEffect } from "react";
import { getRelatedBlogs } from "../../service/blogService";
import { BlogDataPreview } from "../../types/types";
import PostCard from "./PostCard";

interface RelatedProps {
  categories: string[];
  slug: string;
}

const RelatedPosts: React.FunctionComponent<RelatedProps> = ({
  categories,
  slug,
}) => {
  const [posts, setPosts] = useState<BlogDataPreview[]>([]);

  useEffect(() => {
    getRelatedBlogs(categories, slug).then((result) => {
      setPosts(result);
    });
  }, [categories, slug]);

  return (
    <section>
      {posts.length > 0 && (
        <>
          <h3 className="hand-font text-3xl text-center mt-4 font-bold">
            Related Posts
          </h3>
          <div className="flex gap-4 flex-wrap justify-center">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default RelatedPosts;
