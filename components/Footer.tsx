import React from 'react';
import { Factory, Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-industrial-950 border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-2xl font-display font-bold text-white">
            FabLink<span className="text-accent-blue">.pl</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Największa w Polsce platforma łącząca producentów i firmy usługowe B2B. Budujemy przyszłość polskiego przemysłu.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-industrial-900 rounded-lg text-slate-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-industrial-900 rounded-lg text-slate-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-industrial-900 rounded-lg text-slate-400 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Dla firm</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-accent-blue transition-colors">Dodaj firmę</a></li>
            <li><a href="#" className="hover:text-accent-blue transition-colors">Pakiety promocyjne</a></li>
            <li><a href="#" className="hover:text-accent-blue transition-colors">Weryfikacja profilu</a></li>
            <li><a href="#" className="hover:text-accent-blue transition-colors">Panel partnera</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Kategorie</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-accent-blue transition-colors">Obróbka metalu</a></li>
            <li><a href="#" className="hover:text-accent-blue transition-colors">Tworzywa sztuczne</a></li>
            <li><a href="#" className="hover:text-accent-blue transition-colors">Elektronika</a></li>
            <li><a href="#" className="hover:text-accent-blue transition-colors">Logistyka i transport</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Kontakt</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-accent-blue" />
              kontakt@fablink.pl
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-accent-blue" />
              +48 22 123 45 67
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-accent-blue" />
              ul. Przemysłowa 12, Warszawa
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs">
        <p>© 2026 FabLink.pl. Wszystkie prawa zastrzeżone.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Polityka prywatności</a>
          <a href="#" className="hover:text-white transition-colors">Regulamin</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
