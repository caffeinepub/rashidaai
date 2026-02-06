import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { WaitlistEntry } from '../backend';

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

export function useWaitlistQuery(isAdminConfirmed: boolean = false) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<WaitlistEntry[]>({
    queryKey: ['waitlist'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getWaitlist();
    },
    enabled: !!actor && !actorFetching && isAdminConfirmed,
    retry: false,
  });
}
