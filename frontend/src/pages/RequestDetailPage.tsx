import { useParams } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { useCallback, useEffect, useState } from "react";
import { getRequest } from "../services/requestService";
import type { Response } from "../models/Request";
import { LuFileText, LuPhone, LuUser, LuUsers } from "react-icons/lu";

export const RequestDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [response, setResponse] = useState<Response | null>(null);

  const fetchRequest = useCallback(async () => {
    if (id) {
      try {
        const data = await getRequest(parseInt(id));
        setResponse(data as Response);
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

        <div className="grid grid-cols-2 gap-2 max-w-4xl mx-auto">
          <div className="col-span-1 bg-white p-6 rounded-lg border">
            <div className="flex items-center gap-2 mb-4">
              <LuFileText className="text-4xl text-blue-300 mb-2" />
              <span>Información de la Solicitud</span>
            </div>
            <div>
              <div>
                <span>Marca:</span>
                <span className="ml-2 font-semibold">
                  {response?.request.brand}
                </span>
              </div>
              <div>
                <span>Tipo de Solicitud:</span>
                <span className="ml-2 font-semibold">
                  {response?.request.requestType}
                </span>
              </div>
              <div>
                <span>Fecha de Envío:</span>
                <span className="ml-2 font-semibold">
                  {new Date(
                    response?.request.submissionDate || ""
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-white p-6 rounded-lg border">
            <div className="flex items-center gap-2 mb-4">
              <LuUser className="text-4xl text-green-300 mb-2" />
              <span>Contacto Primario</span>
            </div>
            <div>
              <div>
                <span>Nombre:</span>
                <span className="ml-2 font-semibold">
                  {response?.request.primaryContactName}
                </span>
              </div>
              <div>
                <span>Teléfono:</span>
                <span className="ml-2 font-semibold">
                  {response?.request.primaryContactPhone}
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-white p-6 rounded-lg border">
            <div className="flex items-center gap-2 mb-4">
              <LuUsers className="text-4xl text-purple-300 mb-2" />
              <span>Contactos Adicionales</span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {response?.contacts?.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center">
                    <LuUser className="text-2xl mr-2 rounded-full bg-purple-100 text-purple-700 w-8 h-8 p-2 " />
                    <span className="ml-2 font-semibold">
                      {contact.contactName}
                    </span>
                  </div>
                  <div>
                    <LuPhone className="text-xl text-gray-500 inline-block" />
                    <span className="ml-2 font-semibold">
                      {contact.contactPhone}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
