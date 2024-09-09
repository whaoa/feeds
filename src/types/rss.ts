export interface RSSFeedItem {
  link: string;
  title: string;
  description?: string;
  author?: string;
  date?: string;
}

export interface RSSFeed {
  feed: string;
  date: string;
  title: string;
  description: string;
  link: string;
  items: RSSFeedItem[];
}
