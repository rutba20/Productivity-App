import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

export const useCrud = ({ endpoint, queryKey }) => {

  const getAll = () =>
    useQuery({
      queryKey: [queryKey],
      queryFn: async () => {
        const res = await apiClient.get(`/${endpoint}`);
        return res.data;
      },
    });

  const create = () =>
    useMutation({
      mutationFn: async (payload) => {
        const res = await apiClient.post(`/${endpoint}`, payload);
        return res.data;
      },
    });

  const update = () =>
    useMutation({
      mutationFn: async ({ id, payload }) => {
        const res = await apiClient.put(`/${endpoint}/${id}`, payload);
        return res.data;
      },
    });

  const remove = () =>
    useMutation({
      mutationFn: async (id) => {
        const res = await apiClient.delete(`/${endpoint}/${id}`);
        return res.data;
      },
    });

  return {
    getAll,
    create,
    update,
    remove,
  };
};