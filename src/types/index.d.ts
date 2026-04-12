/** 作品集分頁：Website / Mobile / AI */
export type ProjectCategory = 'website' | 'mobile' | 'ai';

export type ProjectTabId = 'all' | ProjectCategory;

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  /** 用於首頁與專案頁分頁篩選（可多選，例如同時屬於 Mobile 與 AI） */
  categories: ProjectCategory[];
  link?: string;
  demo?: string;
  /** 例如 TVB 訪問等 YouTube 連結 */
  videoUrl?: string;
  previewGif?: string;
  /** 多張圖輪播預覽（與 gif player 同款樣式） */
  previewMedia?: string[];
  inProgress?: boolean;
  /** Internal route path (same-tab navigation via react-router) */
  route?: string;
  tags: string[];
  featured?: boolean;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  tagline: string;
  avatar?: string;
  bio?: string;
  socialLinks: SocialLink[];
}

export interface Experience {
  id: string;
  title: string;
  period: string;
  description: string;
}
