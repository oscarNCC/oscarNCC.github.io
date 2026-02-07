import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'signchat',
    title: 'SignChat',
    description: 'Sign Language Translator — iOS app that applies Multi-hand Tracking ML (MediaPipe) to capture and translate sign language. Third Prize (IT) at the 6th Hong Kong University Student Innovation and Entrepreneurship Competition.',
    image: '/signchat-logo.png',
    link: 'https://github.com/oscarNCC/SignChat',
    tags: ['iOS', 'Objective-C', 'MediaPipe', 'Sign Language', 'ML'],
    featured: true,
  },
  {
    id: '1',
    title: 'Project One',
    description: 'A brief description of your first project and what technologies you used.',
    image: '/vite.svg',
    link: 'https://example.com',
    tags: ['React', 'TypeScript'],
    featured: true,
  },
  {
    id: '2',
    title: 'Project Two',
    description: 'Another project showcasing your skills and problem-solving approach.',
    image: '/vite.svg',
    tags: ['Vite', 'CSS'],
    featured: true,
  },
  {
    id: '3',
    title: 'Project Three',
    description: 'A third project to demonstrate range and consistency.',
    image: '/vite.svg',
    link: 'https://example.com',
    tags: ['JavaScript', 'API'],
    featured: false,
  },
];
