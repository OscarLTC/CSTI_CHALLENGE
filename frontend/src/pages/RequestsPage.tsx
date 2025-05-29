import { PageHeader } from "../components/PageHeader";
import { RequestFilter } from "../components/RequestFilter";
import { RequestActions } from "../components/RequestActions";
import { RequestTable } from "../components/RequestTable";
import { useNavigate } from "react-router";
import { useRequests } from "../hooks/useRequests";

export const RequestsPage = () => {
  const navigate = useNavigate();
  const {
    requests,
    loading,
    filters,
    setFilters,
    refresh,
    deleteRequest,
    csvUrl,
  } = useRequests();

  return (
    <div className="h-screen flex flex-col p-6 bg-gray-50">
      <div className="flex flex-col gap-4">
        <PageHeader title="Sistema de Gestión de Solicitudes" />
        <RequestFilter filters={filters} onFilterChange={setFilters} />
        <RequestActions
          onExport={() => window.open(csvUrl)}
          onRefresh={refresh}
          onNew={() => navigate("/requests/new")}
        />
      </div>
      <div className="flex-1 overflow-hidden mt-4">
        <RequestTable
          data={requests}
          loading={loading}
          onRowClick={(req) => navigate(`/requests/${req.id}`)}
          onDelete={deleteRequest}
        />
      </div>
    </div>
  );
};
