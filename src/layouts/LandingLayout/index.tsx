import { Outlet } from 'react-router-dom'
import { Stack } from '@mui/material'

export default function LandingLayout() {
  return (
    <Stack minHeight="100vh" alignItems="center" justifyContent="center" bgcolor="#111111">
      <Outlet />
    </Stack>
  )
}