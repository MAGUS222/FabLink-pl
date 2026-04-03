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
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-8 sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-accent-blue" />
          Filtry
        </h3>
        <button 
          onClick={() => setFilters({ query: '', type: 'Wszystkie', industry: '', location: '', material: '' })}
          className="text-xs text-slate-500 hover:text-accent-blue transition-colors font-medium"
        >
          Wyczyść
        </button>
      </div>

      {/* Typ firmy */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Typ firmy</label>
        <div className="flex flex-col gap-2">
          {['Wszystkie', 'Producent', 'Usługi'].map((t) => (
            <button
              key={t}
              onClick={() => setFilters({ ...filters, type: t as any })}
              className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${filters.type === t ? 'bg-accent-blue text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Branża */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Branża</label>
        <select 
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
        >
          <option value="">Wszystkie branże</option>
          {INDUSTRIES.map(ind => (
            <option key={ind.id} value={ind.name}>{ind.name}</option>
          ))}
        </select>
      </div>

      {/* Lokalizacja */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Lokalizacja</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Szukaj miasta..."
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
          />
        </div>
      </div>

      {/* Materiały */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Materiały / Technologie</label>
        <div className="flex flex-wrap gap-2">
          {materials.map(m => (
            <button
              key={m}
              onClick={() => setFilters({ ...filters, material: filters.material === m ? '' : m })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${filters.material === m ? 'bg-accent-blue text-white border-accent-blue shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:border-accent-blue hover:text-accent-blue'}`}
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
