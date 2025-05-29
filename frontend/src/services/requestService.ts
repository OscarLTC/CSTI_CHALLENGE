import api from "../api";
import type { Request } from "../models/Request";
import type { RequestContact } from "../models/RequestContact";

interface RequestPayload {
  request: Request;
  contacts: RequestContact[];
}

export async function listRequests(): Promise<Request[]> {
  const res = await api.get<Request[]>("/requests");
  return res.data;
}

export async function getRequest(id: number): Promise<Request> {
  const res = await api.get<Request>(`/requests/${id}`);
  return res.data;
}

export async function createRequest(
  request: Request,
  contacts: RequestContact[]
): Promise<Request> {
  const payload: RequestPayload = { request, contacts };
  const res = await api.post<Request>("/requests", payload);
  return res.data;
}

export async function updateRequest(
  id: number,
  request: Request,
  contacts: RequestContact[]
): Promise<Request> {
  const payload: RequestPayload = { request, contacts };
  const res = await api.put<Request>(`/requests/${id}`, payload);
  return res.data;
}

export async function deleteRequest(id: number): Promise<void> {
  await api.delete(`/requests/${id}`);
}

export function exportCsvUrl(): string {
  return api.defaults.baseURL + "/requests/export";
}
