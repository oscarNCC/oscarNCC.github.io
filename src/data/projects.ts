import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'opentable',
    title: 'OpenTable',
    description: 'Backend service for restaurant operations statistics. Records order and table data with time-range filtering (e.g. dinner rush) for table turnover rate, RevPASH, revenue per table, and popular dishes.',
    image: '/opentable.png',
    link: 'https://github.com/oscarNCC/OpenTable',
    tags: ['Node.js', 'Express', 'TypeScript', 'REST API',",React"],
    featured: true,
  },
  {
    id: 'signchat',
    title: 'SignChat',
    description: 'Sign Language Translator — iOS app that applies Multi-hand Tracking ML (MediaPipe) to capture and translate sign language. Third Prize (IT) at the 6th Hong Kong University Student Innovation and Entrepreneurship Competition.',
    image: '/signchat-logo.png',
    link: 'https://github.com/oscarNCC/SignChat',
    tags: ['iOS', 'Objective-C', 'MediaPipe', 'Sign Language', 'ML'],
    featured: true,
  },
 
];
