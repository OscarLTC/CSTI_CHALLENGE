import { z } from "zod";

export const RequestContactSchema = z.object({
  id: z.number().int().positive().optional(),
  requestId: z.number().int().positive().optional(),
  contactName: z.string().min(1, "El nombre es obligatorio"),
  contactPhone: z
    .string()
    .regex(/^\d+$/, "El teléfono debe contener solo dígitos")
    .min(7, "El teléfono es muy corto"),
});

export type RequestContact = z.infer<typeof RequestContactSchema>;

export const RequestSchema = z.object({
  id: z.number().int().positive().optional(),
  brand: z.string().min(1, "La marca es obligatoria"),
  requestType: z.string().min(1, "El tipo de solicitud es obligatorio"),
  submissionDate: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
    message: "Fecha inválida",
  }),
  primaryContactName: z
    .string()
    .min(1, "Nombre de contacto principal obligatorio"),
  primaryContactPhone: z
    .string()
    .regex(/^\d+$/, "El teléfono debe contener solo dígitos")
    .min(7, "El teléfono es muy corto"),
  contacts: z.array(RequestContactSchema).optional(),
});

export type Request = z.infer<typeof RequestSchema>;

export const RequestWithContactsSchema = z.object({
  request: RequestSchema,
  contacts: z
    .array(RequestContactSchema)
    .min(1, "Debe haber al menos un contacto"),
});

export type RequestWithContacts = z.infer<typeof RequestWithContactsSchema>;
