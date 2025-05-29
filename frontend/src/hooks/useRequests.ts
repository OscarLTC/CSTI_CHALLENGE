/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import type { Request } from "../models/Request";
import {
  listRequests,
  deleteRequest,
  exportCsvUrl,
} from "../services/requestService";

export interface RequestsFilter {
  requestType?: string;
  from?: string;
  to?: string;
}

export function useRequests(initialFilters: RequestsFilter = {}) {
  const [allRequests, setAllRequests] = useState<Request[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
  const [filters, setFilters] = useState<RequestsFilter>(initialFilters);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  console.log(filters);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listRequests();
      setAllRequests(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const result = allRequests.filter((r) => {
      let ok = true;
      if (filters.requestType) {
        const needle = filters.requestType.toLowerCase();
        ok = ok && r.requestType.toLowerCase().includes(needle);
      }
      if (filters.from) ok = ok && r.submissionDate >= filters.from;
      if (filters.to) ok = ok && r.submissionDate <= filters.to;
      return ok;
    });
    setFilteredRequests(result);
  }, [allRequests, filters]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const onDelete = useCallback(
    async (id: number) => {
      try {
        await deleteRequest(id);
        await fetchAll();
      } catch (e) {
        console.error(e);
      }
    },
    [fetchAll]
  );

  const csvUrl = exportCsvUrl();

  return {
    requests: filteredRequests,
    loading,
    error,
    filters,
    setFilters,
    refresh: fetchAll,
    deleteRequest: onDelete,
    csvUrl,
  };
}
