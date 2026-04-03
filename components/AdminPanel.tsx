import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Building2, Megaphone, BarChart3, Trash2, Edit, Plus, Check, X, Eye, MousePointer2, MessageSquare, BookOpen, Star } from 'lucide-react';
import { MOCK_COMPANIES, MOCK_ADS, MOCK_REVIEWS, MOCK_BLOG_POSTS } from '../data/mockData';
import { Company, Ad, Review, BlogPost } from '../types';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'companies' | 'ads' | 'stats' | 'reviews' | 'blog'>('companies');
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [ads, setAds] = useState<Ad[]>(MOCK_ADS);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [posts, setPosts] = useState<BlogPost[]>(MOCK_BLOG_POSTS);

  const deleteCompany = (id: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć tę firmę?')) {
      setCompanies(companies.filter(c => c.id !== id));
    }
  };

  const toggleAdStatus = (id: string) => {
    setAds(ads.map(ad => ad.id === id ? { ...ad, active: !ad.active } : ad));
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-12 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Panel Administratora</h1>
            <p className="text-slate-500 font-medium">Zarządzaj katalogiem firm i kampaniami reklamowymi.</p>
          </div>
          <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
            <button 
              onClick={() => setActiveTab('companies')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'companies' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Building2 className="w-5 h-5" /> Firmy
            </button>
            <button 
              onClick={() => setActiveTab('ads')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'ads' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Megaphone className="w-5 h-5" /> Reklamy
            </button>
            <button 
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'stats' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <BarChart3 className="w-5 h-5" /> Statystyki
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'reviews' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <MessageSquare className="w-5 h-5" /> Opinie
            </button>
            <button 
              onClick={() => setActiveTab('blog')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'blog' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <BookOpen className="w-5 h-5" /> Blog
            </button>
          </div>
        </div>

        {activeTab === 'companies' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Lista firm ({companies.length})</h3>
              <button className="px-4 py-2 bg-accent-blue text-white rounded-lg text-sm font-bold flex items-center gap-2">
                <Plus className="w-4 h-4" /> Dodaj nową
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                    <th className="px-6 py-4 font-bold">Firma</th>
                    <th className="px-6 py-4 font-bold">Branża</th>
                    <th className="px-6 py-4 font-bold">Lokalizacja</th>
                    <th className="px-6 py-4 font-bold">Data dodania</th>
                    <th className="px-6 py-4 font-bold text-right">Akcje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {companies.map(company => (
                    <tr key={company.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{company.name}</div>
                        <div className="text-xs text-slate-500">{company.type}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">{company.industry}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-medium">{company.location}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(company.createdAt).toLocaleDateString('pl-PL')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-slate-400 hover:text-accent-blue transition-colors"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => deleteCompany(company.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'ads' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ads.map(ad => (
              <div key={ad.id} className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
                <div className="relative h-48">
                  <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${ad.active ? 'bg-green-500 text-white' : 'bg-slate-500 text-white'}`}>
                    {ad.active ? 'Aktywna' : 'Nieaktywna'}
                  </div>
                </div>
                <div className="p-6 flex-1">
                  <div className="text-xs font-bold text-accent-blue mb-1 uppercase tracking-wider">{ad.companyName}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{ad.title}</h3>
                  <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">{ad.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1 uppercase">
                        <Eye className="w-3 h-3" /> Wyświetlenia
                      </div>
                      <div className="text-xl font-bold text-slate-900">{ad.impressions.toLocaleString()}</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1 uppercase">
                        <MousePointer2 className="w-3 h-3" /> Kliknięcia
                      </div>
                      <div className="text-xl font-bold text-slate-900">{ad.clicks.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <button 
                      onClick={() => toggleAdStatus(ad.id)}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${ad.active ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-green-500 text-white hover:bg-green-600'}`}
                    >
                      {ad.active ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      {ad.active ? 'Wstrzymaj' : 'Aktywuj'}
                    </button>
                    <button className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button className="border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-slate-400 hover:border-accent-blue hover:text-accent-blue transition-all group">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-blue/10 transition-all">
                <Plus className="w-8 h-8" />
              </div>
              <span className="font-bold">Dodaj nową kampanię</span>
            </button>
          </motion.div>
        )}

        {activeTab === 'stats' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                <div className="text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Łączne wyświetlenia reklam</div>
                <div className="text-4xl font-bold text-slate-900">{(ads.reduce((acc, curr) => acc + curr.impressions, 0)).toLocaleString()}</div>
                <div className="mt-4 text-green-500 text-sm font-bold flex items-center gap-1">
                  +12.5% <span className="text-slate-400 font-medium">vs poprzedni miesiąc</span>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                <div className="text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Średni CTR</div>
                <div className="text-4xl font-bold text-slate-900">
                  {(ads.reduce((acc, curr) => acc + (curr.clicks / curr.impressions), 0) / ads.length * 100).toFixed(2)}%
                </div>
                <div className="mt-4 text-green-500 text-sm font-bold flex items-center gap-1">
                  +2.1% <span className="text-slate-400 font-medium">vs poprzedni miesiąc</span>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                <div className="text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Przychód z reklam (est.)</div>
                <div className="text-4xl font-bold text-slate-900">4 250,00 PLN</div>
                <div className="mt-4 text-slate-400 text-sm font-medium">Rozliczenie za marzec 2026</div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Popularność branż (Wyszukiwania)</h3>
              <div className="space-y-4">
                {[
                  { name: 'Obróbka Metalu', val: 85 },
                  { name: 'Automatyka', val: 62 },
                  { name: 'Logistyka', val: 45 },
                  { name: 'Tworzywa Sztuczne', val: 38 }
                ].map(item => (
                  <div key={item.name}>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-slate-700">{item.name}</span>
                      <span className="text-slate-400">{item.val}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.val}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-accent-blue"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'reviews' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900">Moderacja opinii ({reviews.length})</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {reviews.map(review => (
                <div key={review.id} className="p-6 flex gap-6 items-start hover:bg-slate-50 transition-colors">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 shrink-0">
                    <Star className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <span className="font-bold text-slate-900">{review.userName}</span>
                        <span className="text-slate-400 text-sm ml-3">dla {companies.find(c => c.id === review.companyId)?.name}</span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mb-4 italic">"{review.comment}"</p>
                    <div className="flex gap-3">
                      <button className="px-4 py-1.5 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-all">Zatwierdź</button>
                      <button className="px-4 py-1.5 bg-red-50 text-red-500 text-xs font-bold rounded-lg hover:bg-red-100 transition-all">Odrzuć</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'blog' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex justify-end">
              <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg">
                <Plus className="w-5 h-5" /> Nowy artykuł
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {posts.map(post => (
                <div key={post.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg flex gap-6 items-center">
                  <img src={post.imageUrl} alt="" className="w-24 h-24 rounded-2xl object-cover shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs font-bold text-accent-blue mb-1 uppercase">{post.category}</div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{post.title}</h4>
                    <div className="text-sm text-slate-400 font-medium">{post.date} • {post.author}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-accent-blue transition-all"><Edit className="w-5 h-5" /></button>
                    <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-red-500 transition-all"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
