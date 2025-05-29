import { Button } from "primereact/button";
import { LuFileSpreadsheet, LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router";

export const RequestActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-end">
      <Button
        type="button"
        label="Exportar CSV"
        icon={<LuFileSpreadsheet />}
        className="flex gap-2 px-4 py-2 border text-sm"
      />
      <Button
        type="button"
        label="Nueva Solicitud"
        icon={<LuPlus />}
        onClick={() => navigate("/requests/new")}
        className="flex gap-2 px-4 py-2 ml-2 border text-sm bg-black text-white"
      />
    </div>
  );
};
