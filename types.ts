export type CompanyType = 'Producent' | 'Usługi';

export interface Company {
  id: string;
  name: string;
  description: string;
  type: CompanyType;
  industry: string;
  location: string;
  postalCode: string;
  productionType?: string;
  machineryPark?: string[];
  certifications?: string[];
  moq?: string;
  leadTimeAvg?: string;
  complianceStandards?: string[];
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  employeeCount?: number;
  scale?: string;
  materials?: string[];
  technologies?: string[];
  images: string[];
  featured?: boolean;
  ownerUid: string;
  createdAt: number;
  updatedAt?: number;
  rating?: number;
  reviewCount?: number;
}

export interface Industry {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

export interface SearchFilters {
  query: string;
  type: CompanyType | 'Wszystkie';
  industry: string;
  location: string;
  material: string;
}

export type ViewState = 'home' | 'search' | 'profile' | 'add-company' | 'admin' | 'tools-salary' | 'blog' | 'blog-post';

export interface Review {
  id: string;
  companyId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  createdAt: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
  readTime: string;
}

export interface Notification {
  id: string;
  type: 'review' | 'rfq' | 'system';
  title: string;
  message: string;
  recipientEmail: string;
  companyId?: string;
  createdAt: number;
  read: boolean;
  emailSent: boolean;
}

export interface Ad {
  id: string;
  companyName: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  impressions: number;
  clicks: number;
  active: boolean;
  position?: number; // Ideal position in the grid
}

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}
