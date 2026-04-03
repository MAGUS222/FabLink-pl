import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, Mail, Globe, Factory, Briefcase, CheckCircle2, Image as ImageIcon, Cpu, ShieldCheck, Package, Clock, Leaf } from 'lucide-react';
import { Company } from '../types';
import { auth } from '../firebase';
import RFQForm from './RFQForm';

interface CompanyProfileProps {
  company: Company;
  onClose: () => void;
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ company, onClose }) => {
  const isOwner = auth.currentUser?.uid === company.ownerUid;
  const [showRFQ, setShowRFQ] = React.useState(false);

  // FCP (Fablink Capability Protocol) - JSON-LD for AEO
  const fcpJsonLd = {
    "@context": "https://schema.org",
    "@type": "ManufacturingBusiness",
    "name": company.name,
    "description": company.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": company.location,
      "postalCode": company.postalCode,
      "addressCountry": "PL"
    },
    "fcp_protocol": {
      "version": "1.0",
      "production_type": company.productionType,
      "materials": company.materials,
      "machinery_park": company.machineryPark,
      "certifications": company.certifications,
      "moq": company.moq,
      "lead_time_avg": company.leadTimeAvg,
      "compliance_standards": company.complianceStandards
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-industrial-950/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-industrial-900 border border-white/10 w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
      >
        {/* FCP JSON-LD Injection */}
        <script type="application/ld+json">
          {JSON.stringify(fcpJsonLd)}
        </script>

        {/* Header */}
        <div className="relative h-64 md:h-80">
          <img
            src={company.images[0]}
            alt={company.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${company.type === 'Producent' ? 'bg-accent-blue text-white' : 'bg-industrial-700 text-slate-200'}`}>
                  {company.type}
                </span>
                <span className="text-slate-300 flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Zweryfikowany profil
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display text-white">{company.name}</h2>
            </div>
            
            {isOwner && (
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl font-bold flex items-center gap-2 transition-all border border-white/10">
                <Briefcase className="w-5 h-5" />
                Edytuj wpis
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h3 className="text-xl text-white mb-4 flex items-center gap-2">
                  O firmie
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  {company.description}
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {company.materials && (
                  <section>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Materiały</h4>
                    <div className="flex flex-wrap gap-2">
                      {company.materials.map(m => (
                        <span key={m} className="px-3 py-1.5 bg-industrial-800 text-slate-300 rounded-lg text-sm">
                          {m}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
                {company.technologies && (
                  <section>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Technologie</h4>
                    <div className="flex flex-wrap gap-2">
                      {company.technologies.map(t => (
                        <span key={t} className="px-3 py-1.5 bg-accent-blue/10 text-accent-blue rounded-lg text-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              <section>
                <h3 className="text-xl text-white mb-6 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-accent-blue" />
                  FCP (Fablink Capability Protocol)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-industrial-800/50 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Typ produkcji</p>
                    <p className="text-white font-medium">{company.productionType || 'Nie określono'}</p>
                  </div>
                  <div className="p-4 bg-industrial-800/50 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Park maszynowy</p>
                    <p className="text-white text-sm">{company.machineryPark?.join(', ') || 'Nie określono'}</p>
                  </div>
                  <div className="p-4 bg-industrial-800/50 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Certyfikaty</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {company.certifications?.map(c => (
                        <span key={c} className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-bold rounded border border-green-500/20">
                          {c}
                        </span>
                      )) || 'Brak'}
                    </div>
                  </div>
                  <div className="p-4 bg-industrial-800/50 rounded-xl border border-white/5">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Standardy Compliance</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {company.complianceStandards?.map(s => (
                        <span key={s} className="px-2 py-0.5 bg-accent-blue/10 text-accent-blue text-[10px] font-bold rounded border border-accent-blue/20">
                          {s}
                        </span>
                      )) || 'Brak'}
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl text-white mb-6 flex items-center gap-2">
                  Galeria
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {company.images.map((img, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden bg-industrial-800">
                      <img src={img} alt={`${company.name} ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                  <div className="aspect-square rounded-xl border-2 border-dashed border-industrial-700 flex flex-col items-center justify-center text-industrial-600">
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span className="text-xs">Więcej zdjęć</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar / Contact */}
            <div className="space-y-8">
              <div className="glass-panel p-8 rounded-2xl space-y-6">
                <h3 className="text-lg text-white font-bold">Dane kontaktowe</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-accent-blue shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-300">Lokalizacja</p>
                      <p className="text-sm text-slate-400">{company.postalCode} {company.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-accent-blue shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-300">Telefon</p>
                      <p className="text-sm text-slate-400">{company.contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-accent-blue shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-300">E-mail</p>
                      <p className="text-sm text-slate-400">{company.contact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Globe className="w-5 h-5 text-accent-blue shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-300">Strona WWW</p>
                      <a href={company.contact.website} target="_blank" rel="noopener noreferrer" className="text-sm text-accent-blue hover:underline">
                        {company.contact.website.replace('https://', '')}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                  <div className="text-center">
                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">MOQ</p>
                    <div className="flex items-center justify-center gap-1 text-white font-bold">
                      <Package className="w-3 h-3 text-accent-blue" />
                      {company.moq || 'N/A'}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Lead Time</p>
                    <div className="flex items-center justify-center gap-1 text-white font-bold">
                      <Clock className="w-3 h-3 text-accent-blue" />
                      {company.leadTimeAvg || 'N/A'}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowRFQ(true)}
                  className="w-full py-4 bg-accent-blue hover:bg-blue-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
                >
                  Wyślij zapytanie RFQ
                </button>
              </div>

              <div className="p-6 bg-industrial-800/50 rounded-2xl border border-white/5">
                <p className="text-xs text-slate-500 mb-2 uppercase tracking-widest font-bold">Skala działalności</p>
                <p className="text-white">{company.scale || 'Nie określono'}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showRFQ && (
          <RFQForm companies={[company]} onClose={() => setShowRFQ(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CompanyProfile;
