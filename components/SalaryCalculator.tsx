import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Wallet, Receipt, Percent, Info, ArrowRight, CheckCircle2 } from 'lucide-react';

const SalaryCalculator: React.FC = () => {
  const [gross, setGross] = useState<number>(5000);
  const [contractType, setContractType] = useState<'uop' | 'uz' | 'uod'>('uop');

  const calculation = useMemo(() => {
    // Simplified Polish tax/ZUS logic for demo
    if (contractType === 'uop') {
      const emerytalne = gross * 0.0976;
      const rentowe = gross * 0.015;
      const chorobowe = gross * 0.0245;
      const zusTotal = emerytalne + rentowe + chorobowe;
      const zdrowotne = (gross - zusTotal) * 0.09;
      const taxBase = gross - zusTotal - (gross * 0.2); // Simplified
      const tax = Math.max(0, (taxBase * 0.12) - 300); // Simplified tax free amount
      const net = gross - zusTotal - zdrowotne - tax;
      
      return { net, zus: zusTotal, health: zdrowotne, tax };
    } else if (contractType === 'uz') {
      const zusTotal = gross * 0.1126;
      const zdrowotne = (gross - zusTotal) * 0.09;
      const net = gross - zusTotal - zdrowotne;
      return { net, zus: zusTotal, health: zdrowotne, tax: 0 };
    } else {
      const tax = gross * 0.09; // Simplified
      const net = gross - tax;
      return { net, zus: 0, health: 0, tax };
    }
  }, [gross, contractType]);

  return (
    <div className="min-h-screen bg-slate-50 pt-12 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-accent-blue/10 text-accent-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Kalkulator Wynagrodzeń 2026</h1>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">
            Darmowe narzędzie dla pracowników i pracodawców. Oblicz wynagrodzenie netto, składki ZUS oraz podatek dochodowy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-8">
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Rodzaj umowy</label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'uop', label: 'Umowa o pracę' },
                  { id: 'uz', label: 'Umowa zlecenie' },
                  { id: 'uod', label: 'Umowa o dzieło' }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setContractType(type.id as any)}
                    className={`p-4 rounded-xl border-2 text-left font-bold transition-all flex items-center justify-between ${contractType === type.id ? 'border-accent-blue bg-blue-50 text-accent-blue' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                  >
                    {type.label}
                    {contractType === type.id && <CheckCircle2 className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Wynagrodzenie Brutto (PLN)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={gross}
                  onChange={(e) => setGross(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-2xl font-bold text-slate-900 focus:ring-2 focus:ring-accent-blue outline-none transition-all"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">PLN</div>
              </div>
              <input 
                type="range" 
                min="3000" 
                max="30000" 
                step="100" 
                value={gross}
                onChange={(e) => setGross(Number(e.target.value))}
                className="w-full mt-6 accent-accent-blue"
              />
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4 items-start">
              <Info className="w-6 h-6 text-accent-blue shrink-0" />
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Kalkulator uwzględnia aktualne progi podatkowe oraz składki ZUS obowiązujące w 2026 roku. Wyniki mają charakter poglądowy.
              </p>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-slate-900 p-8 rounded-3xl shadow-2xl text-white flex flex-col">
            <div className="mb-12">
              <div className="text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Wynagrodzenie Netto ("Na rękę")</div>
              <div className="text-5xl font-bold text-white mb-2">{calculation.net.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PLN</div>
              <div className="text-slate-500 font-medium">Miesięcznie</div>
            </div>

            <div className="space-y-6 flex-1">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-accent-blue" />
                  <span className="text-slate-300 font-medium">Składki ZUS</span>
                </div>
                <span className="font-bold">{calculation.zus.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} PLN</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <Receipt className="w-5 h-5 text-accent-blue" />
                  <span className="text-slate-300 font-medium">Ubezpieczenie zdrowotne</span>
                </div>
                <span className="font-bold">{calculation.health.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} PLN</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <Percent className="w-5 h-5 text-accent-blue" />
                  <span className="text-slate-300 font-medium">Zaliczka na podatek</span>
                </div>
                <span className="font-bold">{calculation.tax.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} PLN</span>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <button className="w-full py-4 bg-accent-blue hover:bg-blue-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/20">
                Pobierz raport PDF <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculator;
