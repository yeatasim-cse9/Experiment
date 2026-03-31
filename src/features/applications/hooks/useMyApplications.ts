import { useQuery } from '@tanstack/react-query';
import { getMyApplications } from '../services/applications.service';

export const useMyApplications = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['applications', 'me', userId],
    queryFn: () => getMyApplications(userId!),
    enabled: !!userId,
  });
};
