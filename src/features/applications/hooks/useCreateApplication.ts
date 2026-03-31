import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createApplication } from '../services/applications.service';
import type { ApplicationPayload } from '../services/applications.service';

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ApplicationPayload) => createApplication(data),
    onSuccess: (_, variables) => {
      // Invalidate queries related to applications or this specific gig
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['gigs', 'detail', variables.gigId] });
    },
  });
};