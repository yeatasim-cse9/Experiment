import { LayoutDashboard, PlusCircle, Briefcase, FileText, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const actions = [
    {
      title: 'Post a New Gig',
      desc: 'Need help with something? Create a new task board.',
      icon: PlusCircle,
      href: '/dashboard/create-gig',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
    {
      title: 'Manage My Gigs',
      desc: 'View applications and update your active listings.',
      icon: Briefcase,
      href: '/dashboard/my-gigs',
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'My Applications',
      desc: 'Track the status of gigs you have applied for.',
      icon: FileText,
      href: '/dashboard/my-applications',
      color: 'text-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
    },
    {
      title: 'Profile Settings',
      desc: 'Update your campus identity and notification settings.',
      icon: User,
      href: '/dashboard/profile',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-white dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
          <LayoutDashboard className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-3xl font-extra-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back! What would you like to do today?</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actions.map((action) => (
          <Link 
            key={action.title}
            to={action.href}
            className="group p-8 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-start gap-6">
              <div className={`p-4 rounded-2xl ${action.bg} ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="w-7 h-7" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {action.desc}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
