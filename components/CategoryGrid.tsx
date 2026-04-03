import React from 'react';
import { motion } from 'framer-motion';
import { INDUSTRIES } from '../data/mockData';
import * as Icons from 'lucide-react';
import { Industry } from '../types';

interface CategoryGridProps {
  onSelect: (industry: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelect }) => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl mb-4">Popularne Branże</h2>
          <p className="text-slate-400 max-w-xl">
            Przeglądaj katalog według kluczowych sektorów przemysłu i usług produkcyjnych.
          </p>
        </div>
        <button className="text-accent-blue hover:text-blue-400 font-medium flex items-center gap-2 transition-colors">
          Wszystkie kategorie <Icons.ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {INDUSTRIES.map((industry, index) => {
          const IconComponent = (Icons as any)[industry.icon] || Icons.Box;
          
          return (
            <motion.button
              key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelect(industry.name)}
              className="group relative p-8 glass-panel rounded-2xl text-left hover:border-accent-blue/50 transition-all overflow-hidden"
            >
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <IconComponent className="w-32 h-32" />
              </div>
              
              <div className="w-12 h-12 bg-accent-blue/10 rounded-xl flex items-center justify-center text-accent-blue mb-6 group-hover:bg-accent-blue group-hover:text-white transition-all">
                <IconComponent className="w-6 h-6" />
              </div>
              
              <h3 className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">
                {industry.name}
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Zobacz firmy
              </p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryGrid;
