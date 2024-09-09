export enum TrendingPeriod {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
};

export interface TrendingItem {
  website: string;
  websiteLabel: string;
  id: string;
  link: string;
  title: string;
  description: string;
  label: string;
  image: string;
  extra: string;
}
