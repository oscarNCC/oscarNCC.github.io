export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  demo?: string;
  /** 例如 TVB 訪問等 YouTube 連結 */
  videoUrl?: string;
  previewGif?: string;
  /** 多張圖輪播預覽（與 gif player 同款樣式） */
  previewMedia?: string[];
  inProgress?: boolean;
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
