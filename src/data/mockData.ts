import { Article } from '../types';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Revolutionary AI Breakthrough Changes Everything We Know About Machine Learning',
    description: 'Scientists at leading tech companies have announced a groundbreaking discovery that could reshape the future of artificial intelligence and computing.',
    content: 'A comprehensive analysis of the latest developments in AI research...',
    url: 'https://example.com/ai-breakthrough',
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2024-01-15T10:30:00Z',
    source: { id: 'tech-news', name: 'Tech News Daily' },
    author: 'Sarah Johnson',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Global Climate Summit Reaches Historic Agreement on Carbon Emissions',
    description: 'World leaders unite in unprecedented commitment to reduce global carbon footprint by 50% within the next decade.',
    content: 'In a landmark decision that will shape environmental policy...',
    url: 'https://example.com/climate-summit',
    imageUrl: 'https://images.pexels.com/photos/9591565/pexels-photo-9591565.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2024-01-14T15:45:00Z',
    source: { id: 'global-news', name: 'Global News Network' },
    author: 'Michael Chen',
    category: 'Environment'
  },
  {
    id: '3',
    title: 'Breakthrough Medical Treatment Shows 95% Success Rate in Clinical Trials',
    description: 'New gene therapy treatment offers hope for millions of patients suffering from rare genetic disorders.',
    content: 'Medical researchers have developed a revolutionary treatment...',
    url: 'https://example.com/medical-breakthrough',
    imageUrl: 'https://images.pexels.com/photos/6749772/pexels-photo-6749772.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2024-01-13T09:15:00Z',
    source: { id: 'health-today', name: 'Health Today' },
    author: 'Dr. Emily Rodriguez',
    category: 'Health'
  },
  {
    id: '4',
    title: 'Stock Markets Surge as Tech Giants Report Record Quarterly Earnings',
    description: 'Major technology companies exceed analyst expectations, driving significant market gains across all sectors.',
    content: 'The financial markets experienced unprecedented growth...',
    url: 'https://example.com/market-surge',
    imageUrl: 'https://images.pexels.com/photos/7948047/pexels-photo-7948047.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2024-01-12T14:20:00Z',
    source: { id: 'finance-wire', name: 'Finance Wire' },
    author: 'Robert Thompson',
    category: 'Business'
  },
  {
    id: '5',
    title: 'Space Exploration Mission Discovers Potentially Habitable Exoplanet',
    description: 'NASA announces discovery of Earth-like planet in habitable zone, raising possibilities for extraterrestrial life.',
    content: 'A team of international astronomers has identified...',
    url: 'https://example.com/exoplanet-discovery',
    imageUrl: 'https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2024-01-11T11:30:00Z',
    source: { id: 'space-news', name: 'Space News' },
    author: 'Dr. Amanda Foster',
    category: 'Science'
  },
  {
    id: '6',
    title: 'Renewable Energy Adoption Reaches Record High Globally',
    description: 'Solar and wind power installations surpass traditional energy sources for the first time in history.',
    content: 'The transition to renewable energy has reached a historic milestone...',
    url: 'https://example.com/renewable-energy',
    imageUrl: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishedAt: '2024-01-10T16:45:00Z',
    source: { id: 'energy-today', name: 'Energy Today' },
    author: 'James Wilson',
    category: 'Environment'
  }
];

export const categories = [
  'All Categories',
  'Technology',
  'Health',
  'Business',
  'Science',
  'Environment',
  'Sports',
  'Entertainment'
];

export const sources = [
  "All Sources",
  "NewsAPI",
  "The Guardian",
  "New York Times",
];