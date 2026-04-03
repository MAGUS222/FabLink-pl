import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from 'lucide-react';
import { BlogPost } from '../types';
import Markdown from 'react-markdown';

interface BlogPostViewProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostView: React.FC<BlogPostViewProps> = ({ post, onBack }) => {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
        
        <div className="absolute top-8 left-6 md:left-12">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/20 shadow-xl"
          >
            <ArrowLeft className="w-5 h-5" /> Powrót do bazy wiedzy
          </button>
        </div>

        <div className="absolute bottom-12 left-6 md:left-12 right-6 md:right-12 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-accent-blue text-white text-xs font-bold rounded-full shadow-lg shadow-blue-500/20">
              {post.category}
            </span>
            <div className="flex items-center gap-4 text-white/80 text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {post.date}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {post.readTime}
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {post.title}
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
              <User className="w-5 h-5" />
            </div>
            <span className="text-white font-bold text-lg">{post.author}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-16 shadow-2xl border border-slate-100"
        >
          <div className="flex justify-end gap-4 mb-12">
            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-accent-blue hover:bg-accent-blue/5 transition-all">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-accent-blue hover:bg-accent-blue/5 transition-all">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>

          <div className="prose prose-lg prose-slate max-w-none">
            <div className="markdown-body">
              <Markdown>{post.content}</Markdown>
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-slate-100">
            <div className="bg-slate-50 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-accent-blue/10 rounded-full flex items-center justify-center text-accent-blue shrink-0">
                <User className="w-12 h-12" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">O autorze: {post.author}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Ekspert z wieloletnim doświadczeniem w optymalizacji procesów produkcyjnych i budowaniu relacji B2B. Na co dzień wspiera firmy w cyfrowej transformacji.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPostView;
