import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

interface WaitlistData {
  name: string;
  email: string;
}

export function useWaitlistMutation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: WaitlistData) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      await actor.addToWaitlist(data.name, data.email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waitlist'] });
    }
  });
}
