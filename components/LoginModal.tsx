import React, { useState } from 'react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (email: string, pass: string) => Promise<any>;
  onSignUp: (email: string, pass: string) => Promise<any>;
  t: any;
  error: string | null;
  clearError: () => void;
  isLoading: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin, onSignUp, t, error, clearError, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const action = isSigningUp ? onSignUp : onLogin;
    try {
        await action(email, password);
    } catch (e) {
        // Error is handled and displayed by the parent component
    }
  };

  const handleClose = () => {
    if (isLoading) return;
    clearError();
    onClose();
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
      onClick={handleClose}
    >
      <div 
        className="rounded-2xl shadow-2xl p-8 max-w-sm w-full relative m-4"
        style={{ backgroundColor: 'var(--bg-card-solid)', border: '1px solid var(--border-primary)'}}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:opacity-80 disabled:opacity-50"
          aria-label="Close"
          disabled={isLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold text-center mb-6" style={{ background: 'linear-gradient(to right, var(--text-heading-from), var(--text-heading-to))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          {isSigningUp ? t.nav_signup : t.nav_login}
        </h2>
        
        <form onSubmit={handleAuthAction}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)'}}>{t.email_label}</label>
              <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded-lg px-3 py-2 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500"
                style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-secondary)', color: 'var(--text-primary)'}}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)'}}>{t.password_label}</label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full border rounded-lg px-3 py-2 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-amber-500"
                style={{ backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-secondary)', color: 'var(--text-primary)'}}
                placeholder="••••••"
              />
            </div>
          </div>
          
          {error && <p className="text-red-500 dark:text-red-400 text-sm mt-4 text-center">{error}</p>}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 dark:bg-amber-600 dark:hover:bg-amber-500 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
                isSigningUp ? t.nav_signup_cta : t.nav_login_cta
            )}
          </button>
        </form>
        
        <p className="text-center text-sm mt-6" style={{ color: 'var(--text-secondary)'}}>
          {isSigningUp ? t.signup_prompt : t.login_prompt}{' '}
          <button 
            onClick={() => { setIsSigningUp(!isSigningUp); clearError(); }} 
            className="font-medium hover:underline dark:text-amber-400 disabled:opacity-50"
             style={{ color: 'var(--text-secondary)'}}
            disabled={isLoading}
          >
            {isSigningUp ? t.nav_login : t.nav_signup}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;