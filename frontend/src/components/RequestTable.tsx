import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import type { Request } from "../models/Request";
import { Button } from "primereact/button";

interface Props {
  data: Request[];
  loading?: boolean;
  onRowClick?: (req: Request) => void;
  onDelete?: (id: number) => void;
}
export const RequestTable = ({
  data,
  loading,
  onRowClick,
  onDelete,
}: Props) => {
  const ActionsBody = ({ data }: { data: Request }) => {
    return (
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => onRowClick?.(data)}
          className="text-blue-500 hover:underline"
        >
          Ver
        </Button>
        {onDelete && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(data.id as number);
            }}
            className="text-red-500 hover:underline"
          >
            Eliminar
          </Button>
        )}
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
      <Column header="Acciones" body={ActionsBody} />
    </DataTable>
  );
};
