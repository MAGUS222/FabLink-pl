import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Building2, MapPin, Globe, Mail, Phone, FileText, Check, Cpu, ShieldCheck, Package, Clock, Search, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { INDUSTRIES } from '../data/mockData';

const AddCompanyForm: React.FC = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [employeeCount, setEmployeeCount] = React.useState<number>(0);
  const [nip, setNip] = React.useState('');
  const [isFetchingGus, setIsFetchingGus] = React.useState(false);
  const [showFCP, setShowFCP] = React.useState(false);
  
  // Form states to be populated by GUS
  const [formData, setFormData] = React.useState({
    name: '',
    location: '',
    postalCode: '',
    industry: '',
    email: '',
    phone: '',
    website: '',
    description: ''
  });

  const calculateScale = (count: number) => {
    if (count < 50) return 'Mała (poniżej 50 pracowników)';
    if (count <= 250) return 'Średnia (50-250 pracowników)';
    return 'Duża (powyżej 250 pracowników)';
  };

  const fetchGusData = async () => {
    if (nip.length !== 10) {
      alert('Proszę podać poprawny NIP (10 cyfr)');
      return;
    }

    setIsFetchingGus(true);
    try {
      const response = await fetch(`/api/gus/${nip}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Błąd serwera');
      }

      const data = await response.json();
      
      // Update form data with real results
      setFormData(prev => ({
        ...prev,
        name: data.name || '',
        location: data.location || '',
        postalCode: data.postalCode || '',
        description: `Firma ${data.name} z siedzibą w ${data.location}. Dane pobrane automatycznie z Wykazu Podatników VAT (Biała Lista MF).`
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      alert(error instanceof Error ? error.message : 'Wystąpił błąd podczas pobierania danych.');
    } finally {
      setIsFetchingGus(false);
    }
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
          className="bg-white border border-slate-200 p-12 rounded-3xl text-center max-w-md shadow-xl"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10" />
          </div>
          <h2 className="text-3xl mb-4 text-slate-900 font-bold">Dziękujemy!</h2>
          <p className="text-slate-500 mb-8 font-medium">
            Twoje zgłoszenie zostało przyjęte. Nasz zespół zweryfikuje dane i skontaktuje się z Tobą w ciągu 48 godzin.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-slate-900 hover:bg-accent-blue text-white rounded-xl font-bold transition-all shadow-lg"
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
        <h1 className="text-4xl md:text-5xl mb-6 text-slate-900 font-bold">Dodaj swoją firmę</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
          Dołącz do największego katalogu B2B w Polsce i dotrzyj do nowych partnerów biznesowych.
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 p-8 md:p-12 rounded-3xl space-y-12 shadow-xl"
      >
        {/* NIP Section */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-accent-blue" />
            <h3 className="text-lg font-bold text-slate-900">Szybkie dodawanie przez NIP</h3>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input 
                type="text" 
                value={nip}
                onChange={(e) => setNip(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-accent-blue outline-none transition-all" 
                placeholder="Wpisz NIP firmy (10 cyfr)" 
              />
            </div>
            <button
              type="button"
              onClick={fetchGusData}
              disabled={isFetchingGus || nip.length !== 10}
              className="px-8 py-3 bg-accent-blue hover:bg-blue-600 disabled:bg-slate-300 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-md"
            >
              {isFetchingGus ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              Pobierz dane z GUS
            </button>
          </div>
          <p className="text-xs text-slate-400 font-medium italic">
            * Automatycznie uzupełnimy nazwę, adres i opis firmy na podstawie oficjalnych rejestrów.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Podstawowe informacje */}
          <div className="space-y-6">
            <h3 className="text-xl text-slate-900 flex items-center gap-2 font-bold">
              <Building2 className="w-5 h-5 text-accent-blue" />
              Podstawowe informacje
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Nazwa firmy</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-accent-blue outline-none transition-all" 
                  placeholder="np. MetalTech Sp. z o.o." 
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Branża</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-accent-blue outline-none transition-all"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                >
                  <option value="">Wybierz branżę</option>
                  {INDUSTRIES.map(ind => (
                    <option key={ind.id} value={ind.name}>{ind.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Liczba pracowników</label>
                <input 
                  required 
                  type="number" 
                  min="0"
                  value={employeeCount || ''}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-accent-blue outline-none transition-all" 
                  placeholder="np. 25"
                  onChange={(e) => setEmployeeCount(parseInt(e.target.value) || 0)}
                />
                {employeeCount > 0 && (
                  <p className="mt-2 text-xs text-accent-blue font-bold">
                    Skala działalności: {calculateScale(employeeCount)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Typ działalności</label>
                <div className="flex gap-4">
                  <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-all group">
                    <input type="radio" name="type" className="hidden" defaultChecked />
                    <span className="text-sm font-bold text-slate-600 group-hover:text-accent-blue">Producent</span>
                  </label>
                  <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-all group">
                    <input type="radio" name="type" className="hidden" />
                    <span className="text-sm font-bold text-slate-600 group-hover:text-accent-blue">Usługi</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Dane kontaktowe */}
          <div className="space-y-6">
            <h3 className="text-xl text-slate-900 flex items-center gap-2 font-bold">
              <MapPin className="w-5 h-5 text-accent-blue" />
              Kontakt i lokalizacja
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Lokalizacja</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-accent-blue outline-none transition-all" 
                    placeholder="np. Wrocław, Dolnośląskie" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Kod pocztowy</label>
                  <input 
                    required 
                    type="text" 
                    pattern="\d{2}-\d{3}" 
                    value={formData.postalCode}
                    onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-accent-blue outline-none transition-all" 
                    placeholder="00-000" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Strona WWW</label>
                <input 
                  type="url" 
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-accent-blue outline-none transition-all" 
                  placeholder="https://..." 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">E-mail</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-accent-blue outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Telefon</label>
                  <input 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-accent-blue outline-none transition-all" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FCP Protocol Section - Optional */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowFCP(!showFCP)}
            className="w-full p-6 bg-slate-50 flex items-center justify-between hover:bg-slate-100 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-blue/10 rounded-xl flex items-center justify-center text-accent-blue">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-slate-900">Specyfikacja Techniczna (FCP Protocol)</h3>
                <p className="text-xs text-slate-500 font-medium italic">Opcjonalnie - wypełnij, aby zwiększyć widoczność</p>
              </div>
            </div>
            {showFCP ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
          </button>

          <AnimatePresence>
            {showFCP ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="p-8 border-t border-slate-200 space-y-8"
              >
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-4 items-start">
                  <Sparkles className="w-6 h-6 text-accent-blue shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-accent-blue mb-1">Chcesz zwiększyć widoczność swojej firmy?</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Firmy z uzupełnionym protokołem FCP są wyświetlane wyżej w wynikach wyszukiwania i częściej otrzymują zapytania RFQ od dużych partnerów.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Typ produkcji / Metoda</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-accent-blue outline-none transition-all" placeholder="np. CNC, Wtrysk, Druk 3D" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Park maszynowy</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-accent-blue outline-none transition-all" placeholder="np. Mazak, Hass, Arburg" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Certyfikaty</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-accent-blue outline-none transition-all" placeholder="np. ISO 9001, ISO 13485" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">MOQ</label>
                      <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-accent-blue outline-none transition-all" placeholder="np. 100 szt." />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Lead Time</label>
                      <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-accent-blue outline-none transition-all" placeholder="np. 14 dni" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="p-4 bg-slate-50/50 text-center">
                <button 
                  type="button"
                  onClick={() => setShowFCP(true)}
                  className="text-sm font-bold text-accent-blue hover:underline flex items-center justify-center gap-2 mx-auto"
                >
                  <PlusCircle className="w-4 h-4" />
                  Uzupełnij specyfikację techniczną, aby zyskać więcej klientów
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl text-slate-900 flex items-center gap-2 font-bold">
            <FileText className="w-5 h-5 text-accent-blue" />
            Opis działalności
          </h3>
          <textarea 
            required 
            rows={5} 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-accent-blue outline-none resize-none transition-all" 
            placeholder="Opisz czym zajmuje się Twoja firma, jakie technologie stosujecie..." 
          />
        </div>

        <div className="pt-6">
          <button type="submit" className="w-full py-5 bg-slate-900 hover:bg-accent-blue text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3">
            <PlusCircle className="w-6 h-6" />
            Dodaj firmę do katalogu
          </button>
          <p className="text-center text-slate-400 mt-4 text-sm font-medium">
            Klikając przycisk akceptujesz regulamin serwisu FabLink.pl
          </p>
        </div>
      </motion.form>
    </div>
  );
};

export default AddCompanyForm;
