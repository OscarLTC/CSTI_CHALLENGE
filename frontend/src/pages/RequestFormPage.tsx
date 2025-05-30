import { useParams } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { RequestForm } from "../components/RequestForm";

export const RequestFormPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="h-screen flex flex-col p-6 bg-gray-50">
      <div className="flex flex-col gap-4">
        <PageHeader
          isGoBack
          title={id ? `Editar Solicitud #${id}` : "Nueva Solicitud"}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 ">
        <RequestForm />
      </div>
    </div>
  );
};
