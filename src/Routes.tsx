import { useRoutes } from "react-router";
import DashboardLayout from "./layouts/DashboardLayout";
import LandingLayout from "./layouts/LandingLayout";
import WalletVerify from "./pages/WalletVerify";

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <LandingLayout />,
      children: [{
        path: '/',
        element: <WalletVerify />
      }]
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {

        }
      ]
    },
  ]);
}
