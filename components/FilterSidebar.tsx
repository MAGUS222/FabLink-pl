import React from 'react';
import { Filter, Search, X, SlidersHorizontal, MapPin, Tag } from 'lucide-react';
import { CompanyType, SearchFilters } from '../types';
import { INDUSTRIES } from '../data/mockData';

interface FilterSidebarProps {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters }) => {
  const locations = ['Wrocław', 'Warszawa', 'Poznań', 'Gdańsk', 'Łódź', 'Kraków'];
  const materials = ['Stal', 'Aluminium', 'Tworzywa', 'Elektronika', 'Tkaniny'];

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-8 sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-accent-blue" />
          Filtry
        </h3>
        <button 
          onClick={() => setFilters({ query: '', type: 'Wszystkie', industry: '', location: '', material: '' })}
          className="text-xs text-slate-500 hover:text-accent-blue transition-colors"
        >
          Wyczyść
        </button>
      </div>

      {/* Typ firmy */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Typ firmy</label>
        <div className="flex flex-col gap-2">
          {['Wszystkie', 'Producent', 'Usługi'].map((t) => (
            <button
              key={t}
              onClick={() => setFilters({ ...filters, type: t as any })}
              className={`text-left px-4 py-2.5 rounded-xl text-sm transition-all ${filters.type === t ? 'bg-accent-blue text-white' : 'bg-industrial-800 text-slate-400 hover:bg-industrial-700'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Branża */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Branża</label>
        <select 
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
          className="w-full bg-industrial-800 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-accent-blue"
        >
          <option value="">Wszystkie branże</option>
          {INDUSTRIES.map(ind => (
            <option key={ind.id} value={ind.name}>{ind.name}</option>
          ))}
        </select>
      </div>

      {/* Lokalizacja */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Lokalizacja</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Szukaj miasta..."
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full bg-industrial-800 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-accent-blue"
          />
        </div>
      </div>

      {/* Materiały */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Materiały / Technologie</label>
        <div className="flex flex-wrap gap-2">
          {materials.map(m => (
            <button
              key={m}
              onClick={() => setFilters({ ...filters, material: filters.material === m ? '' : m })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filters.material === m ? 'bg-accent-blue text-white' : 'bg-industrial-800 text-slate-400 hover:text-white'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
