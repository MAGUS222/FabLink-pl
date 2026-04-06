import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Building2, Megaphone, BarChart3, Trash2, Edit, Plus, Check, X, Eye, MousePointer2, MessageSquare, BookOpen, Star, Mail, Bell, Database } from 'lucide-react';
import { MOCK_COMPANIES, MOCK_ADS, MOCK_REVIEWS, MOCK_BLOG_POSTS } from '../data/mockData';
import { Company, Ad, Review, BlogPost, Notification } from '../types';
import { notificationService } from '../services/NotificationService';
import DataAcquisitionHub from './DataAcquisitionHub';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'companies' | 'ads' | 'stats' | 'reviews' | 'blog' | 'notifications' | 'data-acquisition'>('companies');
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [ads, setAds] = useState<Ad[]>(MOCK_ADS);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [posts, setPosts] = useState<BlogPost[]>(MOCK_BLOG_POSTS);
  const [notifications, setNotifications] = useState<Notification[]>(notificationService.getNotifications());

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ type: string, id: string } | null>(null);
  const [editMode, setEditMode] = useState<'company' | 'ad' | 'post' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  const deleteCompany = (id: string) => {
    setConfirmAction({ type: 'company', id });
    setIsConfirmOpen(true);
  };

  const deleteAd = (id: string) => {
    setConfirmAction({ type: 'ad', id });
    setIsConfirmOpen(true);
  };

  const deletePost = (id: string) => {
    setConfirmAction({ type: 'post', id });
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (!confirmAction) return;
    
    if (confirmAction.type === 'company') {
      setCompanies(companies.filter(c => c.id !== confirmAction.id));
    } else if (confirmAction.type === 'ad') {
      setAds(ads.filter(a => a.id !== confirmAction.id));
    } else if (confirmAction.type === 'post') {
      setPosts(posts.filter(p => p.id !== confirmAction.id));
    }
    
    setIsConfirmOpen(false);
    setConfirmAction(null);
  };

  const toggleAdStatus = (id: string) => {
    setAds(ads.map(ad => ad.id === id ? { ...ad, active: !ad.active } : ad));
  };

  const handleEdit = (type: 'company' | 'ad' | 'post', item?: any) => {
    setEditMode(type);
    setEditingItem(item || null);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (editMode === 'company') {
      const companyData = {
        ...data,
        contact: {
          email: data.email as string || editingItem?.contact?.email || '',
          phone: data.phone as string || editingItem?.contact?.phone || '',
          website: data.website as string || editingItem?.contact?.website || '',
        }
      };
      if (editingItem) {
        setCompanies(companies.map(c => c.id === editingItem.id ? { ...c, ...companyData } : c));
      } else {
        const newCompany: Company = {
          id: Math.random().toString(36).substr(2, 9),
          name: data.name as string,
          description: data.description as string,
          type: data.type as any,
          industry: data.industry as string,
          location: data.location as string,
          postalCode: data.postalCode as string || '00-000',
          contact: { 
            email: data.email as string || '', 
            phone: data.phone as string || '', 
            website: data.website as string || '' 
          },
          images: [data.imageUrl as string || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'],
          ownerUid: 'admin',
          createdAt: Date.now(),
        };
        setCompanies([newCompany, ...companies]);
      }
    } else if (editMode === 'ad') {
      if (editingItem) {
        setAds(ads.map(a => a.id === editingItem.id ? { ...a, ...data } : a));
      } else {
        const newAd: Ad = {
          id: Math.random().toString(36).substr(2, 9),
          companyName: data.companyName as string,
          title: data.title as string,
          description: data.description as string,
          imageUrl: data.imageUrl as string || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
          link: '#',
          impressions: 0,
          clicks: 0,
          active: true,
        };
        setAds([newAd, ...ads]);
      }
    } else if (editMode === 'post') {
      if (editingItem) {
        setPosts(posts.map(p => p.id === editingItem.id ? { ...p, ...data } : p));
      } else {
        const newPost: BlogPost = {
          id: Math.random().toString(36).substr(2, 9),
          title: data.title as string,
          excerpt: data.excerpt as string,
          content: data.content as string,
          author: data.author as string,
          date: new Date().toLocaleDateString('pl-PL'),
          imageUrl: data.imageUrl as string || 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=800',
          category: data.category as string,
          readTime: '5 min',
        };
        setPosts([newPost, ...posts]);
      }
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-12 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Panel Administratora</h1>
            <p className="text-slate-500 font-medium">Zarządzaj katalogiem firm i kampaniami reklamowymi.</p>
          </div>
          <div className="flex flex-wrap bg-white p-1 rounded-2xl border border-slate-200 shadow-sm gap-1">
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
              onClick={() => setActiveTab('data-acquisition')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'data-acquisition' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Database className="w-5 h-5" /> Pozyskiwanie Danych
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
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'notifications' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Bell className="w-5 h-5" /> Powiadomienia
            </button>
          </div>
        </div>

        {activeTab === 'companies' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Lista firm ({companies.length})</h3>
              <button 
                onClick={() => handleEdit('company')}
                className="px-4 py-2 bg-accent-blue text-white rounded-lg text-sm font-bold flex items-center gap-2"
              >
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
                          <button 
                            onClick={() => handleEdit('company', company)}
                            className="p-2 text-slate-400 hover:text-accent-blue transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
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
                    <button 
                      onClick={() => handleEdit('ad', ad)}
                      className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-all"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => deleteAd(ad.id)}
                      className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button 
              onClick={() => handleEdit('ad')}
              className="border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-slate-400 hover:border-accent-blue hover:text-accent-blue transition-all group"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-blue/10 transition-all">
                <Plus className="w-8 h-8" />
              </div>
              <span className="font-bold">Dodaj nową kampanię</span>
            </button>
          </motion.div>
        )}

        {activeTab === 'data-acquisition' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <DataAcquisitionHub onApprove={(newCompany) => setCompanies([newCompany, ...companies])} />
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
              <button 
                onClick={() => handleEdit('post')}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg"
              >
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
                    <button 
                      onClick={() => handleEdit('post', post)}
                      className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-accent-blue transition-all"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => deletePost(post.id)}
                      className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'notifications' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900">Historia powiadomień e-mail ({notifications.length})</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <div key={notification.id} className="p-6 flex gap-6 items-start hover:bg-slate-50 transition-colors">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-accent-blue shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <div>
                          <span className="font-bold text-slate-900">{notification.title}</span>
                          <span className="text-slate-400 text-sm ml-3">Do: {notification.recipientEmail}</span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium">
                          {new Date(notification.createdAt).toLocaleString('pl-PL')}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-600 font-medium leading-relaxed">
                        {notification.message}
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-500">
                        <Check className="w-3 h-3" /> E-mail wysłany pomyślnie
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-20 text-center text-slate-400">
                  <Bell className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="font-bold">Brak wysłanych powiadomień.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Admin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingItem ? 'Edytuj' : 'Dodaj'} {editMode === 'company' ? 'firmę' : editMode === 'ad' ? 'reklamę' : 'artykuł'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-slate-900"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="space-y-6">
                {editMode === 'company' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nazwa firmy</label>
                      <input name="name" defaultValue={editingItem?.name} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Branża</label>
                        <select name="industry" defaultValue={editingItem?.industry} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all">
                          <option>Obróbka Metalu</option>
                          <option>Automatyka</option>
                          <option>Logistyka</option>
                          <option>Tworzywa Sztuczne</option>
                          <option>Budownictwo</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Typ</label>
                        <select name="type" defaultValue={editingItem?.type} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all">
                          <option>Producent</option>
                          <option>Usługi</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Lokalizacja</label>
                      <input name="location" defaultValue={editingItem?.location} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Kod pocztowy</label>
                      <input name="postalCode" defaultValue={editingItem?.postalCode} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">E-mail kontaktowy</label>
                        <input name="email" defaultValue={editingItem?.contact?.email} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Telefon</label>
                        <input name="phone" defaultValue={editingItem?.contact?.phone} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Strona WWW</label>
                      <input name="website" defaultValue={editingItem?.contact?.website} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">URL obrazu głównego</label>
                      <input name="imageUrl" defaultValue={editingItem?.images?.[0]} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Opis</label>
                      <textarea name="description" defaultValue={editingItem?.description} rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all resize-none" />
                    </div>
                  </>
                )}

                {editMode === 'ad' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nazwa firmy (reklamodawcy)</label>
                      <input name="companyName" defaultValue={editingItem?.companyName} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Tytuł reklamy</label>
                      <input name="title" defaultValue={editingItem?.title} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">URL obrazu</label>
                      <input name="imageUrl" defaultValue={editingItem?.imageUrl} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Krótki opis</label>
                      <textarea name="description" defaultValue={editingItem?.description} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all resize-none" />
                    </div>
                  </>
                )}

                {editMode === 'post' && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Tytuł artykułu</label>
                      <input name="title" defaultValue={editingItem?.title} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Kategoria</label>
                        <select name="category" defaultValue={editingItem?.category} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all">
                          <option>Poradniki</option>
                          <option>Trendy</option>
                          <option>Technologie</option>
                          <option>Case Study</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Autor</label>
                        <input name="author" defaultValue={editingItem?.author || 'Redakcja FabLink'} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Zajawka (excerpt)</label>
                      <textarea name="excerpt" defaultValue={editingItem?.excerpt} rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Treść (Markdown)</label>
                      <textarea name="content" defaultValue={editingItem?.content} rows={8} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all resize-none font-mono text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">URL obrazu</label>
                      <input name="imageUrl" defaultValue={editingItem?.imageUrl} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none transition-all" />
                    </div>
                  </>
                )}
              </div>

              <div className="mt-10 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                >
                  Anuluj
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                >
                  Zapisz zmiany
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsConfirmOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Czy na pewno?</h3>
            <p className="text-slate-500 mb-8">Tej operacji nie można cofnąć. Wszystkie powiązane dane zostaną usunięte.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsConfirmOpen(false)}
                className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
              >
                Anuluj
              </button>
              <button 
                onClick={handleConfirm}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
              >
                Usuń
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
