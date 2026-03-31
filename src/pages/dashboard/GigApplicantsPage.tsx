import { useParams, Link } from 'react-router-dom';
import { useGigApplications } from '../../features/applications/hooks/useGigApplications';
import ApplicantCard from '../../features/applications/components/ApplicantCard';
import { useGigDetail } from '../../features/gigs/hooks/useGigDetail';
import { ArrowLeft, Inbox, Loader, Users } from 'lucide-react';

export const GigApplicantsPage = () => {
  const { gigId } = useParams<{ gigId: string }>();
  const { data: applications, isLoading, isError, error } = useGigApplications(gigId);
  const { data: gig, isLoading: isLoadingGig, isError: isGigError, error: gigError } = useGigDetail(gigId);

  if (isLoading || isLoadingGig) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader className="w-12 h-12 text-indigo-500 animate-spin" />
        <p className="text-gray-500 font-medium">Fetching applicants...</p>
      </div>
    );
  }

  if (isError || isGigError) {
    const errorMessage = (error as any)?.message || (gigError as any)?.message || 'Unknown error';
    console.error('GigApplicantsPage error:', { error, gigError, gigId });
    return (
      <div className="max-w-lg mx-auto mt-16 bg-red-50 dark:bg-red-900/10 p-8 rounded-2xl border border-red-200 dark:border-red-800/30 text-center">
        <h2 className="text-red-800 dark:text-red-400 font-bold text-xl mb-2">Oops! Something went wrong</h2>
        <p className="text-red-600 dark:text-red-300 mb-2 font-medium">Failed to load applicants. Please try again later.</p>
        <p className="text-red-400 dark:text-red-500 text-xs font-mono mb-6 break-all">{errorMessage}</p>
        <Link to="/dashboard/my-gigs" className="text-indigo-600 hover:text-indigo-500 font-bold inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Go back to My Gigs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header section */}
      <div className="mb-10">
        <Link 
          to="/dashboard/my-gigs" 
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-all text-sm font-semibold mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to My Gigs
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-3 mb-2 text-indigo-600">
              <Users className="w-6 h-6" />
              <span className="text-sm font-bold uppercase tracking-widest tracking-tighter">Review Applicants</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
               {gig?.title}
            </h1>
            <p className="text-gray-500 mt-2 font-medium">Manage and select the best candidates for this task.</p>
          </div>
          
          <div className="flex items-center gap-4 bg-indigo-50 px-5 py-3 rounded-2xl border border-indigo-100">
            <div className="text-center">
              <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider mb-0.5">Total</p>
              <p className="text-2xl font-black text-indigo-900 leading-none">{applications?.length || 0}</p>
            </div>
            <div className="w-px h-8 bg-indigo-200"></div>
            <div className="text-center">
              <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider mb-0.5">Submitted</p>
              <p className="text-2xl font-black text-indigo-900 leading-none">
                {applications?.filter(a => a.status === 'submitted').length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      {!applications || applications.length === 0 ? (
        <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-16 text-center transition-all">
          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Inbox className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No applications yet</h3>
          <p className="text-gray-500 max-w-sm mx-auto font-medium">
            Keep your gig link active! Applicants will appear here once they've submitted their cover letters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pb-20">
          {applications.map((application) => (
            <ApplicantCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GigApplicantsPage;
