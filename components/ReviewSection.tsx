import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, User, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Review } from '../types';
import { MOCK_REVIEWS, MOCK_COMPANIES } from '../data/mockData';
import { notificationService } from '../services/NotificationService';

interface ReviewSectionProps {
  companyId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ companyId }) => {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS.filter(r => r.companyId === companyId));
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(async () => {
      const review: Review = {
        id: Math.random().toString(36).substr(2, 9),
        companyId,
        userName: 'Gość',
        rating: newReview.rating,
        comment: newReview.comment,
        createdAt: Date.now(),
        status: 'pending'
      };
      
      // Send notification to company owner
      const company = MOCK_COMPANIES.find(c => c.id === companyId);
      if (company) {
        await notificationService.sendNotification({
          type: 'review',
          title: `Nowa opinia dla ${company.name}`,
          message: `Otrzymałeś nową opinię (${newReview.rating}/5) od użytkownika Gość: "${newReview.comment}"`,
          recipientEmail: company.contact.email,
          companyId: company.id
        });
      }
      
      setIsSubmitting(false);
      setShowSuccess(true);
      setNewReview({ rating: 5, comment: '' });
      
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            Opinie i oceny
          </h3>
          <p className="text-slate-500 font-medium">Sprawdź co inni mówią o współpracy z tą firmą.</p>
        </div>
        
        <div className="flex items-center gap-6 bg-slate-50 px-8 py-6 rounded-3xl border border-slate-200">
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-900">{averageRating}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Średnia ocena</div>
          </div>
          <div className="w-px h-12 bg-slate-200" />
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-900">{reviews.length}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Opinii</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Review List */}
        <div className="lg:col-span-2 space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{review.userName}</div>
                      <div className="text-xs text-slate-400 font-medium">
                        {new Date(review.createdAt).toLocaleDateString('pl-PL')}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed italic">
                  "{review.comment}"
                </p>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-bold">Brak opinii dla tej firmy. Bądź pierwszy!</p>
            </div>
          )}
        </div>

        {/* Add Review Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
            <h4 className="text-xl font-bold text-slate-900 mb-6">Dodaj swoją opinię</h4>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Twoja ocena</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star 
                        className={`w-8 h-8 ${star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Komentarz</label>
                <textarea
                  required
                  rows={4}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-accent-blue outline-none resize-none transition-all"
                  placeholder="Opisz swoje doświadczenia..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !newReview.comment}
                className="w-full py-4 bg-slate-900 hover:bg-accent-blue text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 shadow-lg shadow-slate-900/10"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Wyślij opinię
                  </>
                )}
              </button>
              
              <AnimatePresence>
                {showSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-green-50 border border-green-100 rounded-xl flex gap-3 items-start"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <p className="text-xs text-green-700 font-medium">
                      Dziękujemy! Twoja opinia została wysłana i oczekuje na weryfikację przez administratora.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-accent-blue shrink-0" />
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed uppercase tracking-wider">
                  Dbamy o jakość. Każda opinia jest weryfikowana pod kątem autentyczności przed publikacją.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
