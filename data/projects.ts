export interface Project {
  id: string;
  title: string;
  priceRange: string;
  hiredRecently: number;
  avatars: string[];
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Biochemists and Biophysicists',
    priceRange: '$85-$150/hr',
    hiredRecently: 37,
    avatars: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    ],
  },
  {
    id: '2',
    title: 'Software Engineers',
    priceRange: '$100-$200/hr',
    hiredRecently: 124,
    avatars: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    ],
  },
  {
    id: '3',
    title: 'Data Scientists',
    priceRange: '$90-$180/hr',
    hiredRecently: 56,
    avatars: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face',
    ],
  },
  {
    id: '4',
    title: 'UX/UI Designers',
    priceRange: '$75-$140/hr',
    hiredRecently: 89,
    avatars: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face',
    ],
  },
];
