export interface Template {
  id: string;
  name: string;
  category: string;
  cover: string;
  tags: string[];
  isHot?: boolean;
  isNew?: boolean;
}

export interface PropertyInfo {
  id?: string;
  communityName: string;
  area: string;
  price: string;
  pricePerSqm: string;
  layout: string;
  floor: string;
  orientation: string;
  decoration: string;
  buildYear: string;
  address: string;
  description: string;
  images: string[];
  features: string[];
}

export interface AgentInfo {
  name: string;
  phone: string;
  company: string;
  avatar: string;
  wechatId: string;
}

export interface Work {
  id: string;
  title: string;
  cover: string;
  community: string;
  templateName: string;
  createTime: string;
  views: number;
  shares: number;
  status: 'published' | 'draft';
}

export interface Copywriting {
  id: string;
  category: string;
  title: string;
  content: string;
  usageCount: number;
}

export interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

export interface FestivalStyle {
  id: string;
  name: string;
  icon: string;
  elements: string[];
}

export interface PlatformSize {
  id: string;
  name: string;
  width: number;
  height: number;
  platform: string;
}

export interface ShareRecord {
  id: string;
  workId: string;
  workTitle: string;
  platform: string;
  shareTime: string;
  views: number;
}
