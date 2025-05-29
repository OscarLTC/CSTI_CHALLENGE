import { PageHeader } from "../components/PageHeader";

export const RequestDetailPage = () => {
  return (
    <div className="h-screen flex flex-col p-6 bg-gray-50">
      <div className="flex flex-col gap-4">
        <PageHeader isGoBack title="Detalle de Solicitud" />
      </div>
    </div>
  );
};
