// import axios from "axios";
// import { Article } from "../types/news";

// const API_KEY = import.meta.env.VITE_NYTIMES_KEY;

// export const fetchNYTimes = async (): Promise<Article[]> => {
//   const { data } = await axios.get(
//     `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`
//   );

//   return data.results.map((item: any) => ({
//     title: item.title,
//     description: item.abstract,
//     url: item.url,
//     urlToImage: item.multimedia?.[0]?.url || "",
//     publishedAt: item.published_date,
//     source: { name: "NYTimes" },
//   }));
// };

import axios from "axios";
import { Article } from "../types/news";

export const fetchNYTimes = async (): Promise<Article[]> => {
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
