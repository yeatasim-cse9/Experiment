import { useAuth } from '../../app/providers/AuthProvider';
import { User, Mail, Calendar, School, ShieldCheck } from 'lucide-react';
import { logoutUser } from '../../features/auth/services/auth.service';

export const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-left py-4">
        <h1 className="text-3xl font-extra-bold text-gray-900 dark:text-white">Your Account</h1>
        <p className="text-gray-500 dark:text-gray-400">View and manage your campus identity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Identity Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden p-8 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-indigo-500/20 mb-6">
              {user.displayName?.[0] || user.email?.[0].toUpperCase() || 'U'}
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {user.displayName || 'Campus User'}
            </h2>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6 text-center">
              Student / Full-time Gig Seeker
            </p>
            <button 
              onClick={() => logoutUser()}
              className="w-full py-2.5 px-4 bg-gray-50 dark:bg-zinc-800 hover:bg-red-50 dark:hover:bg-red-900/10 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 border border-gray-200 dark:border-zinc-700 rounded-xl transition-all duration-200 font-semibold text-sm"
            >
              Sign out of Account
            </button>
          </div>
        </div>

        {/* Right Side - Details & Security */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm p-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-500" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Display Name</span>
                <div className="flex items-center gap-2 py-1 text-gray-900 dark:text-gray-200 font-medium">
                  {user.displayName || 'Not Set'}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</span>
                <div className="flex items-center gap-2 py-1 text-gray-900 dark:text-gray-200 font-medium overflow-hidden">
                  <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
              </div>

              <div className="space-y-1 md:col-span-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verification Status</span>
                <div className="flex items-center gap-2 py-1 text-gray-900 dark:text-gray-200 font-medium">
                  {user.emailVerified ? (
                    <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                      Verified Campus Email
                    </div>
                  ) : (
                    <div className="text-amber-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Pending Verification
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info / Settings Placeholder */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm p-8">
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <School className="w-5 h-5 text-purple-500" />
              Campus Enrollment
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm italic">
              Verification feature coming soon. You'll be able to link your student ID to gain access to exclusive university gigs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
