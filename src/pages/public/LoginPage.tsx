import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginWithEmail, loginWithGoogle } from '../../features/auth/services/auth.service';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard/my-gigs';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setError('');
    setIsLoading(true);
    try {
      await loginWithEmail(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      setError('Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      setError('Google sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-16 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-400">Log in to CampusGig to continue.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 rounded-3xl p-8">
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailSignIn} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">College Email</label>
            <input 
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@university.edu"
              className="w-full px-4 py-3.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors dark:text-white"
            />
          </div>

          <div className="flex flex-col gap-2 mb-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <a href="#" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Forgot?</a>
            </div>
            <input 
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 bg-gray-50 dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors dark:text-white"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : 'Log In'}
          </button>
        </form>

        <div className="relative flex items-center my-8">
          <div className="flex-grow border-t border-gray-200 dark:border-zinc-800"></div>
          <span className="flex-shrink-0 mx-4 text-sm font-medium text-gray-400">OR CONTINUE WITH</span>
          <div className="flex-grow border-t border-gray-200 dark:border-zinc-800"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          type="button"
          className="w-full py-3.5 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 font-semibold rounded-xl transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </div>

      <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
        Don't have an account? <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Sign up for free</Link>
      </div>
    </div>
  );
};
