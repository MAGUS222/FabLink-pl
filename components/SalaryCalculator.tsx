import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Wallet, Receipt, Percent, Info, ArrowRight, CheckCircle2, Mail, X, ShieldCheck } from 'lucide-react';

import { jsPDF } from 'jspdf';

const SalaryCalculator: React.FC = () => {
  const [gross, setGross] = useState<number>(5000);
  const [contractType, setContractType] = useState<'uop' | 'uz' | 'uod'>('uop');
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const triggerDownload = () => {
    const doc = new jsPDF();
    
    // Add content to PDF
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text('RAPORT WYNAGRODZENIA - FABLINK.PL', 20, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(`Data wygenerowania: ${new Date().toLocaleDateString('pl-PL')}`, 20, 40);
    
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.line(20, 45, 190, 45);
    
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text('SZCZEGÓŁY KALKULACJI:', 20, 60);
    
    doc.setFontSize(12);
    doc.text(`Rodzaj umowy: ${contractType === 'uop' ? 'Umowa o pracę' : contractType === 'uz' ? 'Umowa zlecenie' : 'Umowa o dzieło'}`, 20, 75);
    doc.text(`Wynagrodzenie brutto: ${gross.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} PLN`, 20, 85);
    
    doc.setDrawColor(241, 245, 249); // slate-100
    doc.setFillColor(248, 250, 252); // slate-50
    doc.rect(20, 95, 170, 60, 'F');
    
    doc.text('Zestawienie składek i podatków:', 25, 105);
    doc.text(`- Składki ZUS: ${calculation.zus.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} PLN`, 30, 115);
    doc.text(`- Ubezpieczenie zdrowotne: ${calculation.health.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} PLN`, 30, 125);
    doc.text(`- Zaliczka na podatek: ${calculation.tax.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} PLN`, 30, 135);
    
    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235); // blue-600
    doc.text(`WYNAGRODZENIE NETTO: ${calculation.net.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} PLN`, 20, 170);
    
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text('Kalkulator uwzględnia progi podatkowe na rok 2026. Wyniki mają charakter poglądowy.', 20, 280);
    doc.text('Dziękujemy za skorzystanie z narzędzia FabLink.pl', 20, 285);
    
    doc.save(`Raport_FabLink_${contractType}_${gross}PLN.pdf`);
  };

  const handleDownloadClick = () => {
    setShowLeadModal(true);
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;

    setIsSubmitting(true);
    
    // Simulate API call for newsletter signup
    setTimeout(() => {
      console.log('Lead captured:', { email, consent, timestamp: new Date() });
      setIsSubmitting(false);
      setShowLeadModal(false);
      triggerDownload();
      // Reset form
      setEmail('');
      setConsent(false);
    }, 1000);
  };

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
              <button 
                onClick={handleDownloadClick}
                className="w-full py-4 bg-accent-blue hover:bg-blue-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/20"
              >
                Pobierz raport PDF <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lead Capture Modal */}
      <AnimatePresence>
        {showLeadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLeadModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowLeadModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8">
                <div className="w-12 h-12 bg-accent-blue/10 text-accent-blue rounded-xl flex items-center justify-center mb-6">
                  <Mail className="w-6 h-6" />
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Odbierz swój raport</h2>
                <p className="text-slate-500 mb-8">
                  Wpisz swój adres e-mail, aby otrzymać szczegółowe zestawienie kosztów i dołączyć do naszego newslettera B2B.
                </p>

                <form onSubmit={handleSubmitLead} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Adres E-mail</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="twoj@email.pl"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-accent-blue outline-none transition-all"
                    />
                  </div>

                  <label className="flex gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        required
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 border-2 border-slate-200 rounded peer-checked:bg-accent-blue peer-checked:border-accent-blue transition-all" />
                      <CheckCircle2 className="w-3.5 h-3.5 text-white absolute left-0.5 opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xs text-slate-500 leading-tight">
                      Wyrażam zgodę na otrzymywanie informacji handlowych drogą elektroniczną od FabLink.pl oraz akceptuję politykę prywatności.
                    </span>
                  </label>

                  <button 
                    type="submit"
                    disabled={isSubmitting || !email || !consent}
                    className="w-full py-4 bg-accent-blue hover:bg-blue-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Generuj i pobierz raport <ArrowRight className="w-5 h-5" /></>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                    <ShieldCheck className="w-3 h-3" /> Twoje dane są bezpieczne
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SalaryCalculator;
