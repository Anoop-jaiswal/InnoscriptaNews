// import axios from "axios";
// import { Article } from "../types/news";

// const API_KEY = import.meta.env.VITE_NEWSAPI_KEY;

// export const fetchNewsAPI = async (): Promise<Article[]> => {
//   const { data } = await axios.get("https://newsapi.org/v2/top-headlines", {
//     params: {
//       country: "us",
//       apiKey: API_KEY,
//     },
//   });

//   return data.articles.map((item: any) => ({
//     title: item.title,
//     description: item.description,
//     url: item.url,
//     urlToImage: item.urlToImage,
//     publishedAt: item.publishedAt,
//     source: { name: item.source.name },
//   }));
// };

import axios from "axios";
import { Article } from "../types/news";

export const fetchNewsAPI = async (): Promise<Article[]> => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return data.map((item: any) => ({
    title: item.title,
    description: item.body,
    url: `https://jsonplaceholder.typicode.com/posts/${item.id}`,
    urlToImage: "", // JSONPlaceholder doesn't provide images
    publishedAt: new Date().toISOString(), // mock current date as placeholder
    source: { name: "JSONPlaceholder" },
  }));
};
