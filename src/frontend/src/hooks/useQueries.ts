import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ContactInquiry } from "../backend.d";
import { IndustryType } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllContacts() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactInquiry[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContacts();
    },
    enabled: !!actor && !isFetching,
  });
}
