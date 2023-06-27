export const data = [
  {
    body: "食譜：(A材料）低筋麵粉 100g梳打粉 1/8茶匙泡打粉 1/4茶匙鹽 少許 （B材料）水 10ml油 20ml糖 55g蛋 20g 另備：芝麻 做法：10-12塊  1.所有（A材料）過篩一次備用 2. （B材料）全放入盤撈勻  3. 將A材料+B材料撈勻搓成糰直至無粉粒 4. 搓圓按扁沾上芝麻，放焗爐 底層 170度焗25分鐘或至金黃色",
    publishedAt: "2023-06-23T02:50:00.000Z",
    mainImage: {
      asset: {
        _id: "image-3d74bdee9595cf55b0acb320fb1c98c0450476f0-289x116-gif",
        url: "https://cdn.sanity.io/images/iw9c0m7h/production/3d74bdee9595cf55b0acb320fb1c98c0450476f0-289x116.gif",
      },
      alt: "rita",
    },
    categories: ["Food", "Recipe"],
    title: "芝麻脆餅",
    _id: "bf41ddbe-dede-4c97-8c48-d945fe1b193e",
    slug: {
      current: "芝麻脆餅",
      _type: "slug",
    },
  },
  {
    categories: ["Coding"],
    title: "Paginating with GROQ",
    _id: "f39160b7-f920-4b4d-bc5f-330a0157424f",
    slug: {
      current: "paginating-with-groq",
      _type: "slug",
    },
    body: "The very first page: *[_type == 'article'] | order(_id) [0...100] {    _id, title, body }  Once we have that information, we can plug it back into our next query as a query parameter: *[_type == 'article' && _id > $lastId] | order(_id) [0...100] {_id, title, body}",
    publishedAt: "2023-06-21T20:02:00.000Z",
    mainImage: {
      alt: "Pagination",
      asset: {
        _id: "image-614df820093ff10922c59ed1dc14adfb61ea4321-2316x1080-jpg",
        url: "https://cdn.sanity.io/images/iw9c0m7h/production/614df820093ff10922c59ed1dc14adfb61ea4321-2316x1080.jpg",
      },
    },
  },
];
