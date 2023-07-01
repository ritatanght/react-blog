import { Slug, PortableTextBlock } from "sanity";

interface BlogBase {
  _id: string;
  title: string;
  categories: string[];
  slug: Slug;
  publishedAt: string;
  mainImage: BlogMainImage;
}

export interface BlogData extends BlogBase {
  type: "blogContent";
  body: PortableTextBlock[];
}

export interface BlogDataPreview extends BlogBase {
  type: "blogPreview";
  body: string;
}

interface BlogMainImage {
  asset: {
    _id: string;
    url: string;
    _ref: string;
    _type: string;
  };
  alt: string;
  [key: string]: any;
}

export interface BlogContextType {
  blogList: BlogData[];
  page: number;
  date: string;
  count: number;
  pageAction: string;
  isLoading: boolean;
  searchParams: URLSearchParams;
  handlePageChange: (arg0: string) => void;
  getPrevPosts: () => void;
  getNextPosts: () => void;
  queryPosts: () => void;
  resetQueryResults: () => void;
}
