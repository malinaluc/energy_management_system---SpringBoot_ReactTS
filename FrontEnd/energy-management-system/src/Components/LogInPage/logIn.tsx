import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Alert, AlertTitle, alpha, Button, IconButton, InputAdornment, Snackbar, SnackbarCloseReason, ThemeProvider, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { Fragment, useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ADMIN_NAVIGATION_PATH, ALERT_TITLE_ERROR, ALIGN_CENTER, ANDORNMENT_EDGE_END, ANDORNMENT_POSITION_END, ARIA_LABEL_TOGGLE_PASS_VISIBILITY, AUTO_COMPLETE_CURRENT_PASSWORD, AUTOHIDE_DURATION, BUTTON_VARIANT_TEXT, CLIENT_NAVIGATION_PATH, DONT_HAVE_ACCOUNT, ID_PASSWORD_TEXTFIELD, ID_USERNAME_TEXTFIELD, LABEL_PASSWORD, LABEL_USERNAME, LOG_IN, MARGIN_NORMAL, MARGIN_TOP_1VH, MARGIN_TOP_4VH, SEVERITY_ERROR, SIGN_UP, SIZE_SMALL, TYPOGRAPHY_VARIANT_CAPTION, TYPOGRAPHY_VARIANT_H4, TYPOGRAPHY_VARIANT_H5, VARIANT_FILLED, VARIANT_OUTLINED, WRONG_USERNAME_OR_PASSWORD } from '../../Library/Constants/constants';
import { themeConstant } from '../../Library/Constants/themeConstants';
import { useStyles } from "./login.styles";

export const LogIn = (): JSX.Element => {
  const styles = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate: NavigateFunction = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleEmailChange = (event: any): void => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any): void => {
    setPassword(event.target.value);
  };

  const checkEmailAndPassword = async (email: string, password: string): Promise<{ userRole: number, userId: string, userUsername: string }> => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${email}/${password}`);
      console.log("RESPONSE IN CHECK EMAIL AND PASS IN LOGIN:" , response);
      return {
        userRole: response.data.role,
        userId: response.data.id,
        userUsername: response.data.username
      };
    }
    catch (error){
      console.error('Error while logging in', error);
      throw Error;
    }
  };

  const handleLogin = async (event: any): Promise<void> => {
    console.log(email, password);
    try {
      const { userRole, userId, userUsername } = await checkEmailAndPassword(email, password);
      if (userRole === 0) {
        sessionStorage.setItem("userRole", "admin");
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("userUsername", userUsername);
        console.log("I SET USERROLE TO ADMIN - login");
        navigate(ADMIN_NAVIGATION_PATH);
        setLoginSuccess(true);
      }
      else if (userRole === 1) {
        sessionStorage.setItem("userRole", "client");
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("userUsername", userUsername);
        console.log("I SET USERROLE TO CLIENT - login");
        navigate(CLIENT_NAVIGATION_PATH);
        setLoginSuccess(true);
      }
      else {
        setLoginSuccess(false);
        setOpenAlert(true);
      }
    }
    catch {
      console.log("Error while logging in");
    }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <ThemeProvider theme={themeConstant}>
      <div className={styles.root}>
        <div className={styles.loginForm}>
          <div className={styles.typography}>
            <Typography variant={TYPOGRAPHY_VARIANT_H4} color={themeConstant.palette.primary.contrastText} align={ALIGN_CENTER} marginTop={MARGIN_TOP_4VH}>Log In</Typography>
            <Typography variant={TYPOGRAPHY_VARIANT_H5} color={themeConstant.palette.primary.contrastText} align={ALIGN_CENTER} marginTop={MARGIN_TOP_1VH}>To continue</Typography>
          </div>
          <div className={styles.usernameAndPassword}>
            <Fragment>
              <TextField className={styles.usernameTextField}
                id={ID_USERNAME_TEXTFIELD}
                label={LABEL_USERNAME}
                variant={VARIANT_FILLED}
                margin={MARGIN_NORMAL}
                size={SIZE_SMALL}
                onChange={handleEmailChange}
                required
                autoComplete='username'
                slotProps={{
                  inputLabel: {
                    style: {
                      color: themeConstant.palette.primary.contrastText
                    }
                  }
                }} />
              <TextField
                id={ID_PASSWORD_TEXTFIELD}
                variant={VARIANT_FILLED}
                margin={MARGIN_NORMAL}
                size={SIZE_SMALL}
                onChange={handlePasswordChange}
                type={
                  showPassword ? 'text'
                    : 'password'
                }
                sx={{
                  backgroundColor: alpha(themeConstant.palette.primary.dark, 0.5)
                }}
                autoComplete={AUTO_COMPLETE_CURRENT_PASSWORD}
                slotProps={{
                  inputLabel: {
                    style: {
                      color: themeConstant.palette.primary.contrastText
                    }
                  },
                  input: {
                    endAdornment: (
                      <InputAdornment position={ANDORNMENT_POSITION_END}>
                        <IconButton
                          className={styles.iconButton}
                          aria-label={ARIA_LABEL_TOGGLE_PASS_VISIBILITY}
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge={ANDORNMENT_EDGE_END}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
                label={LABEL_PASSWORD}
                required
              />
              <Button
                className={styles.loginButton}
                variant={VARIANT_OUTLINED}
                type="submit"
                onClick={handleLogin}
              >{LOG_IN}</Button>
            </Fragment>

          </div>
          <div >
            <Typography
              className={styles.typographyDontHaveAccount}
              variant={TYPOGRAPHY_VARIANT_CAPTION}
              color={themeConstant.palette.text.secondary}>
              {DONT_HAVE_ACCOUNT}
            </Typography>
            <Button
              className={styles.signUpButton}
              variant={BUTTON_VARIANT_TEXT}
              disabled={true}>
              {SIGN_UP}
            </Button>
          </div>
        </div>
        {loginSuccess !== true &&
          <Snackbar
            open={openAlert}
            autoHideDuration={AUTOHIDE_DURATION}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={handleClose} severity={SEVERITY_ERROR} sx={{ width: '100%' }}>
              <AlertTitle>{ALERT_TITLE_ERROR}</AlertTitle>
              {WRONG_USERNAME_OR_PASSWORD}
            </Alert>
          </Snackbar>
        }

      </div>
    </ThemeProvider>
  );
};