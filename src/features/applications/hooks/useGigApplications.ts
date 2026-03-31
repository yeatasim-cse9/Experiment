import { useQuery } from '@tanstack/react-query';
import { getGigApplications } from '../services/applications.service';

export const useGigApplications = (gigId: string | undefined) => {
  return useQuery({
    queryKey: ['applications', 'gig', gigId],
    queryFn: () => getGigApplications(gigId!),
    enabled: !!gigId,
    retry: 2,
    staleTime: 1000 * 60,
  });
};
