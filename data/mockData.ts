import { Company, Industry, Ad, Review, BlogPost } from '../types';

export const MOCK_ADS: Ad[] = [
  {
    id: 'ad1',
    companyName: 'MetalTech Solutions',
    title: 'Precyzyjne cięcie laserem 24/7',
    description: 'Najnowocześniejszy park maszynowy w Polsce. Krótkie terminy, wysoka jakość. Sprawdź naszą ofertę!',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800',
    link: '#',
    impressions: 1245,
    clicks: 89,
    active: true,
    position: 2
  },
  {
    id: 'ad2',
    companyName: 'LogiTrans Sp. z o.o.',
    title: 'Transport ciężki i ponadgabarytowy',
    description: 'Obsługujemy całą Europę. Bezpieczeństwo i terminowość to nasz priorytet. Zapytaj o wycenę.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    link: '#',
    impressions: 856,
    clicks: 42,
    active: true,
    position: 5
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    companyId: 'c1',
    userName: 'Jan Kowalski',
    rating: 5,
    comment: 'Świetna współpraca, terminowość i wysoka jakość wykonania. Polecam!',
    createdAt: Date.now() - 5000000,
    status: 'approved'
  },
  {
    id: 'r2',
    companyId: 'c1',
    userName: 'Anna Nowak',
    rating: 4,
    comment: 'Dobra jakość, choć czas oczekiwania mógłby być nieco krótszy.',
    createdAt: Date.now() - 2000000,
    status: 'approved'
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Jak wybrać dostawcę CNC? 5 kluczowych kryteriów',
    excerpt: 'Wybór odpowiedniego partnera do obróbki skrawaniem to decyzja, która rzutuje na jakość całego Twojego produktu.',
    content: `
      ## 1. Park maszynowy i technologie
      Pierwszym krokiem jest sprawdzenie, czy dostawca dysponuje maszynami odpowiednimi do Twoich potrzeb. Czy są to nowoczesne centra 3-, 4- czy 5-osiowe?
      
      ## 2. Certyfikaty jakości
      ISO 9001 to standard, ale w branżach takich jak lotnictwo czy medycyna wymagane są specyficzne certyfikaty (np. AS9100).
      
      ## 3. Doświadczenie w obróbce konkretnych materiałów
      Inaczej obrabia się aluminium, a inaczej tytan czy stale hartowane. Zapytaj o portfolio projektów z Twojego materiału.
      
      ## 4. Terminowość i komunikacja
      W przemyśle opóźnienie o jeden dzień może zatrzymać całą linię montażową. Sprawdź opinie innych klientów o rzetelności dostawcy.
      
      ## 5. Możliwości skalowania produkcji
      Czy dostawca poradzi sobie zarówno z prototypem, jak i serią 10 000 sztuk?
    `,
    author: 'Ekspert FabLink',
    date: '2026-03-15',
    imageUrl: 'https://images.unsplash.com/photo-1565034946487-067915993741?auto=format&fit=crop&q=80&w=800',
    category: 'Poradniki',
    readTime: '5 min'
  },
  {
    id: 'b2',
    title: 'Trendy w branży spożywczej 2026: Automatyzacja i Eko-opakowania',
    excerpt: 'Przemysł spożywczy przechodzi rewolucję. Sprawdź, na co stawiają liderzy rynku w tym roku.',
    content: `
      Branża spożywcza w 2026 roku skupia się na dwóch głównych filarach: maksymalnej wydajności dzięki robotyzacji oraz minimalizacji śladu węglowego.
      
      ### Robotyzacja linii pakujących
      Roboty typu delta oraz coboty (roboty współpracujące) stają się standardem nawet w mniejszych zakładach przetwórczych. Pozwalają one na zachowanie najwyższych standardów higieny przy jednoczesnym zwiększeniu tempa pracy.
      
      ### Nowe materiały w opakowaniach
      Konsumenci wymagają rezygnacji z plastiku. Na popularności zyskują biopolimery oraz opakowania inteligentne, które informują o świeżości produktu bez konieczności jego otwierania.
    `,
    author: 'Redakcja FabLink',
    date: '2026-03-28',
    imageUrl: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=800',
    category: 'Trendy',
    readTime: '4 min'
  }
];

