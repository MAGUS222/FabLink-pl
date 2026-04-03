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

          <div className="blog-content prose prose-lg max-w-none text-slate-700 leading-relaxed text-lg space-y-6">
            <Markdown 
              components={{
                h2: ({node, ...props}) => <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6 border-b border-slate-100 pb-4" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4" {...props} />,
                p: ({node, ...props}) => <p className="mb-6 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-outside space-y-3 mb-8 pl-6" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-outside space-y-3 mb-8 pl-6" {...props} />,
                li: ({node, ...props}) => <li className="text-slate-700 pl-2" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-slate-900" {...props} />,
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-accent-blue pl-8 py-4 italic text-slate-600 bg-slate-50/50 rounded-r-2xl my-10 relative overflow-hidden" {...props}>
                    <div className="absolute top-0 left-0 w-1 h-full bg-accent-blue opacity-50" />
                  </blockquote>
                ),
                img: ({node, ...props}) => (
                  <div className="my-12 rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                    <img className="w-full h-auto object-cover" referrerPolicy="no-referrer" {...props} />
                    {props.alt && <p className="text-center text-sm text-slate-400 mt-4 font-medium italic">{props.alt}</p>}
                  </div>
                ),
                a: ({node, ...props}) => <a className="text-accent-blue hover:underline font-bold transition-all" {...props} />,
                code: ({node, ...props}) => <code className="bg-slate-100 text-slate-900 px-2 py-0.5 rounded font-mono text-sm" {...props} />,
                pre: ({node, ...props}) => <pre className="bg-slate-900 text-slate-100 p-6 rounded-2xl overflow-x-auto my-8 font-mono text-sm shadow-xl" {...props} />,
              }}
            >
              {post.content}
            </Markdown>
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
