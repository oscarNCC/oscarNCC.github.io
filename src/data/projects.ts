import type { Project, ProjectTabId } from '../types';

/** 首頁／專案頁分頁選項（All + 三類） */
export const PROJECT_TABS: { id: ProjectTabId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'website', label: 'Website' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ai', label: 'AI' },
];

export function filterProjectsByTab(list: Project[], tab: ProjectTabId): Project[] {
  if (tab === 'all') return list;
  return list.filter((p) => p.categories.includes(tab));
}

export const projects: Project[] = [
  {
    id: 'challenger-sale',
    title: 'The Challenger Sale',
    description: 'An AI Chatbot that uses "The Challenger Sale" tactics to disrupt the status quo, teaching Alberta clients about hidden risks and taking control of the conversation to drive insurance sales.',
    image: '/The-Challenger-Sale.webp',
    route: '/projects/challenger-sale',
    tags: [
      'AI Chatbot', 
      'LangGraph', 
      'Llama 3.1', 
      'RAG', 
      'Fine-tuning', 
      'Unsloth',
      'Sales Methodology', 
      'Behavioral Modeling',
      'Alberta Insurance Logic'
    ],
    categories: ['ai'],
    featured: true,
    inProgress: true,
  },
  {
    id: 'tradesim',
    title: 'TradeSim',
    description: 'Trading simulator platform with live analysis, trade records, win rate metrics, and tick-by-tick stream simulation. Built with Python, Dash and Plotly. Supports Databento API.',
    image: '/TradeSim.webp',
    inProgress: false,
    previewGif: '/TradeSim.gif',
    tags: [
      'Python',
      'Dash',
      'Plotly',
      'Databento API',
      'Tick-by-tick',
      'Trading Simulator',
    ],
    categories: ['website'],
    featured: true,
  },
  {
    id: 'tradeforge',
    title: 'TradeForge',
    description: 'A high-performance trading journal and analytics platform featuring a neon-aesthetic dashboard, real-time performance metrics, equity curve visualization, and detailed trade logging to help traders optimize their strategies.',
    image: '/TradeForge.webp',
    link: 'https://github.com/oscarNCC/TradeForge',
    demo: 'https://golden-entremet-c0911a.netlify.app/',
    previewGif: '/TradeForge.gif',
    tags: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Zustand",
      "Tailwind CSS",
      "Recharts"
    ],
    categories: ['website'],
    featured: true,
  },
  {
    id: 'signchat',
    title: 'SignChat',
    description: 'Sign Language Translator — iOS app that applies Multi-hand Tracking ML (MediaPipe) to capture and translate sign language. Third Prize (IT) at the 6th Hong Kong University Student Innovation and Entrepreneurship Competition.',
    image: '/signchat-logo.webp',
    link: 'https://github.com/oscarNCC/SignChat',
    videoUrl: 'https://www.youtube.com/watch?v=kPpcmBiDhhA&list=PLci2z87RuSLwgzTVfzN5kCzeaT8njKZ6i&index=3',
    previewGif: '/signchat.gif',
    tags: ['iOS', 'Objective-C', 'MediaPipe', 'Sign Language', 'ML'],
    categories: ['mobile', 'ai'],
    featured: true,
  },
  {
    id: 'opentable',
    title: 'PizzaShop',
    description: 'Full-stack pizza shop application demonstrating Node.js/Express backend with TypeScript REST APIs, React frontend, and restaurant management features like order tracking and Order Data analytics.',
    image: '/opentable.webp',
    link: 'https://github.com/oscarNCC/PizzaShop-FullStack-ShowCase',
    previewGif: '/PizzaShop-Client.gif',
    tags: ['Node.js', 'Express', 'TypeScript', 'REST API', 'React'],
    categories: ['website'],
    featured: true,
  },
];
