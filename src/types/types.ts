import { Slug, PortableTextBlock } from "sanity";

export interface BlogData {
  _id: string;
  title: string;
  categories: string[];
  slug: Slug;
  publishedAt: string;
  mainImage: BlogMainImage;
  body: PortableTextBlock[];
}

interface BlogMainImage {
  asset: {
    _ref: string;
    _type: string;
  };
  alt: string;
  [key: string]: any;
}

export interface BlogContextType {
  categories: string[];
  blogList: BlogData[];
  page: number;
  date: string;
  count: number;
  searchParams: URLSearchParams;
  isLoading: boolean;
  handlePageChange: (arg0: string) => void;
}
