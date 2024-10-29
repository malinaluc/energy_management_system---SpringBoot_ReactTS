import { RouterProvider } from "react-router-dom";
import { router } from "./Components/Router/router"; // Assuming router is exported from here

export const App = (): JSX.Element => {
    return <RouterProvider router={router} />;
};
