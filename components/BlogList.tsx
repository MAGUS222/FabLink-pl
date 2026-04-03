import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { MOCK_BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';

interface BlogListProps {
  onSelectPost: (post: BlogPost) => void;
}

const BlogList: React.FC<BlogListProps> = ({ onSelectPost }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-accent-blue/10 text-accent-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Baza Wiedzy B2B</h1>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">
            Poradniki, trendy i analizy rynkowe przygotowane przez ekspertów FabLink.pl.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
              onClick={() => onSelectPost(post)}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-accent-blue text-xs font-bold rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 text-slate-400 text-xs font-bold mb-4 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {post.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-accent-blue transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-slate-500 text-sm font-medium mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-600">{post.author}</span>
                  </div>
                  <span className="text-accent-blue font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Czytaj więcej <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
