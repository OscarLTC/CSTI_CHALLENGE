import { Button } from "primereact/button";
import { LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router";

interface Props {
  title: string;
  subtitle?: string;
  isGoBack?: boolean;
}

export const PageHeader = ({ title, subtitle, isGoBack }: Props) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center gap-5 mb-4">
        {isGoBack && (
          <Button
            type="button"
            icon={<LuArrowLeft />}
            label="Volver"
            onClick={() => navigate(-1)}
          />
        )}
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      </div>
      {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
    </div>
  );
};
