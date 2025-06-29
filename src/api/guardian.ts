import axios from "axios";
import { Article } from "../types/news";

const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;

const sectionMap: Record<string, string> = {
  Technology: "technology",
  Health: "lifeandstyle",
  Business: "business",
  Science: "science",
  Environment: "environment",
  Sports: "sport",
  Entertainment: "culture",
};

export const fetchGuardian = async (): Promise<Article[]> => {
  const allArticles: Article[] = [];

  const entries = Object.entries(sectionMap);
  for (const [category, section] of entries) {
    const { data } = await axios.get(
      `https://content.guardianapis.com/search?section=${section}&api-key=${API_KEY}&show-fields=trailText,thumbnail,byline,body`
    );

    const articles: Article[] = (data.response.results || []).map(
      (item: any, index: number): Article => ({
        id: `guardian-${section}-${index}`,
        title: item.webTitle,
        description: item.fields?.trailText || "",
        content: item.fields?.body || "",
        url: item.webUrl,
        imageUrl: item.fields?.thumbnail || "",
        publishedAt: item.webPublicationDate,
        source: { name: "The Guardian" },
        author: item.fields?.byline || "Unknown",
        category,
      })
    );

    allArticles.push(...articles);
  }

  return allArticles;
};
