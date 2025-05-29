import { useParams } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { useCallback, useEffect, useState } from "react";
import { getRequest } from "../services/requestService";
import type { Response } from "../models/Request";

export const RequestDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<Response | null>(null);

  const fetchRequest = useCallback(async () => {
    if (id) {
      try {
        const data = await getRequest(parseInt(id));
        setRequest(data as Response);
      } catch (error) {
        console.error("Error fetching request:", error);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest, id]);

  return (
    <div className="h-screen flex flex-col p-6 bg-gray-50">
      <div className="flex flex-col gap-4">
        <PageHeader isGoBack title="Detalle de Solicitud" />
      </div>
    </div>
  );
};
