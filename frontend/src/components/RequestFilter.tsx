import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { LuX } from "react-icons/lu";
import type { RequestsFilter } from "../hooks/useRequests";
import { Controller, useForm } from "react-hook-form";

interface Props {
  filters: RequestsFilter;
  onFilterChange: (filters: RequestsFilter) => void;
}

export const RequestFilter = ({ filters, onFilterChange }: Props) => {
  const { control, getValues, resetField } = useForm<RequestsFilter>({
    defaultValues: filters,
  });

  return (
    <div className="w-full border flex flex-wrap space-y-2 justify-between p-3 rounded">
      <div className="flex items-center space-x-2">
        <div>
          <label className="text-sm font-semibold">Tipo de solicitud</label>
          <Controller
            name="requestType"
            control={control}
            render={({ field }) => (
              <InputText
                {...field}
                placeholder="Buscar por tipo"
                className="w-full border p-2 rounded h-11 text-sm"
                onChange={(e) => {
                  const newType = e.currentTarget.value;
                  field.onChange(newType);
                  onFilterChange({
                    ...getValues(),
                    requestType: newType,
                  });
                }}
              />
            )}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Rango de fechas</label>
          <div className="flex space-x-2">
            <Controller
              name="from"
              control={control}
              render={({ field }) => (
                <Calendar
                  {...field}
                  value={field.value ? new Date(field.value) : null}
                  onChange={(e) => {
                    const date = e.value as Date;
                    field.onChange(date.toISOString().split("T")[0]);
                    onFilterChange(getValues());
                  }}
                  placeholder="Desde"
                  dateFormat="dd/mm/yy"
                  showIcon
                  className="border rounded h-11 text-sm"
                  inputClassName="pl-2"
                />
              )}
            />
            <Controller
              name="to"
              control={control}
              render={({ field }) => (
                <Calendar
                  {...field}
                  value={field.value ? new Date(field.value) : null}
                  onChange={(e) => {
                    const date = e.value as Date;
                    field.onChange(date.toISOString().split("T")[0]);
                    onFilterChange(getValues());
                  }}
                  placeholder="Hasta"
                  dateFormat="dd/mm/yy"
                  showIcon
                  className="border rounded h-11 text-sm"
                  inputClassName="pl-2"
                />
              )}
            />
          </div>
        </div>
      </div>
      <Button
        icon={<LuX />}
        label="Limpiar"
        className="h-11 flex gap-2 px-4 border self-end"
        onClick={() => {
          resetField("requestType");
          resetField("from");
          resetField("to");
          onFilterChange({
            requestType: "",
            from: "",
            to: "",
          });
        }}
      />
    </div>
  );
};
