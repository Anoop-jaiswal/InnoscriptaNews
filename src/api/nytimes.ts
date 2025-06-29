import axios from "axios";
import { Article } from "../types/news";

const API_KEY = import.meta.env.VITE_NY_API_KEY ;

const categories = [
  "Technology",
  "Health",
  "Business",
  "Science",
  "Environment",
  "Sports",
  "Entertainment",
];

export const fetchNYTimes = async (): Promise<Article[]> => {
  const allArticles: Article[] = [];

  for (const category of categories) {
    const query = `new-york-times+${category.toLowerCase()}`;
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;

    try {
      const { data } = await axios.get(url);

      const articles: Article[] = (data.articles || []).map(
        (item: any, index: number): Article => ({
          id: `nytimes-${category}-${index}`,
          title: item.title,
          description: item.description || "",
          content: item.content || "",
          url: item.url,
          imageUrl: item.urlToImage || "",
          publishedAt: item.publishedAt,
          source: {
            name: "New York Times",
          },
          author: item.author || "Unknown",
          category,
        })
      );

      allArticles.push(...articles);
    } catch (error) {
      console.error(
        `Failed to fetch NYT articles for category "${category}"`,
        error
      );
    }
  }

  return allArticles;
};
