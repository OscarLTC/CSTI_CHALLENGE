import { Button } from "primereact/button";
import { LuFileSpreadsheet, LuPlus, LuRefreshCw } from "react-icons/lu";

interface Props {
  onExport: () => void;
  onRefresh: () => void;
  onNew: () => void;
}

export const RequestActions = ({ onExport, onNew, onRefresh }: Props) => {
  return (
    <div className="flex items-center justify-end">
      <Button
        icon={<LuRefreshCw />}
        className="flex  py-2 border text-sm mr-2"
        onClick={onRefresh}
      />
      <Button
        type="button"
        label="Exportar CSV"
        icon={<LuFileSpreadsheet />}
        className="flex gap-2 px-4 py-2 border text-sm"
        onClick={onExport}
      />
      <Button
        type="button"
        label="Nueva Solicitud"
        icon={<LuPlus />}
        onClick={onNew}
        className="flex gap-2 px-4 py-2 ml-2 border text-sm bg-black text-white"
      />
    </div>
  );
};
