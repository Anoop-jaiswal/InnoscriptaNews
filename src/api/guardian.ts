// import axios from "axios";
// import { Article } from "../types/news";

// const API_KEY = import.meta.env.VITE_GUARDIAN_KEY;

// export const fetchGuardian = async (): Promise<Article[]> => {
//   const { data } = await axios.get(
//     `https://content.guardianapis.com/search?api-key=${API_KEY}&show-fields=thumbnail,trailText`
//   );

//   return data.response.results.map((item: any) => ({
//     title: item.webTitle,
//     description: item.fields.trailText,
//     url: item.webUrl,
//     urlToImage: item.fields.thumbnail || "",
//     publishedAt: item.webPublicationDate,
//     source: { name: "The Guardian" },
//   }));
// };

import axios from "axios";
import { Article } from "../types/news";

export const fetchGuardian = async (): Promise<Article[]> => {
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
