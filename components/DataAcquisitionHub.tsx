import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Database, Loader2, Check, X, Globe, Phone, Mail, MapPin, ExternalLink, Sparkles, Filter } from 'lucide-react';
import { Company } from '../types';

interface ScrapedLead {
  id: string;
  name: string;
  industry: string;
  location: string;
  website: string;
  email: string;
  phone: string;
  description: string;
  confidence: number; // AI confidence score
}

interface DataAcquisitionHubProps {
  onApprove: (company: Company) => void;
}

const DataAcquisitionHub: React.FC<DataAcquisitionHubProps> = ({ onApprove }) => {
  const [isScraping, setIsScraping] = useState(false);
  const [searchQuery, setSearchQuery] = useState({ industry: 'Obróbka Metalu', location: 'Warszawa' });
  const [leads, setLeads] = useState<ScrapedLead[]>([]);
  const [scrapingProgress, setScrapingProgress] = useState(0);
  const [scrapingStatus, setScrapingStatus] = useState('');

  const simulateScraping = () => {
    setIsScraping(true);
    setLeads([]);
    setScrapingProgress(0);
    setScrapingStatus('Inicjowanie połączenia z Google Maps API...');

    const steps = [
      { progress: 20, status: 'Przeszukiwanie lokalnych spisów firm...' },
      { progress: 45, status: 'Ekstrakcja danych kontaktowych ze stron WWW...' },
      { progress: 70, status: 'Analiza AI: kategoryzacja i generowanie opisów...' },
      { progress: 90, status: 'Weryfikacja poprawności danych...' },
      { progress: 100, status: 'Zakończono!' },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setScrapingProgress(step.progress);
        setScrapingStatus(step.status);
        if (index === steps.length - 1) {
          const foundLeads: ScrapedLead[] = [
            {
              id: 'lead-1',
              name: 'MetalTech Solutions Sp. z o.o.',
              industry: 'Obróbka Metalu',
              location: 'Warszawa, ul. Przemysłowa 12',
              website: 'https://metaltech-solutions.pl',
              email: 'biuro@metaltech-solutions.pl',
              phone: '+48 22 123 45 67',
              description: 'Specjaliści w precyzyjnej obróbce CNC i cięciu laserowym. Nowoczesny park maszynowy.',
              confidence: 98
            },
            {
              id: 'lead-2',
              name: 'Precyzja-Wawa',
              industry: 'Obróbka Metalu',
              location: 'Warszawa, ul. Fabryczna 5',
              website: 'http://precyzja-wawa.com',
              email: 'kontakt@precyzja-wawa.com',
              phone: '+48 601 202 303',
              description: 'Rodzinna firma z 20-letnim doświadczeniem w ślusarstwie i spawaniu konstrukcji stalowych.',
              confidence: 85
            },
            {
              id: 'lead-3',
              name: 'Stal-Konstrukt',
              industry: 'Obróbka Metalu',
              location: 'Warszawa, ul. Hutnicza 8',
              website: 'https://stalkonstrukt.pl',
              email: 'info@stalkonstrukt.pl',
              phone: '+48 22 987 65 43',
              description: 'Producent konstrukcji stalowych dla przemysłu i budownictwa. Certyfikaty ISO.',
              confidence: 92
            }
          ];
          setLeads(foundLeads);
          setIsScraping(false);
        }
      }, (index + 1) * 1200);
    });
  };

  const handleApprove = (lead: ScrapedLead) => {
    const newCompany: Company = {
      id: Math.random().toString(36).substr(2, 9),
      name: lead.name,
      description: lead.description,
      type: 'Producent',
      industry: lead.industry,
      location: lead.location,
      postalCode: '00-000',
      contact: {
        email: lead.email,
        phone: lead.phone,
        website: lead.website
      },
      images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'],
      ownerUid: 'admin',
      createdAt: Date.now(),
    };
    onApprove(newCompany);
    setLeads(leads.filter(l => l.id !== lead.id));
  };

  const handleReject = (id: string) => {
    setLeads(leads.filter(l => l.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Search/Scraper Controls */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Database className="w-32 h-32" />
        </div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-accent-blue" />
            Inteligentny Scraper Firm
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Branża</label>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery.industry}
                  onChange={(e) => setSearchQuery({...searchQuery, industry: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-accent-blue outline-none transition-all"
                  placeholder="np. Obróbka Metalu"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Lokalizacja</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery.location}
                  onChange={(e) => setSearchQuery({...searchQuery, location: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-accent-blue outline-none transition-all"
                  placeholder="np. Warszawa"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button 
                onClick={simulateScraping}
                disabled={isScraping}
                className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200 disabled:bg-slate-400"
              >
                {isScraping ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Przeszukiwanie...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Rozpocznij Scraping
                  </>
                )}
              </button>
            </div>
          </div>

          {isScraping && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-600">{scrapingStatus}</span>
                <span className="text-accent-blue">{scrapingProgress}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${scrapingProgress}%` }}
                  className="h-full bg-accent-blue"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <AnimatePresence>
        {leads.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Znalezione potencjalne firmy ({leads.length})</h3>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Wymaga weryfikacji</span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {leads.map((lead) => (
                <motion.div 
                  key={lead.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg hover:border-accent-blue/30 transition-all group"
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-xl font-bold text-slate-900">{lead.name}</h4>
                            <div className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase tracking-wider border border-green-100">
                              AI Confidence: {lead.confidence}%
                            </div>
                          </div>
                          <div className="text-sm font-bold text-accent-blue uppercase tracking-wider">{lead.industry}</div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleApprove(lead)}
                            className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-500 hover:text-white transition-all shadow-sm"
                            title="Zatwierdź i dodaj do katalogu"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleReject(lead.id)}
                            className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            title="Odrzuć"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-slate-500 text-sm mb-6 leading-relaxed font-medium italic">
                        "{lead.description}"
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                          <MapPin className="w-4 h-4 text-accent-blue" />
                          {lead.location}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                          <Phone className="w-4 h-4 text-accent-blue" />
                          {lead.phone}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                          <Mail className="w-4 h-4 text-accent-blue" />
                          {lead.email}
                        </div>
                        <a 
                          href={lead.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-accent-blue text-xs font-bold hover:underline"
                        >
                          <Globe className="w-4 h-4" />
                          Odwiedź stronę <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {leads.length === 0 && !isScraping && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <Database className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <h4 className="text-lg font-bold text-slate-400">Brak aktywnych wyników wyszukiwania</h4>
          <p className="text-slate-400 text-sm max-w-xs mx-auto mt-2">
            Użyj formularza powyżej, aby rozpocząć proces scrapowania danych z sieci.
          </p>
        </div>
      )}
    </div>
  );
};

export default DataAcquisitionHub;
