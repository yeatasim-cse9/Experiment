import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGig } from '../services/gigs.service';
import type { Gig } from '../types/gig.types';

type CreateGigParams = Omit<Gig, 'id' | 'createdAt' | 'status'> & { status?: string };

export const useCreateGig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newGig: CreateGigParams) => createGig(newGig),
    onSuccess: () => {
      // Invalidate and refetch latest gigs
      queryClient.invalidateQueries({ queryKey: ['gigs', 'latest'] });
    },
  });
};
