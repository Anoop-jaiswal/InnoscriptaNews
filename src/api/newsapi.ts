import axios from "axios";
import { Article } from "../types/news";

const API_KEY = "f64c11605bc24fa78ed366b76c10f6f6";

const supportedCategories = [
  "technology",
  "health",
  "business",
  "science",
  "sports",
  "entertainment",
];

export const fetchNewsAPI = async (): Promise<Article[]> => {
  const allArticles: Article[] = [];

  for (const category of supportedCategories) {
    const { data } = await axios.get(
      `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${API_KEY}`
    );

    const articles: Article[] = (data.articles || []).map(
      (item: any, index: number): Article => ({
        id: `newsapi-${category}-${index}`,
        title: item.title,
        description: item.description || "",
        content: item.content || "",
        url: item.url,
        imageUrl: item.urlToImage || "",
        publishedAt: item.publishedAt,
        source: { name: "NewsAPI" },
        author: item.author || "Unknown",
        category: category.charAt(0).toUpperCase() + category.slice(1),
      })
    );

    allArticles.push(...articles);
  }

  return allArticles;
};
