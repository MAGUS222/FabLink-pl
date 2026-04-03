import React from 'react';
import { MapPin, Factory, Briefcase, Globe, Phone, Mail, ExternalLink } from 'lucide-react';
import { Company } from '../types';
import { motion } from 'framer-motion';

interface CompanyCardProps {
  company: Company;
  onClick: (company: Company) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:border-accent-blue/50 hover:shadow-xl transition-all flex flex-col h-full shadow-sm"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={company.images[0]}
          alt={company.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${company.type === 'Producent' ? 'bg-accent-blue text-white' : 'bg-slate-800 text-slate-100'}`}>
            {company.type}
          </span>
          {company.featured && (
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Polecane
            </span>
          )}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl text-slate-900 font-bold group-hover:text-accent-blue transition-colors">
            {company.name}
          </h3>
        </div>
        
        <div className="flex items-center gap-2 text-slate-600 text-sm mb-4">
          <MapPin className="w-4 h-4 text-accent-blue" />
          {company.location}
        </div>

        <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
          {company.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {company.materials?.slice(0, 3).map(m => (
            <span key={m} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase font-bold border border-slate-200">
              {m}
            </span>
          ))}
          {company.technologies?.slice(0, 2).map(t => (
            <span key={t} className="text-[10px] bg-blue-50 text-accent-blue px-2 py-1 rounded uppercase font-bold border border-blue-100">
              {t}
            </span>
          ))}
        </div>

        <button
          onClick={() => onClick(company)}
          className="w-full py-3 bg-slate-900 hover:bg-accent-blue text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-md"
        >
          Zobacz profil
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default CompanyCard;
