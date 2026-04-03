import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, PlusCircle, Factory, Briefcase, MapPin, SlidersHorizontal, ChevronRight, ArrowRight, X, Globe, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { Company, CompanyType, SearchFilters, ViewState } from './types';
import { MOCK_COMPANIES, INDUSTRIES, MOCK_ADS } from './data/mockData';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import CompanyCard from './components/CompanyCard';
import FilterSidebar from './components/FilterSidebar';
import CompanyProfile from './components/CompanyProfile';
import AddCompanyForm from './components/AddCompanyForm';
import Footer from './components/Footer';
import RFQForm from './components/RFQForm';
import AdminPanel from './components/AdminPanel';
import SalaryCalculator from './components/SalaryCalculator';
import { Ad } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedForRFQ, setSelectedForRFQ] = useState<string[]>([]);
  const [showBulkRFQ, setShowBulkRFQ] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    type: 'Wszystkie',
    industry: '',
    location: '',
    material: ''
  });

  const filteredCompanies = useMemo(() => {
    return MOCK_COMPANIES.filter(company => {
      const matchesQuery = !filters.query || 
        company.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        company.description.toLowerCase().includes(filters.query.toLowerCase());
      
      const matchesType = filters.type === 'Wszystkie' || company.type === filters.type;
      const matchesIndustry = !filters.industry || company.industry === filters.industry;
      const matchesLocation = !filters.location || company.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesMaterial = !filters.material || 
        company.materials?.some(m => m.toLowerCase().includes(filters.material.toLowerCase())) ||
        company.technologies?.some(t => t.toLowerCase().includes(filters.material.toLowerCase()));

      return matchesQuery && matchesType && matchesIndustry && matchesLocation && matchesMaterial;
    });
  }, [filters]);

  // Ad injection logic
  const companiesWithAds = useMemo(() => {
    const results: (Company | Ad)[] = [...filteredCompanies];
    MOCK_ADS.filter(ad => ad.active).forEach(ad => {
      if (ad.position !== undefined && ad.position <= results.length) {
        results.splice(ad.position, 0, ad);
      }
    });
    return results;
  }, [filteredCompanies]);

  const handleHeroSearch = (query: string, type: CompanyType | 'Wszystkie') => {
    setFilters(prev => ({ ...prev, query, type }));
    setView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIndustrySelect = (industry: string) => {
    setFilters(prev => ({ ...prev, industry }));
    setView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredCompanies = useMemo(() => MOCK_COMPANIES.filter(c => c.featured), []);
  const recentCompanies = useMemo(() => [...MOCK_COMPANIES].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4), []);

  const toggleRFQSelection = (id: string) => {
    setSelectedForRFQ(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedCompaniesForRFQ = useMemo(() => 
    MOCK_COMPANIES.filter(c => selectedForRFQ.includes(c.id)),
    [selectedForRFQ]
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={view} setView={setView} />

      <main className="flex-1 pt-20">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onSearch={handleHeroSearch} />
              
              <CategoryGrid onSelect={handleIndustrySelect} />

              {/* Featured Section */}
              <section className="py-20 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="flex items-end justify-between mb-12">
                    <div>
                      <h2 className="text-3xl md:text-4xl mb-4 text-slate-900 font-bold">Polecane Firmy</h2>
                      <p className="text-slate-500 font-medium">Zweryfikowani liderzy w swoich branżach.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredCompanies.map(company => (
                      <CompanyCard 
                        key={company.id} 
                        company={company} 
                        onClick={(c) => { setSelectedCompany(c); }} 
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Recently Added */}
              <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                  <h2 className="text-3xl md:text-4xl mb-12 text-slate-900 font-bold">Ostatnio dodane</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recentCompanies.map(company => (
                      <CompanyCard 
                        key={company.id} 
                        company={company} 
                        onClick={(c) => { setSelectedCompany(c); }} 
                      />
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {view === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-6 py-12"
            >
              <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar */}
                <aside className="w-full md:w-80 shrink-0">
                  <FilterSidebar filters={filters} setFilters={setFilters} />
                </aside>

                {/* Results */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl text-slate-900 font-bold">
                      Wyniki wyszukiwania 
                      <span className="text-slate-400 text-lg ml-3 font-medium">({filteredCompanies.length})</span>
                    </h2>
                    <div className="flex items-center gap-4">
                      {selectedForRFQ.length > 0 && (
                        <button 
                          onClick={() => setShowBulkRFQ(true)}
                          className="px-4 py-2 bg-accent-blue text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 animate-pulse"
                        >
                          Wyślij RFQ ({selectedForRFQ.length})
                        </button>
                      )}
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        Sortuj: 
                        <select className="bg-transparent text-slate-900 font-bold outline-none cursor-pointer">
                          <option className="text-slate-900">Najnowsze</option>
                          <option className="text-slate-900">Alfabetycznie</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {companiesWithAds.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {companiesWithAds.map((item, idx) => {
                        const isAd = 'companyName' in item;
                        if (isAd) {
                          const ad = item as Ad;
                          return (
                            <motion.div 
                              key={ad.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-gradient-to-br from-blue-50 to-white border-2 border-accent-blue/20 rounded-3xl p-6 relative overflow-hidden shadow-lg"
                            >
                              <div className="absolute top-0 right-0 bg-accent-blue text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">Sponsorowane</div>
                              <div className="flex gap-4">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-md">
                                  <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-xs font-bold text-accent-blue mb-1 uppercase">{ad.companyName}</div>
                                  <h4 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{ad.title}</h4>
                                  <p className="text-xs text-slate-500 font-medium mb-4 line-clamp-2">{ad.description}</p>
                                  <a href={ad.link} className="text-xs font-bold text-accent-blue hover:underline flex items-center gap-1">
                                    Sprawdź ofertę <ArrowRight className="w-3 h-3" />
                                  </a>
                                </div>
                              </div>
                            </motion.div>
                          );
                        }
                        
                        const company = item as Company;
                        return (
                          <div key={company.id} className="relative group">
                            <div className="absolute top-4 left-4 z-10">
                              <input 
                                type="checkbox" 
                                checked={selectedForRFQ.includes(company.id)}
                                onChange={() => toggleRFQSelection(company.id)}
                                className="w-5 h-5 rounded border-slate-300 bg-white text-accent-blue focus:ring-accent-blue cursor-pointer shadow-sm"
                              />
                            </div>
                            <CompanyCard 
                              company={company} 
                              onClick={(c) => { setSelectedCompany(c); }} 
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-20 text-center bg-white border border-slate-200 rounded-3xl shadow-sm">
                      <Search className="w-16 h-16 text-slate-300 mx-auto mb-6" />
                      <h3 className="text-2xl text-slate-900 mb-2 font-bold">Brak wyników</h3>
                      <p className="text-slate-500 font-medium">Spróbuj zmienić filtry wyszukiwania.</p>
                      <button 
                        onClick={() => setFilters({ query: '', type: 'Wszystkie', industry: '', location: '', material: '' })}
                        className="mt-8 text-accent-blue hover:underline font-bold"
                      >
                        Wyczyść wszystkie filtry
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {view === 'add-company' && (
            <motion.div
              key="add-company"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AddCompanyForm />
            </motion.div>
          )}

          {view === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AdminPanel />
            </motion.div>
          )}

          {view === 'tools-salary' && (
            <motion.div
              key="tools-salary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SalaryCalculator />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Company Profile Modal */}
      <AnimatePresence>
        {selectedCompany && (
          <CompanyProfile 
            company={selectedCompany} 
            onClose={() => setSelectedCompany(null)} 
          />
        )}
      </AnimatePresence>

      {/* Bulk RFQ Modal */}
      <AnimatePresence>
        {showBulkRFQ && (
          <RFQForm 
            companies={selectedCompaniesForRFQ} 
            onClose={() => setShowBulkRFQ(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
