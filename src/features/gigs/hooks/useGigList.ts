import { useQuery } from '@tanstack/react-query';
import { getLatestGigs } from '../services/gigs.service';
import type { Gig } from '../types/gig.types';

export const useLatestGigs = () => {
  return useQuery<Gig[], Error>({
    queryKey: ['gigs', 'latest'],
    queryFn: getLatestGigs,
  });
};
