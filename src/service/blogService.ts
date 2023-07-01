import client from "../sanity/client";
import { paginate } from "../context/blogContext-orig";
export async function getCategories() {
  const data = await client.fetch(`*[_type == 'category']{
 title
 }`);
  return data;
}

export async function getCount() {
  const count = await client.fetch('count(*[_type == "post"])');
  return count;
}

export async function getBlogs(date: string = "") {
  const query = `
 *[_type == 'post' ${
   date && "&& publishedAt < '" + date + "'"
 }]| order(publishedAt desc)[0...${paginate}]{
  title,
    _id, 
    slug,
    "body":pt::text(body),
    publishedAt,
    mainImage{  
    asset -> {
          _id,
          url
        },
        alt},
  "categories": categories[]->title}`;
  return getData(query);
}

export async function getPrevBlogs(date: string = "", page: number) {
  const query = `
  *[_type == 'post' ${
    date && "&& publishedAt >= '" + date + "'"
  }]| order(publishedAt desc)[${page * paginate}...${
    page * paginate + paginate
  }]{
  title,
    _id, 
    slug,
    "body":pt::text(body),
    publishedAt,
    mainImage{  
    asset -> {
          _id,
          url
        },
        alt},
  "categories": categories[]->title}`;

  return getData(query);
}

export async function getSingleBlog(slug: string) {
  const blog = await client.fetch(
    `*[_type=="post" && slug.current=="${slug}"]`
  );
  if (!blog) {
    throw new Error("Failed to fetch blog details");
  }
  return blog[0];
}

export async function getBlogResults(
  search: string = "",
  category: string = "",
  page: number
) {
  let query = "*[_type == 'post' ";
  if (search) {
    query +=
      "&& title match '" +
      decodeURIComponent(search) +
      "' || body[].children[].text match '" +
      decodeURIComponent(search) +
      "'";
  }
  if (category) {
    query += `&& '${category}' in categories[]->title`;
  }
  let count = null;
  if (page === 0) {
    count = await client.fetch(`count(${query}])`);
  }
  query += `]| order(publishedAt desc) [${page * paginate}...${
    page * paginate + paginate
  }]{
  title,
    _id, 
    slug,
    "body":pt::text(body),
    publishedAt,
    mainImage{  
    asset -> {
          _id,
          url
        },
        alt},
  "categories": categories[]->title}`;
  const data = await client.fetch(query);
  if (!data) {
    throw new Error("Failed to fetch blog list");
  }
  return { data, count };
}

async function getData(query: string) {
  const data = await client.fetch(query);

  if (!data) {
    throw new Error("Failed to fetch blog list");
  }
  return data;
}
