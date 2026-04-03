import React from 'react';
import { Search, MapPin, Factory, Briefcase, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { CompanyType } from '../types';

interface HeroProps {
  onSearch: (query: string, type: CompanyType | 'Wszystkie') => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');
  const [type, setType] = React.useState<CompanyType | 'Wszystkie'>('Wszystkie');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, type);
  };

  return (
    <div className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920")' }}
      >
        <div className="absolute inset-0 hero-overlay z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-display mb-6 text-white">
            FabLink<span className="text-accent-blue">.pl</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto font-light">
            Znajdź sprawdzonych producentów i dostawców usług B2B w Polsce.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel p-2 rounded-2xl shadow-2xl max-w-4xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Czego szukasz? (np. obróbka CNC, wtryskarki...)"
                className="w-full pl-12 pr-4 py-4 bg-industrial-950/50 border-none rounded-xl text-white placeholder:text-slate-500 focus:ring-2 focus:ring-accent-blue transition-all outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="flex bg-industrial-950/50 rounded-xl p-1 border border-white/5">
              <button
                type="button"
                onClick={() => setType('Producent')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${type === 'Producent' ? 'bg-accent-blue text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <Factory className="w-4 h-4" />
                <span className="text-sm font-medium">Producent</span>
              </button>
              <button
                type="button"
                onClick={() => setType('Usługi')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${type === 'Usługi' ? 'bg-accent-blue text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <Briefcase className="w-4 h-4" />
                <span className="text-sm font-medium">Usługi</span>
              </button>
              <button
                type="button"
                onClick={() => setType('Wszystkie')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${type === 'Wszystkie' ? 'bg-accent-blue text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <span className="text-sm font-medium">Wszystkie</span>
              </button>
            </div>

            <button
              type="submit"
              className="bg-accent-blue hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group"
            >
              Szukaj
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Ponad 5,000 zweryfikowanych firm
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            Darmowy dostęp B2B
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
