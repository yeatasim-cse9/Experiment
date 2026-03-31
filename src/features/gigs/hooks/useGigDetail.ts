import { useQuery } from '@tanstack/react-query';
import { getGigById } from '../services/gigs.service';

export const useGigDetail = (gigId: string | undefined) => {
  return useQuery({
    queryKey: ['gigs', 'detail', gigId],
    queryFn: () => {
      if (!gigId) throw new Error('Gig ID is required');
      return getGigById(gigId);
    },
    enabled: !!gigId, 
  });
};