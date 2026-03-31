import type { ApplicationResponse } from '../services/applications.service';
import { useUpdateApplicationStatus } from '../hooks/useUpdateApplicationStatus';

interface ApplicantCardProps {
  application: ApplicationResponse;
}

const ApplicantCard = ({ application }: ApplicantCardProps) => {
  const { mutate, isPending } = useUpdateApplicationStatus(application.gigId);

  const handleStatusUpdate = (status: string) => {
    mutate({ applicationId: application.id, status });
  };

  const getStatusBadgeColor = (status: string | undefined) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl overflow-hidden">
            {application.applicantAvatar ? (
              <img src={application.applicantAvatar} alt={application.applicantName} className="w-full h-full object-cover" />
            ) : (
              application.applicantName.charAt(0)
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{application.applicantName}</h3>
            <p className="text-sm text-gray-500 font-medium">{application.applicantCampus || 'Campus not specified'}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusBadgeColor(application.status)}`}>
          {application.status}
        </span>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-tight">Cover Letter</h4>
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap italic">
          "{application.coverLetter}"
        </p>
      </div>

      {application.status === 'submitted' && (
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => handleStatusUpdate('accepted')}
            disabled={isPending}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isPending ? 'Processing...' : 'Accept'}
          </button>
          <button
            onClick={() => handleStatusUpdate('rejected')}
            disabled={isPending}
            className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 text-gray-700 font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isPending ? '...' : 'Reject'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicantCard;
