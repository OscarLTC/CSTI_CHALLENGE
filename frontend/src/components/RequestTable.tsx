import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export const RequestTable = () => {
  return (
    <DataTable
      scrollable
      scrollHeight="flex"
      value={[]}
      className="rounded-t-lg border text-sm"
      rowClassName={() =>
        "border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
      }
      cellClassName={() => "p-4 "}
    >
      <Column field="id" header="Código" />
      <Column field="brand" header="Marca" />
      <Column field="requestType" header="Tipo de Solicitud" />
      <Column field="date" header="Fecha" />
      <Column field="contactName" header="Nombre de Contacto" />
      <Column field="phone" header="Teléfono" />
      <Column header="Acciones" />
    </DataTable>
  );
};