export const INDUSTRIES: Industry[] = [
  { id: '1', name: 'Obróbka Metalu', icon: 'Settings', slug: 'metal' },
  { id: '2', name: 'Tworzywa Sztuczne', icon: 'Layers', slug: 'plastics' },
  { id: '3', name: 'Elektronika', icon: 'Cpu', slug: 'electronics' },
  { id: '4', name: 'Odzieżowa i Tekstylia', icon: 'Shirt', slug: 'apparel' },
  { id: '5', name: 'Automatyka i Robotyka', icon: 'Zap', slug: 'automation' },
  { id: '6', name: 'Logistyka', icon: 'Truck', slug: 'logistics' },
  { id: '7', name: 'Chemiczna', icon: 'Beaker', slug: 'chemistry' },
  { id: '8', name: 'Budowlana', icon: 'Building2', slug: 'construction' },
  { id: '9', name: 'Spożywcza', icon: 'Utensils', slug: 'food' },
  { id: '10', name: 'Farmaceutyczna', icon: 'Pill', slug: 'pharma' },
  { id: '11', name: 'Zbrojeniowa', icon: 'Shield', slug: 'defense' },
  { id: '12', name: 'Motoryzacyjna', icon: 'Car', slug: 'automotive' },
  { id: '13', name: 'Lotnicza', icon: 'Plane', slug: 'aerospace' },
  { id: '14', name: 'Meblarska', icon: 'Armchair', slug: 'furniture' },
  { id: '15', name: 'Energetyczna', icon: 'Zap', slug: 'energy' },
  { id: '16', name: 'Opakowania', icon: 'Package', slug: 'packaging' },
];

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'c1',
    name: 'MetalTech Solutions',
    description: 'Specjalizujemy się w precyzyjnej obróbce CNC, cięciu laserowym oraz spawaniu konstrukcji stalowych dla przemysłu motoryzacyjnego i lotniczego.',
    type: 'Producent',
    industry: 'Obróbka Metalu',
    location: 'Wrocław, Dolnośląskie',
    postalCode: '50-001',
    productionType: 'CNC Machining',
    machineryPark: ['Hass VF-2', 'Mazak Integrex', 'Trumpf Laser'],
    certifications: ['ISO 9001', 'AS9100'],
    moq: '10 sztuk',
    leadTimeAvg: '14 dni',
    complianceStandards: ['RoHS', 'REACH'],
    contact: {
      email: 'kontakt@metaltech.pl',
      phone: '+48 71 123 45 67',
      website: 'https://metaltech-solutions.example.com'
    },
    materials: ['Stal nierdzewna', 'Aluminium', 'Tytan'],
    technologies: ['CNC', 'Laser Fiber', 'TIG/MIG'],
    scale: 'Duża (powyżej 250 pracowników)',
    images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800'],
    featured: true,
    ownerUid: 'mock-owner-1',
    createdAt: Date.now() - 1000000
  },
  {
    id: 'c2',
    name: 'Plastix Polska',
    description: 'Produkcja komponentów z tworzyw sztucznych metodą wtrysku. Posiadamy własną narzędziownię i biuro projektowe.',
    type: 'Producent',
    industry: 'Tworzywa Sztuczne',
    location: 'Poznań, Wielkopolskie',
    postalCode: '60-001',
    productionType: 'Injection Molding',
    machineryPark: ['Arburg Allrounder', 'Engel Victory'],
    certifications: ['ISO 13485', 'ISO 9001'],
    moq: '1000 sztuk',
    leadTimeAvg: '21 dni',
    complianceStandards: ['FDA Compliant'],
    contact: {
      email: 'office@plastix.pl',
      phone: '+48 61 987 65 43',
      website: 'https://plastix-polska.example.com'
    },
    materials: ['PP', 'ABS', 'PC', 'PA6'],
    technologies: ['Wtryskarki', 'Druk 3D', 'Projektowanie CAD'],
    scale: 'Średnia (50-250 pracowników)',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'],
    featured: true,
    ownerUid: 'mock-owner-2',
    createdAt: Date.now() - 2000000
  },
  {
    id: 'c3',
    name: 'ElectroAssemble',
    description: 'Montaż kontraktowy elektroniki (EMS). Oferujemy montaż SMT i THT, testowanie ICT oraz montaż końcowy urządzeń.',
    type: 'Usługi',
    industry: 'Elektronika',
    location: 'Gdańsk, Pomorskie',
    postalCode: '80-001',
    contact: {
      email: 'sales@electroassemble.pl',
      phone: '+48 58 333 44 55',
      website: 'https://electroassemble.example.com'
    },
    technologies: ['SMT', 'THT', 'AOI', 'X-Ray'],
    scale: 'Średnia (50-250 pracowników)',
    images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'],
    featured: false,
    ownerUid: 'mock-owner-3',
    createdAt: Date.now() - 3000000
  },
  {
    id: 'c4',
    name: 'TexStyle Pro',
    description: 'Szycie odzieży roboczej i ochronnej. Realizujemy zamówienia hurtowe dla dużych zakładów przemysłowych.',
    type: 'Producent',
    industry: 'Tekstylia',
    location: 'Łódź, Łódzkie',
    postalCode: '90-001',
    contact: {
      email: 'biuro@texstyle.pl',
      phone: '+48 42 555 66 77',
      website: 'https://texstyle-pro.example.com'
    },
    materials: ['Bawełna', 'Poliester', 'Tkaniny trudnopalne'],
    scale: 'Mała (poniżej 50 pracowników)',
    images: ['https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800'],
    featured: false,
    ownerUid: 'mock-owner-4',
    createdAt: Date.now() - 4000000
  }
];
