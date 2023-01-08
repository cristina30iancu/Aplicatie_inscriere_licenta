import * as React from 'react';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GoogleLogout } from 'react-google-login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Divider,
  Box,
  MenuItem,
  Tooltip,
  Menu,
  Avatar,
  Stack,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#164978',
    },
  },
});

export default function EnableColorOnDarkAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack spacing={2} sx={{ flexGrow: 3}}>
      <ThemeProvider theme={darkTheme}>
        <AppBar display='flex' position="static" color="primary" sx={{ width:'100%'}} enableColorOnDark>
          <Toolbar>
            <Typography
              fontSize='10dp'
              component="div"
              sx={{ flexGrow: 1, marginLeft: '3vw',marginTop:2,marginBottom:2 }}
            >
              {props.isLoggedIn && 'Licență C.S.I.E.'}
              {!props.isLoggedIn &&
                'Facultatea de Cibernetică, Statistică și Informatică Economică'}
            </Typography>
            <Toolbar>
              <img
                src="https://csie.ase.ro/wp-content/uploads/2020/10/cropped-CSIE_new-300x132.png"
                style={{ width: 100 }}
                alt="logo"
              />
            </Toolbar>
            <Toolbar>
            {props.isLoggedIn && (
              <Box>
                <Tooltip title="Meniu">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <MenuIcon
                      sx={{ width: 32, height: 32 }}
                    ></MenuIcon>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  {props.isStudent && (
                    <div>
                      <MenuItem onClick={() => {props.setIsProfileVisible(true);  props.setIsInfoVisible(false);}}>
                        <Avatar />
                        <span>Profil</span>
                      </MenuItem>
                      <Divider />
                    </div>
                  )}
                   {!props.isStudent && (
                    <div>
                      <MenuItem onClick={() =>{props.setIsProfessorInfoVisible(false);props.setIsProfessorProfileVisible(true);} }>
                        <Avatar />
                        <span> Profil</span>
                      </MenuItem>
                      <Divider />
                    </div>
                  )}
                   {props.isStudent && (
                    <div>
                      <MenuItem onClick={() => {props.setIsInfoVisible(true);props.setIsProfileVisible(false); }}>
                        <HelpOutlineOutlinedIcon />
                        &nbsp;<span>Ajutor</span>
                      </MenuItem>
                      <Divider />
                    </div>
                  )}
                   {!props.isStudent && (
                    <div>
                      <MenuItem onClick={() => {props.setIsProfessorInfoVisible(true); props.setIsProfessorProfileVisible(false)}}>
                        <HelpOutlineOutlinedIcon />
                        &nbsp;<span>Ajutor</span>
                      </MenuItem> <Divider />
                    </div>
                  )}
                   <MenuItem><LogoutIcon></LogoutIcon>
                    <GoogleLogout
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      buttonText="Logout"
                      onLogoutSuccess={props.onLogout}
                      render={(renderProps) => (
                        <span onClick={renderProps.onClick}> &nbsp;Logout</span>
                      )}> </GoogleLogout>
                   </MenuItem>
                </Menu>
              </Box>
            )}
            </Toolbar>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
}
