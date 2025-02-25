import { Navigate, useRoutes } from "react-router";
import { useAccount } from "wagmi";
import DashboardLayout from "./layouts/DashboardLayout";
import LandingLayout from "./layouts/LandingLayout";
import WalletVerify from "./pages/landing/WalletVerify";
import SaleStage from "./pages/dashboard/SaleStage";
import ClaimStatus from "./pages/dashboard/ClaimStatus";

const OWNER_WALLET = import.meta.env.VITE_OWNER_WALLET || ''

export default function Routes() {
  const { address } = useAccount()

  return useRoutes([
    {
      path: '/',
      element: address !== OWNER_WALLET ? <LandingLayout /> : <Navigate to="/dashboard/ido/sale-stage" />,
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
          path: 'ido',
          children: [
            {
              path: 'sale-stage',
              element: <SaleStage />
            },
            {
              path: 'claim-status',
              element: <ClaimStatus />
            },
            {
              path: '*',
              element: <Navigate to="/dashboard/ido/sale-stage" replace />
            }
          ]
        }
      ]
    },
    {
      path: '*',
      element: <Navigate to="/" replace />
    }
  ]);
}
