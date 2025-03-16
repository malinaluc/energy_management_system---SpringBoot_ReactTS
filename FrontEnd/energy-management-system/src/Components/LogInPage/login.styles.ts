import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { themeConstant } from '../../Library/Constants/themeConstants';
import energySystemBackground from '../../Resources/Images/pxfuel.jpg';

export const useStyles = makeStyles({
    root: {
        backgroundImage: `url(${energySystemBackground})`,
        backgroundPosition: 'center',
        alignContent: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        minWidth: '100vw'
    },
    typography: {
        padding: '1vh'
    },
    loginForm: {
        backgroundColor: alpha(themeConstant.palette.background.paper, 0.9),
        width: '20vw',
        height: '50vh',
        marginLeft: '10vw',
        marginBottom: '15vh'
    },
    usernameAndPassword: {
        margin: '2vw',
        color: themeConstant.palette.text.secondary
    },
    usernameTextField: {
        backgroundColor: alpha(themeConstant.palette.primary.dark, 0.5),
        width: '256px'
    },
    iconButton: {
        color: themeConstant.palette.primary.contrastText
    },
    loginButton: {
        marginLeft: '5vw !important',
        marginTop: '5wh !important',
        color: themeConstant.palette.action.active
    },
    typographyDontHaveAccount: {
        marginLeft: '2vw !important'
    },
    signUpButton: {
        fontSize: '12px',
        color: themeConstant.palette.action.active
    }
});