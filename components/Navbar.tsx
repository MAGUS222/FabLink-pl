import React from 'react';
import { Factory, Search, PlusCircle, Menu, X, User, Home, ShieldCheck, Calculator } from 'lucide-react';
import { ViewState } from '../types';

import { auth, signInWithGoogle, logout } from '../firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState<FirebaseUser | null>(null);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const isAdmin = user?.email === 'mgrochowski222@gmail.com';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-2xl font-display font-bold group transition-colors"
        >
          <div className="w-10 h-10 bg-accent-blue rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-blue-500/20">
            <Factory className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-baseline">
            <span className={isScrolled ? 'text-slate-900' : 'text-slate-900'}>Fab</span>
            <span className="text-accent-blue">Link</span>
            <span className="text-slate-500">.pl</span>
          </div>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => setView('home')}
            className={`p-2 rounded-lg transition-all ${currentView === 'home' ? 'text-accent-blue bg-accent-blue/5' : isScrolled ? 'text-slate-600 hover:text-accent-blue hover:bg-slate-50' : 'text-slate-700 hover:text-accent-blue hover:bg-white/10'}`}
            title="Strona główna"
          >
            <Home className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setView('search')}
            className={`text-sm font-bold transition-colors ${currentView === 'search' ? 'text-accent-blue' : isScrolled ? 'text-slate-600 hover:text-accent-blue' : 'text-slate-700 hover:text-accent-blue'}`}
          >
            Katalog Firm
          </button>
          <button 
            onClick={() => setView('tools-salary')}
            className={`text-sm font-bold transition-colors ${currentView === 'tools-salary' ? 'text-accent-blue' : isScrolled ? 'text-slate-600 hover:text-accent-blue' : 'text-slate-700 hover:text-accent-blue'}`}
          >
            Kalkulator
          </button>
          {isAdmin && (
            <button 
              onClick={() => setView('admin')}
              className={`text-sm font-bold transition-colors ${currentView === 'admin' ? 'text-accent-blue' : isScrolled ? 'text-slate-600 hover:text-accent-blue' : 'text-slate-700 hover:text-accent-blue'}`}
            >
              Admin
            </button>
          )}
          <button 
            onClick={() => setView('add-company')}
            className={`flex items-center gap-2 px-5 py-2.5 bg-accent-blue hover:bg-blue-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20 ${currentView === 'add-company' ? 'ring-2 ring-accent-blue/20' : ''}`}
          >
            <PlusCircle className="w-4 h-4" />
            Dodaj firmę
          </button>
          <div className={`h-6 w-px mx-2 ${isScrolled ? 'bg-slate-200' : 'bg-slate-300/20'}`} />
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full border border-slate-200" />
                <span className={`text-sm font-bold ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>{user.displayName}</span>
              </div>
              <button 
                onClick={() => logout()}
                className={`text-xs font-bold transition-colors ${isScrolled ? 'text-slate-400 hover:text-slate-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Wyloguj
              </button>
            </div>
          ) : (
            <button 
              onClick={() => signInWithGoogle()}
              className={`flex items-center gap-2 transition-colors ${isScrolled ? 'text-slate-600 hover:text-accent-blue' : 'text-slate-700 hover:text-accent-blue'}`}
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-bold">Zaloguj się</span>
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 shadow-xl">
          <button onClick={() => { setView('home'); setMobileMenuOpen(false); }} className="flex items-center gap-3 py-2 text-slate-900 font-bold">
            <Home className="w-5 h-5 text-accent-blue" />
            Strona główna
          </button>
          <button onClick={() => { setView('search'); setMobileMenuOpen(false); }} className="flex items-center gap-3 py-2 text-slate-900 font-bold">
            <Search className="w-5 h-5 text-accent-blue" />
            Katalog Firm
          </button>
          <button onClick={() => { setView('tools-salary'); setMobileMenuOpen(false); }} className="flex items-center gap-3 py-2 text-slate-900 font-bold">
            <Calculator className="w-5 h-5 text-accent-blue" />
            Kalkulator
          </button>
          {isAdmin && (
            <button onClick={() => { setView('admin'); setMobileMenuOpen(false); }} className="flex items-center gap-3 py-2 text-slate-900 font-bold">
              <ShieldCheck className="w-5 h-5 text-accent-blue" />
              Panel Admina
            </button>
          )}
          <button onClick={() => { setView('add-company'); setMobileMenuOpen(false); }} className="bg-accent-blue text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
            <PlusCircle className="w-5 h-5" />
            Dodaj firmę
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
