import client from "../sanity/client";
const paginated = 2;
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
 }]| order(publishedAt desc)[0...2]{
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
    throw new Error("Failed to blog list");
  }
  return data;
}

export async function getPrevBlogs(date: string = "", page: number) {
  const query = `
 *[_type == 'post' ${
   date && "&& publishedAt >= '" + date + "'"
 }]| order(publishedAt desc)[${page * paginated}...${
    page * paginated + paginated
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
    throw new Error("Failed to blog list");
  }
  return data;
}

export async function getSingleBlog(slug: string) {
  const res = await client.fetch(`*[_type=="post" && slug.current=="${slug}"]`);
  if (!res) {
    throw new Error("Failed to blog details");
  }
  return res[0];
}

export async function getBlogResults(
  search: string = "",
  category: string = "",
  // beforeDate: string = "",
  // afterDate: string = "",
  page: number
) {
  /*
  let query = `
 *[_type == 'post' ${
   date && "&&  publishedAt < " + date
 }]| order(publishedAt desc) [0...5]{
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
  */
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
  // if (beforeDate) {
  //   query += "&& publishedAt < " + beforeDate;
  // }
  // if (afterDate) {
  //   query += "&& publishedAt > " + afterDate;
  // }
  const count = await client.fetch(`count(${query}])`);
  query += `]| order(publishedAt desc) [${page * paginated}...${
    page * paginated + paginated
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
    throw new Error("Failed to blog list");
  }
  return { data, count };
}
