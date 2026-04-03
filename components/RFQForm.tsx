import React from 'react';
import { motion } from 'framer-motion';
import { X, Send, Check, FileText, Package, Calendar, MessageSquare } from 'lucide-react';
import { Company } from '../types';

interface RFQFormProps {
  companies: Company[];
  onClose: () => void;
}

const RFQForm: React.FC<RFQFormProps> = ({ companies, onClose }) => {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-industrial-950/90 backdrop-blur-md">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel p-12 rounded-3xl text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-4">Zapytanie wysłane!</h2>
          <p className="text-slate-400 mb-8">
            Twoje zapytanie RFQ zostało wysłane do {companies.length} dostawców. Odpowiedzi otrzymasz bezpośrednio na swój e-mail.
          </p>
          <button 
            onClick={onClose}
            className="w-full py-4 bg-accent-blue text-white rounded-xl font-bold"
          >
            Zamknij
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-industrial-950/90 backdrop-blur-md overflow-y-auto">
      <div className="absolute inset-0" onClick={onClose} />
      
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-full max-w-2xl bg-industrial-900 rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
      >
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-display font-bold text-white">Nowe zapytanie RFQ</h2>
            <p className="text-sm text-slate-400 mt-1">Wysyłasz zapytanie do: {companies.map(c => c.name).join(', ')}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-400 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                <Package className="w-4 h-4" /> Produkt / Usługa
              </label>
              <input required type="text" className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none" placeholder="np. Obudowa aluminiowa" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Ilość (Nakład)
              </label>
              <input required type="text" className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none" placeholder="np. 500 sztuk" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Termin realizacji
              </label>
              <input required type="date" className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Twój e-mail
              </label>
              <input required type="email" className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none" placeholder="twoj@email.pl" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Szczegóły techniczne / Specyfikacja</label>
            <textarea required rows={4} className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none resize-none" placeholder="Opisz wymagania, materiały, tolerancje..." />
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full py-4 bg-accent-blue hover:bg-blue-600 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
              <Send className="w-5 h-5" />
              Wyślij zapytanie RFQ
            </button>
            <p className="text-center text-slate-500 mt-4 text-xs">
              Twoje dane zostaną przekazane wyłącznie wybranym producentom w celu przygotowania oferty.
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RFQForm;
