import { useState, useMemo } from 'react';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Collapse } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useDisconnect } from 'wagmi';
import { Icon } from '@iconify/react';
import { grey } from '@mui/material/colors';
import { ROUTES } from '../../utils/constants';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function DashboardLayout(props: Props) {
  const { disconnect } = useDisconnect()
  const { pathname } = useLocation()

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [idoNavLinksOpened, setIdoNavLinksOpened] = useState<boolean>(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const pageName = useMemo<string>(() => {
    const routeData = ROUTES.find(route => route.path === pathname)
    if (routeData) {
      return routeData.label
    }
    return ''
  }, [pathname])

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItemButton onClick={() => setIdoNavLinksOpened(!idoNavLinksOpened)}>
          <ListItemIcon>
            <Box component={Icon} icon="fa-solid:donate" fontSize={18} />
          </ListItemIcon>
          <ListItemText primary="IDO" />
          {idoNavLinksOpened ? (
            <Box component={Icon} icon="iconamoon:arrow-down-2-bold" fontSize={18} />
          ) : (
            <Box component={Icon} icon="iconamoon:arrow-up-2-bold" fontSize={18} />
          )}
        </ListItemButton>
        <Collapse in={idoNavLinksOpened} timeout="auto" unmountOnExit>
          <List>
            <ListItemButton sx={{ pl: 8 }} component={Link} to="/dashboard/ido/sale-stage">
              <ListItemText primary="Sale Stage" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 8 }} component={Link} to="/dashboard/ido/claim-status">
              <ListItemText primary="Claim Status" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton onClick={() => disconnect?.()}>
            <ListItemText primary="Disconnect" />
            <ListItemIcon>
              <Box component={Icon} icon="material-symbols:logout" color={grey[100]} fontSize={20} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Box component={Icon} icon="ri:menu-line" />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {pageName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
