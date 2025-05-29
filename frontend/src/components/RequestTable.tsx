import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import type { Request } from "../models/Request";
import { Button } from "primereact/button";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";

interface Props {
  data: Request[];
  loading?: boolean;
  onEdit: (req: Request) => void;
  onView: (req: Request) => void;
  onDelete: (id: number) => void;
}
export const RequestTable = ({
  data,
  loading,
  onView,
  onEdit,
  onDelete,
}: Props) => {
  const ActionsBody = (data: Request) => {
    return (
      <div className="flex items-center space-x-2 ">
        <Button
          onClick={() => {
            console.log(data);
            onView(data);
          }}
          icon={<LuEye />}
          className="text-sm py border h-7 w-7 border-green-600 bg-green-50 text-green-500"
          severity="success"
        />

        <Button
          onClick={() => onEdit?.(data)}
          icon={<LuPencil />}
          className="text-sm py border h-7 w-7 border-blue-600 bg-blue-50 text-blue-500"
          severity="info"
        />
        <Button
          onClick={() => onDelete?.(data.id as number)}
          icon={<LuTrash2 />}
          className="text-sm py border h-7 w-7 border-red-600 bg-red-50 text-red-500"
          severity="danger"
          outlined
        />
      </div>
    );
  };

  return (
    <DataTable
      value={data}
      loading={loading}
      scrollable
      scrollHeight="flex"
      className="rounded-t-lg border text-sm"
      rowClassName={() =>
        "border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
      }
      cellClassName={() => "p-4 "}
    >
      <Column field="id" header="Código" sortable />
      <Column field="brand" header="Marca" sortable />
      <Column field="requestType" header="Tipo de Solicitud" sortable />
      <Column field="submissionDate" header="Fecha" sortable />
      <Column field="primaryContactName" header="Nombre de Contacto" sortable />
      <Column field="primaryContactPhone" header="Teléfono" sortable />
      <Column header="Acciones" body={(data) => ActionsBody(data)} />
    </DataTable>
  );
};
