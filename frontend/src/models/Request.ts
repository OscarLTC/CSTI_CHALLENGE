import type { RequestContact } from "./RequestContact";

export interface Response {
  contacts?: RequestContact[];
  request: Request;
}

export interface Request {
  id?: number;
  brand: string;
  requestType: string;
  submissionDate: string;
  primaryContactName: string;
  primaryContactPhone: string;
  contacts?: RequestContact[];
}
