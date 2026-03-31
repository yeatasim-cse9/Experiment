import { useQuery } from '@tanstack/react-query';
import { getOwnerGigs } from '../services/gigs.service';

export const useOwnerGigs = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['gigs', 'owner', userId],
    queryFn: () => getOwnerGigs(userId!),
    enabled: !!userId,
  });
};
