import { useQuery } from '@tanstack/react-query';
import { getAllOpenGigs } from '../services/gigs.service';

export const useExploreGigs = () => {
  return useQuery({
    queryKey: ['explore-gigs'],
    queryFn: getAllOpenGigs,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
