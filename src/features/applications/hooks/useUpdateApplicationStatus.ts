import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateApplicationStatus } from '../services/applications.service';

export const useUpdateApplicationStatus = (gigId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ applicationId, status }: { applicationId: string; status: string }) => 
      updateApplicationStatus(applicationId, status, gigId),
    onSuccess: () => {
      // Invalidate the specific gig's applications cache
      queryClient.invalidateQueries({ queryKey: ['applications', 'gig', gigId] });
      // Invalidate 'me' applications so applicant dashboard reflects changes
      queryClient.invalidateQueries({ queryKey: ['applications', 'me'] });
      // Invalidate the gig detail since its status may have changed to 'assigned'
      queryClient.invalidateQueries({ queryKey: ['gigs', 'detail', gigId] });
      // Invalidate gig lists (My Gigs, Explore, etc.)
      queryClient.invalidateQueries({ queryKey: ['gigs'] });
    },
  });
};
