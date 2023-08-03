import { Navigate, useRoutes } from "react-router";
import { useAccount } from "wagmi";
import DashboardLayout from "./layouts/DashboardLayout";
import LandingLayout from "./layouts/LandingLayout";
import WalletVerify from "./pages/WalletVerify";

const OWNER_WALLET = import.meta.env.VITE_OWNER_WALLET || ''

export default function Routes() {
  const { address } = useAccount()

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
      element: address === OWNER_WALLET ? <DashboardLayout /> : <Navigate to="/" replace />,
      children: [
        {

        }
      ]
    },
  ]);
}
