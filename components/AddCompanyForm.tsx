import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Building2, MapPin, Globe, Mail, Phone, FileText, Check, Cpu, ShieldCheck, Package, Clock } from 'lucide-react';
import { INDUSTRIES } from '../data/mockData';

const AddCompanyForm: React.FC = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [employeeCount, setEmployeeCount] = React.useState<number>(0);

  const calculateScale = (count: number) => {
    if (count < 50) return 'Mała (poniżej 50 pracowników)';
    if (count <= 250) return 'Średnia (50-250 pracowników)';
    return 'Duża (powyżej 250 pracowników)';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-12 rounded-3xl text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10" />
          </div>
          <h2 className="text-3xl mb-4">Dziękujemy!</h2>
          <p className="text-slate-400 mb-8">
            Twoje zgłoszenie zostało przyjęte. Nasz zespół zweryfikuje dane i skontaktuje się z Tobą w ciągu 48 godzin.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-accent-blue text-white rounded-xl font-bold"
          >
            Wróć do strony głównej
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl mb-6">Dodaj swoją firmę</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Dołącz do największego katalogu B2B w Polsce i dotrzyj do nowych partnerów biznesowych.
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass-panel p-8 md:p-12 rounded-3xl space-y-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Podstawowe informacje */}
          <div className="space-y-6">
            <h3 className="text-xl text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-accent-blue" />
              Podstawowe informacje
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Nazwa firmy</label>
                <input required type="text" className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none" placeholder="np. MetalTech Sp. z o.o." />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Branża</label>
                <select className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none">
                  {INDUSTRIES.map(ind => (
                    <option key={ind.id} value={ind.name}>{ind.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Liczba pracowników</label>
                <input 
                  required 
                  type="number" 
                  min="0"
                  value={employeeCount || ''}
                  className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none" 
                  placeholder="np. 25"
                  onChange={(e) => setEmployeeCount(parseInt(e.target.value) || 0)}
                />
                {employeeCount > 0 && (
                  <p className="mt-2 text-xs text-accent-blue font-medium">
                    Skala działalności: {calculateScale(employeeCount)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Typ działalności</label>
                <div className="flex gap-4">
                  <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-white/10 cursor-pointer hover:bg-industrial-800 transition-colors">
                    <input type="radio" name="type" className="hidden" defaultChecked />
                    <span className="text-sm">Producent</span>
                  </label>
                  <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-white/10 cursor-pointer hover:bg-industrial-800 transition-colors">
                    <input type="radio" name="type" className="hidden" />
                    <span className="text-sm">Usługi</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Dane kontaktowe */}
          <div className="space-y-6">
            <h3 className="text-xl text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent-blue" />
              Kontakt i lokalizacja
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-400 mb-2">Lokalizacja (Miasto, Województwo)</label>
                  <input required type="text" className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none" placeholder="np. Wrocław, Dolnośląskie" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Kod pocztowy</label>
                  <input required type="text" pattern="\d{2}-\d{3}" className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none" placeholder="00-000" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Strona WWW</label>
                <input type="url" className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none" placeholder="https://..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">E-mail</label>
                  <input required type="email" className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Telefon</label>
                  <input required type="tel" className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-accent-blue" />
            Specyfikacja Techniczna (FCP Protocol)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Typ produkcji / Metoda</label>
              <input type="text" className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none" placeholder="np. CNC, Wtrysk, Druk 3D" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Park maszynowy (kluczowe urządzenia)</label>
              <input type="text" className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none" placeholder="np. Mazak, Hass, Arburg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Certyfikaty (ISO, GMP, itp.)</label>
              <input type="text" className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none" placeholder="np. ISO 9001, ISO 13485" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">MOQ (Min. zamówienie)</label>
                <input type="text" className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none" placeholder="np. 100 szt." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Średni Lead Time</label>
                <input type="text" className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none" placeholder="np. 14 dni" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent-blue" />
            Opis działalności
          </h3>
          <textarea required rows={5} className="w-full bg-industrial-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-accent-blue outline-none resize-none" placeholder="Opisz czym zajmuje się Twoja firma, jakie technologie stosujecie..." />
        </div>

        <div className="pt-6">
          <button type="submit" className="w-full py-5 bg-accent-blue hover:bg-blue-600 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
            <PlusCircle className="w-6 h-6" />
            Dodaj firmę do katalogu
          </button>
          <p className="text-center text-slate-500 mt-4 text-sm">
            Klikając przycisk akceptujesz regulamin serwisu FabLink.pl
          </p>
        </div>
      </motion.form>
    </div>
  );
};

export default AddCompanyForm;
