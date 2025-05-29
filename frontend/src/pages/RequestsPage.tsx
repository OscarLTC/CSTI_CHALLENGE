import { PageHeader } from "../components/PageHeader";
import { RequestFilter } from "../components/RequestFilter";
import { RequestActions } from "../components/RequestActions";
import { RequestTable } from "../components/RequestTable";

export const RequestsPage = () => {
  return (
    <div className="h-screen flex flex-col p-6 bg-gray-50">
      <div className="flex flex-col gap-4">
        <PageHeader title="Sistema de Gestión de Solicitudes" />
        <RequestFilter />
        <RequestActions />
      </div>
      <div className="flex-1 overflow-hidden mt-4">
        <RequestTable />
      </div>
    </div>
  );
};
