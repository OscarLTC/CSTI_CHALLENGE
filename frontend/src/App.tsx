import { useRoutes } from "react-router";
import { routes } from "./config/routes";

const App = () => {
  const appRoutes = useRoutes(routes);
  return appRoutes;
};

export default App;
