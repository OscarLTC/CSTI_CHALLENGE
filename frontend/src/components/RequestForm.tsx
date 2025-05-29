import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { LuPlus, LuSave, LuTrash2 } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";
import {
  RequestWithContactsSchema,
  type RequestWithContacts,
} from "../schemas/requestSchemas";
import {
  Controller,
  useFieldArray,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  getRequest,
  updateRequest,
  createRequest,
} from "../services/requestService";

export const RequestForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RequestWithContacts>({
    resolver: zodResolver(RequestWithContactsSchema),
    defaultValues: {
      request: {
        brand: "",
        requestType: "",
        submissionDate: "",
        primaryContactName: "",
        primaryContactPhone: "",
      },
      contacts: [{ contactName: "", contactPhone: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "contacts",
    control,
  });

  useEffect(() => {
    if (isEdit && id) {
      getRequest(+id).then((data) => {
        reset({
          request: data.request,
          contacts:
            (data.contacts ?? []).length > 0
              ? (data.contacts ?? []).map((c) => ({
                  contactName: c.contactName,
                  contactPhone: c.contactPhone,
                }))
              : [{ contactName: "", contactPhone: "" }],
        });
      });
    }
  }, [id, isEdit, reset]);

  const onSubmit: SubmitHandler<RequestWithContacts> = async (data) => {
    if (isEdit && id) await updateRequest(+id, data.request, data.contacts);
    else await createRequest(data.request, data.contacts);
    navigate("/requests");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto bg-white rounded-lg shadow p-6"
    >
      <div className="col-span-3">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Marca
        </label>
        <Controller
          name="request.brand"
          control={control}
          render={({ field }) => (
            <InputText
              {...field}
              placeholder="Ingrese la marca"
              className="w-full border p-2 rounded h-11 text-sm"
            />
          )}
        />
        {errors.request?.brand && (
          <p className="text-red-600 text-sm mt-1">
            {errors.request.brand.message}
          </p>
        )}
      </div>
      <div className="col-span-3">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Tipo de Solicitud
        </label>
        <Controller
          name="request.requestType"
          control={control}
          render={({ field }) => (
            <InputText
              {...field}
              placeholder="Ingrese el tipo"
              className="w-full border p-2 rounded h-11 text-sm"
            />
          )}
        />
        {errors.request?.requestType && (
          <p className="text-red-600 text-sm mt-1">
            {errors.request.requestType.message}
          </p>
        )}
      </div>
      <div className="col-span-3">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Fecha de Envío
        </label>
        <Controller
          name="request.submissionDate"
          control={control}
          render={({ field }) => (
            <Calendar
              {...field}
              value={field.value ? new Date(field.value) : null}
              onChange={(e) =>
                field.onChange((e.value as Date).toISOString().split("T")[0])
              }
              placeholder="Selecciona fecha"
              dateFormat="dd/mm/yy"
              showIcon
              className="w-full border p-2 rounded h-11 text-sm"
            />
          )}
        />
        {errors.request?.submissionDate && (
          <p className="text-red-600 text-sm mt-1">
            {errors.request.submissionDate.message}
          </p>
        )}
      </div>
      <div className="col-span-3">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Teléfono Principal
        </label>
        <Controller
          name="request.primaryContactPhone"
          control={control}
          render={({ field }) => (
            <InputText
              {...field}
              placeholder="Número principal"
              className="w-full border p-2 rounded h-11 text-sm"
            />
          )}
        />
        {errors.request?.primaryContactPhone && (
          <p className="text-red-600 text-sm mt-1">
            {errors.request.primaryContactPhone.message}
          </p>
        )}
      </div>
      <div className="col-span-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Nombre de Contacto Principal
        </label>
        <Controller
          name="request.primaryContactName"
          control={control}
          render={({ field }) => (
            <InputText
              {...field}
              placeholder="Nombre principal"
              className="w-full border p-2 rounded h-11 text-sm"
            />
          )}
        />
        {errors.request?.primaryContactName && (
          <p className="text-red-600 text-sm mt-1">
            {errors.request.primaryContactName.message}
          </p>
        )}
      </div>

      <div className="col-span-6 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Contactos Adicionales</h2>
          <Button
            type="button"
            label="Agregar Contacto"
            icon={<LuPlus />}
            onClick={() => append({ contactName: "", contactPhone: "" })}
            className="flex gap-2 px-4 py-2 border text-sm"
          />
        </div>
        {fields.map((field, idx) => (
          <div key={field.id} className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Nombre
              </label>
              <Controller
                name={`contacts.${idx}.contactName`}
                control={control}
                render={({ field }) => (
                  <InputText
                    {...field}
                    placeholder="Nombre del contacto"
                    className="w-full border p-2 rounded h-11 text-sm"
                  />
                )}
              />
              {errors.contacts?.[idx]?.contactName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.contacts[idx]!.contactName?.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <Controller
                name={`contacts.${idx}.contactPhone`}
                control={control}
                render={({ field }) => (
                  <InputText
                    {...field}
                    placeholder="Teléfono del contacto"
                    className="w-full border p-2 rounded h-11 text-sm"
                  />
                )}
              />
              {errors.contacts?.[idx]?.contactPhone && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.contacts[idx]!.contactPhone?.message}
                </p>
              )}
            </div>

            <Button
              type="button"
              icon={<LuTrash2 />}
              className="mt-7 bg-red-500 text-white h-11 w-11 flex items-center justify-center"
              onClick={() => remove(idx)}
            />
          </div>
        ))}
      </div>

      <div className="col-span-6 flex justify-end gap-4 mt-6">
        <Button
          type="button"
          label="Cancelar"
          className="ml-2 px-6 py-2 border text-sm"
          onClick={() => navigate("/requests")}
        />
        <Button
          type="submit"
          label={isEdit ? "Actualizar" : "Guardar"}
          icon={<LuSave className="w-5 h-5" />}
          disabled={isSubmitting}
          className="px-6 py-2 bg-black text-white text-sm flex items-center gap-2"
        />
      </div>
    </form>
  );
};
