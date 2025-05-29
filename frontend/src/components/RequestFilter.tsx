import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { LuX } from "react-icons/lu";

export const RequestFilter = () => {
  return (
    <div className="w-full border flex flex-wrap space-y-2 justify-between p-3 rounded">
      <div className="flex items-center space-x-2">
        <div>
          <label className="text-sm font-semibold">Tipo de solicitud</label>
          <div className="flex space-x-2">
            <InputText
              placeholder="Buscar por tipo"
              className="w-full border p-2 rounded h-11 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold">Rango de fechas</label>
          <div className="flex space-x-2">
            <Calendar
              iconPos="left"
              className="border rounded h-11 text-sm"
              inputClassName="pl-2"
              showIcon
              placeholder="Desde"
              dateFormat="mm/dd/yy"
              showButtonBar
            />
            <Calendar
              iconPos="left"
              className="border rounded h-11 text-sm"
              inputClassName="pl-2"
              showIcon
              placeholder="Hasta"
              dateFormat="mm/dd/yy"
              showButtonBar
            />
          </div>
        </div>
      </div>
      <Button
        icon={<LuX />}
        label="Limpiar"
        className="h-11 flex gap-2 px-4 border self-end"
      />
    </div>
  );
};
